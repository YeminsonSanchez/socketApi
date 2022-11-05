const { showError } = require('../helpers/showError')

const {
	newClient,
	updateClient,
	deleteClient,
	getClient,
	getAllClient,
} = require('../models/clientModel')

const createClient = async (req, res) => {
	const { rut_business, name, email, phone, address, region, comune, zip } =
		req.body

	const payload = {
		rut_business,
		name,
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

const putClient = async (req, res) => {
	const { id } = req.params
	const { rut_business, name, email, phone, address, region, comune, zip } =
		req.body

	const payload = {
		rut_business,
		name,
		email,
		phone,
		address,
		region,
		comune,
		zip,
		id,
	}

	try {
		const result = await updateClient(payload)
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const removeClient = async (req, res) => {
	const { id } = req.params
	try {
		const result = await deleteClient(id)
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const getClientById = async (req, res) => {
	const { id } = req.params
	try {
		const result = await getClient(id)
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const getAllClients = async (req, res) => {
	try {
		const result = await getAllClient()
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}
module.exports = {
	createClient,
	getClientById,
	removeClient,
	putClient,
	getAllClients,
}
