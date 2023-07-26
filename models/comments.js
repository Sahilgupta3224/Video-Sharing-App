import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        //why unique is not true for userId
    },
    VideoId:{
        type:[String],
        required:true
    },
    des:{
        type:[String],
        required:true,
    },
    imgUrl:{
        type:String,
    },
    VideoUrl:{
        type:String,
    }
},{timestamps:true})

export default mongoose.model("Comment",CommentsSchema)