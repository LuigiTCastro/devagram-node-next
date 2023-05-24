import { NextApiRequest, NextApiResponse } from "next";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { UserModel } from "../../models/UserModel";
import { PublicationModel } from "../../models/PublicationModel";

const endpointComments = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {
    try {

        if (req.method === 'PUT') {

            const { userId, id } = req?.query;
            const loggedUser = await UserModel.findById(userId);

            if (!userId) {
                return res.status(400).json({ error: 'Logged user not found.' });
            }

            const publication = await PublicationModel.findById(id);

            if (!publication) {
                return res.status(400).json({ error: 'Publication not found.' });
            }
            
            if(!req.body || !req.body.comment || req.body.comment.length < 1) {
                return res.status(400).json({ error: 'The comment is not valid.' });
            }

            const comment = {
                userId : loggedUser._id,
                name : loggedUser.name,
                avatar : loggedUser.avatar,
                comment : req.body.comment
            }

            publication.comments.push(comment);
            await PublicationModel.findByIdAndUpdate({ _id : publication.id }, publication);
            
            return res.status(200).json({ msg: 'Comment made successfully!' });
        }
        return res.status(405).json({ error: 'Informed method not valid.' });
    }

    catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'Error when trying to make a comment.' });
    }
}

export default JWTTokenValidate(MongoDBconnect(endpointComments));