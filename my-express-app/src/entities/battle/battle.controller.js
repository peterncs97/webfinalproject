const BaseController = require('../../base/BaseController');
const BattleService = require('./battle.service');
const ItemService=require('../item/item.service');
class BattleController extends BaseController{    
    #battleService = new BattleService();
    #itemService=new ItemService();
    // --------------------------------------------/* GET: send to frontend*/-----------------------------------------------------------------------
    // get a list of skill id of a user from character table
    async getSkillSetById(req, res){
        // console.log(req);
        console.log(req);
        const id=req.query.id;
        const dtos = await this.#battleService.getSkillSetById(id);
        this.responseHandler(res, dtos);
    }

    // get a list of item id in backpack of a user from backpack table
    async getBackpackById(req, res){
        const dtos = await this.#battleService.getBackpackById(req);
        this.responseHandler(res, dtos);
    }

    // get the info of item from item table
    async getItemInfoByIds(req, res){
        const dtos = await this.#itemService.getItemById(req.query.id);
        this.responseHandler(res, dtos);
    
    }

    // get the info of skill from skill book table
    async getSkillInfoById(req, res){
        const id = req.query.skillid;
        const dtos = await this.#battleService.getSkillInfoById(id);
        this.responseHandler(res, dtos);    
    }

    // for testing
    async getBattleById(req, res){
        const bid = req.query.id;
        const dtos = await this.#battleService.getBattleById(bid);
        this.responseHandler(res, dtos);    
    }

    // get creature status
    // async getHpById(req, res){
    //     const dtos = await this.#battleService.getHpById(req);
    //     this.responseHandler(res, dtos);
    // }
    // async getMpById(req, res){}
    // async getStatusById(req, res){}
    
    // --------------------------------------------/* Post: create new things into backend*/-----------------------------------------------------------------------    
    async createBattle(req, res){
        console.log(req);
        const cid = req.query.cid;
        const mid = req.query.mid;
        const dtos = await this.#battleService.createBattle(cid,mid);
        this.responseHandler(res, dtos);
    }
    // --------------------------------------------/* Put: update database*/-----------------------------------------------------------------------    
    async calculateSkill(req, res){
        const bid = req.body.id;
        const skillid = req.body.skillid;
        const input = req.body.input;
        const rt = req.body.rt;
        const dtos = await this.#battleService.calculateSkill(bid, skillid, input, rt);
        this.responseHandler(res, dtos);
    }
    async monsterAttack(req, res){
        const bid = req.body.id;
        const dtos = await this.#battleService.monsterAttack(bid);
        this.responseHandler(res, dtos);
    }
    // TODO 
    async calculateExp(req, res){
        const dtos = await this.#battleService.calculateExp(req);
        this.responseHandler(res, dtos);
    }    
    // for testing
    async setBattle(req, res){
        const dtos = await this.#battleService.setBattle(req);
        this.responseHandler(res, dtos);
    }

    // TODO: check correspondence of router APIs  
}

module.exports = BattleController;