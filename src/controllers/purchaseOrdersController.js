const { showError } = require('../helpers/showError')
const { createProductOrder } = require('../models/productOrderModel')

const {
	createOrder,
	getAllPurchaseOrders,
	getPurchaseOrderByoC,
	getPurchaseOrder,
	updateOrder,
} = require('../models/purchaseOrderModel')

const createPurchaseOrder = async (req, res) => {
	const { client_id, employed_id, products, quantity, oc } = req.body

	const payloadPurchaseOrder = {
		client_id,
		employed_id,
		oc,
	}

	try {
		const purchaseOrder = await createOrder(payloadPurchaseOrder)

		const productsArray = async () => {
			for (let i = 0; i < products.length; i++) {
				const payloadProductOrder = {
					purchase_order_id: purchaseOrder.id,
					product_id: products[i],
					quantity: quantity[i],
				}

				console.log(payloadProductOrder)

				const productOrder = await createProductOrder(payloadProductOrder)
				console.log(productOrder)
			}
		}

		productsArray()


		res.status(201).json({
			message: 'Orden de compra creada con exito',
			purchaseOrder,
			//productOrder,
		})
	} catch (e) {
		showError(res, e)
	}
}

const getPurchaseOrderbyOc = async (req, res) => {
	const { oc } = req.params
	try {
		const purchaseOrder = await getPurchaseOrderByoC(oc)

		const products = purchaseOrder.map((product) => {
			console.log(product)
			return {
				id: product.product_id,
				sku: product.sku,
				name: product.product_name,
				quantity: product.quantity,
				price: product.price,
			}
		})
		console.log('products', products)

		const data = {
			purchaseOrder: [
				{
					order: {
						id: purchaseOrder[0].id,
						oc: purchaseOrder[0].oc,
						status: purchaseOrder[0].status,
					},
					client: {
						rut_business: purchaseOrder[0].rut_business,
						name: purchaseOrder[0].name,
						email: purchaseOrder[0].email,
						phone: purchaseOrder[0].phone,
						address: purchaseOrder[0].address,
						region: purchaseOrder[0].region,
						zip_code: purchaseOrder[0].zip,
					},
					seller: {
						name:
							purchaseOrder[0].first_name + ' ' + purchaseOrder[0].last_name,
						email: purchaseOrder[0].employed_email,
					},
					products: products,
				},
			],
		}

		res.status(200).json({
			message: 'Orden de compra encontrada',
			data,
		})
	} catch (e) {
		showError(res, e)
	}
}

// const createPurchaseOrder = async (req, res) => {
// 	const { client_id, oc, employed_id, status, quantity, product_id } = req.body
// 	const payload = {
// 		client_id,
// 		oc,
// 		employed_id,
// 		status,
// 		quantity,
// 		product_id,
// 	}

// 	try {
// 		const result = await createOrder(payload)
// 		return res.status(201).json(result)
// 	} catch (e) {
// 		showError(res, e)
// 	}
// }

// const getPurchaseOrders = async (req, res) => {
// 	try {
// 		const result = await getAllPurchaseOrders()
// 		return res.status(200).json(result)
// 	} catch (e) {
// 		showError(res, e)
// 	}
// }

// const getPurchaseOrderById = async (req, res) => {
// 	const { id } = req.params
// 	try {
// 		const result = await getPurchaseOrder(id)
// 		return res.status(200).json(result)
// 	} catch (e) {
// 		showError(res, e)
// 	}
// }

// const updatePurchaseOrder = async (req, res) => {
// 	const { id } = req.params
// 	const { client_id, oc, employed_id, status, quantity, product_id } = req.body
// 	const payload = {
// 		client_id,
// 		oc,
// 		employed_id,
// 		status,
// 		quantity,
// 		product_id,
// 	}
// 	try {
// 		const result = await updateOrder(id, payload)
// 		return res.status(200).json(result)
// 	} catch (error) {
// 		showError(res, error)
// 	}
// }

module.exports = {
	createPurchaseOrder,
	getPurchaseOrderbyOc,
	// getPurchaseOrders,
	// getPurchaseOrderById,
	// updatePurchaseOrder,
}
