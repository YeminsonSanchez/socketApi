const errors = [
	{
		code: {
			product_empty: 'El código del producto no puede estar vacío',
			product_invalid: 'El código del producto no es válido',
			product_exist: 'El código del producto ya existe',
			sku_empty: 'El sku del producto no puede estar vacío',
			sku_invalid: 'El sku del producto no es válido',
			sku_exist: 'El sku del producto ya existe',
			depleted_empty: 'El código de la merma no puede estar vacío',
			depleted_invalid: 'El código de la merma no es válido',
			depleted_exist: 'El código de la merma ya existe',
			depleted_dont_exist: 'El código de la merma no tiene productos asociados',
			employed_empty: 'El código del empleado no puede estar vacío',
			employed_invalid: 'El código del empleado no es válido',
			employed_exist: 'El código del empleado ya existe',
			employed_empty: 'El código del empleado no puede estar vacío',
			employed_invalid: 'El código del empleado no es válido',
			employed_exist: 'El código del empleado ya existe',
		},
	},
]

const showError = (res, e) => {
	const responseError = {
		error: 'Internal Server Error',
		mesagge: e.message,
		code: e.code,
	}

	return res.status(500).json(responseError)
}
module.exports = { showError }
