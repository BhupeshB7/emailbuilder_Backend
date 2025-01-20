import express from "express";
import { uploadImage, uploadMiddleware } from "../controllers/upload.controllers.js";

const uploadRouter = express.Router();

uploadRouter.post("/uploadImage",uploadMiddleware, uploadImage);

export default uploadRouter;
