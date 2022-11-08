const pool = require('../helpers/connectDb').getInstance()

const createOrder = async (payload) => {
	const SQLquery = {
		text: `INSERT INTO purchase_order (client_id, oc, employed_id, product_id, quantity, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
		values: [
			payload.client_id,
			payload.oc,
			payload.employed_id,
			payload.product_id,
			payload.quantity,
			payload.status,
		],
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

const getAllOrders = async () => {
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

const getOrderById = async (id) => {
	const SQLquery = {
		text: `SELECT * FROM purchase_order WHERE id = $1`,
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows[0]
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
		text: `UPDATE purchase_order SET client_id = $1, oc = $2, employed_id = $3, product_id = $4, quantity = $5, status = $6 WHERE id = $7 RETURNING *`,
		values: [
			payload.client_id,
			payload.oc,
			payload.employed_id,
			payload.product_id,
			payload.quantity,
			payload.status,
			id,
		],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows[0]
	} catch (e) {
		console.log(
			'error al actualizar datos de tabla purchase_order: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const deleteOrder = async (id) => {
	const SQLquery = {
		text: `DELETE FROM purchase_order WHERE id = $1`,
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rowCount
	} catch (e) {
		console.log(
			'error al eliminar datos de tabla purchase_order: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const getOrdersbyOc = async (oc) => {
	const SQLquery = {
		text: `SELECT * FROM purchase_order WHERE oc = $1`,
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

const getAllOrdersByProductsId = async (product_id) => {
	const SQLquery = {
		text: `SELECT * FROM purchase_order WHERE product_id = $1`,
		values: [product_id],
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

const getAllOrdersByEmployedId = async (employed_id) => {
	const SQLquery = {
		text: `SELECT * FROM purchase_order WHERE employed_id = $1`,
		values: [employed_id],
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

const getAllOrdersByClientId = async (client_id) => {
	const SQLquery = {
		text: `SELECT * FROM purchase_order WHERE client_id = $1`,
		values: [client_id],
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

module.exports = {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
	getOrdersbyOc,
	getAllOrdersByProductsId,
	getAllOrdersByEmployedId,
	getAllOrdersByClientId,
}
