const express = require('express')
const router = express.Router()
const { authEmployeed } = require('./../middlewares/authEmployeed')
const { authAdmin } = require('./../middlewares/authAdmin')

const {
	createClient,
	getClientById,
	removeClient,
	putClient,
	getAllClients,
} = require('../controllers/clientsController')

router.post('/clients', authEmployeed, authAdmin, createClient)
router.put('/clients/:id', authEmployeed, putClient)
router.delete('/clients/:id', authEmployeed, authAdmin, removeClient)
router.get('/clients/:id', authEmployeed, getClientById)
router.get('/clients', authEmployeed, getAllClients)

module.exports = router
