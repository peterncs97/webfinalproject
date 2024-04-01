const express = require('express');

class BaseRouter {
    router = express.Router();

    constructor() {
        this.initial();
    }

    initial() {
        this.registerRoute();
    }

    // abstract method for children to implement
    registerRoute() {
    }
}

module.exports = BaseRouter;