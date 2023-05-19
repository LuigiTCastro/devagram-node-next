import multer from 'multer';
import cosmicjs from 'cosmicjs';

const { 
    CHAVE_GRAVACAO_AVATARES,
    BUCKET_AVATARES,
    WRITE_KEY_PUBLICATIONS,
    BUCKET_PUBLICATIONS 
} = process.env;

const Cosmic = cosmicjs();

const avatarsBucket = Cosmic.bucket({
    slug: BUCKET_AVATARES,
    write_key: CHAVE_GRAVACAO_AVATARES
});

const publicationsBucket = Cosmic.bucket({
    slug: BUCKET_PUBLICATIONS,
    write_key: WRITE_KEY_PUBLICATIONS
});

const storage = multer.memoryStorage();
const upload = multer({ storage : storage });

const imagesUploadCosmic = async(req : any) => {
    
    // console.log(WRITE_KEY_AVATARS);
    console.log(req.body)
    console.log(req.file.originalname)
    
    if(req?.file?.originalname) {
        const media_object = {
            originalname : req.file.originalname,
            buffer : req.file.buffer
        }
        if(req.url && req.url.includes('publication')) {
            return await publicationsBucket.addMedia({ media : media_object })
        }
        else {
            return await avatarsBucket.addMedia({ media : media_object })
        }
    }
}

export { upload, imagesUploadCosmic };


            // if (!req.file.originalname.includes('.png') &&
            //     !req.file.originalname.includes('.jpg') &&
            //     !req.file.originalname.includes('.jpeg')) {
    
            //     throw new Error('Image extension not valid.');
            // }