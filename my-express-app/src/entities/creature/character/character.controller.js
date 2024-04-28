const BaseController = require('../../../base/BaseController');
const CharacterService = require('./character.service');

class CharacterController extends BaseController{    
    #characterService = new CharacterService();
    
    async getCharacterById(req, res){
        const dtos = await this.#characterService.getCharacterById(req.params.id);
        this.responseHandler(res, dtos);
    }

    async createCharacter(req, res){
        const dtos = await this.#characterService.createCharacter(req.body.name, req.body.profession);
        this.responseHandler(res, dtos);
    }

    async grantCharacterItems(req, res){
        const dtos = await this.#characterService.grantCharacterItems(
            req.body.characterId,
            req.body.items);
        this.responseHandler(res, dtos);
    }

    async removeCharacterItems(req, res){
        const dtos = await this.#characterService.removeCharacterItems(
            req.body.characterId,
            req.body.items);
        this.responseHandler(res, dtos);
    }

    async tradeCharacterItems(req, res){
        const dtos = await this.#characterService.tradeCharacterItems(
            req.body.characterId,
            req.body.items,
            req.body.money);
        this.responseHandler(res, dtos);
    }
}

module.exports = CharacterController;