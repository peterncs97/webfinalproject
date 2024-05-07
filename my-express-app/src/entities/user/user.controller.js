const BaseController = require('../../base/BaseController');
const UserService = require('./user.service');

class UserController extends BaseController{    
    #userService = new UserService();
    
    async registerUser(req, res, next){
        try {
            const dtos = await this.#userService.createUser(req.body.username, req.body.password);
            this.responseHandler(res, dtos);
        }
        catch (err) {
            next(err);
        }
    }

    async loginUser(req, res, next){
        try {
            const dtos = await this.#userService.loginUser(req.body.username, req.body.password);
            this.responseHandler(res, dtos);
        }
        catch (err) {
            next(err);
        }
    }

    async getById(req, res, next){
        try {
            const dtos = await this.#userService.findUserById(req.params.id);
            this.responseHandler(res, dtos);
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;