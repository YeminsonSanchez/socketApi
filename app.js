const app = require('./server')


app.use('/', require('./src/routes/clientRoutes'))

//routes for employee management
app.use('/', require('./src/routes/employeedRoutes'))

module.exports = app
