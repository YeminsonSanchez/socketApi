const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares/isLogin')
const { authAdmin } = require('../middlewares/authAdmin')

const {
	createProduct,
	putProduct,
	removeProduct,
	getAllProducts,
	getProductbyId,
} = require('../controllers/productsController')

// authEmployed
router.put('/products/:id', isLogin, putProduct)
router.get('/products/:id', isLogin, getProductbyId)
router.get('/products', isLogin, getAllProducts)

// authAdmin
router.delete('/products/:id', isLogin, authAdmin, removeProduct)
router.post('/products', isLogin, authAdmin, createProduct)

module.exports = router
