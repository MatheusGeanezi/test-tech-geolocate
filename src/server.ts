import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger/swaggerConfig'

import routes from './routes'
import connectDB from './config/db'
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
  res.send('Bem-vindo')
})

app.use('/api', routes)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server running on port ${PORT}`)
})

export default app
