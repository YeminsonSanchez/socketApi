const express = require('express')
const cors = require('cors')
require('dotenv').config()
const seed = require('./src/seeds/seeds')

const app = express()

const PORT = process.env.PORT || 3000

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

// seed()
app.listen(PORT, () => {
	console.log('Server started on port ' + PORT)
})

module.exports = app
