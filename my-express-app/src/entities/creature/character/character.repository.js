const db = require("../../../database/db");
const Op = db.Sequelize.Op;
const Character = db.character;

class CharacterRepository{
    async findCharacterById(id){
        return await Character.findByPk(id, { include: 'attribute' });
    }

    async createCharacter(name, profession){
        return await Character.create(
            {
                name: name,
                profession: profession,
                level: 1,
                experience: 0,
                money: 0,
                equipmentWeaponId: 1,
                equipmentBodyId: 2,
                items: '[1,2]',

                attribute: {
                    maxhp: 100,
                    maxmp: 20,
                    power: 10,
                    agile: 10,
                    luck: 10,
                    attack: 10,
                    defence: 10,
                    skillSet: '[1,2]'
                }
            },
            {
                include: 'attribute',
            }
        );
    }
}

module.exports = CharacterRepository;