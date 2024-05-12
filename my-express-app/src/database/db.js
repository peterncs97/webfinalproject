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

db.scene = require("./scene.model.js")(sequelize, Sequelize);

// creature
db.character = require("./character.model.js")(sequelize, Sequelize);
db.monster = require("./monster.model.js")(sequelize, Sequelize);
db.combatAttribute = require("./combatAttribute.model.js")(sequelize, Sequelize);
require("./combatAttribute.association.js")(db.character, db.monster, db.combatAttribute);

db.merchant = require("./merchant.model.js")(sequelize, Sequelize);
require("./merchant.association.js")(db.scene, db.merchant);
db.item = require("./item.model.js")(sequelize, Sequelize);
db.itemOwnership = require("./item.association.js")(db);
db.equipmentAttribute = require("./equipmentAttribute.model.js")(db);

db.user = require("./user.model.js")(sequelize, Sequelize, db.character);

// battle
db.battle = require("./battle.model.js")(sequelize, Sequelize);
db.skillBook= require("./skillBook.model.js")(sequelize, Sequelize);

module.exports = db;