import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { PublicationModel } from "../../models/PublicationModel";
import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../models/UserModel";
import { FollowerModel } from "../../models/FollowerModel";
import { CORSpolicy } from "../../middlewares/CORSpolicy";

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
                    .find({ userId: user._id })
                    .sort({ date: -1 });

                return res.status(200).json(publications);
            }

            else {

                const { userId } = req?.query;
                const loggedUser = await UserModel.findById(userId);

                if(!loggedUser) {
                    return res.status(400).json({ error: 'User not found!' });
                }

                const followers = await FollowerModel.find({ userId : loggedUser.id });
                const followersIds = await followers.map( f => f.followedUserId );

                const publications = await PublicationModel.find({
                    $or : [
                        { userId : loggedUser._id },
                        { userId : followersIds }
                    ]
                })
                .sort({ data : -1 })

                const result = [];

                for(const publi of publications) {
                    const publicationUser = await UserModel.findById(publi.userId);

                    if(publicationUser) {
                        const final = {...publi._doc, user : {
                            name : publicationUser.name,
                            avatar : publicationUser.avatar
                        }};

                        result.push(final);
                    };
                };
                return res.status(200).json(result);
            }
        }
        return res.status(405).json({ error: 'Method not valid!' });
    }

    catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Error searching the feed.' });
    }
}

export default CORSpolicy(JWTTokenValidate(MongoDBconnect(endpointFeed)));