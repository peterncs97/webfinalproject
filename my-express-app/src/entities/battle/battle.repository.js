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
    async getSkillSetById(id){

        return await CombatAttribute.findByPk(id);
    }
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
        console.log(id);
        return await SkillBook.findByPk(id);
    }
    async updateCharacterHP(charactorId,HP){
        await CombatAttribute.update(
            {currhp:HP},
            {
                where:
                {
                    id:charactorId
                }
            }
        );
    }
    async createBattle(charactorId, monsterId){
        // get the charactor data and monster data repectively 
        const charactorInfo=await CombatAttribute.findByPk(charactorId);
        const monsterInfo=await CombatAttribute.findByPk(monsterId);
        console.log("print: "+charactorInfo.currhp);
        
        // create new battle row
        return await Battle.create(
            {
                CharacterID:charactorId,
                CharacterHP :charactorInfo.currhp,
                CharacterMP:charactorInfo.currmp,
                
                CharacterATK:charactorInfo.attack,
                CharacterDEF:charactorInfo.defence,
                CharacterPower:charactorInfo.power,
                CharacterLuck:charactorInfo.luck,
                CharacterAgile:charactorInfo.agile,
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
