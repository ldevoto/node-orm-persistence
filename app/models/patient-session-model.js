const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class PatientSession extends Sequelize.Model {}
    PatientSession.init({
        userId: { type: Sequelize.INTEGER(11), allowNull: false, unique: true },
        token: { type: Sequelize.STRING(500).BINARY, allowNull: false, unique: true }
    }, {
        sequelize
    })
    return {PatientSession}
}