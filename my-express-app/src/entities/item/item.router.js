const ItemController = require('./item.controller');
const BaseRouter = require('../../base/BaseRouter');

class ItemRouter extends BaseRouter {
    #controller = new ItemController();

    constructor(){
        super();
    }

    registerRoute(){
        this.router.get('/:id', (req, res, next) => this.#controller.getItemById(req, res, next));
        this.router.post('/create', (req, res, next) => this.#controller.createItem(req, res, next));
    }
}

const itemRouter = new ItemRouter();

module.exports = itemRouter.router;