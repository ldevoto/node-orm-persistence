const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Patient extends Sequelize.Model {}
    Patient.init({
        id: { type: Sequelize.INTEGER(11), primaryKey: true, allowNull: false, autoIncrement: true },
        userName: { type: Sequelize.STRING.BINARY, allowNull: false, unique: true, validate: { notEmpty: true }},
        password: { type: Sequelize.STRING.BINARY, allowNull: false, validate: { notEmpty: true } },
        name: { type: Sequelize.STRING, allowNull: false, validate: { notEmpty: true } },
        surname: { type: Sequelize.STRING, allowNull: false, validate: { notEmpty: true } },
        dateOfBirth: { type: Sequelize.DATEONLY, allowNull: false, validate: { notEmpty: true } },
        gender: { type: Sequelize.ENUM('M', 'F'), allowNull: false, validate: { notEmpty: true } },
        email: { type: Sequelize.STRING.BINARY, allowNull: false , validate: { isEmail: true, notEmpty: true }},
        documentType: { type: Sequelize.ENUM('DNI', 'LE', 'LC'), allowNull:false, defaultValue: 'DNI', validate: { notEmpty: true }},
        documentNumber: { type: Sequelize.STRING.BINARY, allowNull: false, validate: { notEmpty: true } }
    }, {
        defaultScope: {
            attributes: { 
                exclude: ['password'] 
            }
        },
        scopes: {
            withPassWord: {
                attributes: {
                    include: [
                        'password'
                    ]
                }
            }
        },
        sequelize
    })
    return {Patient}
}