const SceneRepository = require('./scene.repository');

class SceneService {
    #sceneRepository = new SceneRepository();

    async listScene() {
        const dtos = await this.#sceneRepository.findAllScene();
        return dtos;
    }

    async getSceneAndChildScenesById(req) {
        const scenes = await this.#sceneRepository.findSceneAndChildScenesById(req.params.id);

        var dto = scenes.find(scene => scene.id === parseInt(req.params.id));
        const options = scenes.filter(scene => scene.id !== parseInt(req.params.id)).map(option => {
            return {
                id: option.id,
                type: option.type,
                name: option.name,
            };
        });
        dto = { ...dto.toJSON(), ...{ options: options }}

        return dto;
    }

    async getRandomMonsterSceneByParentId(req) {
        const dto = await this.#sceneRepository.findRandomMonsterSceneByParentId(req.params.id);
        return dto;
    }

    async createScene(req) {
        const dto = await this.#sceneRepository.createScene(
            req.body.parentId,
            req.body.type,
            req.body.name,
            req.body.description,
            req.body.imageDescription,
            req.body.imagePath
        );
        return dto;
    }

}

module.exports = SceneService;