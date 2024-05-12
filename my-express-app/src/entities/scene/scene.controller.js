const BaseController = require('../../base/BaseController');
const SceneService = require('./scene.service');

class SceneController extends BaseController{    
    #sceneService = new SceneService();
    
    async listScene(req, res){
        const dtos = await this.#sceneService.listScene();
        this.responseHandler(res, dtos);
    }

    async getSceneById(req, res){
        const dtos = await this.#sceneService.getSceneAndChildScenesById(req.params.id);
        this.responseHandler(res, dtos);
    }

    async getRandomChildMonsterSceneById(req, res){
        const dtos = await this.#sceneService.getRandomMonsterSceneByParentId(req);
        this.responseHandler(res, dtos);
    }

    async createScene(req, res){
        const dtos = await this.#sceneService.createScene(req);
        this.responseHandler(res, dtos);
    }

}

module.exports = SceneController;