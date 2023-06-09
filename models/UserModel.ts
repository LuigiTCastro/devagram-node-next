import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    name : { type : String, required : true },
    email : { type : String, required : true},
    password : { type : String, required : true},
    avatar : { type : String, required : false},
    publications : { type : Number, default : 0},
    followers : { type : Number, default : 0},
    followings : { type : Number, default : 0},
});

export const UserModel = (mongoose.models.users || mongoose.model('users', UserSchema));
// mongoose.model: maps the collection to when it is used as model. if it does not exist, creates in the MongoDb.