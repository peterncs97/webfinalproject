const dbConfig = require("./db.config.js");
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        dateStrings: true,
        typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME') {
                return field.string()
            }
            return next()
        },
    },
    timezone: "+08:00",
    logging: dbConfig.logging,
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

db.scene = require("../entities/scene/scene.model.js")(sequelize, Sequelize);

// creature
db.character = require("../entities/creature/character/character.model.js")(sequelize, Sequelize);
db.monster = require("../entities/creature/monster/monster.model.js")(sequelize, Sequelize);
db.combatAttribute = require("../entities/creature/combatAttribute/combatAttribute.model.js")(sequelize, Sequelize);
require("../entities/creature/combatAttribute/combatAttribute.association.js")(db.character, db.monster, db.combatAttribute);

db.merchant = require("../entities/merchant/merchant.model.js")(sequelize, Sequelize);
require("../entities/merchant/merchant.association.js")(db.scene, db.merchant);

db.item = require("../entities/item/item.model.js")(sequelize, Sequelize);
db.itemOwnership = require("../entities/item/item.association.js")(db);

module.exports = db;