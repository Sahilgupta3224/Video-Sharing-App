import User from "../models/user.js"

export const ErrorMessage = (status,message)=>{
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
  }
export const removeUser =async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted")
        }catch(err){
            next(err)
        }
    }
    else{
        return next(ErrorMessage(403,"you can delete only your account"))
    }
}
export const update =async(req,res,next)=>{
    if(req.params.id === req.user.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            });
            res.status(200).json(updatedUser)
        }catch(err){
            next(err)
        }
    }
    else{
        return next(ErrorMessage(403,"you can update only your account"))
    }
}
export const getUser = async(req,res,next)=>{
    try{
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser)
    }catch(err){
        next(err)
    }
}
export const subscribe =async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedusers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        })
        res.status(200).json("ho gaya subscribe")
    }catch(err){
        next(err)
    }
}

export const unsubscribe =async (req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedusers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $dec:{subscribers:1}
        })
        res.status(200).json("ho gaya unsubscribe")
    }catch(err){
        next(err)
    }
}
