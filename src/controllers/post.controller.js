import { generateCationFromImageBuffer } from '../services/ai.service.js'


export const createPost = async (req, res, next)=>{
    const imageBuffer = req.file.buffer;

    const cation = await generateCationFromImageBuffer(imageBuffer)

 res.status(201).json({ cation })

}