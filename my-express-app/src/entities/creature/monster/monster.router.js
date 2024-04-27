const MonsterController = require('./monster.controller');
const BaseRouter = require('../../../base/BaseRouter');

class MonsterRouter extends BaseRouter {
    #controller = new MonsterController();

    constructor(){
        super();
    }

    registerRoute(){
        this.router.get('/:id', (req, res, next) => this.#controller.getMonsterById(req, res, next));
        this.router.post('/create', (req, res, next) => this.#controller.createMonster(req, res, next));
        this.router.post('/setitems', (req, res, next) => this.#controller.setMonsterItems(req, res, next));
    }
}

const monsterRouter = new MonsterRouter();

module.exports = monsterRouter.router;