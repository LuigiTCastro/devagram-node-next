// PUBLIC ROUTE, THEN ITS NOT NECESSARY BE LOGGED TO DO LOGIN.

import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoDBconnect } from '../../../middlewares/MongoDBconnect';
import { DefaultResponseMsg } from '../../../types/DefaultResponseMsg';
import { LoginResponse } from '../../../types/LoginResponse';
import { UserModel } from '../../../models/UserModel';
import md5 from 'md5';
import jwt from 'jsonwebtoken';

const endpointLogin = async (
    req : NextApiRequest,
    res : NextApiResponse<DefaultResponseMsg | LoginResponse> // <...> force the response element to be of the determined type.
) => {

    const { MY_KEY_JWT } = process.env;

    if(!MY_KEY_JWT) {
        return res.status(500).json({ error: 'JWT Env not informed.' });
    }

    if(req.method === 'POST') {
        const { login, password } = req.body;

        const usersFound = await UserModel.find({ email : login, password : md5(password)});
        if(usersFound && usersFound.length > 0) {
            const userFound = usersFound[0];
            
            const token = jwt.sign({_id : userFound._id}, MY_KEY_JWT);
            return res.status(200).json({ 
                name : userFound.name, 
                email : userFound.email,
                token });

            // return res.status(200).json({ msg : `The user ${userFound.name} was authenticated successfully!` }); // 200: status code OK       
        }
        return res.status(400).json({error : 'User or password not found.'}); // 400: bad request
    }
    return res.status(405).json({error : 'Informed method is not valid.'}); // 405: action not allowed
}

export default MongoDBconnect(endpointLogin); // first middleware, after endpoint.