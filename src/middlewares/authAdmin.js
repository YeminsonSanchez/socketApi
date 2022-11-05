const { showError } = require('../helpers/showError')

const authAdmin = async (req, res, next) => {
	try {
		const { role } = req.employed
		if (role !== 'admin') {
			return res.status(401).send({
				message:
					'No dispones de los permisos necesarios, por favor comunicate con los administradores',
			})
		} else if (role === 'admin') {
			next()
		}
	} catch (error) {
		showError(res, error)
	}
}

module.exports = { authAdmin }
