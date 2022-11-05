const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares/isLogin')
const { authAdmin } = require('../middlewares/authAdmin')

const {
	createClient,
	getClientById,
	removeClient,
	putClient,
	getAllClients,
} = require('../controllers/clientsController')

// authEmployed
router.put('/clients/:id', isLogin, putClient)
router.get('/clients/:id', isLogin, getClientById)
router.get('/clients', isLogin, getAllClients)

// authAdmin
router.delete('/clients/:id', isLogin, authAdmin, removeClient)
router.post('/clients', isLogin, authAdmin, createClient)


module.exports = router
