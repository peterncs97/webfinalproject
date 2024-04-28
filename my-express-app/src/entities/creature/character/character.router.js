const CharacterController = require('./character.controller');
const BaseRouter = require('../../../base/BaseRouter');

class CharacterRouter extends BaseRouter {
    #controller = new CharacterController();

    constructor(){
        super();
    }

    registerRoute(){
        this.router.get('/:id', (req, res, next) => this.#controller.getCharacterById(req, res, next));
        this.router.post('/create', (req, res, next) => this.#controller.createCharacter(req, res, next));
        this.router.post('/grantitems', (req, res, next) => this.#controller.grantCharacterItems(req, res, next));
        this.router.post('/removeitems', (req, res, next) => this.#controller.removeCharacterItems(req, res, next));
        this.router.post('/trade', (req, res, next) => this.#controller.tradeCharacterItems(req, res, next));
    }
}

const characterRouter = new CharacterRouter();

module.exports = characterRouter.router;