const {Patient} = require('../database-init')
const {digest} = require('../utils')
const {mapDataBaseError} = require('../errors/database-error-mapper')

const PatientRepository = {
    create: (patient) => {
        return new Promise((resolve, reject) => {
            Patient.build(patient).validate()
            .then(validation => {
                digest(patient.password)
                .then(digestedPassword => {
                    Patient.create(Object.assign({}, patient, {password: digestedPassword}))
                    .then(patient => {
                        const createdPatient = patient.toJSON()
                        delete createdPatient.password
                        return resolve(createdPatient)
                    })
                    .catch(err => {
                        return reject(mapDataBaseError(err))
                    })
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
    update: () => {

    },
    delete: () => {

    },
    getAll: () => {
        return Patient.findAll()
    },
    getByExample: () => {

    }
}

module.exports = {PatientRepository}