const db = require("../../database/db");
const Op = db.Sequelize.Op;
const Item = db.item;


class ItemRepository{
    async findItemById(id){
        return await Item.findByPk(id);
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