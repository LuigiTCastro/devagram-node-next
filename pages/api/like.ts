import { NextApiRequest, NextApiResponse } from "next";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { PublicationModel } from "../../models/PublicationModel";
import { UserModel } from "../../models/UserModel";
import { CORSpolicy } from "../../middlewares/CORSpolicy";

const endpointLike = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {

    try {
        if (req.method === 'PUT') {

            const { publicationId } = req?.query;
            const publication = await PublicationModel.findById(publicationId);

            if (!publication) {
                return res.status(404).json({ error: 'Publication not found.' });
            }

            const { userId } = req?.query;
            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const userIndexOnLike = publication.likes.findIndex((e: any) => e.toString() === user._id.toString());

            if (userIndexOnLike != -1) {
                publication.likes.splice(userIndexOnLike, 1); // splice: removes a container from the array (informing the index, and the quantity from then on).
                await PublicationModel.findByIdAndUpdate({ _id: publication._id }, publication);
                return res.status(200).json({ msg: 'Publication disliked successfully.' });
            }

            else {
                publication.likes.push(user._id);
                await PublicationModel.findByIdAndUpdate({ _id: publication._id }, publication)
                return res.status(200).json({ msg: 'Publication liked successfully.' });
            }
        }

        return res.status(405).json({ error: 'Informed method not valid.' });
    }

    catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'There was an error liking/disliking the publication.' });
    }
}

export default CORSpolicy(JWTTokenValidate(MongoDBconnect(endpointLike)));