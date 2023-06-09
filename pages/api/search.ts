import { NextApiRequest, NextApiResponse } from "next";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { UserModel } from "../../models/UserModel";
import { CORSpolicy } from '../../middlewares/CORSpolicy';


const endpointSearch = async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg | any[]>) => {

    try {

        if (req.method === 'GET') {

            if (req?.query?.id) {

                const userFound = await UserModel.findById(req?.query?.id);

                if (!userFound) {
                    return res.status(400).json({ error: 'User not found.' });
                }

                userFound.password = null;
                return res.status(200).json(userFound);
            }

            else {

                const { filter } = req.query;

                if (!filter || filter.length < 2) {
                    return res.status(400).json({ error: 'Please, inform more than two characters.' });
                }

                const usersFound = await UserModel.find({
                    $or: [{ name: { $regex: filter, $options: 'i' } },
                    { email: { $regex: filter, $options: 'i' } }]

                });

                return res.status(200).json(usersFound);
            }
        }

        return res.status(405).json({ error: 'Http method not valid.' });
    }

    catch (e) {
        console.log(e);
        return res.status(500).json({ error: 'No user found.' + e });
    }
}

export default CORSpolicy(JWTTokenValidate(MongoDBconnect(endpointSearch)));