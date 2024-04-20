const BaseController = require('../../../base/BaseController');
const CharacterService = require('./character.service');

class CharacterController extends BaseController{    
    #characterService = new CharacterService();
    
    async getCharacterById(req, res){
        const dtos = await this.#characterService.getCharacterById(req);
        this.responseHandler(res, dtos);
    }

    async createCharacter(req, res){
        const dtos = await this.#characterService.createCharacter(req);
        this.responseHandler(res, dtos);
    }
}

module.exports = CharacterController;