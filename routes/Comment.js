import express from "express";
import {addComment,editComment,deleteComment,getComments} from '../controllers/comment.js'
const router = express.Router();
import { verifyToken } from "../Verify.js";

router.post("/",verifyToken,addComment);
router.put("/:id",verifyToken,editComment);
router.delete("/:id",verifyToken,deleteComment);
router.get("/:VideoId",verifyToken,getComments);
export default router;