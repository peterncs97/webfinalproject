const db = require("../../database/db");
const Op = db.Sequelize.Op;
const Item = db.item;
const EquipmentAttribute = db.equipmentAttribute;

class ItemRepository{
    async findItemById(id){
        return await Item.findByPk(id, {
            include: [
                {
                    model: EquipmentAttribute,
                    as: 'equipment_attribute',
                    attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'itemId'] }
                },
            ],
        });
    }

    async findAllByIds(ids){
        return await Item.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        });
    }
    async createItem(name, type, price, description){
        return await Item.create(
            {
                name: name,
                type: type,
                price: price,
                description: description
            }
        );
    }
}

module.exports = ItemRepository;