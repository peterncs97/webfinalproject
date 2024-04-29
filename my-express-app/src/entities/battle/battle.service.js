const BattleRepository = require('./battle.repository');

class BattleService {
    #battleRepository = new BattleRepository();

    async createBattle(req) {
        const charactorId = req.body.charactorid;
        const monsterId = req.body.monsterid;
        const dto = await this.#battleRepository.createBattle(charactorId, monsterId);
        return dto;
    }
}

module.exports = BattleService;