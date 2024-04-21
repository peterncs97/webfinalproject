const db = require("../../../database/db");
const Op = db.Sequelize.Op;
const Monster = db.monster;
const Attribute = db.attribute;
const Item = db.item;

class MonsterRepository{
    async findMonsterById(id){
        return await Monster.findByPk(id, {
            include: [
                Attribute,
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
                
                attribute: {
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
                include: 'attribute',
            }
        );
    }
}

module.exports = MonsterRepository;