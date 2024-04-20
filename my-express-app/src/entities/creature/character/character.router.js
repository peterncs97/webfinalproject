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
    }
}

const characterRouter = new CharacterRouter();

module.exports = characterRouter.router;