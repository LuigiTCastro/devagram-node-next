import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { DefaultResponseMsg } from '../types/DefaultResponseMsg'
import jwt, { JwtPayload } from 'jsonwebtoken';

export const JWTTokenValidate = (handler : NextApiHandler) => async (
    req : NextApiRequest,
    res : NextApiResponse<DefaultResponseMsg | any[]>
) => {

    try {
        const { MY_KEY_JWT } = process.env;
        if(!MY_KEY_JWT) {
        return res.status(200).json({ error : 'ENV JWT key not informed on the process execution.'});
        }

        if(!req || !req.headers) { // Checks if the request/request header are empty.
            return res.status(401).json({ error : 'It was not possible validate the access token.'});
        }

        if(req.method !== 'OPTIONS') { // HTTP method: 
            const authorization = req.headers['authorization']; //
            if(!authorization) {
                return res.status(401).json({ error : 'It was not possible validate the access token.'});
            }

            const token = authorization.substring(7);
            if(!token) {
                return res.status(401).json({ error : 'It was not possible validate the access token.'});
            }

            const decoded = await jwt.verify(token, MY_KEY_JWT) as JwtPayload; // JwtPayload: jwt object.
            if(!decoded) {
                return res.status(401).json({ error : 'It was not possible validate the access token.'});
            }

            if(!req.query) {
                req.query = {};
            }

            req.query.userId = decoded._id;
        }
    }

    catch(e) {
        console.log(e);
        return res.status(401).json({ error : 'It was not possible validate the access token.'});
    }
    
    return handler(req, res);
}


// token ativo = usuario autenticado OU usuario LOGADO! (quem esta fazendo as açoes).