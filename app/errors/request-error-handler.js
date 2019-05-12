const requestErrorHandler = (res, err, errorCode) => {
    errorCode = errorCode || err.status || 400
    res.status(errorCode).json(err)
}

module.exports = {requestErrorHandler}