const { PASSWORD } = require('../../database/db.config');
const algo = require('./algo');
const BattleRepository = require('./battle.repository');
const MonsterRepository = require('../creature/monster/monster.repository');
const { battle } = require('../../database/db');

class BattleService {
    #battleRepository = new BattleRepository();
    #monsterRepository = new MonsterRepository();
    #algo=new algo();
    async getSkillInfoById(id) {
        const dto = await this.#battleRepository.getSkillInfoById(id);
        return dto;
    }
    async createBattle(req) {
        const charactorId = req.body.charactorid;
        const monsterId = req.body.monsterid;
        const dto = await this.#battleRepository.createBattle(charactorId, monsterId);
        return dto;
    }
    async getBattleById(bid) {
        const dto = await this.#battleRepository.getBattleById(bid);
        return dto;
    }

    async setBattle(req) {
        const dto = await this.#battleRepository.setBattle(req.body);
        return dto;
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
    async calculateSkill(bid, skillid, input, rt) {

        // 1. get the skill info from DB
        const skill = await this.#battleRepository.getSkillInfoById(skillid);
        const battle = await this.#battleRepository.getBattleById(bid);

        // 2. calculate the correctness of user input with the skill code
        // parse skill code
        // count correctness
        
        console.log("battle");
        const parsedCodes = skill.dataValues.skillCode.split(';');
        const bonus = (this.#algo.correctness(input, parsedCodes) * this.#algo.timeBonus(rt, skill.timer,0.0005)*0.001);
        
        // 3. use the correctness and the reaction time to calculate the effect of the skill 
        switch (skill.dataValues.type) {
            case "attack":
                // end of battle
                console.log(battle.dataValues.MonsterHP, skill.dataValues.ATK, bonus,skill.dataValues.ATK * bonus);
                if (battle.dataValues.MonsterHP < skill.dataValues.ATK * bonus) {
                    // clear battle log and return the possible reward of monster
                    return await this.#monsterRepository.findMonsterById(battle.dataValues.monsterId);
                }
                battle.dataValues.MonsterHP -= skill.dataValues.ATK * bonus;
                case "magic":
                    // end of battle
                    if (battle.dataValues.MonsterHP < skill.dataValues.ATK * bonus) {
                        return await this.#monsterRepository.findMonsterById(battle.dataValues.monsterId);
                }
                battle.dataValues.MonsterHP -= skill.dataValues.ATK * bonus;
                case "defense":
                    battle.dataValues.CharactorDEF += skill.dataValues.DEF * bonus;
                    // not yet finish the mechenism of skill duration
                    battle.dataValues.CharacterStatusDuration=skill.dataValues.duration;
        }
        
        const dto = await this.#battleRepository.setBattle(battle.dataValues);
        return dto;
    }
    async calculateExp(req) {

    }
}

module.exports = BattleService;