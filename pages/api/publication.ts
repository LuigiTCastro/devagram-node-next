// // PRIVATE ROUTE. SO ITS NECESSARY TO BE LOGGED TO MAKE A PUBLICATION.

// import type { NextApiResponse } from "next";
// import { imagesUploadCosmic, upload } from "../../services/imagesUploadCosmic";
// import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
// import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
// import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
// import { PublicationModel } from '../../models/PublicationModel';
// import { UserModel } from '../../models/UserModel';
// import nc from 'next-connect';


// const handler = nc()
//     .use(upload.single('file')) // upload do multer. 'file': name of the field to pass as key in the form-data (postman) 
//     .post(async (
//         req : any,
//         res : NextApiResponse<DefaultResponseMsg>
//     ) => {

// // const endpointPublication = (
// //     req: any,
// //     res: NextApiResponse<DefaultResponseMsg>
// // ) => {

//     // if(req.method === 'POST') {

        
//         try {
//             console.log('endpoint publish', req.body);

//             const { userId } = req.query;
//             const user = await UserModel.findById(userId);

//             if(!user) {
//                 return res.status(400).json({ error: 'User not found.' });
//             }

//             if(!req || !req.body) {
//                 return res.status(400).json({ error: 'Input parameters not informed.' });
//             }

//             const { description } = req?.body;

//             if(!description || description < 2) {
//                 return res.status(400).json({ error: 'Description is not valid.' });
//             }
            
//             if(!req.file || !req.file.originalname) {
//                 return res.status(400).json({ error: 'Image is required.' });
//             }
            
//             const image = await imagesUploadCosmic(req);
//             const publication = {
//                 userId : user._id,
//                 description,
//                 image : image.media.url,
//                 date : new Date()
//             }

//             await PublicationModel.create(publication);

//             return res.status(200).json({ msg: 'Publication created successfully.' });
//         }

//         catch(e) {
//             console.log(e);
//             return res.status(400).json({ error: 'Error when trying to publish.'});
//         }
//     // }
//     // return res.status(400).json({ error: 'a.'});
// });

// export const config = {
//     api : {
//         bodyparser : false
//     }
// }

// export default JWTTokenValidate(MongoDBconnect(handler));





// --------------------------------------------




import type {NextApiResponse} from 'next';
import { DefaultResponseMsg } from "../../types/DefaultResponseMsg";
import nc from 'next-connect';
import {upload, imagesUploadCosmic} from "../../services/imagesUploadCosmic";
import { MongoDBconnect } from "../../middlewares/MongoDBconnect";
import { JWTTokenValidate } from "../../middlewares/JWTTokenValidate";
import { PublicationModel } from '../../models/PublicationModel';
import { UserModel } from '../../models/UserModel';

const handler = nc()
    .use(upload.single('file'))
    .post(async (req : any, res : NextApiResponse<DefaultResponseMsg>) => {
        try{
            const {userId} = req.query;
            const user = await UserModel.findById(userId);
            if(!user){
                return res.status(400).json({error : 'user nao encontrado'});
            }

            if(!req || !req.body){
                return res.status(400).json({error : 'Parametros de entrada nao informados'});
            }
            const {description} = req?.body;

            if(!description || description.length < 2){
                return res.status(400).json({error : 'description nao e valida'});
            }
    
            if(!req.file || !req.file.originalname){
                return res.status(400).json({error : 'Imagem e obrigatoria'});
            }

            const image = await imagesUploadCosmic(req);
            const publicacao = {
                userId : user._id,
                description,
                image : image.media.url,
                date : new Date()
            }

            // user.publicacoes++;
            // await UserModel.findByIdAndUpdate({_id : user._id}, user);

            await PublicationModel.create(publicacao);
            return res.status(200).json({msg : 'Publicacao criada com sucesso'});
        }catch(e){
            console.log(e);
            return res.status(400).json({error : 'Erro ao cadastrar publicacao'});
        }
});

export const config = {
    api : {
        bodyParser : false
    }
}

export default JWTTokenValidate(MongoDBconnect(handler)); 

