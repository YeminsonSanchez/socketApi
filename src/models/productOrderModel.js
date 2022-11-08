const pool = require('../helpers/connectDb').getInstance()

const createProductOrder = async (payload) => {

	const SQLquery = {
		text: 'INSERT INTO product_order (purchase_order_id, quantity, product_id) VALUES ($1, $2, $3) RETURNING *',
		values: [payload.purchase_order_id, payload.quantity, payload.product_id],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows
	} catch (e) {
		console.log('error al insertar datos en tabla order: ', e.code, e.message)
		throw new Error(e)
	}
}

// const createProductOrder = async (purchaseId, payload) => {
// 	console.log('payload: ', payload)
// 	const SQLquery = {
// 		text: 'INSERT INTO product_order (oc, purchase_order_id, quantity, product_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
// 		values: [
// 			payload.oc,
// 			purchaseId,
// 			payload.quantity,
// 			payload.product_id,
// 			payload.status,
// 		],
// 	}
// 	try {
// 		const result = await pool.query(SQLquery)
// 		return result.rows
// 	} catch (e) {
// 		console.log('error al insertar datos en tabla order: ', e.code, e.message)
// 		throw new Error(e)
// 	}
// }

// const updateProductOrder = async (id, payload) => {
//   console.log('payload: ', payload);
//   console.log('id: ', id);
// 	const SQLquery = {
// 		text: 'UPDATE product_order SET oc = $1, quantity = $3, product_id = $4, status = $5 WHERE purchase_order_id = $2 RETURNING *',
// 		values: [
// 			payload.oc,
// 			id,
// 			payload.quantity,
// 			payload.product_id,
// 			payload.status,
// 		],
// 	}
// 	try {
// 		const result = await pool.query(SQLquery)
//     console.log('result: ', result);
// 		return result.rows
// 	} catch (e) {
// 		console.log('error al actualizar datos en tabla order: ', e.code, e.message)
// 		throw new Error(e)
// 	}
// }
module.exports = { createProductOrder }
