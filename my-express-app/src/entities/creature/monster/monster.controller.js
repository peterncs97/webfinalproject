const BaseController = require('../../../base/BaseController');
const MonsterService = require('./monster.service');

class MonsterController extends BaseController{    
    #monsterService = new MonsterService();
    
    async getMonsterById(req, res){
        const dtos = await this.#monsterService.getMonsterById(req.params.id);
        this.responseHandler(res, dtos);
    }

    async createMonster(req, res){
        const dtos = await this.#monsterService.createMonster(
            req.body.name, req.body.rarity, req.body.experience,
            req.body.money, req.body.imagePath, req.body.imageDescription,
            req.body.maxhp, req.body.maxmp, req.body.power,
            req.body.agile,  req.body.luck, req.body.attack,
            req.body.defence, req.body.skillSet
        );
        this.responseHandler(res, dtos);
    }

    async setMonsterItems(req, res){
        const dtos = await this.#monsterService.setMonsterItems(
            req.body.monsterId,
            req.body.itemIds);
        this.responseHandler(res, dtos);
    }
}

module.exports = MonsterController;