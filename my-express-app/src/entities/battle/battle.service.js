const BattleRepository = require('./battle.repository');

class BattleService {
    #battleRepository = new BattleRepository();

    async createBattle(req) {
        // const username = req.body.username;
        // const content = req.body.content;
        // const dto = await this.#battleRepository.createBattle(username, content);
        // return dto;
    }
}

module.exports = BattleService;