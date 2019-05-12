const {Patient, PatientSession} = require('../database-init')
const {digest, getToken, verifyToken} = require('../utils')
const {mapDataBaseError} = require('../errors/database-error-mapper')
const errors = require('../errors/errors')

const PatientSessionRepository = {
    login: (patient) => {
        return new Promise((resolve, reject) => {
            digest(patient.password)
            .then(digestedPassword => {
                Patient.findOne({ where: {userName: patient.userName, password: digestedPassword}})
                .then(patient => {
                    if (patient){
                        PatientSessionRepository.createOrUpdateSession(patient)
                        .then(session => {
                            return resolve(session)
                        })
                        .catch(err => {
                            return reject(errors.invalidUsernameOrPasswordError)
                        })
                    } else {
                        return reject(errors.invalidUsernameOrPasswordError)
                    }
                })
                .catch(err => {
                    return reject(mapDataBaseError(err))
                })
            })
            .catch(err => {
                return reject(err)
            })
        })
    },
    verifyToken: (token, patient) => {
        return new Promise((resolve, reject) => {
            PatientSession.findOne({where: {userId: patient.id, token}})
            .then(foundPatient => {
                if (foundPatient){
                    verifyToken(token, patient)
                    .then(payload => {
                        return resolve(payload)
                    })
                    .catch(err => {
                        return reject(err)
                    })
                } else {
                    return reject(errors.notLoggedIn)
                }
            })
            .catch(err => {
                return reject(mapDataBaseError(err))
            })
        })
    },
    refreshToken: (token, patient) => {
        return new Promise((resolve, reject) => {
            Patient.findOne({where: {id: patient.id}})
            .then(foundPatient => {
                PatientSessionRepository.createOrUpdateSession(foundPatient)
                .then(session => {
                    return resolve(session)
                })
                .catch(err => {
                    return reject(err)
                })
            })
            .catch(err => {
                return reject(mapDataBaseError(err))
            })
        })
    },
    logout: (token, patient) => {
        return new Promise((resolve, reject) => {
            PatientSession.destroy({where: {userId: patient.id}})
            .then(deletionCount => {
                return resolve({})
            })
            .catch(err => {
                return reject(mapError(err))
            })
        })
    },
    createOrUpdateSession: (patient) => {
        return new Promise((resolve, reject) => {
            PatientSession.findOne({where: {userId: patient.id}})
            .then(patientSession => {
                getToken(patient.toJSON())
                .then(token => {
                    if (patientSession){
                        patientSession.update({token})
                        .then(session => {
                            return resolve(session)
                        })
                        .catch(err => {
                            return reject(mapDataBaseError(err))
                        })
                    } else {
                        PatientSession.create({userId: patient.id, token})
                        .then(session => {
                            return resolve(session)
                        })
                        .catch(err => {
                            return reject(mapDataBaseError(err))
                        })
                    }
                })
                .catch(err => {
                    return reject(err)
                })
            })
            .catch(err => {
                return reject(mapDataBaseError(err))
            })
        })
    }
}

module.exports = {PatientSessionRepository}