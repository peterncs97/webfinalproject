const CharacterRepository = require('./character.repository');
const ItemService = require('../../item/item.service');

class CharacterService {
    #characterRepository = new CharacterRepository();
    #itemService = new ItemService();

    async getCharacterById(id) {
        return await this.#characterRepository.findCharacterById(id);
    }

    async getCharacterWithAttributeById(id) {
        return await this.#characterRepository.findCharacterWithAttributeById(id);
    }

    async getCharacterWithItemsById(id) {
        return await this.#characterRepository.findCharacterWithItemsById(id);
    }

    async createCharacter(name, profession) {
        return await this.#characterRepository.createCharacter(name, profession);
    }

    async grantCharacterItems(characterId, items) {
        items.sort((a, b) => a.id - b.id);
        const itemIds = items.map(item => item.id);
        const itemModels = await this.#itemService.getItemsByIds(itemIds);

        const character = await this.getCharacterWithItemsById(characterId);
        const characterItems = character.items;

        items.forEach((item, index) => {
            var newQuantity = item.quantity;
            const characterItem = characterItems.find(characterItem => characterItem.id === item.id);
            if (characterItem)
                newQuantity += characterItem.item_itemable.quantity;
            
            itemModels[index].item_itemable = {  quantity: newQuantity };
        });
        await character.addItems(itemModels)
        return character;
    }

    async removeCharacterItems(characterId, items) {
        const character = await this.getCharacterWithItemsById(characterId);
        const characterItems = character.items;

        const itemModels = []; 
        items.forEach((item) => {
            const characterItem = characterItems.find(characterItem => characterItem.id === item.id);
            if (characterItem){
                const newQuantity = characterItem.item_itemable.quantity - item.quantity;
                if (newQuantity <= 0)
                    character.removeItem(characterItem);
                else {
                    characterItem.item_itemable = { quantity: newQuantity };
                    itemModels.push(characterItem);
                }
            }
        });
        await character.addItems(itemModels)
        return character;
    }

    async setCharacterItems(characterId, items) {
        items.sort((a, b) => a.id - b.id);
        const itemIds = items.map(item => item.id);
        const itemModels = await this.#itemService.getItemsByIds(itemIds);

        const character = await this.getCharacterWithItemsById(characterId);

        items.forEach((item, index) => {
            itemModels[index].item_itemable = {
                quantity: item.quantity
            };
        });
        await character.setItems(itemModels)
        return character;
    }
}

module.exports = CharacterService;