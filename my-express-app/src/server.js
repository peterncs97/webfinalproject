const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const db = require("./database/db");
const fs = require('fs');

// require Routers
const sceneRouter = require('./entities/scene/scene.router');
const characterRouter = require('./entities/creature/character/character.router');
const monsterRouter = require('./entities/creature/monster/monster.router');
const itemRouter = require('./entities/item/item.router');
const merchantRouter = require('./entities/merchant/merchant.router');
const userRouter = require('./entities/user/user.router');
const battleRouter = require('./entities/battle/battle.router');
// Bear Token validation
const { validateToken } = require('./auth/auth');

const app = express();

// General middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(helmet());

// DB Connection
const fileToQueries = (path) => {
    var sql_string = fs.readFileSync(path, 'utf8');
    sql_string = sql_string.replace(/\r?\n|\r/g, " ");
    const queries = sql_string.split(';');
    return queries.filter(query => query);
}

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("Synced db.");
        // Initialize the database
        // fileToQueries('./src/database/init.sql')
        // .forEach(async query => 
        //     await db.sequelize.query(query)
        // );
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// Use Router
app.use('/user', userRouter);
app.use('/scene', validateToken, sceneRouter);
app.use('/character', validateToken, characterRouter);
app.use('/monster', validateToken, monsterRouter);
app.use('/item', validateToken, itemRouter);
app.use('/merchant', validateToken, merchantRouter);
app.use('/battle', validateToken, battleRouter);

// Guard routes
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ status: err.status || 500, message: err.message || err, data: null });
});

module.exports = app;
