const pool = require('../helpers/connectDb').getInstance()
const {createProductOrder} = require('../models/productOrderModel')

const createOrder = async (payload) => {
	console.log('payload: ', payload)
	const SQLquery = {
		text: 'INSERT INTO purchase_order (client_id, oc, employed_id) VALUES ($1, $2, $3) RETURNING id AS purchase_order_id',
		values: [
			payload.client_id,
			payload.oc,
			payload.employed_id,
		],
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

module.exports = { createOrder }
