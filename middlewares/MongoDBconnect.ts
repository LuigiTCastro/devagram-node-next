import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';
import { DefaultResponseMsg } from '../types/DefaultResponseMsg';

export const MongoDBconnect = (handler : NextApiHandler) =>
    async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {
        
        if(mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        const {DB_CONNECTION_STRING} = process.env;

        if(!DB_CONNECTION_STRING) {
            return res.status(500).json({error : 'ENV of database configuration not informed.'});
        }

        mongoose.connection.on('connected', () => console.log('Database connected.'));
        mongoose.connection.on('error', error => console.log(`An error occurred when connecting to the database: ${error}`));
        
        await mongoose.connect(DB_CONNECTION_STRING);

        return handler(req, res);
    }