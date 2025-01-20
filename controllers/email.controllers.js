import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
 
const url = import.meta.url;
const __dirname = path.dirname(fileURLToPath(url));
const TEMPLATE_PATH = path.join(__dirname, "../templates/layout.html");
// console.log(TEMPLATE_PATH);
export const getEmailLayout = async (req, res) => {
    try {
        const layout = await fs.readFile(TEMPLATE_PATH, "utf-8");
        res.send(layout);
    } catch (error) {
        // console.error("Error reading template file:", error);
        res.status(500).send("Error reading template file");
    }
};

export const renderAndDownloadTemplate = async (req, res) => {
    try {
        const config = req.body;
        if(!config.title || !config.content) {
            return res.status(400).send("Please provide all the fields");
        }
        const layout = await fs.readFile(TEMPLATE_PATH, "utf-8");

        const template = Handlebars.compile(layout);
        const rendered = template(config);

        res.setHeader("Content-Type", "text/html");
        res.setHeader("Content-Disposition", "attachment; filename=email-template.html");
        res.send(rendered);
    } catch (error) {
        // console.log("Error rendering template:", error);
        res.status(500).send("Error rendering template");
    }
};
