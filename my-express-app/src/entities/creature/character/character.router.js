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
        this.router.post('/changescene', (req, res, next) => this.#controller.changeCharacterScene(req, res, next));
        this.router.post('/trade', (req, res, next) => this.#controller.tradeCharacterItem(req, res, next));
        this.router.post('/equip', (req, res, next) => this.#controller.equipCharacterItem(req, res, next));
        this.router.post('/unequip', (req, res, next) => this.#controller.unequipCharacterItem(req, res, next));
        this.router.post('/rest', (req, res, next) => this.#controller.restCharacter(req, res, next));
    }
}

const characterRouter = new CharacterRouter();

module.exports = characterRouter.router;