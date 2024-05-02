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
        const character = await this.#characterRepository.createCharacter(name, profession);
        
        const items = await this.#itemService.getItemsByIds([1, 2]);
        items.forEach((item) => { item.item_ownership = { quantity: 10 }; });
        await this.#characterRepository.addOrUpdateCharacterItems(character, items);

        return await this.getCharacterById(character.id);
    }

    async restCharacter(id) {
        // TODO: Restore character's HP and MP to full and decrease money
        // call setCharacterHpMp, adjustCharacterMoney from characterRepository
    }

    async grantCharacterItems(characterId, items) {
        const character = await this.getCharacterWithItemsById(characterId);
        const characterItems = character.items;
        
        items.sort((a, b) => a.id - b.id);
        const itemIds = items.map(item => item.id);
        const itemModels = await this.#itemService.getItemsByIds(itemIds);
  
        items.forEach((item, index) => {
            var newQuantity = item.quantity;
            const characterItem = characterItems.find(characterItem => characterItem.id === item.id);
            if (characterItem)
                newQuantity += characterItem.item_ownership.quantity;
            
            itemModels[index].item_ownership = {  quantity: newQuantity };
        });
        
        await this.#characterRepository.addOrUpdateCharacterItems(character, itemModels);
        return await this.getCharacterWithItemsById(characterId);
    }

    async removeCharacterItems(characterId, items) {
        const character = await this.getCharacterWithItemsById(characterId);
        const characterItems = character.items;

        const itemModels = []; 
        items.forEach((item) => {
            const characterItem = characterItems.find(characterItem => characterItem.id === item.id);
            if (characterItem){
                const newQuantity = characterItem.item_ownership.quantity - item.quantity;
                if (newQuantity <= 0)
                    this.#characterRepository.removeCharacterItem(character, characterItem);
                else {
                    characterItem.item_ownership = { quantity: newQuantity };
                    itemModels.push(characterItem);
                }
            }
        });

        await this.#characterRepository.addOrUpdateCharacterItems(character, itemModels);
        return await this.getCharacterWithItemsById(characterId);
    }

    async tradeCharacterItem(characterId, item, tradeAction) {
        const character = await this.getCharacterWithItemsById(characterId);
        const itemModel = await this.#itemService.getItemById(item.id);

        var moneyAdjustment = itemModel.price * item.quantity;
        if (tradeAction === 'buy') 
            moneyAdjustment = - moneyAdjustment;
        await this.#characterRepository.adjustCharacterMoney(character, moneyAdjustment);
   
        const characterItem = character.items.find(characterItem => characterItem.id === item.id);
        if (characterItem)
            if (tradeAction === 'buy')
                item.quantity += characterItem.item_ownership.quantity;
            else 
                item.quantity = characterItem.item_ownership.quantity - item.quantity;

        if (tradeAction === 'sell' && item.quantity <= 0)
            await this.#characterRepository.removeCharacterItem(character, characterItem);
        else {
            itemModel.item_ownership = { quantity: item.quantity };
            await this.#characterRepository.addOrUpdateCharacterItems(character, [itemModel]);
        }

        return await this.getCharacterById(characterId);
    }
}

module.exports = CharacterService;