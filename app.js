const app = require('./server')

// routes for client
app.use('/', require('./src/routes/clientRoutes'))

//routes for employee management
app.use('/', require('./src/routes/employeedRoutes'))

//routes for product management
app.use('/', require('./src/routes/productRoutes'))

//routes for login
app.use('/', require('./src/routes/loginRoutes'))

//routes for purchase order
app.use('/', require('./src/routes/purchaseOrderRoutes'))

module.exports = app