import mongoose, { Schema } from 'mongoose'

const FollowerSchema = new Schema({
    
    // who follows
    userId : {type : String, required : true },

    // who is followed
    followedUser : {type : String, required : true },
});

export const FollowerModel = (mongoose.models.followers || mongoose.model('followers', FollowerSchema));