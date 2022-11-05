const jwt = require('jsonwebtoken')

const getJwtToken = (employed) => {
	const { id, first_name, last_name, role } = employed

	const fullName = `${first_name} ${last_name}`
	return new Promise((resolve, reject) => {
		const payload = {
			id,
			name: fullName,
			role: role,
		}
		const options = {
			expiresIn: '1h',
		}
		jwt.sign(payload, process.env.JWT_SECRET, options, (err, payload) => {
			if (err) reject(err)
			console.log(payload)
			resolve(payload)
		})
	})
}

module.exports = { getJwtToken }
