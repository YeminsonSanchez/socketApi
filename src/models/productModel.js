const pool = require('../helpers/connectDb').getInstance()

const newProduct = async (payload) => {
	console.log('payload: ', payload)
	const SQLquery = {
		text: 'INSERT INTO product (name, sku, description, package_number, category, stock, location, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
		values: [
			payload.name,
			payload.sku,
			payload.description,
			payload.package_number,
			payload.category,
			payload.stock,
			payload.location,
			payload.price,
		],
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al insertar datos en tabla product: ', e.code, e.message)
		throw new Error(e)
	}
}

const getAllProduct = async () => {
	const SQLquery = {
		text: 'SELECT id, sku, name, description, package_number, category, stock, location, price, created_at, updated_at FROM product ORDER BY id ASC',
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al obtener datos en tabla product: ', e.code, e.message)
		throw new Error(e)
	}
}

const getProductById = async (id) => {
	const SQLquery = {
		text: 'SELECT id, sku, name, description, package_number, category, stock, location, price, created_at, updated_at FROM product WHERE id = $1',
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al obtener datos en tabla product: ', e.code, e.message)
		throw new Error(e)
	}
}

const updateProduct = async (payload) => {
	const SQLquery = {
		text: 'UPDATE product SET sku = $1, name = $2, description = $3, package_number = $4, category = $5, stock = $6, location = $7, price = $8 updated_at = $9 WHERE id = $10 RETURNING *',
		values: [
			payload.sku,
			payload.name,
			payload.description,
			payload.package_number,
			payload.category,
			payload.stock,
			payload.location,
			payload.price,
			payload.updated_at,
			payload.id,
		],
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log(
			'error al actualizar datos en tabla product: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const deleteProduct = async (id) => {
	const SQLquery = {
		text: 'DELETE FROM product WHERE id = $1',
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al eliminar datos en tabla product: ', e.code, e.message)
		throw new Error(e)
	}
}

module.exports = {
	newProduct,
	getAllProduct,
	getProductById,
	updateProduct,
	deleteProduct,
}
