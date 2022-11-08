const { showError } = require('../helpers/showError')

const {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
	getOrdersbyOc,
	getAllOrdersByProductsId,
	getAllOrdersByEmployedId,
	getAllOrdersByClientId,
} = require('../models/purchaseOrderModel')

const createPurchaseOrder = async (req, res) => {
	const { client_id, oc, employed_id, product_id, quantity, status } = req.body

	const payload = {
		client_id,
		oc,
		employed_id,
		product_id,
		quantity,
		status,
	}
	try {
		//falta validar que existan los id de los productos, empleados y clientes antes de crear para manejar el error
		const purchaseOrder = await createOrder(payload)
		return res.status(201).json(purchaseOrder)
	} catch (e) {
		showError(res, e)
	}
}

const getAllPurchaseOrders = async (req, res) => {
	try {
		const purchaseOrders = await getAllOrders()
		return res.status(200).json(purchaseOrders)
	} catch (e) {
		showError(res, e)
	}
}

const getPurchaseOrderById = async (req, res) => {
	const { id } = req.params
	try {
		const purchaseOrder = await getOrderById(id)
		if (!purchaseOrder) {
			return res.status(404).json({
				message: `No se puede encontrar la orden con el id ${id} este id no existe en nuestros registros`,
			})
		}
		return res.status(200).json(purchaseOrder)
	} catch (e) {
		showError(res, e)
	}
}

const updatePurchaseOrder = async (req, res) => {
	const { id } = req.params
	const { client_id, oc, employed_id, product_id, quantity, status } = req.body
	const payload = {
		client_id,
		oc,
		employed_id,
		product_id,
		quantity,
		status,
	}
	try {
		const purchaseOrder = await updateOrder(id, payload)
		if (!purchaseOrder) {
			return res.status(404).json({
				message: `No se puede editar la orden con el id ${id} este id no existe en nuestros registros`,
			})
		}
		return res.status(200).json(purchaseOrder)
	} catch (e) {
		showError(res, e)
	}
}

const deletePurchaseOrder = async (req, res) => {
	const { id } = req.params
	try {
		const purchaseOrder = await deleteOrder(id)
		if (!purchaseOrder) {
			return res.status(404).json({
				message: `No se puede eliminar la orden con el id ${id} este id no existe en nuestros registros`,
			})
		}
		return res.status(200).json({ message: 'Purchase Order eliminada' })
	} catch (e) {
		showError(res, e)
	}
}

const purchaseOrderByOc = async (req, res) => {
	const { oc } = req.params
	try {
		const purchaseOrders = await getOrdersbyOc(oc)
		if (!purchaseOrders) {
			return res.status(404).json({
				message: `No se puede encontrar la orden con el oc ${oc} este oc no existe en nuestros registros`,
			})
		}
		return res.status(200).json(purchaseOrders)
	} catch (e) {
		showError(res, e)
	}
}

const getAllPurchaseOrdersByProductsId = async (req, res) => {
	const { product_id } = req.params
	try {
		const purchaseOrders = await getAllOrdersByProductsId(product_id)
		if (!purchaseOrders) {
			return res.status(404).json({
				message: `No se puede encontrar la orden con el product_id ${product_id} este product_id no existe en nuestros registros`,
			})
		}
		return res.status(200).json(purchaseOrders)
	} catch (e) {
		showError(res, e)
	}
}

const getAllPurchaseOrdersByEmployeeId = async (req, res) => {
	const { employee_id } = req.params
	try {
		const purchaseOrders = await getAllOrdersByEmployedId(employee_id)
		if (!purchaseOrders) {
			return res.status(404).json({
				message: `No se puede encontrar la orden con el employed_id ${employee_id} este employed_id no existe en nuestros registros`,
			})
		}
		return res.status(200).json(purchaseOrders)
	} catch (e) {
		showError(res, e)
	}
}

const getAllPurchaseOrdersByClientId = async (req, res) => {
	const { client_id } = req.params
	try {
		const purchaseOrders = await getAllOrdersByClientId(client_id)
		if (!purchaseOrders) {
			return res.status(404).json({
				message: `No se puede encontrar la orden con el client_id ${client_id} este client_id no existe en nuestros registros`,
			})
		}
		return res.status(200).json(purchaseOrders)
	} catch (e) {
		showError(res, e)
	}
}

const getProductsByOc = async (req, res) => {
	const { oc } = req.params
	try {
		const purchaseOrders = await getOrdersbyOc(oc)
		if (!purchaseOrders) {
			return res.status(404).json({
				message: `No se pueden encontrar los productos con el oc ${oc} este oc no existe en nuestros registros`,
			})
		}
		const groupForOc = purchaseOrders.reduce((r, a) => {
			r[a.product_id] = [...(r[a.product_id] || []), a]
			return r
		}, {})

		const products = Object.keys(groupForOc).map((key) => {
			const product = groupForOc[key]
			const quantity = product.reduce((acc, cur) => acc + cur.quantity, 0)
			return {
				oc: product[0].oc,
				product_id: product[0].product_id,
				quantity,
				client_id: product[0].client_id,
				employed_id: product[0].employed_id,
				status: product[0].status,
			}
		})

		return res.status(200).json(products)
	} catch (e) {
		showError(res, e)
	}
}

module.exports = {
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
}
