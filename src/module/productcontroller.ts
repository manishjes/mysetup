import { Request, Response, NextFunction } from "express";
import Product from "../model/product";


const addProduct = async(req:any, res:Response, next:NextFunction)=>{
    await Product.create({
        productName: req.body.productName,
        description: req.body.description,
        price: req.body.price
    }).then((data)=>{
        if(!data){
            throw{
                statusCode: 404,
                message: "data not found"
            }
        }
        else{
            res.status(200).json({
                message: "success"
            })
        }
    }).catch((err)=>{
        res.status(412).json({
            message: err.message
        })
    })
}


export default {
    addProduct
}