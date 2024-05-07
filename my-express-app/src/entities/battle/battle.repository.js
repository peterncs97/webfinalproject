const db = require("../../database/db");
const CharacterRepository=require("../creature/character/character.repository");
const MonsterRepository=require("../creature/monster/monster.repository");
// const MonsterRepository=require("../creature/monster/monster.repository");
const Op = db.Sequelize.Op;
const Battle = db.battle;
const SkillBook=db.skillBook;
const Character=db.character;
const CombatAttribute = db.combatAttribute;
const Monster=db.monster;

class BattleRepository{
    
    #characterRepository = new CharacterRepository();
    #monsterRepository= new MonsterRepository();
    
    async getBattleById(bid){
        return await Battle.findByPk(bid);
    }
    async setBattle(battle){
        console.log(battle);
        await Battle.update(battle,
            {
                where:
                {
                    id:battle.id
                }
            }
        );
        return await Battle.findByPk(battle.id);
    }
    async getSkillInfoById(id){
        return await SkillBook.findByPk(id);
    }


    async createBattle(charactorId, monsterId){
        // get the charactor data and monster data repectively 
        const charactorInfo=await this.#characterRepository.findCharacterById(charactorId);
        const charAttr=charactorInfo.combat_attribute.dataValues;
        const monsterInfo=CombatAttribute.findByPk(monsterId);
        // const monsterInfo=monsterInfo.combat_attribute;
        
        // console.log(charAttr.combat_attribute.dataValues);
        // create new battle row
        return await Battle.create(
            {
                CharacterID:charactorId,
                CharacterHP :charAttr.currhp,
                CharacterMP:charAttr.currmp,
                
                CharacterATK:charAttr.attack,
                CharacterDEF:charAttr.defence,
                CharacterPower:charAttr.power,
                CharacterLuck:charAttr.luck,
                CharacterAgile:charAttr.agile,
                CharacterStatusDuration:0,
      
                MonsterID:monsterId,
                
                MonsterHP:monsterInfo.currhp,
                MonsterMP:monsterInfo.currmp,
                
                MonsterATK:monsterInfo.attack,
                MonsterDEF:monsterInfo.defence,
                MonsterPower:monsterInfo.power,
                MonsterLuck:monsterInfo.luck,
                MonsterAgile:monsterInfo.agile,
                
                MonsterStatusDuration:0
            }
        );
    }
}

module.exports = BattleRepository;
