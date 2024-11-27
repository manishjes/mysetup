import express from 'express'
import ProductRoute from "./module/productRoute"
import mongoose from 'mongoose'
import router from './routes/index'

const app = express()


app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/product')
router(app)
app.listen(8000, ()=>{
    console.log('running')
})