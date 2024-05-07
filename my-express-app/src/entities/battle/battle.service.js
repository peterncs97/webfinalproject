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
        var value=0
        // 3. use the correctness and the reaction time to calculate the effect of the skill 
        switch (skill.dataValues.type) {
            case "attack":
                value=(skill.dataValues.ATK * bonus) - battle.dataValues.MonsterDEF;
                value=value < 1 ? 0:value;
                battle.dataValues.MonsterHP -= value;
                break;
            case "magic":
                value=(skill.dataValues.ATK * bonus) - battle.dataValues.MonsterDEF*0.8;
                value=value < 1 ? 0:value;
                battle.dataValues.MonsterHP -= value;
                break;
            case "defense":
                value=skill.dataValues.DEF * bonus;
                battle.dataValues.CharactorDEF += value;
                // TODO: not yet finish the mechenism of skill duration
                battle.dataValues.CharacterStatusDuration=skill.dataValues.duration;
                break;
        }

        if(battle.dataValues.MonsterHP<=0){
            const dto = await this.#monsterRepository.findMonsterById(battle.dataValues.monsterId);
            return "You won!";
        }
        const dto = await this.#battleRepository.setBattle(battle.dataValues);
        dto.dataValues.message=`${skill.dataValues.name},${value}`;
        return dto;
    }
    async monsterAttack(bid) {
        // 1. get battle info 
        // 2. get monster info
        const battle = await this.#battleRepository.getBattleById(bid);
        console.log(battle);
        var message=""
        var value=0;
        // const monster = await this.#monsterRepository.findMonsterById(battle.dataValues.MonsterID);
        
        // 3. randomly use atk or def or magic
        const choice=this.#algo.getRandomInt(3);
        switch(choice){
            case 0: 
                value=battle.dataValues.MonsterATK - battle.dataValues.CharacterDEF;
                value=value < 0 ? 1:value;
                battle.dataValues.CharacterDEF -= value;
                message="attack";
                break;
            case 1: 
                value=battle.dataValues.MonsterATK*1.2 - battle.dataValues.CharacterDEF;
                value=value < 0 ? 1:value;
                battle.dataValues.CharacterDEF -= value;
                message="magic";
                break;
            case 2:
                value= 3 
                battle.dataValues.MonsterDEF+= value;
                message="defense";
                break;
        }
        // 4. result 
            // updated battle result
            // or end of battle(character loss)
        if(battle.dataValues.CharacterDEF<=0){
            return "you loss";
        }
        console.log(battle.dataValues.MonsterATK, battle.dataValues.CharacterDEF,value);
        const dto = await this.#battleRepository.setBattle(battle.dataValues);
        dto.dataValues.message=`${message}:${value}`;
        return dto;
    }
    async calculateExp(req) {

    }
}

module.exports = BattleService;