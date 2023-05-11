import type { NextApiRequest, NextApiResponse } from "next";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";

const endpointUser = (
    req : NextApiRequest,
    res : NextApiResponse
) => {
    return res.status(200).json('User authenticated successfully.');
}

export default JWTTokenValidate(endpointUser); // first validate token, after authenticate the user.