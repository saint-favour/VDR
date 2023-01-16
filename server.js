import express from "express"
import { config } from 'dotenv'
config()
import morgan from "morgan"
import path from "path"
import colors from "colors"
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js"
import cors from "cors"

import recordRoutes from './routes/recordRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


//connectDB
connectDB()


const app = express()

// Cors
app.use(cors({ origin: '*' }))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(
  express.urlencoded({ extended: true})
)

app.use(express.json())

app.use('/api/records', recordRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5780

app.listen(8237, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.grey.bold
  )
})

