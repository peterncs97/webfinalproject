const CharacterRepository = require('./character.repository');
const ItemService = require('../../item/item.service');
const SceneService = require('../../scene/scene.service');

class CharacterService {
    #characterRepository = new CharacterRepository();
    #sceneService = new SceneService();
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

    async changeCharacterScene(characterId, sceneId) {
        const character = await this.getCharacterById(characterId);
        await this.#characterRepository.setCharacterScene(character, sceneId);
        return await this.getCharacterById(characterId);
    }

    async restCharacter(id) {
        const character = await this.getCharacterById(id);
        await this.#characterRepository.adjustCharacterMoney(character, -100);
        const attr = await character.getCombat_attribute();

        await this.#characterRepository.setCharacterHpMp(character, attr.maxhp, attr.maxmp);
        return await this.getCharacterById(id);
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
        // Calculate the money adjustment based on the trade action
        var moneyAdjustment = itemModel.price * item.quantity;
        if (tradeAction === 'buy') 
            moneyAdjustment = - moneyAdjustment;
        // Adjust the character's money
        await this.#characterRepository.adjustCharacterMoney(character, moneyAdjustment);
   
        // Find the item in the character's inventory
        const characterItem = character.items.find(characterItem => characterItem.id === item.id);
        
        // If the character already has the item, adjust the quantity based on the trade action
        if (characterItem)
            if (tradeAction === 'buy')
                item.quantity += characterItem.item_ownership.quantity;
            else 
                item.quantity = characterItem.item_ownership.quantity - item.quantity;

        // If character sell all of the item, remove the item from the character's inventory
        if (tradeAction === 'sell' && item.quantity <= 0)
            await this.#characterRepository.removeCharacterItem(character, characterItem);
        // Otherwise, add or update the item quantity in the character's inventory
        else {
            itemModel.item_ownership = { quantity: item.quantity };
            await this.#characterRepository.addOrUpdateCharacterItems(character, [itemModel]);
        }

        return await this.getCharacterById(characterId);
    }

    async equipCharacterItem(characterId, itemId) {
        const character = await this.getCharacterById(characterId);
        
        // Find the item to equip and the bodypart it should be equipped on
        const itemToEquip = character.items.find(characterItem => characterItem.id === itemId);
        const bodypart = itemToEquip.equipment_attribute.bodypart;

        // Find the item that is already equipped on the same bodypart
        const itemToUnequip = character.items.find(characterItem => characterItem.item_ownership.equipped && characterItem.equipment_attribute.bodypart === bodypart);
        
        // If the item is already equipped, return the character
        if (itemToUnequip && itemToEquip.id === itemToUnequip.id)
            return await this.getCharacterById(characterId);

        // Equip the new item
        itemToEquip.item_ownership = { quantity: itemToEquip.quantity, equipped: true };
        // Unequip the old item if it exists
        if (itemToUnequip)
            itemToUnequip.item_ownership = { quantity: itemToUnequip.quantity, equipped: false };
        
        // Update the character's items
        await this.#characterRepository.addOrUpdateCharacterItems(character, (itemToUnequip) ? [itemToEquip, itemToUnequip] : [itemToEquip]);
        return await this.getCharacterById(characterId);
    }

    async unequipCharacterItem(characterId, itemId) {
        const character = await this.getCharacterById(characterId);
        const itemToUnequip = character.items.find(characterItem => characterItem.id === itemId);
        itemToUnequip.item_ownership = { quantity: itemToUnequip.quantity, equipped: false };
        await this.#characterRepository.addOrUpdateCharacterItems(character, [itemToUnequip]);
        return await this.getCharacterById(characterId);
    }
}

module.exports = CharacterService;