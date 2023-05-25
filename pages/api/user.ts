import { imagesUploadCosmic, upload } from "../../services/imagesUploadCosmic";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import type { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../models/UserModel";
import nc from 'next-connect';
import { CORSpolicy } from '../../middlewares/CORSpolicy';


const handler = nc()
    .use(upload.single('file'))
    .put(async (req: any, res: NextApiResponse<DefaultResponseMsg>) => {

        try {

            const { userId } = req?.query;
            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(400).json({ error: 'User not found' });
            }

            const { name } = req?.body;

            if (name && name.length > 2) {
                user.name = name;
            }

            const { file } = req;

            if (file && file.originalname) {

                const image = await imagesUploadCosmic(req);

                if (image && image.media && image.media.url) {
                    user.avatar = image.media.url;
                }
            }

            await UserModel.findByIdAndUpdate({ _id: user._id }, user);

            return res.status(200).json({ msg: 'User updated successfully' });
        }

        catch (e) {
            console.log(e);
            return res.status(400).json({ error: 'It was not possible to update the user.' + e });
        }
    })
    .get(async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | any>) => {

        try {
            const { userId } = req?.query;
            const user = await UserModel.findById(userId);
            console.log('user', user);
            user.password = null;
            return res.status(200).json(user);
        }

        catch (e) {
            console.log(e);
            console.log(req.body);
        }

        return res.status(400).json({ error: "It was not possible get the user." });
    });

export const config = {
    api: {
        bodyParser: false
    }
}

export default CORSpolicy(JWTTokenValidate(MongoDBconnect(handler)));