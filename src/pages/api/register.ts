import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponseMsg } from '../../../types/DefaultResponseMsg';
import { RegisterUserRequest } from '../../../types/RegisterUserRequest';
import { UserModel } from '../../../models/UserModel';


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

            await UserModel.create(user);
            return res.status(200).json({ msg : 'User registered successfully!'});
        }
        return res.status(405).json({ error : 'Informed method is not valid.' }); // 405: action not allowed
    }

    export default endpointRegisterUser;