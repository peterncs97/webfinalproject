const dbConfig = require("./db.config.js");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.comment = require("../entities/comment/comment.model.js")(sequelize, Sequelize);
db.scene = require("../entities/scene/scene.model.js")(sequelize, Sequelize);

// creature
db.character = require("../entities/creature/character/character.model.js")(sequelize, Sequelize);
db.monster = require("../entities/creature/monster/monster.model.js")(sequelize, Sequelize);
db.attribute = require("../entities/creature/attribute/attribute.model.js")(sequelize, Sequelize);
require("../entities/creature/attribute/attribute.association.js")(db.character, db.monster, db.attribute);

module.exports = db;