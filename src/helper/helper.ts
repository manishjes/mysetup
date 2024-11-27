import {sign} from 'jsonwebtoken'

import Token from '../model/token'

const tokengenerate = (payload:any)=>{
    const token:any = sign(payload, "secret", {
        expiresIn: "2h"
    })

    Token.create({
        btoken: token
    })
    return token
}

export  {tokengenerate}