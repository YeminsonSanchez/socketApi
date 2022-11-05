const pool = require('../helpers/connectDb').getInstance()

const newClient = async (payload) => {
	const SQLquery = {
		text: 'INSERT INTO client (rut_business, name, email, phone, address, region, comune, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
		values: [
			payload.rut_business,
			payload.name,
			payload.email,
			payload.phone,
			payload.address,
			payload.region,
			payload.comune,
			payload.zip,
		],
	}
	try {
		const result = await pool.query(SQLquery)
		console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al insertar datos en tabla client: ', e.code, e.message)
		throw new Error(e)
	}
}

const updateClient = async (payload) => {
	const SQLquery = {
		text: 'UPDATE client SET rut_business = $1, name = $2, email = $3, phone = $4, address = $5, region = $6, comune = $7, zip = $8 WHERE id = $9 RETURNING *',
		values: [
			payload.rut_business,
			payload.name,
			payload.email,
			payload.phone,
			payload.address,
			payload.region,
			payload.comune,
			payload.zip,
			payload.id,
		],
	}
	try {
		const result = await pool.query(SQLquery)
		console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log(
			'error al actualizar datos en tabla client: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const deleteClient = async (id) => {
	const SQLquery = {
		text: 'DELETE FROM client WHERE id = $1 RETURNING *',
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al eliminar datos en tabla client: ', e.code, e.message)
		throw new Error(e)
	}
}

const getClient = async (id) => {
	const SQLquery = {
		text: 'SELECT id, rut_business, name, email, phone, address, region, comune, zip, created_at, update_at FROM client WHERE id = $1',
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al obtener datos en tabla client: ', e.code, e.message)
		throw new Error(e)
	}
}

const getAllClient = async () => {
	const SQLquery = {
		text: 'SELECT id, rut_business, name, email, phone, address, region, comune, zip, created_at, updated_at FROM client',
	}
	try {
		const result = await pool.query(SQLquery)
		console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al obtener datos en tabla client: ', e.code, e.message)
		throw new Error(e)
	}
}

module.exports = {
	newClient,
	updateClient,
	deleteClient,
	getClient,
	getAllClient,
}
