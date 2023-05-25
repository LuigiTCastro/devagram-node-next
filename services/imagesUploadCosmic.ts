import multer from 'multer';
import cosmicjs from 'cosmicjs';

const {
    WRITE_KEY_AVATARS,
    BUCKET_SLUG_AVATARS,
    WRITE_KEY_PUBLICATIONS,
    BUCKET_SLUG_PUBLICATIONS
} = process.env;

const Cosmic = cosmicjs();

const avatarsBucket = Cosmic.bucket({
    slug: BUCKET_SLUG_AVATARS,
    write_key: WRITE_KEY_AVATARS
});

const publicationsBucket = Cosmic.bucket({
    slug: BUCKET_SLUG_PUBLICATIONS,
    write_key: WRITE_KEY_PUBLICATIONS
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const imagesUploadCosmic = async (req: any) => {

    console.log(req.body)
    console.log(req.file.originalname)

    if (!req.file.originalname.includes('.png') &&
        !req.file.originalname.includes('.jpg') &&
        !req.file.originalname.includes('.jpeg')) {

        throw new Error('Image extension not valid.');
    }

    if (req?.file?.originalname) {
        const media_object = {
            originalname: req.file.originalname,
            buffer: req.file.buffer
        }
        if (req.url && req.url.includes('publication')) {
            return await publicationsBucket.addMedia({ media: media_object })
        }
        else {
            return await avatarsBucket.addMedia({ media: media_object })
        }
    }
}

export { upload, imagesUploadCosmic };


