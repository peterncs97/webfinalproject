const BaseController = require('../../base/BaseController');
const CommentService = require('./comment.service');

class CommentController extends BaseController{    
    #commentService = new CommentService();
    
    async listComment(req, res){
        const dtos = await this.#commentService.listComment();
        this.responseHandler(res, dtos);
    }

    async createComment(req, res){
        const dtos = await this.#commentService.createComment(req);
        this.responseHandler(res, dtos);
    }
}

module.exports = CommentController;