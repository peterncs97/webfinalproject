const CommentController = require('./comment.controller');
const BaseRouter = require('../../base/BaseRouter');

const { postValidator } = require('./comment.validator');

class CommentRouter extends BaseRouter {
    #controller = new CommentController();

    constructor(){
        super();
    }

    registerRoute(){
        this.router.get('/', (req, res, next) => this.#controller.listComment(req, res, next));
        this.router.post('/', postValidator, (req, res, next) => this.#controller.createComment(req, res, next));
    }
}

const commentRouter = new CommentRouter();

module.exports = commentRouter.router;