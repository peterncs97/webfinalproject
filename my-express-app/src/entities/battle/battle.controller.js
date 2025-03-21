const BaseController = require('../../base/BaseController');
const BattleService = require('./battle.service');
const ItemService=require('../item/item.service');
class BattleController extends BaseController{    
    #battleService = new BattleService();

    async retrieveOrCreate(req, res){
        const dtos = await this.#battleService.retrieveOrCreateBattle(req.body.characterId);
        this.responseHandler(res, dtos);
    }

    async updateBattle(req, res){
        const bid = req.body.battleId;
        const skillId = req.body.skillId;
        const input = req.body.userInput;
        const rt = req.body.remainingTime;
        const dtos = await this.#battleService.updateBattle(bid, skillId, input, rt);
        this.responseHandler(res, dtos);
    }

    async escape(req, res){
        const dtos = await this.#battleService.escapeBattle(req.body.battleId);
        this.responseHandler(res, dtos);
    }
}

module.exports = BattleController;