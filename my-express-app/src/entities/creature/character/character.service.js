const CharacterRepository = require('./character.repository');

class CharacterService {
    #characterRepository = new CharacterRepository();

    async getCharacterById(req) {
        const dtos = await this.#characterRepository.findCharacterById(req.params.id);
        return dtos;
    }

    async createCharacter(req) {
        const dto = await this.#characterRepository.createCharacter(
            req.body.name,
            req.body.profession
        );
        return dto;
    }
}

module.exports = CharacterService;