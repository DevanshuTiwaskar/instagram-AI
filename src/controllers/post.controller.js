import postModel from '../models/post.js';
import likeModel from '../models/likes.js'
import { generateCationFromImageBuffer } from '../services/ai.service.js'
import { uploadFile } from '../services/cloudstorage.service.js';


export const createPost = async (req, res, next)=>{
   try {
    const imageBuffer = req.file?.buffer;
 
    if(!imageBuffer){
       return res.status(400).json({message: "Image is require"})
    }
   //const cation = await generateCationFromImageBuffer(imageBuffer)
   // const fileData = await uploadFile(imageBuffer)

   const [ caption, fileData ] = await  Promise.all([
       generateCationFromImageBuffer(imageBuffer),
       uploadFile(imageBuffer)
   ])


   const newPost = await postModel.create({
       caption,
       media: fileData,
       author: req.user._id
   })



res.status(201).json({ 
   post: newPost,
   message: "post created successfully"
 })

   } catch (error) {
    res.status(500).send('something went wrong')
   }
}


export const likePost = async (req,res,next)=>{
    try {
        const postId = req.params.postId

        if(!postModel.isValidPostId(postId)){
            res.status(400).json({ message: 'Invalid post ID'})
        }

        const post =  await postModel.findById(postId)

        if(!post) return res.status(404).json({message: 'post not found'})

        const isAlreadyLiked = await likeModel.findOne({
            post: postId,
            user: req.user._id
        })

        console.log(isAlreadyLiked)
        if(isAlreadyLiked){
            return res.status(200).json({message:'Post already liked'})
        }


        await likeModel.create({
            post: postId,
            user: req.user._id
        })


        await post.updateLikesCount()

        return res.status(200).json({message:'Post liked'})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:'Internal Server Error'})
    }
}