const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const errors = require('./errors/errors')

const secretDigest = 'ElectronicReceipe'
const secretJWT = secretDigest

const digest = (password) => {
    return new Promise((resolve, reject) => {
        if (!password){
            return reject({...errors.nullOrEmptyValueError, fields: {password}})
        }
        const hmac = crypto.createHmac('sha256', secretDigest)
        hmac.update(password)
        return resolve(hmac.digest('hex'))
    })
}

const getToken = (patient) => {
    return new Promise((resolve, reject) => {
        jwt.sign(patient, secretJWT, {algorithm: 'HS512', expiresIn: 30, audience: patient.id.toString(), subject: 'login'}, (err, token) => {
            if (err) {
                console.error(err)
                return reject(errors.unexpectedError)
            }
            return resolve(token)
        })
    })
}

const verifyToken = (token, patient) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretJWT, {algorithms: ['HS512'], audience: patient.id.toString(), subject: 'login'}, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError'){
                    return reject(errors.sessionExpiredError)
                }
                return reject(errors.invalidTokenError)
            }
            return resolve(decoded)
        })
    })
}

module.exports = {
    digest,
    getToken,
    verifyToken
}