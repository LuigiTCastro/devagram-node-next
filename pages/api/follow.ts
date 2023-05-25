import { NextApiRequest, NextApiResponse } from "next";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { UserModel } from "../../models/UserModel";
import { FollowerModel } from "../../models/FollowerModel";
import { CORSpolicy } from "../../middlewares/CORSpolicy";

const endpointFollow = async ( req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {

    try {

        if(req.method === 'PUT') {

            const { userId, id } = req?.query;

            const loggedUser = await UserModel.findById(userId);
            const userToBeFollowed = await UserModel.findById(id);

            if(!loggedUser) {
                return res.status(400).json({ error: 'Logged user not found.' });
            }

            if(!userToBeFollowed) {
                return res.status(400).json({ error: 'User to be followed not found.' });
            }

            const userAlreadyFollowedByMe = await FollowerModel.find( { userId : loggedUser._id, followedUserId : userToBeFollowed._id }); 

            if(userAlreadyFollowedByMe && userAlreadyFollowedByMe.length > 0) {
                userAlreadyFollowedByMe.forEach(async(e : any) => await FollowerModel.findByIdAndDelete({_id : e._id}));
                
                loggedUser.followings--;
                await UserModel.findByIdAndUpdate({ _id : loggedUser._id }, loggedUser);

                userToBeFollowed.followers--;
                await UserModel.findByIdAndUpdate({ _id : userToBeFollowed._id }, userToBeFollowed);
                
                return res.status(200).json({ msg: 'User unfollowed successfully!' });
            }
            
            else {

                const follower = {
                    userId : loggedUser._id,
                    followedUserId : userToBeFollowed._id
                };
                await FollowerModel.create(follower);

                // Updates the FOLLOWING of the logged user.
                loggedUser.followings++;
                await UserModel.findByIdAndUpdate({ _id : loggedUser._id }, loggedUser);

                // Updates the followed of the user to be followed.
                userToBeFollowed.followers++;
                await UserModel.findByIdAndUpdate({ _id : userToBeFollowed._id }, userToBeFollowed);
                
                return res.status(200).json({ msg: 'User followed successfully!' });
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

export default CORSpolicy(JWTTokenValidate(MongoDBconnect(endpointFollow)));