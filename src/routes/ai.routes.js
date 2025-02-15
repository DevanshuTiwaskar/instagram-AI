import { Router } from "express"
import generateContent from "../services/ai.service.js";

const router =  Router();


router.get('/', async(req,res)=>{


    const prompt = req.query.prompt;
    const response = await generateContent(prompt)


    res.status(200).json({response})
})


export const generateCationFromImageBuffer = async (imageBuffer) =>{
    const result = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(imageResp).toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        'Caption this image.',
    ]);

    return result.response.text()
}




export default router;



///2:30:00