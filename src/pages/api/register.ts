// PUBLIC ROUTE, THEN ITS NOT NECESSARY BE LOGGED TO DO REGISTER.

import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponseMsg } from '../../../types/DefaultResponseMsg';
import { RegisterUserRequest } from '../../../types/RegisterUserRequest';
import { UserModel } from '../../../models/UserModel';
import { MongoDBconnect } from '../../../middlewares/MongoDBconnect';
import md5 from 'md5';

const endpointRegisterUser = async (
    req : NextApiRequest,
    res : NextApiResponse<DefaultResponseMsg>
) => {
    if(req.method === 'POST') {
            const user = req.body as RegisterUserRequest;
            
            if(!user.name || user.name.length < 2 ) {
                return res.status(400).json({ error : 'Name not valid.' });
            }

            if(!user.email || user.email.length < 5 || 
                !user.email.includes('@') || !user.email.includes('.')) {
                    return res.status(400).json({ error : 'E-mail not valid.' });
            }

            if(!user.password || user.password.length < 4 ) {
                return res.status(400).json({ error : 'Password not valid.' });
            }

            const usersWithSameEmail = await UserModel.find({ email : user.email});
            if(usersWithSameEmail && usersWithSameEmail.length > 0) {
                return res.status(400).json({ error : 'An user with the same email already exists.' });
            }

            const userToBeSaved = {
                name : user.name,
                email : user.email,
                password : md5(user.password)
            }

            await UserModel.create(userToBeSaved);
            return res.status(200).json({ msg : 'User registered successfully!'});
        }
        return res.status(405).json({ error : 'Informed method is not valid.' }); // 405: action not allowed
    }

    export default MongoDBconnect(endpointRegisterUser); // Connect with db before registering user.