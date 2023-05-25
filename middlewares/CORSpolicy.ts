import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { DefaultResponseMsg } from "../types/DefaultResponseMsg";
import NextCors from 'nextjs-cors';

// Como se trata de um middleware, é necessário receber o handler primeiro.
// CORS: Cross-Origin
export const CORSpolicy = (handler: NextApiHandler) =>
    async (req: NextApiRequest, res: NextApiResponse<DefaultResponseMsg>) => {

        try {
            
            await NextCors(req, res, {
                // origin: 'localhost:3000, devagram.com.br'
                origin: '*', // Astherisc to allow public access.
                methods: ['GET, POST, PUT'],
                // header: [...]
                optionsSuccessStatus : 200 // Old browsers have problems when returns 204.
            })

            return handler(req, res);
        }

        catch(e) {
            console.log('Error when handling the CORS policy.' + e);
            return res.status(500).json({ error: 'An error ocurred when handling the CORS policy.'});
        }

    }