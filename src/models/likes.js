import mongoose, { Schema } from "mongoose";



const likeSchema = new mongoose.Schema({

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required:[true,'post is require']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'user is require']
    }
      
 },{timestamps:true}

);

// likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model('like',likeSchema)

export default likeModel;