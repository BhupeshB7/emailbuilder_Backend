import express from "express";
import { getEmailLayout, renderAndDownloadTemplate } from "../controllers/email.controllers.js";

const emailRouter = express.Router();

emailRouter.get("/getEmailLayout", getEmailLayout);
emailRouter.post("/renderAndDownloadTemplate", renderAndDownloadTemplate);

export default emailRouter;
