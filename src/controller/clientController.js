import { showError } from '../helpers/showError.js'
import { newClient } from '../models/clientModels.js'

export const create = async (req, res) => {
	const { first_name, last_name, email, phone, address, region, comune, zip } =
		req.body

	const payload = {
		first_name,
		last_name,
		email,
		phone,
		address,
		region,
		comune,
		zip,
	}
	try {
		const result = await newClient(payload)
		return res.status(201).json(result)
	} catch (e) {
		showError(res, e)
	}
}
