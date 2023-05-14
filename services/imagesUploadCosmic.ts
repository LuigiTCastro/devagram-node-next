import multer from 'multer';
import cosmicjs from 'cosmicjs'

const { WRITE_KEY_AVATARS,
        WRITE_KEY_PUBLICATIONS,
        BUCKET_AVATARS,
        BUCKET_PUBLICATIONS } = process.env;

const Cosmic = cosmicjs();

const avatarsBucket = Cosmic.bucket({
    slug: BUCKET_AVATARS,
    write_key: WRITE_KEY_AVATARS
});

const publicationsBucket = Cosmic.bucket({
    slug: BUCKET_PUBLICATIONS,
    write_key: WRITE_KEY_PUBLICATIONS
});

const storage = multer.memoryStorage();
const upload = multer({ storage : storage });

const imagesUploadCosmic = async(req : any) => {
    
    // console.log(WRITE_KEY_AVATARS);
    console.log(req)
    
    if(req?.file?.originalname) {
        const media_object = {
            originalname : req.file.originalname,
            buffer : req.file.buffer
        }
        if(req.url && req.url.includes('publication')) {
            return publicationsBucket.addMedia({ media : media_object })
        }
        else {
            return avatarsBucket.addMedia({ media : media_object })
        }
    }
}

export { upload, imagesUploadCosmic };

