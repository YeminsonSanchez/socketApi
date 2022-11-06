const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares/isLogin')
const { authAdmin } = require('../middlewares/authAdmin')

const {
	createPurchaseOrder,
	getPurchaseOrders,
	getPurchaseOrderById,
	updatePurchaseOrder,
} = require('../controllers/purchaseOrdersController')

router.post('/purchaseOrders', createPurchaseOrder)
router.get('/purchaseOrders',  getPurchaseOrders)
router.get('/purchaseOrder/:id', getPurchaseOrderById)
router.put('/purchaseOrder/:id', updatePurchaseOrder)

module.exports = router
