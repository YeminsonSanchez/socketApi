const { showError } = require('./../helpers/showError')

const {
	newClient,
	updateClient,
	deleteClient,
	getClient,
	getAllClient,
} = require('../models/clientModels')

const create = async (req, res) => {
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

const update = async (req, res) => {
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

const remove = async (req, res) => {
	const { id } = req.params
	try {
		const result = await deleteClient(id)
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const get = async (req, res) => {
	const { id } = req.params
	try {
		const result = await getClient(id)
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const getAll = async (req, res) => {
	try {
		const result = await getAllClient()
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}
module.exports = { create, update, remove, get, getAll }
