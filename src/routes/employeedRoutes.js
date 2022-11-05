const express = require('express')
const router = express.Router()
const { authEmployeed } = require('./../middlewares/authEmployeed')
const { authAdmin } = require('./../middlewares/authAdmin')

const {
	create,
	getAllEmployees,
	getEmployeById,
	update,
	removeEmployeed,
} = require('../controllers/employeesController')

router.post('/employeed', authEmployeed, authAdmin, create)
router.get('/employeed', authEmployeed, authAdmin, getAllEmployees)
router.get('/employeed/:id', authEmployeed, authAdmin, getEmployeById)
router.put('/employeed/:id', authEmployeed, authAdmin, update)
router.delete('/employeed/:id', authEmployeed, authAdmin, removeEmployeed)

module.exports = router
