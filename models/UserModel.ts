import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    name : { type : String, required : true },
    email : { type : String, required : true},
    password : { type : String, required : true},
    avatar : { type : String, required : false}, // not obligatory
    publications : { type : Number, default : 0},
    followers : { type : Number, default : 0},
    followings : { type : Number, default : 0},
});

export const UserModel = (mongoose.models.users || mongoose.model('users', UserSchema));

// export const UserModel = mongoose.models.users ?? mongoose.model('users', UserSchema);


// Models are the CLASSES that allow to realize operations on the database (insert, read, update, delete records)_