const pool = require('../helpers/connectDb').getInstance()
const {
	createProductOrder,
	updateProductOrder,
} = require('../models/productOrderModel')

const createOrder = async (payload) => {
	console.log('payload: ', payload)
	const SQLquery = {
		text: 'INSERT INTO purchase_order (client_id, oc, employed_id) VALUES ($1, $2, $3) RETURNING id AS purchase_order_id',
		values: [payload.client_id, payload.oc, payload.employed_id],
	}
	try {
		const purchase = await pool.query(SQLquery)
		const purchaseId = purchase.rows[0].purchase_order_id
		const order = createProductOrder(purchaseId, payload)
		return order
	} catch (e) {
		console.log(
			'error al insertar datos en tabla purchase_order: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const getAllPurchaseOrders = async () => {
	const SQLquery = { text: 'SELECT * FROM purchase_order' }
	try {
		const orders = await pool.query(SQLquery)
		return orders.rows
	} catch (e) {
		console.log(
			'error al obtener datos de tabla purchase_order: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const getPurchaseOrder = async (id) => {
	const SQLquery = {
		text: 'SELECT * FROM purchase_order JOIN product_order ON purchase_order.id = product_order.purchase_order_id WHERE purchase_order.id = $1',
		values: [id],
	}
	try {
		const order = await pool.query(SQLquery)
		return order.rows[0]
	} catch (e) {
		console.log(
			'error al obtener datos de tabla purchase_order: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const updateOrder = async (id, payload) => {
	const SQLquery = {
		text: 'UPDATE purchase_order SET client_id = $1, oc = $2, employed_id = $3 WHERE id = $4 RETURNING *',
		values: [payload.client_id, payload.oc, payload.employed_id, id],
	}
	try {
		const setPurchase = await pool.query(SQLquery)
		const updateOrder = await updateProductOrder(id, payload)
		console.log('updateOrder: ', updateOrder)
		return {
			order: { purchaseOrder: setPurchase.rows, productOrder: updateOrder },
		}
	} catch (e) {
		console.log(
			'error al actualizar datos en tabla purchase_order: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

module.exports = {
	createOrder,
	getAllPurchaseOrders,
	getPurchaseOrder,
	updateOrder,
}
