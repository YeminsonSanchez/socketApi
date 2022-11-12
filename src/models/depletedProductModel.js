const pool = require('../helpers/connectDb').getInstance()

const createDepleted = async (payload) => {
	const SQLquery = {
		text: `INSERT INTO depleted_products (sku, name, product_id, employed_id, quantity, product_damage) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
		values: [
			payload.sku,
			payload.product_name,
			payload.product_id,
			payload.employed_id,
			payload.quantity,
			payload.product_damage,
		],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows
	} catch (e) {
		console.log(
			'error al insertar datos en tabla depleted_product: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const getDepleteds = async () => {
	const SQLquery = {
		text: `SELECT id, sku, name, product_id, employed_id, quantity, product_damage, created_at, updated_at FROM depleted_products ORDER BY id DESC`,
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows
	} catch (e) {
		console.log(
			'error al obtener datos en tabla depleted_products: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const getDepletedsBySku = async (sku) => {
	const SQLquery = {
		text: `SELECT id, sku, name, product_id, employed_id, quantity, product_damage, created_at, updated_at FROM depleted_products WHERE sku = $1 ORDER BY id DESC`,
		values: [sku],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows
	} catch (e) {
		console.log(
			'error al obtener datos en tabla depleted_products: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}
const deleteDepleted = async (id) => {
	const SQLquery = {
		text: `DELETE FROM depleted_products WHERE id = $1`,
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows
	} catch (e) {
		console.log(
			'error al eliminar datos en tabla depleted_products: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const getDepletedsByid = async (id) => {
	const SQLquery = {
		text: `SELECT id, sku, name, product_id, employed_id, quantity, product_damage, created_at, updated_at FROM depleted_products WHERE id = $1 ORDER BY id DESC`,
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		return result.rows
	} catch (e) {
		console.log(
			'error al obtener datos en tabla depleted_products: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

module.exports = {
	createDepleted,
	getDepleteds,
	getDepletedsBySku,
	getDepletedsByid,
	deleteDepleted,
}
