const { body } = require('express-validator');
const validationHandler = require('../../base/BaseValidator');

const postValidator = [
    body('content')
        .notEmpty().withMessage('Content is required')
        .isLength({ max: 50 }).withMessage('Content must be less than 50 characters')
        .escape(),
    validationHandler
]

module.exports.postValidator = postValidator;

