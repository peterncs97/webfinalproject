const db = require("../../../database/db");
const Op = db.Sequelize.Op;
const Character = db.character;
const CombatAttribute = db.combatAttribute;
const Item = db.item;

class CharacterRepository{
    async findCharacterById(id){
        return await Character.findByPk(id, { 
            include: [
                {
                    model: CombatAttribute,
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'creatureId', 'creatureType']}

                },
                {
                    model: Item,
                    order: [['id', 'ASC']],
                    through: {
                        attributes: ['quantity'],
                    }
                }
            ] 
        });
    }

    async findCharacterWithCombatAttributeById(id) {
        return await Character.findByPk(id, { 
            include: [
                {
                    model: CombatAttribute,
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'creatureId', 'creatureType'] }
                }
            ] 
        });
    }

    async findCharacterWithItemsById(id) {
        return await Character.findByPk(id, {
            include: {
                model: Item,
                order: [['id', 'ASC']],
                through: {
                    attributes: ['quantity'],
                },
            }
        });
    }

    async createCharacter(name, profession){
        const character = await Character.create(
            {
                name: name,
                profession: profession,
                level: 1,
                experience: 0,
                money: 500,
                equipmentWeaponId: 1,
                equipmentBodyId: 2,
                combat_attribute: {
                    currhp: 100,
                    currmp: 20,
                    maxhp: 100,
                    maxmp: 20,
                    power: 10,
                    agile: 10,
                    luck: 10,
                    attack: 10,
                    defence: 10,
                    skillSet: '[1,2]'
                },
            },
            {
                include: CombatAttribute
            }
        );
        return character;
    }

    async addOrUpdateCharacterItems(character, itemModels){
        return await character.addItems(itemModels);
    }

    async removeCharacterItem(character, itemModel){
        return await character.removeItem(itemModel);
    }

    async setCharacterItems(character, itemModels){
        return await character.setItems(itemModels);
    }
}

module.exports = CharacterRepository;