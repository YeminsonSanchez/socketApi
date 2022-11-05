const { faker } = require('@faker-js/faker')
const { newClient } = require('../models/clientModels')

const seed = async () => {
	const min = 10000000
	const max = 99999999

	for (let index = 0; index < 20; index++) {
		const payload = {
			rut_business: Math.random() * (max - min) + min,
			name: faker.company.name(),
			email: faker.internet.exampleEmail(),
			phone: faker.phone.number('+569 ########'),
			address: faker.address.streetAddress(),
			region: faker.address.city(),
			comune: faker.address.city(),
			zip: faker.address.zipCode(),
		}

		await newClient(payload)
	}
}
module.exports = seed
