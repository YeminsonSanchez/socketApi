const { showError } = require('../helpers/showError')

const { createOrder } = require('../models/purchaseOrderModel')

const createPurchaseOrder = async (req, res) => {
	const {
		client_id,
		oc,
		employed_id,
		status,
		quantity,
		product_id,

	} = req.body

	const payload = {
		client_id,
		oc,
		employed_id,
		status,
		quantity,
		product_id,
	}

	try {
		const result = await createOrder(payload)
		return res.status(201).json(result)
	} catch (e) {
		showError(res, e)
	}
}

module.exports = { createPurchaseOrder }
