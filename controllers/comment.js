import Video from '../models/video.js';
import User from '../models/user.js';
import Comment from "../models/comments.js";

export const ErrorMessage = (status,message)=>{
  const error = new Error();
  error.status = status;
  error.message = message;
  return error;
}

export const addComment=async(req,res,next)=>{
    const comment = new Comment({userId:req.user.id,...req.body})
    try{
        const newc = await comment.save();
        res.status(200).json(newc);
    }catch(err){
        next(err);
    }
}

export const editComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return next(createError(404, "Comment not found"));
      }
      if (req.user.id === comment.userId) {
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedComment);
      } else {
        return next(ErrorMessage(403, "apna comment edit kr dusro ka nahi"));
      }
    } catch (err) {
      next(err);
    }
  };

export const deleteComment=async(req,res,next)=>{
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
          return next(ErrorMessage(404, "Comment not found"));
        }
        const video = await Video.findById(req.params.id);
        if (req.user.id === comment.userId || req.user.id === video.userId) {
          await Comment.findByIdAndDelete(req.params.id);
          res.status(200).json("The comment has been deleted.");
        } else {
          return next(ErrorMessage(403, "apna comment delete kr dusro ka nahi"));
        }
      } catch (err) {
        next(err);
      }
}

export const getComments=async(req,res,next)=>{
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        res.status(200).json(comments);
      } catch (err) {
        next(err);
      }
}