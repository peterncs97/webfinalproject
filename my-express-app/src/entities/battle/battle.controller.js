const BaseController = require('../../base/BaseController');
const BattleService = require('./battle.service');

class BattleController extends BaseController{    
    #battleService = new BattleService();
     // --------------------------------------------/* GET: send to frontend*/-----------------------------------------------------------------------
    async getSkillSetById(req, res){
        const dtos = await this.#battleService.getSkillSetById(req);
        this.responseHandler(res, dtos);
    }
    async getBackpackById(req, res){
        const dtos = await this.#battleService.getBackpackById(req);
        this.responseHandler(res, dtos);
    }
    async getItemInfoByIds(req, res){}
    async getSkillInfoById(req, res){}
    // creature status
    async getHpById(req, res){
        const dtos = await this.#battleService.getHpById(req);
        this.responseHandler(res, dtos);
    }
    async getMpById(req, res){}
    async getStatusById(req, res){}
    // --------------------------------------------/* Post: create new things into backend*/-----------------------------------------------------------------------    
    async createBattle(req, res){
        const dtos = await this.#battleService.createBattle(req);
        this.responseHandler(res, dtos);
    }

    // TODO: check correspondence of router APIs  
}

module.exports = BattleController;