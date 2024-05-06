const Exception = (status, message) => {
    let err = new Error(message);
    err.status = status;
    return err;
}

module.exports = Exception;