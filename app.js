const app = require('./server')

// routes for client
app.use('/', require('./src/routes/clientRoutes'))

//routes for employee management
app.use('/', require('./src/routes/employeedRoutes'))

//routes for product management
app.use('/', require('./src/routes/productRoutes'))

module.exports = app
