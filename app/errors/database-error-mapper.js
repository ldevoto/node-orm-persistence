const errors = require('./errors')

module.exports = {
    mapDataBaseError: (err) => {
        let error
        switch(err.name){
            case 'SequelizeUniqueConstraintError': {
                error = {...errors.duplicatedValueError, fields: err.fields}
                break
            }
            case 'SequelizeValidationError': {
                const errorsMap = err.errors.reduce((errorsMap, errorObj) => {
                    errorsMap[errorObj.validatorKey] = errorsMap[errorObj.validatorKey] || {}
                    errorsMap[errorObj.validatorKey][errorObj.path] = errorObj.value
                    return errorsMap
                }, {})
                const errorsKeys = Object.keys(errorsMap)
                if (errorsKeys > 1){
                } else {
                    const errorKey = errorsKeys[0]
                    if (errorKey === 'notEmpty'){
                        error = {...errors.nullOrEmptyValueError, fields: errorsMap[errorKey]}
                    } else {
                        error = {...errors.invalidValueError, fields: errorsMap[errorKey]}
                    }
                }
                // error = err
                break
            }
            case 'SequelizeDatabaseError':{
                error = {...errors.unexpectedError}
                break
            }
            default: {
                error = err
            }
        }
        return error
    }
}