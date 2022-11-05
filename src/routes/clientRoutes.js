const express = require('express')
const router = express.Router()
const {
	create,
	update,
	remove,
	get,
	getAll,
} = require('../controllers/clientController')

router.post('/client', create)
router.put('/client/:id', update)
router.delete('/client/:id', remove)
router.get('/client/:id', get)
router.get('/client', getAll)

module.exports = router
