const express = require('express')
const router = express.Router()

const { create, getAllEmployees, getEmployeById, update, removeEmployeed } = require('../controllers/employeesController')

router.post('/employeed', create)
router.get('/employeed', getAllEmployees)
router.get('/employeed/:id', getEmployeById)
router.put('/employeed/:id', update)
router.delete('/employeed/:id', removeEmployeed)
module.exports = router