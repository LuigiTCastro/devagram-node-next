import { NextApiRequest, NextApiResponse } from "next";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { UserModel } from "../../models/UserModel";

const endpointFollow = async ( req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    try {

        if(req.method === 'PUT') {

            // if(!req?.query?.userId) { } // Gets the id of the logged user (contained in the active token).
            // if(!req?.query?.id) { } // Gets the id of the user to be followed.

            const { userId, id } = req?.query; // Same logic of the above structure.

            const loggedUser = await UserModel.findById(userId); // await because is a promisse...
            const userToBeFollowed = await UserModel.findById(id);

            if(!loggedUser) {
                return res.status(400).json({ error: 'Logged user not found.' });
            }

            if(!userToBeFollowed) {
                return res.status(400).json({ error: 'User to be followed not found.' });
            }
        }

        else {
            return res.status(405).json({ error: 'Informed method not valid.' });
        }
    }

    catch(e) {
        console.log(e);
        return res.status(500).json({ error: 'It was did not possible to follow/unfollow the informed user.' });
    }
}

export default JWTTokenValidate(MongoDBconnect(endpointFollow)); // This sequence means to use all middlewares.