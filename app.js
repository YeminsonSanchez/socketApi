const app = require('./server')


app.use('/', require('./src/routes/clientRoutes'))

module.exports = app
