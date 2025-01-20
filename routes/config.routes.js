import express from "express";
import { getAllEmailTemplates, uploadEmailConfig } from "../controllers/config.controllers.js";

const configRouter = express.Router();

configRouter.post("/uploadEmailConfig", uploadEmailConfig);
configRouter.get("/getAllEmailTemplates", getAllEmailTemplates);

export default configRouter;
