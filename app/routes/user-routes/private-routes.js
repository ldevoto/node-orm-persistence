const {PatientSessionRepository} = require('../../repositories/patient-session-repository')
const {requestErrorHandler} = require('../../errors/request-error-handler')

module.exports = (privateRoutes) => {
    privateRoutes.post('/verify', (req, res, next) => {
        return res.json(res.locals.verifiedData)
    })
    
    privateRoutes.post('/refresh', (req, res, next) => {
        PatientSessionRepository.refreshToken(res.locals.authorization, {id: res.locals.userId})
        .then(updatedToken => {
            return res.json(updatedToken)
        })
        .catch(err => {
            return requestErrorHandler(res, err)
        })
    })
    
    privateRoutes.post('/logout', (req, res, next) => {
        PatientSessionRepository.logout(res.locals.authorization, {id: res.locals.userId})
        .then(logoutData => {
            return res.json({logout: true})
        })
        .catch(err => {
            return requestErrorHandler(res, err)
        })
    })
}