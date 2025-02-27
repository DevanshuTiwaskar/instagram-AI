import postModel from "../models/post.js";
import likeModel from "../models/likes.js";
import { generateCationFromImageBuffer } from "../services/ai.service.js";
import { uploadFile } from "../services/cloudstorage.service.js";

export const createPost = async (req, res, next) => {
  try {
    const imageBuffer = req.file?.buffer;

    if (!imageBuffer) {
      return res.status(400).json({ message: "Image is require" });
    }
    //const cation = await generateCationFromImageBuffer(imageBuffer)
    // const fileData = await uploadFile(imageBuffer)

    const [caption, fileData] = await Promise.all([
      generateCationFromImageBuffer(imageBuffer),
      uploadFile(imageBuffer),
    ]);

    const newPost = await postModel.create({
      caption,
      media: fileData,
      author: req.user._id,
    });

    res.status(201).json({
      post: newPost,
      message: "post created successfully",
    });
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};


export const getAllPosts = async (req, res, next) => {
   
    try {
         const limit =  req.query.limit || 10;   //// 10 is default limit

         const recentPost  = await  postModel.getRecentPosts(limit)
            res.status(200).json({
                posts: recentPost
            })
          
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }

}







export const likePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    if (!postModel.isValidPostId(postId)) {
      return res.status(400).json({ message: "Invalid Post ID" });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isAlreadyLiked = await likeModel.findOne({
      post: postId,
      user: req.user._id,
    });

    if (isAlreadyLiked) {
      return res.status(200).json({ message: "Post already liked" });
    }

    await likeModel.create({
      post: postId,
      user: req.user._id,
    });

    await post.incrementLikeCount();

    res.status(200).json({ message: "Post liked" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};




export const removeLikePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    if (!postModel.isValidPostId(postId)) {
      return res.status(400).json({ message: "Invalid Post ID" });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userLikedPost = await likeModel.findOne({
      post: postId,
      user: req.user._id,
    });

    if (!userLikedPost) {
      return res.status(200).json({ message: "Post not liked" });
    }

    await likeModel.findOneAndDelete({
      post: postId,
      user: req.user._id,
    });

    await post.decrementLikeCount();

    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};
