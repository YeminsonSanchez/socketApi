const { showError, validateEntity } = require('../helpers/showError')
const {
	getProductBySku,
	discountStock,
	restoreQuantity,
} = require('../models/productModel')
const {
	createDepleted,
	getDepleteds,
	getDepletedsBySku,
	getDepletedsByid,
	deleteDepleted,
} = require('../models/depletedProductModel')

const createDepletedProduct = async (req, res) => {
	const { sku, employed_id, quantity, product_damage } = req.body
	const payload = {
		sku,
		employed_id,
		quantity,
		product_damage,
	}
	try {
		const getProduct = await getProductBySku(sku)
		if (getProduct.length === 0) {
			return res.status(404).json({
				message: `No se ha encontrado el producto con el sku ${sku}`,
			})
		}
		const productData = getProduct
		payload.product_id = productData[0].id
		payload.product_name = productData[0].name
		const depletedProduct = await createDepleted(payload)
		const discoutnStock = await discountStock(productData[0].id, quantity)
		return res.status(201).json({
			message: `Se ha creado la merma del producto con el sku ${sku}`,
			depleted: depletedProduct,
			status_product: discoutnStock,
		})
	} catch (e) {
		showError(res, e)
	}
}

const getAllDepletedProducts = async (req, res) => {
	try {
		const depletedProducts = await getDepleteds()
		if (depletedProducts.length === 0) {
			return res.status(404).json({
				message: 'No hay productos merma registrados',
			})
		}

		return res.status(200).json({
			message: 'Lista de productos en merma',
			depletedProducts,
		})
	} catch (e) {
		showError(res, e)
	}
}

const getDepletedProductsBySku = async (req, res) => {
	const { sku } = req.params
	try {
		const depletedProducts = await getDepletedsBySku(sku)
		if (depletedProducts.length === 0) {
			return res.status(404).json({
				message: `No se encontraron productos en merma con el sku ${sku}`,
			})
		}
		return res.status(200).json({
			message: `Lista de productos en merma con el sku ${sku}`,
			depletedProducts,
		})
	} catch (e) {
		showError(res, e)
	}
}

const getDepletedProductsByid = async (req, res) => {
	const { id } = req.params
	try {
		const depletedProducts = await getDepletedsByid(id)
		if (depletedProducts.length === 0) {
			return res.status(404).json({
				message: `No se ha encontrado la merma del producto con el id ${id}`,
			})
		}
		return res.status(200).json({
			message: `Lista de productos en merma con el id ${id}`,
			depletedProducts,
		})
	} catch (e) {
		showError(res, e)
	}
}

const deleteDepletedProduct = async (req, res) => {
	const { id } = req.params
	try {
		const depletedProduct = await getDepletedsByid(id)
		if (depletedProduct.length === 0) {
			return res.status(404).json({
				message: `No se ha encontrado la merma del producto con el id ${id}`,
			})
		}
		await restoreQuantity(
			depletedProduct[0].product_id,
			depletedProduct[0].quantity,
		)
		await deleteDepleted(id)
		return res.status(200).json({
			message: `Se ha eliminado la merma del producto con el id ${id}`,
		})
	} catch (e) {
		showError(res, e)
	}
}

module.exports = {
	createDepletedProduct,
	getAllDepletedProducts,
	getDepletedProductsBySku,
	getDepletedProductsByid,
	deleteDepletedProduct,
}
