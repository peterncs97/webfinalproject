const db = require("../../database/db");
const Op = db.Sequelize.Op;
const Battle = db.battle;

class BattleRepository{
    async findBattleById(id){
        return await Battle.findByPk(id);
    }

    async createBattle(charactorId, monsterId){
        // get the charactor data and monster data repectively 
        // create new battle row
        return await Battle.create(
            {
                CharacterID:charactorId,
                CharacterHP :0,
                CharacterMP:0,
                
                CharacterATK:0,
                CharacterDEF:0,
                CharacterPower:0,
                CharacterLuck:0,
                CharacterAgile:0,
                CharacterStatusDuration:0,
      
                MonsterID:monsterId,
                
                MonsterHP:0,
                MonsterMP:0,
                
                MonsterATK:0,
                MonsterDEF:0,
                MonsterPower:0,
                MonsterLuck:0,
                MonsterAgile:0,
                
                MonsterStatusDuration:0
            }
        );
    }
}

module.exports = BattleRepository;
