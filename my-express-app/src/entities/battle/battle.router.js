const BattleController=require("./battle.controller")
const BaseRouter = require('../../base/BaseRouter');

class SceneRouter extends BaseRouter {
    #controller = new BattleController();
    
    constructor(){
        super();
    }
    
    registerRoute(){
        // --------------------------------------------/* GET: send to frontend*/-----------------------------------------------------------------------
        // get available user skill list(from Charactor Table), backpack item list(from Backpack Table), information of item(from Item Table) 
        this.router.get('/get-skill-set', (req, res, next) => this.#controller.getSkill(req, res, next));
        this.router.get('/get-backpack', (req, res, next) => this.#controller.getBackpack(req, res, next));
        this.router.get('/get-item-info', (req, res, next) => this.#controller.getItemInfo(req, res, next));
        
        // get the status information of Creature Table (id)
        this.router.get('/get-hp', (req, res, next) => this.#controller.getHP(req, res, next));
        this.router.get('/get-mp', (req, res, next) => this.#controller.getMP(req, res, next));
        this.router.get('/get-status', (req, res, next) => this.#controller.getStatus(req, res, next));
        
        // get skill information from SkillBook Table
        this.router.get('/get-skill-info', (req, res, next) => this.#controller.getSkillCode(req, res, next));


        // --------------------------------------------/* Post: create new things into backend*/-----------------------------------------------------------------------
        // create a new row in Battling Table
        /***
        ** input: charactorID, MonsterID; 
        ** manipulation: 
            1. retrive the data from Character Table(record the current states of user) and Monster Table by id 
            2. init the data in Battling Table(all to zero)
        ** output: charactor and monster status 
        ***/
       this.router.post('/start-battle', (req, res, next) => this.#controller.startBattle(req, res, next));
        

        // --------------------------------------------/* Put: update backend*/-----------------------------------------------------------------------
        // calculate the effectness of skill by the correctness of user input string and reaction time
        /***
        ** input: the user's keyboard result string, user's reaction time, skill id
        ** manipulation: 
            1. get the skill info from DB
            2. calculate the correctness of user input with the skill code
            3. use the correctness and the reaction time to calculate the effect of the skill 
        ** output: updated charactor and monster status of this turn
        ***/
        this.router.post('/calculate-skill', (req, res, next) => this.#controller.calculateSkill(req, res, next)); 
        
        
        // input: the relative difference of status 
        // manipulation: 
            // 1. retrive the data from 
                // Character Table or Monster Table 
                // Battling Table  
            // 2. manipulate and check the data: 
                // whether HPis zero
                // whether MP is zero
                // status duration counts
            // 3. if 
        // output: current HP, MP, status
        this.router.post('/update-HP', (req, res, next) => this.#controller.updateHP(req, res, next)); 
        this.router.post('/update-MP', (req, res, next) => this.#controller.updateMP(req, res, next));
        this.router.post('/update-Status', (req, res, next) => this.#controller.updateStatus(req, res, next));
        

        // ----------------------------------------------------/* Delete */---------------------------------------------------------------
        // used for: escape, endBattle
        this.router.delete('/escape', (req, res, next) => this.#controller.escape(req, res, next));
        this.router.delete('/delete', (req, res, next) => this.#controller.delete(req, res, next));
        
    }
}

const sceneRouter = new SceneRouter();

module.exports = sceneRouter.router;