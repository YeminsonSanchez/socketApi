const {
	createEmployeed,
	getAllemployees,
	getEmployeed,
	updateEmployeed,
	deleteEmployeed,
} = require('../models/employeedModel')
const { showError } = require('../helpers/showError')
const bcrypt = require('bcryptjs')

const create = async (req, res) => {
	const { rut, password, first_name, last_name, email, phone, role } = req.body

	const salt = await bcrypt.genSalt(12)
	const hashPassword = await bcrypt.hash(password, salt)

	const payload = {
		rut: rut.toLowerCase(),
		password: hashPassword,
		first_name,
		last_name,
		email,
		phone,
		role,
	}
	try {
		const result = await createEmployeed(payload)
		return res.status(201).json(result)
	} catch (e) {
		showError(res, e)
	}
}

const getAllEmployees = async (req, res) => {
	try {
		const result = await getAllemployees()
		return res.status(200).json(result)
	} catch (e) {
		showError(res, e)
	}
}

const getEmployeById = async (req, res) => {
	const { id } = req.params
	try {
		const result = await getEmployeed(id)
		return res.status(200).json(result)
	} catch (e) {
		showError(res, e)
	}
}

const update = async (req, res) => {
	const { id } = req.params
	const { rut, password, first_name, last_name, email, phone, role } = req.body
	const payload = {
		rut,
		password,
		first_name,
		last_name,
		email,
		phone,
		role,
		id,
	}

	try {
		const result = await updateEmployeed(payload)
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const removeEmployeed = async (req, res) => {
	const { id } = req.params
	try {
		const result = await deleteEmployeed(id)
		return res.status(200).json(result)
	} catch (e) {
		showError(res, e)
	}
}

module.exports = {
	create,
	getAllEmployees,
	getEmployeById,
	update,
	removeEmployeed,
}
