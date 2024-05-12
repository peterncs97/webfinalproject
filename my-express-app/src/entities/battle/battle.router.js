const BattleController=require("./battle.controller")
const BaseRouter = require('../../base/BaseRouter');

class BattleRouter extends BaseRouter {
    #controller = new BattleController();
    
    constructor(){
        super();
    }
    
    registerRoute(){
        // --------------------------------------------/* GET: send to frontend, use req.query instead of req.body */-----------------------------------------------------------------------
        // get the status information of Creature Table (id)
        this.router.get('/get-battle', (req, res, next) => this.#controller.getBattleById(req, res, next));
        

        // --------------------------------------------/* Post: create new things into backend*/-----------------------------------------------------------------------
        // create a new row in Battling Table
        /***
        ** input: charactorID, MonsterID; 
        ** manipulation: 
            1. retrive the data from Character Table(record the current states of user) and Monster Table by id 
            2. init the data in Battling Table(all to zero)
        ** output:  battle id, charactor and monster status 
        ***/
        this.router.post('/create', (req, res, next) => this.#controller.createBattle(req, res, next)); 
       
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
        this.router.post('/update', (req, res, next) => this.#controller.updateBattle(req, res, next)); 
  
        // ----------------------------------------------------/* Delete */---------------------------------------------------------------
        // used for: escape, endBattle
        // input: battle id
        this.router.post('/escape', (req, res, next) => this.#controller.escape(req, res, next));
        
    }
}

const battleRouter = new BattleRouter();

module.exports = battleRouter.router;