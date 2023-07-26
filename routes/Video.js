import express from "express";
import {AddVideo,EditVideo,GetVideo,DeleteVideo,addView,mostviewed,random,subscribedVideos,tagVideo,search, likeVideo, dislikeVideo} from '../controllers/Videos.js'
import { verifyToken } from "../Verify.js";
const router = express.Router();

router.post("/",verifyToken,AddVideo);
router.put("/:id",verifyToken,EditVideo)
router.get("/GetVideo/:id",verifyToken,GetVideo)
router.delete("/delete/:id",verifyToken,DeleteVideo)
router.put("/addView/:id", verifyToken,addView)
router.get("/mostviewed",verifyToken,mostviewed)
router.get("/random",verifyToken,random)
router.get("/sub",verifyToken, subscribedVideos)
router.get("/tags",verifyToken,tagVideo)
router.get("/search",verifyToken,search)
router.put("/like/:id",verifyToken,likeVideo)
router.put("/dislike/:id",verifyToken,dislikeVideo)
export default router;