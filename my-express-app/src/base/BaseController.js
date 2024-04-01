const HttpStatus = require('../enums/HttpStatus');

class BaseController {
    formatResponse(status, message, data) {
        return {status: status || HttpStatus.INTERNAL_ERROR, message: message || '', data: data || ''};
    }

    responseHandler(res, dtos) {
        const response = this.formatResponse(HttpStatus.OK, 'Success', dtos);
        res.status(response.status).json(response);
    }
}

module.exports = BaseController;
