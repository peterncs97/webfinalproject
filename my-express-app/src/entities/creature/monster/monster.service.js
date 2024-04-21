const MonsterRepository = require('./monster.repository');

class MonsterService {
    #monsterRepository = new MonsterRepository();

    async getMonsterById(req) {
        const dtos = await this.#monsterRepository.findMonsterById(req.params.id);
        return dtos;
    }

    async createMonster(req) {
        const dto = await this.#monsterRepository.createMonster(
            req.body.name,
            req.body.rarity,
            req.body.dropItem,
            req.body.maxhp,
            req.body.maxmp,
            req.body.power,
            req.body.agile,
            req.body.luck,
            req.body.attack,
            req.body.defence,
            req.body.skillSet
        );
        return dto;
    }
}

module.exports = MonsterService;