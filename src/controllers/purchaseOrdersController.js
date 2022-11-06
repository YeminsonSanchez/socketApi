const { showError } = require('../helpers/showError')

const {
	createOrder,
	getAllPurchaseOrders,
	getPurchaseOrder,
	updateOrder,
} = require('../models/purchaseOrderModel')

const createPurchaseOrder = async (req, res) => {
	const { client_id, oc, employed_id, status, quantity, product_id } = req.body
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

const getPurchaseOrders = async (req, res) => {
	try {
		const result = await getAllPurchaseOrders()
		return res.status(200).json(result)
	} catch (e) {
		showError(res, e)
	}
}

const getPurchaseOrderById = async (req, res) => {
	const { id } = req.params
	try {
		const result = await getPurchaseOrder(id)
		return res.status(200).json(result)
	} catch (e) {
		showError(res, e)
	}
}

const updatePurchaseOrder = async (req, res) => {
	const { id } = req.params
	const { client_id, oc, employed_id, status, quantity, product_id } = req.body
	const payload = {
		client_id,
		oc,
		employed_id,
		status,
		quantity,
		product_id,
	}
	try {
		const result = await updateOrder(id, payload)
		return res.status(200).json(result)
	} catch (error) {
		showError(res, error)
	}
}

module.exports = {
	createPurchaseOrder,
	getPurchaseOrders,
	getPurchaseOrderById,
	updatePurchaseOrder,
}
