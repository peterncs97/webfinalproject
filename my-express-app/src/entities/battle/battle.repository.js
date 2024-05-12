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
