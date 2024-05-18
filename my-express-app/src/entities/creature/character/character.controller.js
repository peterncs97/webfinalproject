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

    async changeCharacterScene(req, res){
        const dtos = await this.#characterService.changeCharacterScene(req.body.characterId, req.body.sceneId);
        this.responseHandler(res, dtos);
    }

    async restCharacter(req, res){
        const dtos = await this.#characterService.restCharacter(req.body.characterId);
        this.responseHandler(res, dtos);
    }
    
    async tradeCharacterItem(req, res){
        const dtos = await this.#characterService.tradeCharacterItem(
            req.body.characterId,
            req.body.item,
            req.body.tradeAction);
        this.responseHandler(res, dtos);
    }

    async equipCharacterItem(req, res){
        const dtos = await this.#characterService.equipCharacterItem(
            req.body.characterId,
            req.body.itemId
        );
        this.responseHandler(res, dtos);
    }

    async unequipCharacterItem(req, res){
        const dtos = await this.#characterService.unequipCharacterItem(
            req.body.characterId,
            req.body.itemId
        );
        this.responseHandler(res, dtos);
    }

    async useCharacterItem(req, res){
        const dtos = await this.#characterService.useCharacterItem(
            req.body.characterId,
            req.body.itemId
        );
        this.responseHandler(res, dtos);
    }
}

module.exports = CharacterController;