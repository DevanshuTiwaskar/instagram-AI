
import morgan from 'morgan'
import express from 'express'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'


const app = express()

app.use(morgan('dev'))
//if we want to get data in req.body we need to use this middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())




app.use('/users',userRoutes)

export default app;
