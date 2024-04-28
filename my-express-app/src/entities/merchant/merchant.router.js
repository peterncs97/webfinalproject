const MerchantController = require('./merchant.controller');
const BaseRouter = require('../../base/BaseRouter');

class MerchantRouter extends BaseRouter {
    #controller = new MerchantController();

    constructor(){
        super();
    }

    registerRoute(){
        this.router.get('/:id', (req, res, next) => this.#controller.getMerchantById(req, res, next));
        this.router.get('/getBySceneId/:sceneId', (req, res, next) => this.#controller.getMerchantBySceneId(req, res, next));
    }
}

const merchantRouter = new MerchantRouter();

module.exports = merchantRouter.router;