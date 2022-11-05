import app from './server.js'
import { routerClient } from './src/routes/clientRoutes.js'

app.use('/', routerClient)
export default app
