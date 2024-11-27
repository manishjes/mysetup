import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import Token from "../model/token"
import User from "../model/user"
import mongoose from "mongoose"

const checkAuth = {
   user: async(req:any, res:Response, next:NextFunction)=>{
    try{
        if(!req.headers.authorization){
            throw{
                statusCode:401,
                message: "authorization require"
            }
        }
        else{
            const bearer = req.headers.authorization.split(" ");
            const bearerToken = bearer[1];

            Token.findOne({
                btoken:bearerToken
            }).then((data)=>{
                if(!data){
                    throw{
                        statusCode:401,
                        message: "unauthorize"
                    }
                }
                else{

                    const token:any = data.btoken
                    verify(token, "secret", (err:any, jwt_payload:any)=>{
                        if(err){
                            throw{
                                statusCode:401,
                                msg: err.message,
                            }
                        }
                        else{
                            User.findOne({
                                _id: new mongoose.Types.ObjectId(jwt_payload.id)
                            }).then((user) => {
                                if (!user) {
                                  throw {
                                    statusCode: 401,
                                    msg: "un auth",
                                  };
                                } else {
                               
                                  next();
                                }
                              })
                              .catch((err) => {
                                res.status(412).json({
                                  message: err.msg,
                                });
                              });
                        }

                    })
                }
            }).catch((err)=>{
        res.status(412).json({
            message:err.message
        })
    })

        }
    } catch(err){
        res.status(500).json({
            message:err
        })
    }
   }
}



export default checkAuth