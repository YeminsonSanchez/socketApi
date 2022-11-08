const pool = require('../helpers/connectDb').getInstance()
const {
	createProductOrder,
	updateProductOrder,
} = require('../models/productOrderModel')

const createOrder = async (payload) => {
	const SQLquery = {
		text: `INSERT INTO purchase_order (client_id, oc, employed_id) VALUES ($1, $2, $3) RETURNING *`,
		values: [payload.client_id, payload.oc, payload.employed_id],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows[0]
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
	const SQLquery = {
		text: `SELECT * FROM purchase_order`,
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows
	} catch (e) {
		console.log(
			'error al obtener datos de tabla purchase_order: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const getPurchaseOrderByoC = async (oc) => {
	console.log(oc)
	const SQLquery = {
		text: `SELECT
    client.rut_business,
    client.name,
    client.email,
    client.phone,
    client.address,
    client.region,
    client.comune,
    client.zip,
    employed.first_name,
    employed.last_name,
    employed.email AS employed_email,
    product.sku,
    product.name AS product_name,
    product.price,
    purchase_order.oc,
    purchase_order.status,
    purchase_order.created_at,
    purchase_order.updated_at,
    product_order.quantity,
    product_order.product_id AS product_id
	
FROM
  purchase_order
  INNER JOIN client ON purchase_order.client_id = client.id
  INNER JOIN employed ON purchase_order.employed_id = employed.id
  INNER JOIN product_order ON purchase_order.id = product_order.purchase_order_id
  INNER JOIN product ON product_order.product_id = product.id
WHERE
  purchase_order.oc = $1 ORDER BY product.id ASC`,
		values: [oc],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows
	} catch (e) {
		console.log(
			'error al obtener datos de tabla purchase_order: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

// const createOrder = async (payload) => {
// 	console.log('payload: ', payload)
// 	const SQLquery = {
// 		text: 'INSERT INTO purchase_order (client_id, oc, employed_id) VALUES ($1, $2, $3) RETURNING id AS purchase_order_id',
// 		values: [payload.client_id, payload.oc, payload.employed_id],
// 	}
// 	try {
// 		const purchase = await pool.query(SQLquery)
// 		const purchaseId = purchase.rows[0].purchase_order_id
// 		const order = createProductOrder(purchaseId, payload)
// 		return order
// 	} catch (e) {
// 		console.log(
// 			'error al insertar datos en tabla purchase_order: ',
// 			e.code,
// 			e.message,
// 		)
// 		throw new Error(e)
// 	}
// }

// const getAllPurchaseOrders = async () => {
// 	const SQLquery = { text: 'SELECT * FROM purchase_order' }
// 	try {
// 		const orders = await pool.query(SQLquery)
// 		return orders.rows
// 	} catch (e) {
// 		console.log(
// 			'error al obtener datos de tabla purchase_order: ',
// 			e.code,
// 			e.message,
// 		)
// 		throw new Error(e)
// 	}
// }

// const getPurchaseOrder = async (id) => {
// 	const SQLquery = {
// 		text: 'SELECT * FROM purchase_order JOIN product_order ON purchase_order.id = product_order.purchase_order_id WHERE purchase_order.id = $1',
// 		values: [id],
// 	}
// 	try {
// 		const order = await pool.query(SQLquery)
// 		return order.rows[0]
// 	} catch (e) {
// 		console.log(
// 			'error al obtener datos de tabla purchase_order: ',
// 			e.code,
// 			e.message,
// 		)
// 		throw new Error(e)
// 	}
// }

// const updateOrder = async (id, payload) => {
// 	const SQLquery = {
// 		text: 'UPDATE purchase_order SET client_id = $1, oc = $2, employed_id = $3 WHERE id = $4 RETURNING *',
// 		values: [payload.client_id, payload.oc, payload.employed_id, id],
// 	}
// 	try {
// 		const setPurchase = await pool.query(SQLquery)
// 		const updateOrder = await updateProductOrder(id, payload)
// 		console.log('updateOrder: ', updateOrder)
// 		return {
// 			order: { purchaseOrder: setPurchase.rows, productOrder: updateOrder },
// 		}
// 	} catch (e) {
// 		console.log(
// 			'error al actualizar datos en tabla purchase_order: ',
// 			e.code,
// 			e.message,
// 		)
// 		throw new Error(e)
// 	}
// }

module.exports = {
	createOrder,
	getAllPurchaseOrders,
	getPurchaseOrderByoC,
	// getPurchaseOrder,
	// updateOrder,
}
