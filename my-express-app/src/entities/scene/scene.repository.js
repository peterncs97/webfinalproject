const db = require("../../database/db");
const Op = db.Sequelize.Op;
const Scene = db.scene;

class SceneRepository{
    async findAllScene(){
        return await Scene.findAll();
    }

    async findSceneById(id){
        return await Scene.findByPk(id);
    }

    async findSceneAndChildScenesById(parentId){
        return await Scene.findAll({
            where: {
                [Op.or]: [
                    { id: parentId },
                    { parentId: parentId }
                ]
            }
        });
    }

    async findRandomOneSceneByParentId(parentId){
        return await Scene.findOne({
            where: {
                parentId: parentId
            },
            order: db.Sequelize.literal('rand()'),
            limit : 1
        });
    }
    
    async createScene(parentId, type, name, description, imageDescription, imagePath){
        const scene = {
            parentId: parentId,
            type: type,
            name: name,
            description: description,
            imageDescription: imageDescription,
            imagePath: imagePath
        };
        
        return await Scene.create(scene);
    }
}

module.exports = SceneRepository;