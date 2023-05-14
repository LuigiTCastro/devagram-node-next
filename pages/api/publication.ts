// PRIVATE ROUTE. SO ITS NECESSARY TO BE LOGGED TO MAKE A PUBLICATION.

import type { NextApiHandler, NextApiResponse } from "next";
import { upload } from "../../services/imagesUploadCosmic";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import nc from 'next-connect';


const handler = nc()
    .use(upload.single('file')) // upload do multer. 'file': name of the field to pass as key in the form-data (postman) 
    .post(async (
        req : any,
        res : NextApiResponse<DefaultResponseMsg>
    ) => {

        try {
            const { description } = req?.body;

            if(!req || !req.body) {
                return res.status(400).json({ error: 'Input parameters not informed.' });
            }

            if(!description || description == null) {
                return res.status(400).json({ error: 'Description is not valid.' });
            }
            
            if(!req.file) {
                return res.status(400).json({ error: 'Image is required.' });
            }
            
            return res.status(200).json({ msg: 'Publication is valid.' });    
        }

        catch(e) {
            console.log(e);
            return res.status(400).json({ error: 'Error when trying to publish.'});
        }
    });


export const config = {
    api : {
        bodyparser : false
    }
}

export default JWTTokenValidate(MongoDBconnect(handler));