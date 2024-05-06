const UserController = require('./user.controller');
const BaseRouter = require('../../base/BaseRouter');
const { validateToken } = require('../../auth/auth');

class UserRouter extends BaseRouter {
    #controller = new UserController();

    constructor(){
        super();
    }

    registerRoute(){
        this.router.get('/getById/:id', validateToken, (req, res, next) => this.#controller.getById(req, res, next));
        this.router.post('/register', (req, res, next) => this.#controller.registerUser(req, res, next));
        this.router.post('/login', (req, res, next) => this.#controller.loginUser(req, res, next));
    }
}

const userRouter = new UserRouter();

module.exports = userRouter.router;