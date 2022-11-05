const express = require('express')
const router = express.Router()
const {
	createClient,
	getClientById,
	removeClient,
	putClient,
	getAllClients,
} = require('../controllers/clientController')

router.post('/clients', createClient)
router.put('/clients/:id', putClient)
router.delete('/clients/:id', removeClient)
router.get('/clients/:id', getClientById)
router.get('/clients', getAllClients)

module.exports = router
