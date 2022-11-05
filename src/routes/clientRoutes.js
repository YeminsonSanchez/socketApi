import express from 'express'
const routerClient = express.Router()
import { create } from './../controller/clientController.js'

router.post('/client', create)

export { routerClient }
