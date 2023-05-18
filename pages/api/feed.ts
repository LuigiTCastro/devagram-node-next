import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { PublicationModel } from "../../models/PublicationModel";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../models/UserModel";

const endpointFeed = async (
    req: NextApiRequest,
    res: NextApiResponse<DefaultResponseMsg | any>
) => {

    try {

        if (req.method === 'GET') {

            if (req?.query?.id) {

                const { userId } = req?.query;
                const user = await UserModel.findById(userId);

                if (!user) {
                    return res.status(400).json({ error: 'User not found!' });
                }   

                const publications = await PublicationModel
                    .find({ userId: user._id }) // Enquanto FINDBYID busca uma informação, FIND busca uma lista de informações.
                    .sort({ date: -1 }); // Sort: ordenar.

                return res.status(200).json(publications);
            }
        }
    }

    catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Method not valid!' });
    }
}

export default JWTTokenValidate(MongoDBconnect(endpointFeed));