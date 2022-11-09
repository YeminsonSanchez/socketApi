const express = require('express')
const cors = require('cors')
require('dotenv').config()
const fs = require('fs')
const {
	seedsEmployed,
	seedsClient,
	seedsProducts,
} = require('./src/seeds/seeds')

const app = express()

const PORT = process.env.PORT || 3000
const CsbInspector = require('csb-inspector/express-socket');

const options = {
	app: app,
	route: "debugger_logs",
	disabledBrowser: false,
	// outputs: [
	// 	(path, key, args, date)=> {
	// 		// path:  "reference to file",
	// 		// key: "type of console, 'log', 'error'",
	// 		// args: 'arguments',
	// 		// date: 'Object Date, when execute console'
	// 			fs.appendFileSync("file.txt", path);
	// 	}
	// ]
}
// http://localhost:3000/debugger_logs ruta para ver log en el navegador
CsbInspector(options);

//todo hay que cambiar luego la configuracion de cors en whitelist

// cost whitelist = ['http://example1.com', 'http://example2.com']
// cost corsOptions = {
// 	origin: function (origin, callback) {
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true)
// 		} else {
// 			callback(new Error('Not allowed by CORS'))
// 		}
// 	},
// }

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Seeds on DB
// seedsEmployed()
// seedsClient()
// seedsProducts()

app.listen(PORT, () => {
	console.log('Server started on port ' + PORT)
})

module.exports = app
