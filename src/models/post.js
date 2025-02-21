import mongoose from "mongoose";


const postSchema = new mongoose.Schema({ 
    caption:{
        type:String,
    },
    media:{
        type:Object,
        required: [true,"Please provide a media"],
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: [true,"Please provide an author"],

    },
    likesCount:{
        type:Number,
        default:0
    }

 })



//this static function is used to get all the post of the author
postSchema.statics.getAuthotPost = async function(authorId){
    if(!authorId){
        throw new Error("Author id is required")
    }


    const post = await this.find({author: authorId}) /// this is used to get all the post of the author 
    return post
}


// this method is used to update the caption of the post
postSchema.methods.updateCaption = async function(caption){

    this.caption = caption
    await this.save()
    return this
}

postSchema.methods.setRecentPost = async (limit)=>{
     if(!limit){
            throw new Error("limit is required")
     }  
    const post = await this.find().sort({createdAt:-1}).limit(1)
    ///this.find() → Retrieves all posts.
    //.sort({ createdAt: -1 }) → Sorts posts in descending order (newest first).
    //.limit(1) → Gets only one post (the most recent one).
    
    
    return post
}


postSchema.statics.isValidPostId = async(postId)=>{
    console.log(postId)
    if(!postId){
        throw new Error("post is required");  
    }

    const isValidPostId = mongoose.Types.ObjectId.isValid(postId)

    return isValidPostId;
}



const postModel = mongoose.model('post',postSchema)

export default postModel