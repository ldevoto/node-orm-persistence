const Sequelize = require('sequelize')

const sequelize = new Sequelize('pruebaRecetasElectronicas', 'root', 'AlgoQueNoMeVaADejar_11_22', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
})

const {Patient} = require('./models/patient-model')(sequelize)
const {PatientSession} = require('./models/patient-session-model')(sequelize)

const sequelizeUpAndRunning = sequelize.sync({force: true})
//const sequelizeUpAndRunning = sequelize.sync()

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.')
})
.catch(err => {
    console.error('Unable to connect to the database:', err)
})

module.exports = {sequelizeUpAndRunning, Patient, PatientSession}