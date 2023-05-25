// PRIVATE ROUTE. SO ITS NECESSARY TO BE LOGGED TO MAKE A PUBLICATION.

import {upload, imagesUploadCosmic} from "../../services/imagesUploadCosmic";
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { PublicationModel } from '../../models/PublicationModel';
import { CORSpolicy } from "../../middlewares/CORSpolicy";
import { UserModel } from '../../models/UserModel';
import type {NextApiResponse} from 'next';
import nc from 'next-connect';

const handler = nc()
    .use(upload.single('file')) // upload do multer. 'file': name of the field to pass as key in the form-data (postman).
    .post(async (req : any, res : NextApiResponse<DefaultResponseMsg>) => {
        
        try{

            const { userId } = req.query;
            const user = await UserModel.findById(userId);
            
            if(!user){
                return res.status(400).json({ error: 'User not found.' });
            }

            if(!req || !req.body){
                return res.status(400).json({ error: 'Input parameters not informed.' });
            }
            
            const {description} = req?.body;

            if(!description || description.length < 2){
                return res.status(400).json({ error: 'Description is not valid.' });
            }
    
            if(!req.file || !req.file.originalname){
                return res.status(400).json({ error: 'Image is required.' });
            }

            const image = await imagesUploadCosmic(req);
            
            const publication = {
                userId : user._id,
                description,
                image : image.media.url,
                date : new Date()
            }

            user.publications++;
            await UserModel.findByIdAndUpdate({_id : user._id}, user);
            await PublicationModel.create(publication);
            
            return res.status(200).json({ msg: 'Publication created successfully.' });
        }
        
        catch(e){
            console.log(e);
            return res.status(400).json({ error: 'Error when trying to publish.'});
        }
});

export const config = {
    api : {
        bodyParser : false
    }
}

export default CORSpolicy(JWTTokenValidate(MongoDBconnect(handler))); 

