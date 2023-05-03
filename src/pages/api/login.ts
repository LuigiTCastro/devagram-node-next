import type {NextApiRequest, NextApiResponse} from 'next';

export default (
    req : NextApiRequest,
    res : NextApiResponse
) => {
    if(req.method === 'POST') {
        const {login, password} = req.body;

        if(login === "foobar@foobar.com" && password === "foobar@123") {
            return res.status(200).json({msg : 'User authenticated successfully'});
        }
        return res.status(400).json({error : 'User or password not found.'});
    }
    return res.status(405).json({error : 'Informed method is not valid.'});
}
