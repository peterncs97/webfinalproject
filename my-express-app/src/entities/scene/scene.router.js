const SceneController = require('./scene.controller');
const BaseRouter = require('../../base/BaseRouter');

class SceneRouter extends BaseRouter {
    #controller = new SceneController();

    constructor(){
        super();
    }

    registerRoute(){
        this.router.get('/', (req, res, next) => this.#controller.listScene(req, res, next));
        this.router.get('/:id', (req, res, next) => this.#controller.getSceneById(req, res, next));
        this.router.post('/create', (req, res, next) => this.#controller.createScene(req, res, next));
        this.router.get('/randchild/:id', (req, res, next) => this.#controller.getRandomChildMonsterSceneById(req, res, next));
    }
}

const sceneRouter = new SceneRouter();

module.exports = sceneRouter.router;