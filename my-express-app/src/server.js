const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const db = require("./database/db");
const fs = require('fs');

const commentRouter = require('./entities/comment/comment.router');
const sceneRouter = require('./entities/scene/scene.router');

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
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");

        // Initialize the database
        // var sql_string = fs.readFileSync('./src/database/scene.sql', 'utf8');
        // sql_string = sql_string.replace(/\r?\n|\r/g, " ");
        // db.sequelize.query(sql_string);
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// Routes
app.use('/comment', commentRouter);
app.use('/scene', sceneRouter);

// Guard routes
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ status: err.status || 500, message: err.message || err, data: null });
});

module.exports = app;
