const CommentRepository = require('./comment.repository');

class CommentService {
    #commentRepository = new CommentRepository();

    async listComment() {
        const dtos = await this.#commentRepository.findAllComment();
        return dtos;
    }

    async createComment(req) {
        const username = req.body.username;
        const content = req.body.content;
        const dto = await this.#commentRepository.createComment(username, content);
        return dto;
    }
}

module.exports = CommentService;