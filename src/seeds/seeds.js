const { faker } = require('@faker-js/faker')
const { newClient } = require('../models/clientModel')
const { createEmployeed } = require('../models/employeedModel')
const { newProduct } = require('../models/productModel')
const bcrypt = require('bcryptjs')

const dataRandom = () => {
	const min = 1000000
	const max = 25000000
	const role = [
		'admin',
		'analister',
		'seller',
		'seller',
		'seller',
		'manager warehouse',
		'supervisor warehouse',
		'warehouse assistant',
		'warehouse assistant',
		'warehouse assistant',
		'warehouse assistant',
	]
	const verifyDigit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'K']
	const rutRandom = Math.floor(Math.random() * (max - min))
	const digitRandom =
		verifyDigit[Math.floor(Math.random() * verifyDigit.length)]

	return { rutRandom, digitRandom, role }
}

const seedsClient = async () => {
	for (let index = 0; index < 10; index++) {
		const { rutRandom, digitRandom } = dataRandom()
		const payloadClient = {
			rut_business: `${rutRandom}-${digitRandom}`,
			name: faker.company.name(),
			email: faker.internet.exampleEmail(),
			phone: faker.phone.number('+569 ########'),
			address: faker.address.streetAddress(),
			region: faker.address.city(),
			comune: faker.address.city(),
			zip: faker.address.zipCode(),
		}
		// await newClient(payloadClient)
		// console.log(payloadClient)
	}
}

const seedsEmployed = async () => {
	for (let index = 0; index < 10; index++) {
		const password = '123456'
		const salt = await bcrypt.genSalt(12)
		const hashPassword = await bcrypt.hash(password, salt)

		const { rutRandom, digitRandom, role } = dataRandom()
		const payloadEmployed = {
			rut: `${rutRandom}-${digitRandom}`,
			password: hashPassword,
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			email: faker.internet.exampleEmail(),
			phone: faker.phone.number('+569 ########'),
			role: role[Math.floor(Math.random() * role.length)],
		}
		// await createEmployeed(payloadEmployed)
		// console.log(payloadEmployed)
	}
}

const seedsProducts = async () => {
	const category = ['Home', 'Electronics', 'Garden']
	for (let index = 0; index < 50; index++) {
		const payloadProduct = {
			name: faker.commerce.productName(),
			sku: faker.datatype.number({ min: 100000, max: 109991 }),
			description: faker.commerce.productDescription(),
			package_number: faker.datatype.number(5),
			category: category[Math.floor(Math.random() * category.length)],
			stock: faker.datatype.number(100000),
			location: faker.datatype.number(20),
			price: faker.commerce.price(1000, 1000000),
		}
		// await newProduct(payloadProduct)
		// console.log(payloadProduct)
	}
}

module.exports = { seedsClient, seedsEmployed, seedsProducts }
