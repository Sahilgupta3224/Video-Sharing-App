import Video from '../models/video.js';
import User from '../models/user.js';

export const ErrorMessage = (status,message)=>{
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
  }

export const AddVideo=async(req,res,next)=>{
    const newVideo =  new Video({userId:req.body.id,...req.body});
    try{
        const newVideoSave = await newVideo.save();
        res.status(200).json(newVideoSave);
    }catch(err){
        next(err);
    }
}

export const EditVideo=async(req,res,next)=>{
    try{
        const videoweneed = await Video.findById(req.params.id);
    if(!videoweneed){
        return next(createError(404,"Video not found"));
    }
    if(req.User.id===Video.userId){
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true})
        res.status(200).json(updatedVideo);
    }
    else{
        next(ErrorMessage(403,"apni video edit kr dusro ki nahi"))
    }
    }catch(err){
        next(err)
    }
}

export const DeleteVideo=async(req,res,next)=>{
    try{
        const videoweneed = await Video.findById(req.params.id);
    if(!videoweneed){
        return next(createError(404,"Video not found"));
    }
        if(req.User.id===Video.userId){
            await Video.findByIdAndRemove(req.params.id);
            res.status(200).json("video deleted");
        }
        else{
            next(ErrorMessage(403,"apni video delete kr dusro ki nahi"))
        }
    }catch{
        next(err)
    }
  }

export const GetVideo=async(req,res,next)=>{
    try{
        const videoweneed = await Video.findById(req.params.id);
        res.status(200).json(videoweneed);
    }catch{
        next(err);
    }
}

export const addView=async(req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
           $inc:{views:1}, 
        });
        res.status(200).json("views increased");
    }catch{
        next(err);
    }
}

export const trend=async(req,res,next)=>{
    try{
        const trending = await Video.find().sort({views:-1});
        res.status(200).json(trending);
    }catch{
        next(err);
    }
}

export const random =async(req,res,next)=>{
    try{
        const randomvideos = await Video.aggregate([{$sample:{size:50}}]);
        res.status(200).json(randomvideos);
    }catch{
        next(err);
    }
}

export const subscribedVideos = async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedusers;
  
      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await Video.find({ userId: channelId });
        })
      );
  
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
      console.log(err)
    }
  };

export const tagVideo=async(req,res,next)=>{
    const { tags } = req.query;
  try {
    const videos = await Video.find({ tags: { $in: tags } });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
}

export const search = async (req, res, next) => {
    const { query } = req.query;
    try {
      const videos = await Video.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { des: { $regex: query, $options: 'i' } },
          { tags: { $regex: query, $options: 'i' } },
        ],
      });
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
};

export const likeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};


export const dislikeVideo = async(req,res,next)=>{
    const id = req.user.id;
    const videoId = req.params.id;
    try {
      const video = await Video.findByIdAndUpdate(
        videoId,
        { $addToSet: { dislikes:id },$pull:{likes:id} },
        { new: true }
      );
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
}

