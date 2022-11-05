const pool = require('../helpers/connectDb').getInstance()

const createEmployeed = async (payload) => {
	console.log('payload: ', payload)
	const SQLquery = {
		text: 'INSERT INTO employed (rut, password, first_name, last_name, email, phone, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
		values: [
			payload.rut,
			payload.password,
			payload.first_name,
			payload.last_name,
			payload.email,
			payload.phone,
			payload.role,
		],
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log(
			'error al insertar datos en tabla employed: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const getAllemployees = async () => {
	const SQLquery = {
		text: 'SELECT id, rut, password, first_name, last_name, email, phone, role, created_at, updated_at FROM employed ORDER BY id ASC',
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al obtener datos en tabla employed: ', e.code, e.message)
		throw new Error(e)
	}
}

const getEmployeed = async (id) => {
	const SQLquery = {
		text: 'SELECT id, rut, password, first_name, last_name, email, phone, role, created_at, updated_at FROM employed WHERE id = $1',
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log('error al obtener datos en tabla client: ', e.code, e.message)
		throw new Error(e)
	}
}

const updateEmployeed = async (payload) => {
	const SQLquery = {
		text: 'UPDATE employed SET rut = $1, password = $2, first_name = $3, last_name = $4, email = $5, phone = $6, role = $7 WHERE id = $8 RETURNING *',
		values: [
			payload.rut,
			payload.password,
			payload.first_name,
			payload.last_name,
			payload.email,
			payload.phone,
			payload.role,
			payload.id,
		],
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log(
			'error al actualizar datos en tabla employed: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

const deleteEmployeed = async (id) => {
	const SQLquery = {
		text: 'DELETE FROM employed WHERE id = $1 RETURNING *',
		values: [id],
	}
	try {
		const result = await pool.query(SQLquery)
		// console.log(result.rows)
		return result.rows
	} catch (e) {
		console.log(
			'error al eliminar datos en tabla employed: ',
			e.code,
			e.message,
		)
		throw new Error(e)
	}
}

module.exports = {
	createEmployeed,
	getAllemployees,
	getEmployeed,
	updateEmployeed,
	deleteEmployeed,
}
