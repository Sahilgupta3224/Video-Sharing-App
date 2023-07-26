import express from "express";
import {getUser,removeUser,subscribe,unsubscribe,update} from '../controllers/Users.js'
import { verifyToken } from "../Verify.js";
const router = express.Router();

router.put("/:id",verifyToken,update);
router.get("/getUser/:id",verifyToken,getUser)
router.put("/unsubscribe/:id",verifyToken,unsubscribe)
router.delete("/delete/:id",verifyToken,removeUser)
router.put("/subscribe/:id",verifyToken,subscribe)
export default router;