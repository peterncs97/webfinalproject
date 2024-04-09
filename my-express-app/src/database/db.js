const fs = require('fs');
const dbConfig = require("./db.config.js");
const Sequelize = require('sequelize');

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

db.comment = require("../entities/comment/comment.model.js")(sequelize, Sequelize);
db.scene = require("../entities/scene/scene.model.js")(sequelize, Sequelize);

// Initialize the database
// var sql_string = fs.readFileSync('./src/database/scene.sql', 'utf8');
// sql_string = sql_string.replace(/\r?\n|\r/g, " ");
// sequelize.query(sql_string);

module.exports = db;