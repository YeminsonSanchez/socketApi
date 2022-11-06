const express = require('express')
const router = express.Router()
const { isLogin } = require('../middlewares/isLogin')
const { authAdmin } = require('../middlewares/authAdmin')

const {
  createPurchaseOrder,
} = require('../controllers/purchaseOrdersController')

router.post('/purchaseOrders', isLogin, authAdmin, createPurchaseOrder)

module.exports = router