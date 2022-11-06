const { showError } = require('../helpers/showError')
const { getEmployedByRut } = require('../models/employeedModel')
const bcrypt = require('bcryptjs')
const { getJwtToken } = require('../helpers/createToken')

const loginEmployed = async (req, res) => {
	const { rut, password } = req.body
	rut.toLowerCase()
	password.toLowerCase()
	try {
		const employeed = await getEmployedByRut(rut)

		if (employeed[0] === undefined) {
			res.status(404).json({
				message: 'No registrado',
				code: 404,
			})
		} else {
			const isPasswordValid = await bcrypt.compare(
				password,
				employeed[0].password,
			)

			if (!isPasswordValid) {
				res.status(401).json({
					message: 'Contraseña incorrecta',
					code: 401,
				})
			} else {
				const token = await getJwtToken(employeed[0])
				const name = employeed[0].first_name + ' ' + employeed[0].last_name
				res.status(200).json({
					message: `Bienvenido, ${name} has iniciado sesion`,
					code: 200,
					token,
				})
			}
		}
	} catch (e) {
		showError(res, e)
	}
}

module.exports = { loginEmployed }
