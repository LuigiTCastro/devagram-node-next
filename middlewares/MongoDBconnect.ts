import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next'; // Handler: ?
import mongoose from 'mongoose'; // mongoose lib installed with 'npm i mongoose'
import { DefaultResponseMsg } from '../types/DefaultResponseMsg';

export const MongoDBconnect = (handler : NextApiHandler) =>
    async (req : NextApiRequest, res : NextApiResponse<DefaultResponseMsg>) => {
        // verify if the db is already connected
        // if it is, follow to endpoint or other middleware
        if(mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        // if it is not connected, lets to connect
        // get the environment variable completed
        const {DB_CONNECTION_STRING} = process.env;

        // if the env is empty, interrupts the use of system and notify the dev
        if(!DB_CONNECTION_STRING) {
            return res.status(500).json({error : 'ENV of database configuration not informed.'}); // 500: internal server error.
        }

        mongoose.connection.on('connected', () => console.log('Database connected.'));
        mongoose.connection.on('error', error => console.log(`An error occurred when connecting to the database: ${error}`));
        
        // async/await: wait a thread to finish to after start a new thread
        await mongoose.connect(DB_CONNECTION_STRING); // connect with db

        // follow to endpoint, because i'm connected with db
        return handler(req, res);
    }