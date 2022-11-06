const { showError } = require('../helpers/showError')
const {
	newProduct,
	getAllProduct,
	getProductById,
	updateProduct,
	deleteProduct,
} = require('../models/productModel')



const createProduct = async (req, res) => {
	const {
		sku,
		name,
		description,
		package_number,
		category,
		stock,
		location,
		price,
	} = req.body

	const payload = {
		sku,
		name,
		description,
		package_number,
		category,
		stock,
		location,
		price,
	}

	try {
		const result = await newProduct(payload)
		return res.status(201).json(result)
	} catch (e) {
		showError(res, e)
	}
}

const putProduct = async (req, res) => {
	const { id } = req.params
	const {
		sku,
		name,
		description,
		package_number,
		category,
		stock,
		location,
		price,
	} = req.body

	const payload = {
		sku,
		name,
		description,
		package_number,
		category,
		stock,
		location,
		price,
		updated_at: new Date(),
		id,
	}

	try {
		const result = await updateProduct(payload)
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const removeProduct = async (req, res) => {
	const { id } = req.params
	try {
		const result = await deleteProduct(id)
		return res.status(201).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const getAllProducts = async (req, res) => {
	try {
		const result = await getAllProduct()
		return res.status(200).json(result)
	} catch (error) {
		showError(res, error)
	}
}

const getProductbyId = async (req, res) => {
	const { id } = req.params
	try {
		const result = await getProductById(id)
		return res.status(200).json(result)
	} catch (error) {
		showError(res, error)
	}
}

module.exports = {
	createProduct,
	putProduct,
	removeProduct,
	getAllProducts,
	getProductbyId,
}
