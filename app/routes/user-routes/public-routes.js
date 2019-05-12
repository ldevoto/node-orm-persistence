const {PatientRepository} = require('../../repositories/patient-repository')
const {PatientSessionRepository} = require('../../repositories/patient-session-repository')
const {requestErrorHandler} = require('../../errors/request-error-handler')

module.exports = (publicRoutes) => {
    publicRoutes.post('/', (req, res, next) => {
        PatientRepository.create(req.body)
        .then(patient => {
            return res.json(patient)
        })
        .catch(err => {
            console.error(err)
            return requestErrorHandler(res, err)
        })
    })
    
    publicRoutes.get('/', (req, res, next) => {
        PatientRepository.getAll()
        .then(patients => {
            res.json(patients)
        })
        .catch(err => {
            return requestErrorHandler(res, err)
        })
    })
    
    publicRoutes.post('/login', (req, res, next) => {
        PatientSessionRepository.login(req.body)
        .then(loginData => {
            return res.json(loginData)
        })
        .catch(err => {
            console.error(err)
            return requestErrorHandler(res, err)
        })
    })

}