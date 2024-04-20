const BaseController = require('../../../base/BaseController');
const MonsterService = require('./monster.service');

class MonsterController extends BaseController{    
    #monsterService = new MonsterService();
    
    async getMonsterById(req, res){
        const dtos = await this.#monsterService.getMonsterById(req);
        this.responseHandler(res, dtos);
    }

    async createMonster(req, res){
        const dtos = await this.#monsterService.createMonster(req);
        this.responseHandler(res, dtos);
    }
}

module.exports = MonsterController;