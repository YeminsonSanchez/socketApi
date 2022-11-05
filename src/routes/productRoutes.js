const express = require('express')
const router = express.Router()
const { authEmployeed } = require('./../middlewares/authEmployeed')
const { authAdmin } = require('./../middlewares/authAdmin')

const {
	createProduct,
	putProduct,
	removeProduct,
	getAllProducts,
	getProductbyId,
} = require('../controllers/productsController')

router.post('/products', authEmployeed, authAdmin, createProduct)
router.put('/products/:id', authEmployeed, authAdmin, putProduct)
router.delete('/products/:id', authEmployeed, authAdmin, removeProduct)
router.get('/products/:id', authEmployeed, getProductbyId)
router.get('/products', authEmployeed, authAdmin, getAllProducts)

module.exports = router
