const db = require("../../../database/db");
const Op = db.Sequelize.Op;
const Character = db.character;
const CombatAttribute = db.combatAttribute;
const Item = db.item;
const ItemOwnership = db.itemOwnership;
const EquipmentAttribute = db.equipmentAttribute;

class CharacterRepository{
    async findCharacterById(id){
        return await Character.findByPk(id, { 
            include: [
                {
                    model: CombatAttribute,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'creatureId', 'creatureType']}
                },
                {
                    model: Item,
                    order: [['id', 'ASC']],
                    through: {
                        attributes: ['quantity', 'equipped'],
                    },
                    include: [
                        {
                            model: EquipmentAttribute,
                            as: 'equipment_attribute',
                            attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'itemId'] }
                        },
                    ]
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
                nextLevelExp: 100,
                money: 500,
                currSceneId: 1,
                isInBattle: false,      
                combat_attribute: {
                    currhp: 100,
                    currmp: 50,
                    maxhp: 100,
                    maxmp: 50,
                    power: 10,
                    agile: 10,
                    luck: 10,
                    attack: 10,
                    defence: 10,
                    skillSet: '1,2,3,4'
                },
            },
            {
                include: CombatAttribute
            }
        );
        return character;
    }

    async setCharacterScene(character, sceneId){
        return await character.update({ currSceneId: sceneId });
    }

    async addOrUpdateCharacterItems(character, itemModels){
        return await character.addItems(itemModels);
    }

    async removeCharacterItem(character, itemModel){
        return await ItemOwnership.destroy({
            where: {
                ownerId: character.id,
                itemId: itemModel.id,
                ownerType: 'character'
            }
        });
        
        // Below mixin method is not working as it deletes ownerships of other scopes e.g. merchant
        // await character.removeItem(itemModel); 
    }

    async setCharacterItems(character, itemModels){
        return await character.setItems(itemModels);
    }

    async adjustCharacterMoney(character, moneyAdjustment){
        return await character.increment('money', { by: moneyAdjustment });
    }

    async setCharacterHpMp(character, hp, mp){
        return await character.combat_attribute.update({ currhp: hp, currmp: mp });
    }
}

module.exports = CharacterRepository;