const bcrypt = require('bcrypt');
const { issueJwt } = require('../../auth/auth');

const CharacterService = require('../creature/character/character.service');
const UserRepository = require('./user.repository');
const Exception = require('../../base/Exception');
const ExceptionMessage = require('../../enums/ExceptionMessage');
const HttpStatus = require('../../enums/HttpStatus');

class UserService {
    #userRepository = new UserRepository();
    #characterService = new CharacterService();

    async findUserByUsername(username) {
        const user = await this.#userRepository.findUserByUsername(username);
        return user;
    }

    async findUserById(id) {
        const user = await this.#userRepository.findUserById(id);
        if (!user) throw Exception(HttpStatus.NOT_FOUND, ExceptionMessage.NOT_FOUND);
        return user;
    }

    async createUser(username, password) {
        const userExist = await this.findUserByUsername(username);
        if (userExist) throw Exception(HttpStatus.CONFLICT, ExceptionMessage.USER_ALREADY_EXIST);

        const encryptedPassword = await bcrypt.hash(password, 10);
        
        var user = await this.#userRepository.createUser(username, encryptedPassword);
        const character = await this.#characterService.createCharacter(username, "warrior");
        await user.setCharacter(character);
        //const token = issueJwt(user);
        return "";
    }

    async loginUser(username, password) {
        const user = await this.#userRepository.findUserWithPasswordByUsername(username);
        if (!user)
            throw Exception(HttpStatus.UNAUTHORIZED, ExceptionMessage.UNAUTHORIZED);
        const validate = await bcrypt.compare(password, user.password);
        if (!validate)
            throw Exception(HttpStatus.UNAUTHORIZED, ExceptionMessage.UNAUTHORIZED);
        const token = issueJwt(user);
        delete user.dataValues.password;
        return { user: user, token: token };
    }
}

module.exports = UserService;