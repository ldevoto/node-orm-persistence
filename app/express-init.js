const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3001

app.use(bodyParser.json())
require('./routes/user-routes/user-routes')(app)

const expressUpAndRunnning = new Promise((resolve, reject) => {
    app.listen(port, function() {
        console.log(`App up and running on port ${port}`)
        resolve()
    })
})

module.exports = {expressUpAndRunnning}