const express = require('express')
const router = express.Router()
const {
	createProduct,
	putProduct,
	removeProduct,
	getAllProducts,
	getProductbyId,
} = require('../controllers/productController')

router.post('/products', createProduct)
router.put('/products/:id', putProduct)
router.delete('/products/:id', removeProduct)
router.get('/products/:id', getProductbyId)
router.get('/products', getAllProducts)

module.exports = router
