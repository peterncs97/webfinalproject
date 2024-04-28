const db = require("../../../database/db");
const Op = db.Sequelize.Op;
const Monster = db.monster;
const CombatAttribute = db.combatAttribute;
const Item = db.item;

class MonsterRepository{
    async findMonsterById(id){
        return await Monster.findByPk(id, {
            include: [
                CombatAttribute,
                {
                    model: Item,
                    order: [['id', 'ASC']],
                    through: {
                        attributes: [],
                    },
                }
            ] 
        });
    }

    async createMonster(
        name, rarity, experience, money, imagePath, imageDescription, 
        maxhp, maxmp, power, agile, luck, attack, defence, skillSet
    ){
        return await Monster.create(
            {
                name: name,
                rarity: rarity,
                experience: experience,
                money: money,
                imagePath: imagePath,
                imageDescription: imageDescription,
                
                combat_attribute: {
                    currhp: maxhp,
                    currmp: maxmp,
                    maxhp: maxhp,
                    maxmp: maxmp,
                    power: power,
                    agile: agile,
                    luck: luck,
                    attack: attack,
                    defence: defence,
                    skillSet: skillSet
                }
            },
            {
                include: CombatAttribute,
            }
        );
    }
}

module.exports = MonsterRepository;