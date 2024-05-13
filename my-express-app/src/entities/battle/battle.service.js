const algo = require('./algo');
const CharacterService = require('../creature/character/character.service');
const MonsterService = require('../creature/monster/monster.service');
const BattleRepository = require('./battle.repository');
class BattleService {
    #battleRepository = new BattleRepository();
    #characterService = new CharacterService();
    #monsterService = new MonsterService();
    #algo=new algo();

    async retrieveOrCreateBattle(characterId) {
        const character = await this.#characterService.getCharacterById(characterId);     
        const characterAttr = await character.getCombat_attribute();
        const skills = await this.#battleRepository.getSkillSetByIds(characterAttr.skillSet.split(","));
        const monster = await this.#monsterService.getRandMonsterBySceneId(character.currSceneId);

        let battle;
        if (character.isInBattle) {
            battle = await this.#battleRepository.getBattleByCharacterId(characterId);
        } else {
            const characterEquipments = character.items.filter(item => item.item_ownership.equipped)
            const equipmentAttr = this.calculateEquimentAttr(characterEquipments);
            const monsterAttr = await monster.getCombat_attribute();

            battle = await this.#battleRepository.createBattle(character.id, monster.id, characterAttr, equipmentAttr, monsterAttr);
            await character.update({ isInBattle: true });
        }
        
        return { monster: monster, skills: skills, battle: battle};
    }

    calculateEquimentAttr(characterEquipments) {
        var equipmentAttr;
        if (characterEquipments.length > 0)
            equipmentAttr = characterEquipments
                .map(item => item.getDataValue('equipment_attribute').dataValues)
                .reduce((acc, cur) => {
                    for (let key in cur)
                        if (cur.hasOwnProperty(key) && key !== "bodypart")
                            acc[key] = (acc[key] || 0) + cur[key];
                    return acc;
                }, {});
        else
            equipmentAttr = { maxhp: 0, maxmp: 0, attack: 0, defence: 0, agile: 0, luck: 0, power: 0 };
        return equipmentAttr;
    }

    // calculate the effectness of skill by the correctness of user input string and reaction time
    /***
    ** input: the user's keyboard result string, user's reaction time, skill id
    ** manipulation: 
        1. get the skill info from DB
        2. calculate the correctness of user input with the skill code
        3. use the correctness and the reaction time to calculate the effect of the skill 
    ** output: updated charactor and monster status of this turn
    ***/
    async updateBattle(bid, skillId, input, rt) {
        const battle = await this.#battleRepository.getBattleById(bid);
        // Player Attack
        // Calculate the correctness of user input with the skill code
        const skill = await this.#battleRepository.getSkillInfoById(skillId);
        const parsedCodes = skill.skillCode.split(';');
        const correntNTimebonus = (this.#algo.correctness(input, parsedCodes) * this.#algo.timeBonus(rt, skill.timer,0.0005)*0.001);
        const attrBouns = 1
            + (skill.Power === 0 ? 0 : battle.CharacterPower / skill.Power)
            + (skill.Luck === 0 ? 0 : battle.CharacterLuck / skill.Luck)
            + (skill.Agile === 0 ? 0 : battle.CharacterAgile / skill.Agile);
        var playerDamage = Math.floor((skill.ATK * attrBouns * correntNTimebonus) - battle.MonsterDEF);
        if (playerDamage < 1) 
            playerDamage = 0;

        await battle.increment('CharacterMP', { by: -skill.cost });

        if (battle.MonsterHP - playerDamage <= 0)
            return await this.handleVictory(battle, playerDamage);
        
        await battle.increment('MonsterHP', { by: -playerDamage });

        // Monster Attack
        var monsterDamage = (battle.MonsterATK - battle.CharacterDEF);
        if (monsterDamage < 1) 
            monsterDamage = 0;

        if (battle.CharacterHP - monsterDamage <= 0)
            return await this.handleDefeat(battle, playerDamage, monsterDamage);

        await battle.increment('CharacterHP', { by: -monsterDamage });

        await battle.reload()
        return { battleStatus: "continue", battle: battle, playerDamage: playerDamage, monsterDamage: monsterDamage };
    }

    async handleVictory(battle, playerDamage) {
        const character = await this.#characterService.getCharacterById(battle.CharacterID);
        const monster = await this.#monsterService.getMonsterById(battle.MonsterID);

        await battle.reload();
        await character.combat_attribute.update({ currhp: battle.CharacterHP, currmp: battle.CharacterMP});

        var result = { money: monster.money, experience: monster.experience, isLevelUp: false, item: '' };
        character.money += monster.money;
        if (character.experience + monster.experience >= character.nextLevelExp) {
            character.level += 1;
            character.experience = 0;
            character.nextLevelExp = Math.floor(character.nextLevelExp * 1.1);
            result.attrAdjustment = await this.handleLevelUp(character);
            result.isLevelUp = true;
        } else {
            character.experience += monster.experience;
        }
        character.isInBattle = false;
        await character.save();
        if (monster.items !== null && monster.items.length > 0) {
            const item = monster.items[Math.floor(Math.random() * monster.items.length)];
            await this.#characterService.grantCharacterItem(character, item);
            result.item = item.name;
        }

        const deletedBattle = await battle.destroy();
        return { battleStatus: "win", battle: deletedBattle, playerDamage: playerDamage, result: result };
    }

    async handleLevelUp(character) {
        const characterAttr = await character.getCombat_attribute();
        const max = (character.level < 5) ? 5 : character.level;
        const min = (character.level < 5) ? 1 : Math.floor(character.level/2);
        
        const attrAdjustment = [];
        for (let i = 0; i < 7; i++) {
            attrAdjustment.push(Math.floor(Math.random() * (max-min)+min));
        }

        characterAttr.maxhp += attrAdjustment[0];
        characterAttr.maxmp += attrAdjustment[1];
        characterAttr.power += attrAdjustment[2];
        characterAttr.agile += attrAdjustment[3];
        characterAttr.luck += attrAdjustment[4];
        characterAttr.attack += attrAdjustment[5];
        characterAttr.defence += attrAdjustment[6];

        await characterAttr.save();
        return attrAdjustment;
    }

    async handleDefeat(battle, playerDamage, monsterDamage) {
        const character = await this.#characterService.getCharacterById(battle.CharacterID);
        character.money = Math.floor(character.money / 2);
        character.currSceneId = 1;
        character.isInBattle = false;

        await character.save();
        await character.combat_attribute.update({ currhp: 0, currmp: 0 });
        
        const deletedBattle = await battle.destroy();
        deletedBattle.CharacterHP = 0;
        deletedBattle.CharacterMP = 0;
        return { battleStatus: "lose", battle: deletedBattle,playerDamage: playerDamage, monsterDamage: monsterDamage };
    }

    async escapeBattle(battleId){
        const battle = await this.#battleRepository.getBattleById(battleId);
        const character = await this.#characterService.getCharacterById(battle.CharacterID);
        await character.update({ isInBattle: false });
        await character.combat_attribute.update({ currhp: battle.CharacterHP, currmp: battle.CharacterMP });
        return await battle.destroy();
    }
}

module.exports = BattleService;