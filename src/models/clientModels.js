import Singleton from ('../helpers/connectDb.cjs').getInstance()



export const newClient = async (payload) => {
	const SQLquery = {
		text: 'INSERT INTO client (first_name, last_name, email, phone, address, region, comune, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
		values: [
			payload.first_name,
			payload.last_name,
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
