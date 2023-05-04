import type {NextApiRequest, NextApiResponse} from 'next';
import {MongoDBconnect} from '../../../middlewares/MongoDBconnect';
import {DefaultResponseMsg} from '../../../types/DefaultResponseMsg';

const endpointLogin = (
    req : NextApiRequest,
    res : NextApiResponse<DefaultResponseMsg> // <...> force the response element to be of the determined type.
) => {
    if(req.method === 'POST') {
        const {login, password} = req.body;

        if(login === "foobar@foobar.com" && password === "foobar@123") {
            return res.status(200).json({msg : 'User authenticated successfully'}); // 200: status code OK
        }
        return res.status(400).json({error : 'User or password not found.'}); // 400: bad request
    }
    return res.status(405).json({error : 'Informed method is not valid.'}); // 405: action not allowed
}

export default MongoDBconnect(endpointLogin); // first middleware, after endpoint.