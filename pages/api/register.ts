// PUBLIC ROUTE, THEN ITS NOT NECESSARY BE LOGGED TO DO REGISTER.

import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultResponseMsg } from '../../types/DefaultResponseMsg';
import { RegisterUserRequest } from '../../types/RegisterUserRequest';
import { UserModel } from '../../models/UserModel';
import { MongoDBconnect } from '../../middlewares/MongoDBconnect';
import { upload, imagesUploadCosmic } from '../../services/imagesUploadCosmic';
import md5 from 'md5';
import nc from 'next-connect';
import { CORSpolicy } from '../../middlewares/CORSpolicy';

const handler = nc()
    .use(upload.single('file'))
    .post(async (
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

            const usersWithSameEmail = await UserModel.find({ email: user.email });

            if (usersWithSameEmail && usersWithSameEmail.length > 0) {
                return res.status(400).json({ error: 'An user with the same email already exists.' });
            }

            const image = await imagesUploadCosmic(req);

            const userToBeSaved = {
                name: user.name,
                email: user.email,
                password: md5(user.password),
                avatar: image?.media?.url
            }

            await UserModel.create(userToBeSaved);
            return res.status(200).json({ msg: 'User registered successfully!' });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ error: 'Error when registering user.' });
        }
    });

export const config = {
    api: {
        bodyParser: false
    }
}

export default CORSpolicy(MongoDBconnect(handler));