import postModel from '../models/post.js';
import { generateCationFromImageBuffer } from '../services/ai.service.js'
import { uploadFile } from '../services/cloudstorage.service.js';


export const createPost = async (req, res, next)=>{
    const imageBuffer = req.file.buffer;
     if(!imageBuffer){
        return res.status(400).json({message: "Image is require"})
     }
    //const cation = await generateCationFromImageBuffer(imageBuffer)
    // const fileData = await uploadFile(imageBuffer)

    const [ cation, fileData ] = await  Promise.all([
        generateCationFromImageBuffer(imageBuffer),
        uploadFile(imageBuffer)
    ])


    const newPost = await postModel.create({
        cation,
        media: fileData,
        author: req.user._id
    })



 res.status(201).json({ 
    post: newPost,
    message: "post created successfully"
  })

}