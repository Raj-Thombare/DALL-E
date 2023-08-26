import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../database/models/post.js";

dotenv.config();

const router = express.Router();

router.get("/api/v1/post", (req, res) => {
  res.send("Post");
});

export default router;
