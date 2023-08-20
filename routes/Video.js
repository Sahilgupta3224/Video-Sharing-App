import express from "express";
import {AddVideo,EditVideo,GetVideo,DeleteVideo,addView,trend,random,subscribedVideos,tagVideo,search, likeVideo, dislikeVideo} from '../controllers/Videos.js'
import { verifyToken } from "../Verify.js";
const router = express.Router();

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
  

router.post("/",AddVideo);
router.put("/:id",authMiddleware,EditVideo)
router.get("/GetVideo/:id",authMiddleware,GetVideo)
router.delete("/delete/:id",authMiddleware,DeleteVideo)
router.put("/addView/:id", authMiddleware,addView)
router.get("/mostviewed",trend)
router.get("/random",random)
router.get("/sub",verifyToken,subscribedVideos)
router.get("/tags",tagVideo)
router.get("/search",search)
router.put("/like/:id",likeVideo)
router.put("/dislike/:id",authMiddleware,dislikeVideo)
export default router;