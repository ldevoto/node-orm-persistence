require('./database-init').sequelizeUpAndRunning
.then(_ => {
    require('./express-init').expressUpAndRunnning
    .then(_ => {
        console.log('Application ready!')
    })
})