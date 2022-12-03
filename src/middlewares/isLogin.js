const { validateToken } = require('../helpers/validateJwt')
const { showError } = require('../helpers/showError')

const isLogin = async (req, res, next) => {
	if (!req.header('Authorization'))
		return res.status(401).send({ message: 'Inicia sesion para continuar' })

	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const isValidToken = async () => await validateToken(token)
		const isValid = await isValidToken()

		if (!isValid == true) {
			return
		} else {
			req.employed = isValid
			next()
		}
	} catch (e) {
		console.log(e)
		return showError(res, e)
	}
}

module.exports = { isLogin }
