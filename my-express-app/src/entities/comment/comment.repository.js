const db = require("../../database/db");
const Comment = db.comment;
const Op = db.Sequelize.Op;

class CommentRepository{
    async findAllComment(){
        return await Comment.findAll();
    }
    
    async createComment(username, content){
        const comment = {
            content: content
        };
        comment.username = username;
        return await Comment.create(comment);
    }
}

module.exports = CommentRepository;