const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
// const server = require('http').createServer(app);
require('dotenv').config()

const portSockets = process.env.PORT_SOCKETS || 5000
const io = require('socket.io')(portSockets);

const {
	seedsEmployed,
	seedsClient,
	seedsProducts,
} = require('./src/seeds/seeds')

const PORT = process.env.PORT || 3000

const CsbInspector = require('csb-inspector/express-socket');

const options = {
	app: app,
	route: "debugger_logs",
	disabledBrowser: false,
	socket: io,
	port: portSockets,
}
// http://localhost:3000/debugger_logs ruta para ver log en el navegador
CsbInspector(options);

app.use(cors(), morgan('combined'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT, () => {
	console.log('Server started on port ' + PORT)
})
module.exports = app
