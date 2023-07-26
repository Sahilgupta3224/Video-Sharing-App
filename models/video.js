import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
    },
    likes:{
        type:[String],
        default:[],
    },
    dislikes:{
        type:[String],
        default:[],
    },  
    tags:{
        type:[String],
        default:[],
        index:true,
    },
    //likes should be a number dont know why it is striing here
    views:{
        type:Number,
        default:0,
    },
    des:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String,
        required:true,
    },
    VideoUrl:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required: true,
      },
},{timestamps:true})

export default mongoose.model("Video",VideoSchema)