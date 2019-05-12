const express = require('express')
const userRoutes = express.Router()
const {requestErrorHandler} = require('../../errors/request-error-handler')
const errors = require('../../errors/errors')
const {PatientSessionRepository} = require('../../repositories/patient-session-repository')

const autenticatedUrls = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.match('Bearer ') || !req.params.userId){
        return requestErrorHandler(res, errors.notLoggedIn, 401)
    }
    res.locals.authorization = req.headers.authorization.split(' ')[1]
    res.locals.userId = req.params.userId
    PatientSessionRepository.verifyToken(res.locals.authorization, {id: req.params.userId})
    .then(verifiedData => {
        res.locals.verifiedData = verifiedData
        return next()
    })
    .catch(err => {
        return requestErrorHandler(res, err)
    })
}

const privateRoutes = express.Router()
const publicRoutes = express.Router()

userRoutes.use('/patients', publicRoutes)
userRoutes.use('/patients/:userId', autenticatedUrls)
userRoutes.use('/patients/:userId', privateRoutes)

require('./public-routes')(publicRoutes)
require('./private-routes')(privateRoutes)

module.exports = app => {
    app.use(userRoutes)
}