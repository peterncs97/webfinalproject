const BaseController = require('../../base/BaseController');
const ItemService = require('./item.service');

class ItemController extends BaseController{    
    #itemService = new ItemService();
    
    async getItemById(req, res){
        const dtos = await this.#itemService.getItemById(req.params.id);
        this.responseHandler(res, dtos);
    }

    async createItem(req, res){
        const dtos = await this.#itemService.createItem(
            req.body.name,
            req.body.type,
            req.body.price,
            req.body.description
        );
        this.responseHandler(res, dtos);
    }
}

module.exports = ItemController;