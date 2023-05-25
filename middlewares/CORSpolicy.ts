import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { DefaultResponseMsg } from "../types/DefaultResponseMsg";
import NextCors from 'nextjs-cors';

export const CORSpolicy = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {

        try {
            
            await NextCors(req, res, {
                origin: '*',
                methods: ['GET, POST, PUT'],
                optionsSuccessStatus : 200
            })

            return handler(req, res);
        }

        catch(e) {
            console.log('Error when handling the CORS policy.' + e);
            return res.status(500).json({ error: 'An error ocurred when handling the CORS policy.'});
        }

    }