const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares/isLogin')
const { authAdmin } = require('../middlewares/authAdmin')

const {
	create,
	getAllEmployees,
	getEmployeById,
	update,
	removeEmployeed,
} = require('../controllers/employeesController')

// authEmployed
router.get('/employeed', isLogin, authAdmin, getAllEmployees)
router.get('/employeed/:id', isLogin, getEmployeById)
router.put('/employeed/:id', isLogin, update)

// authAdmin

router.delete('/employeed/:id', isLogin, authAdmin, removeEmployeed)
router.post('/employeed', isLogin, authAdmin, create)

module.exports = router
