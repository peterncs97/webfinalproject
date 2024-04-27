const ItemRepository = require('./item.repository');

class ItemService {
    #itemRepository = new ItemRepository();

    async getItemById(id) {
        const item = await this.#itemRepository.findItemById(id);
        return item;
    }

    async getItemsByIds(ids) {
        const items = await this.#itemRepository.findAllByIds(ids);
        return items;
    }

    async createItem(name, type, price, description) {
        const item = await this.#itemRepository.createItem(
            name, type, price, description
        );
        return item;
    }
}

module.exports = ItemService;