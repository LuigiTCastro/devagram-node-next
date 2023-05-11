// PUBLIC ROUTE, THEN ITS NOT NECESSARY BE LOGGED TO DO REGISTER.

import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponseMsg } from '../../../types/DefaultResponseMsg';
import { RegisterUserRequest } from '../../../types/RegisterUserRequest';
import { UserModel } from '../../../models/UserModel';
import { MongoDBconnect } from '../../../middlewares/MongoDBconnect';
import md5 from 'md5';
import { upload, imagesUploadCosmic } from '../../../services/imagesUploadCosmic';
// const nc = require('next-connect');
import nc from 'next-connect';

const handler = nc()
    .use(upload.single('file'))
    .post(async (
        req : NextApiRequest,
        res : NextApiResponse<DefaultResponseMsg>
    ) => {
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

            // validation if already exists an user with same email
            const usersWithSameEmail = await UserModel.find({ email : user.email});
            if(usersWithSameEmail && usersWithSameEmail.length > 0) {
                return res.status(400).json({ error : 'An user with the same email already exists.' });
            }

            // send the image from multer to the cosmic
            const image = await imagesUploadCosmic(req);

            // save in the database
            const userToBeSaved = {
                name : user.name,
                email : user.email,
                password : md5(user.password),
                avatar : image?.media?.url
            }              

            await UserModel.create(userToBeSaved);
            return res.status(200).json({ msg : 'User registered successfully!'});
        });

// const endpointRegisterUser = async (
//     req : NextApiRequest,
//     res : NextApiResponse<DefaultResponseMsg>
// ) => {
    //  if(req.method === 'POST') 
    //  {
    //      ...
    //  }
//         return res.status(405).json({ error : 'Informed method is not valid.' }); // 405: action not allowed
//     }

    export const config = { // exporta-se essa config para alterar configuraçao padrao do next
        api: {
            bodyParser: false // significa que nesta api, o bodyparser nao transformará em json.
        }
    }

    // com isso, torna-se necessario passar no body (no postman) FORM-DATA em vez de RAW(JSON).
    // alem disso, FORM-DATA trabalha com CHAVE-VALOR.
    // importante lembrar de passar a chave FILE.

    export default MongoDBconnect(handler); // Connect with db before registering user.