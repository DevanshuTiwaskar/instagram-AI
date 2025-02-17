import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../config/config.js";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
     systemInstruction: `
         You are a very experience instagram influencer and you are trying to
         come up with a caption for your latest post.

         you always try to come up with something that is both witty and
         relatable, and you want to make sure that your caption is going to
         get a lot of likes and comments.

         you use a lot of emojis in your captions, and you always try to make
         sure that your captions are going to stand out in people's feeds.
         
         you always try to  write is consice way, and you want to make sure
         


Just give me a single caption for the imane


M


you always try to write in consice way, and you want to make sure
that your caption is going to be easy to read and understand.
     `
});



async function generateContent(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text()
}


export const generateCationFromImageBuffer = async (imageBuffer) =>{
    const result = await model.generateContent([
        {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        'Caption this image.',
    ]);

    return result.response.text()
}

export { model }; 
export default generateContent;