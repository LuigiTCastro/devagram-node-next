// PUBLIC ROUTE, THEN ITS NOT NECESSARY BE LOGGED TO DO REGISTER.

import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { RegisterUserRequest } from '../../types/RegisterUserRequest';
import { UserModel } from '../../models/UserModel';
import { MongoDBconnect } from '../../middlewares/MongoDBconnect';
import { upload, imagesUploadCosmic } from '../../services/imagesUploadCosmic'; // Upload do Multer, Upload da imagem pro cosmic.
import md5 from 'md5';
import nc from 'next-connect';

const handler = nc() // handler: endpoint that receives an next-connect instance.
    .use(upload.single('file')) // upload: midleware from multer. single: accepts just one image. 'file': name of the field to pass as key in the form-data (postman) 
    .post(async ( // post: http method that plug to endpoint.
        req: NextApiRequest,
        res: NextApiResponse<DefaultResponseMsg>
    ) => {
        try {
            console.log('endpoint register', req.body);

            const user = req.body as RegisterUserRequest;

            if (!user.name || user.name.length < 2) {
                return res.status(400).json({ error: 'Name not valid.' });
            }

            if (!user.email || user.email.length < 5 ||
                !user.email.includes('@') || !user.email.includes('.')) {
                return res.status(400).json({ error: 'E-mail not valid.' });
            }

            if (!user.password || user.password.length < 4) {
                return res.status(400).json({ error: 'Password not valid.' });
            }

            // validation if already exists an user with same email
            const usersWithSameEmail = await UserModel.find({ email: user.email });

            if (usersWithSameEmail && usersWithSameEmail.length > 0) {
                return res.status(400).json({ error: 'An user with the same email already exists.' });
            }

            // send the image from multer to the cosmic
            const image = await imagesUploadCosmic(req);
            // this function gets the raw data contained in the properties of FILE and transforms in a Cosmic OBJECT including informations as MEDIA and URL.

            // save in the database
            const userToBeSaved = {
                name: user.name,
                email: user.email,
                password: md5(user.password),
                avatar: image?.media?.url // thanks to the above function, image can to get the media and url.
            }

            await UserModel.create(userToBeSaved);
            return res.status(200).json({ msg: 'User registered successfully!' });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Error when registering user.' });
        }
    });

export const config = { // exporta-se essa config para alterar configuraçao padrao do next
    api: {
        bodyParser: false // o bodyParser faz com que nesta api, o Next não transforme o request em json automaticamente.
    }
}   // com isso, torna-se necessario passar no body (no postman) FORM-DATA em vez de RAW(JSON).
// alem disso, FORM-DATA trabalha com CHAVE-VALOR.
// importante lembrar de passar a chave FILE.

export default MongoDBconnect(handler); // Connect with db before registering user.