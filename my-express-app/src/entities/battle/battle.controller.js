const BaseController = require('../../base/BaseController');
const BattleService = require('./battle.service');

class BattleController extends BaseController{    
    #battleService = new BattleService();
    
    async getBattleById(req, res){}
    async createBattle(req, res){}
    

    // TODO: check correspondence of router APIs  
}

module.exports = BattleController;