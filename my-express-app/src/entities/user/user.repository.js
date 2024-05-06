const db = require("../../database/db");
const User = db.user;
const Op = db.Sequelize.Op;
const Character = db.character;

class UserRepository{
    async findUserById(id){
        return await User.findByPk(id);
    }

    async findUserWithPasswordByUsername(username) {
        return await User.findOne({
            where: {
                username: username
            },
            attributes: ['id', 'username', 'password'],
            include: [
                {
                    model: Character,
                    attributes: ['id']
                },
            ]
        });
    }

    async findUserByUsername(username){
        return await User.findOne({
            where: {
                username: username
            }
        });
    }

    async createUser(username, password){
        const user = {
            username: username,
            password: password
        };
        return await User.create(user);
    }
}

module.exports = UserRepository;