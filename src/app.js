
import morgan from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'

import userRoutes from './routes/user.routes.js'
import aiRouter  from './routes/ai.routes.js'
import postRouter from './routes/post.routes.js'

const app = express()

app.use(morgan('dev'))
//if we want to get data in req.body we need to use this middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())




app.use('/users',userRoutes);
app.use('/ai',aiRouter)
app.use('/posts',postRouter)

export default app;
