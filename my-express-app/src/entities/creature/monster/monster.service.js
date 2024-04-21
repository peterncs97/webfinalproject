const MonsterRepository = require('./monster.repository');
const ItemService = require('../../item/item.service');

class MonsterService {
    #monsterRepository = new MonsterRepository();
    #itemService = new ItemService();

    async getMonsterById(id) {
        const monster = await this.#monsterRepository.findMonsterById(id);
        return monster;
    }

    async createMonster(
        name, rarity, experience, money, imagePath ,imageDescription, 
        maxhp, maxmp, power, agile, luck, attack, defence, skillSet
    ) {
        const monster = await this.#monsterRepository.createMonster(
            name, rarity, experience, money, imagePath, imageDescription, 
            maxhp, maxmp, power, agile, luck, attack, defence, skillSet
        );
        return monster;
    }

    async setMonsterItems(id, itemIds) {
        itemIds.sort((a, b) => a - b);
        const itemModels = await this.#itemService.getItemsByIds(itemIds);

        const monster = await this.getMonsterById(id);
        await monster.setItems(itemModels);
        return monster;
    }
}

module.exports = MonsterService;