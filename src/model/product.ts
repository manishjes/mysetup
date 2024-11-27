import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    },

    description:{
        type: String,
        required: true
    },

    price:{
        type: Number
    }
})

const Product = model("product", productSchema)

export default Product