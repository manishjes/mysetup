import { Request, Response, NextFunction } from "express";
import User from "../model/user";
import {hashSync, compareSync} from "bcryptjs"
import {tokengenerate} from '../helper/helper'
const register = async(req:any, res:Response, next:NextFunction)=>{
 try{  
     const salt = 15;
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashSync(req.body.password,salt)
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
} catch (err){
    res.status(500).json({
        message:err
    })
}
}


const login = async(req:any, res:Response, next:NextFunction)=>{
   try{{ User.findOne({
        email:req.body.email,
    }).then((data)=>{
        if(!data){
            throw{
                statusCode:404,
                message: "data not found"
            }
        }
        else if(compareSync(req.body.password, data.password)!==true){
            throw{
                statusCode: 412,
                msg: "invalid password",
            }
        }
        else{
            const payload = {
                id: data._id
            }

            res.status(200).json({
                message: "login successfully",
                token:  tokengenerate(payload)
            })


        }
    }).catch((err)=>{
        res.status(412).json({
            message:err.message
        })
    })
}
}
catch(err){
    res.status(500).json({
        message:err
    })
}}

export default {
    register,
    login
}