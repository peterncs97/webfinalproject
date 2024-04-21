const db = require("../../../database/db");
const Op = db.Sequelize.Op;
const Monster = db.monster;

class MonsterRepository{
    async findMonsterById(id){
        return await Monster.findByPk(id, { include: 'attribute' });
    }

    async createMonster(name, rarity, dropItem, maxhp, maxmp, power, agile, luck, attack, defence, skillSet){
        return await Monster.create(
            {
                name: name,
                rarity: rarity,
                dropItem: dropItem,

                attribute: {
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