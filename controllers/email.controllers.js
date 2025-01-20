import fs from "fs/promises";
import path from "path";
import Handlebars from "handlebars";

export const getEmailLayout = async (req, res) => {
    try {
        const layout = await fs.readFile("./templates/layout.html", "utf-8");
        res.send(layout);
    } catch (error) {
        res.status(500).send("Error reading template file");
    }
};

export const renderAndDownloadTemplate = async (req, res) => {
    try {
        const config = req.body;
        const layout = await fs.readFile("templates/layout.html", "utf-8");

        const template = Handlebars.compile(layout);
        const rendered = template(config);

        res.setHeader("Content-Type", "text/html");
        res.setHeader("Content-Disposition", "attachment; filename=email-template.html");
        res.send(rendered);
    } catch (error) {
        // console.log(error);
        res.status(500).send("Error rendering template");
    }
};
