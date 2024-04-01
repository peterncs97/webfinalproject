const { validationResult } = require('express-validator');
const HttpStatus = require('../enums/HttpStatus');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(HttpStatus.BAD_REQUEST)
            .json({ status: HttpStatus.BAD_REQUEST, message: 'Validation failed', data: errors.array() });
    }
};
