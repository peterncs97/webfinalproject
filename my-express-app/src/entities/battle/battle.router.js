const BattleController=require("./battle.controller")
const BaseRouter = require('../../base/BaseRouter');

class BattleRouter extends BaseRouter {
    #controller = new BattleController();
    
    constructor(){
        super();
    }
    
    registerRoute(){
        // --------------------------------------------/* GET: send to frontend*/-----------------------------------------------------------------------
        // get available user skill list(from Charactor Table), backpack item list(from Backpack Table), information of item(from Item Table) 
        this.router.get('/get-skill-set', (req, res, next) => this.#controller.getSkillById(req, res, next));
        this.router.get('/get-backpack', (req, res, next) => this.#controller.getBackpackById(req, res, next));
        this.router.get('/get-item-info', (req, res, next) => this.#controller.getItemInfoByIds(req, res, next));
        
        // get the status information of Creature Table (id)
        this.router.get('/get-battle', (req, res, next) => this.#controller.getBattleById(req, res, next));
        
        // get skill information from SkillBook Table
        this.router.get('/get-skill-info', (req, res, next) => this.#controller.getSkillInfoById(req, res, next));


        // --------------------------------------------/* Post: create new things into backend*/-----------------------------------------------------------------------
        // create a new row in Battling Table
        /***
        ** input: charactorID, MonsterID; 
        ** manipulation: 
            1. retrive the data from Character Table(record the current states of user) and Monster Table by id 
            2. init the data in Battling Table(all to zero)
        ** output:  battle id, charactor and monster status 
        ***/
        this.router.post('/create-battle', (req, res, next) => this.#controller.createBattle(req, res, next)); 
       
        // --------------------------------------------/* Put: update backend*/-----------------------------------------------------------------------
        // user attack monster: calculate the effectness of skill by the correctness of user input string and reaction time
        /***
        ** input: 
            {
                "id":1, //battle id
                "skillid":1,
                "input":"kiki", // user input string
                "rt":4000 //reaction time
            }
        ** manipulation: 
            1. get the skill info from DB
            2. calculate the correctness of user input with the skill code
            3. use the correctness and the reaction time to calculate the effect of the skill 
        ** output: updated charactor and monster status of this turn
        ***/
        this.router.post('/calculate-skill', (req, res, next) => this.#controller.calculateSkill(req, res, next)); 
        this.router.post('/calculate-exp', (req, res, next) => this.#controller.calculateExp(req, res, next)); 
        
        // moster attack user: get the monster info and then radomly use skill
        /***
         ** input: battle id
         ** 
         ** output: 1. updated charactor and monster status of this turn/ 2. end of battle: monster info
         ***/
        this.router.post('/monster-attack', (req, res, next) => this.#controller.monsterAttack(req, res, next)); 
        
        // for testing
        this.router.post('/set-battle', (req, res, next) => this.#controller.setBattle(req, res, next)); 
        
        
        // TODO
        /***
        ** input: battle id, item id
        ** manipulation: 
            1. get the skill info from DB
            2. calculate the correctness of user input with the skill code
            3. use the correctness and the reaction time to calculate the effect of the skill 
        ** output: updated charactor and monster status of this turn
        ***/
        this.router.post('/use-item', (req, res, next) => this.#controller.useItem(req, res, next)); 
        
        // ----------------------------------------------------/* Delete */---------------------------------------------------------------
        // used for: escape, endBattle
        // input: battle id
        this.router.delete('/escape', (req, res, next) => this.#controller.escape(req, res, next));
        this.router.delete('/delete', (req, res, next) => this.#controller.delete(req, res, next));
        
    }
}

const battleRouter = new BattleRouter();

module.exports = battleRouter.router;