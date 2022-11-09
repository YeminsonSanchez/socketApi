const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares/isLogin')
const { authAdmin } = require('../middlewares/authAdmin')

const {
	createPurchaseOrder,
	getAllPurchaseOrders,
	getPurchaseOrderById,
	updatePurchaseOrder,
	deletePurchaseOrder,
	purchaseOrderByOc,
	getAllPurchaseOrdersByProductsId,
	getAllPurchaseOrdersByEmployeeId,
	getAllPurchaseOrdersByClientId,
	getProductsByOc,
} = require('../controllers/purchaseOrdersController')

router.post('/purchaseOrders', isLogin, authAdmin, createPurchaseOrder)
router.get('/purchaseOrders', getAllPurchaseOrders)
router.get('/purchaseOrder/:id', getPurchaseOrderById)
router.get('/purchaseOrderByOc/:oc', purchaseOrderByOc)
router.get('/purchaseOrdersByProductsId/:product_id', getAllPurchaseOrdersByProductsId)
router.get('/purchaseOrdersByEmployeeId/:employee_id', getAllPurchaseOrdersByEmployeeId)
router.get('/purchaseOrdersByClientId/:client_id', getAllPurchaseOrdersByClientId)

router.get('/productsByOc/:oc', getProductsByOc)

router.put('/purchaseOrder/:id', isLogin, authAdmin, updatePurchaseOrder)
router.delete('/purchaseOrder/:id', isLogin, authAdmin, deletePurchaseOrder)


module.exports = router
