import type { NextApiRequest, NextApiResponse } from "next";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { UserModel } from "../../models/UserModel";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";

const endpointUser = async (
    req : NextApiRequest,
    res : NextApiResponse<DefaultResponseMsg | any>
) => {

    try {
        const { userId } = req?.query;
        const user = await UserModel.findById(userId);
        console.log('user', user);
        user.password = null;
        return res.status(200).json(user);
    }
    
    catch(e) {
        console.log(e);
        console.log(req.body);
    }

    return res.status(400).json({ error: "It was not possible get the user."});

}

export default JWTTokenValidate(MongoDBconnect(endpointUser)); // first validate token, after authenticate the user.