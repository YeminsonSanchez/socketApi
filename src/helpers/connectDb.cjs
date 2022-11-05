const Pool = require('pg')

console.log('Pool: ', Pool)
const config = {
	connectionString: process.env.DATABASE_URL,
	max: 20,
	idleTimeoutMillis: 5000,
	connectionTimeoutMillis: 2000,
}
// patron Singleton instance
exports.Singleton = (() => {
	let instance
	function createInstance() {
		const classObj = new Pool(config)
		return classObj
	}
	return {
		getInstance: () => {
			if (!instance) {
				instance = createInstance()
				console.log(' Nueva conexión a la base de datos establecida')
			} else {
				console.log('Establecida la conexión a la base de datos')
			}
			return instance
		},
	}
})()
