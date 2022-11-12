const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares/isLogin')
const { authAdmin } = require('../middlewares/authAdmin')

const {
	createDepletedProduct,
	getAllDepletedProducts,
	getDepletedProductsBySku,
	getDepletedProductsByid,
	deleteDepletedProduct,
} = require('../controllers/depletedProductsController')

router.post('/depletedProduct', createDepletedProduct)
router.get('/depletedProducts', getAllDepletedProducts)
router.get('/depletedProducts/:sku', getDepletedProductsBySku)
router.get('/depletedProductsById/:id', getDepletedProductsByid)
router.delete('/depletedProduct/:id', deleteDepletedProduct)

module.exports = router
