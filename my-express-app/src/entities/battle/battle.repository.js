const db = require("../../database/db");
const Op = db.Sequelize.Op;
const Battle = db.battle;
const SkillBook=db.skillBook;

class BattleRepository{
    async getBattleById(bid){
        return await Battle.findByPk(bid);
    }

    async getBattleByCharacterId(characterId){
        return await Battle.findOne({
            where:{
                CharacterID:characterId
            }
        });
    }

    async getSkillInfoById(id){
        return await SkillBook.findByPk(id);
    }

    async getSkillSetByIds(ids){
        return await SkillBook.findAll({
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        });
    }

    async createBattle(characterId, monsterId, characterAttr, equipmentAttr, monsterAttr){
        // create new battle row
        return await Battle.create(
            {
                CharacterID: characterId,
                CharacterHP: characterAttr.currhp,
                CharacterMP: characterAttr.currmp,
                CharacterMAXHP: characterAttr.maxhp + equipmentAttr.maxhp,
                CharacterMAXMP: characterAttr.maxmp + equipmentAttr.maxmp,

                CharacterATK: characterAttr.attack + equipmentAttr.attack,
                CharacterDEF: characterAttr.defence + equipmentAttr.defence,
                CharacterPower: characterAttr.power + equipmentAttr.power,
                CharacterLuck: characterAttr.luck + equipmentAttr.luck,
                CharacterAgile: characterAttr.agile + equipmentAttr.agile,
                CharacterStatusDuration: 0,
      
                MonsterID:monsterId,
                MonsterHP:monsterAttr.currhp,
                MonsterMP:monsterAttr.currmp,

                MonsterMAXHP:monsterAttr.maxhp,
                MonsterMAXMP:monsterAttr.maxmp,
                
                MonsterATK:monsterAttr.attack,
                MonsterDEF:monsterAttr.defence,
                MonsterPower:monsterAttr.power,
                MonsterLuck:monsterAttr.luck,
                MonsterAgile:monsterAttr.agile,
                
                MonsterStatusDuration:0
            }
        );
    }

}

module.exports = BattleRepository;
