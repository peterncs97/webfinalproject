const BaseController = require('../../base/BaseController');
const MerchantService = require('./merchant.service');

class MerchantController extends BaseController{    
    #merchantService = new MerchantService();
    
    async getMerchantById(req, res){
        const dtos = await this.#merchantService.getMerchantById(req.params.id);
        this.responseHandler(res, dtos);
    }

    async getMerchantBySceneId(req, res){
        const dtos = await this.#merchantService.getMerchantBySceneId(req.params.sceneId);
        this.responseHandler(res, dtos);
    }
}

module.exports = MerchantController;