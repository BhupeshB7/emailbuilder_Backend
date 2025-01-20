import emailTemplateModel from "../models/emailTemplate.model.js";
export const uploadEmailConfig = async (req, res) => {
  try {
    const {
      title,
      content,
      titleFontSize,
      titleFontColor,
      titleAlign,
      contentFontSize,
      contentFontColor,
      contentAlign,
      imageUrl,
    } = req.body;
    if (!title || !content) {
      return res.status(400).send("Please provide all the fields");
    }
    const config = {
      title,
      content,
      titleFontSize,
      titleFontColor,
      titleAlign,
      contentFontSize,
      contentFontColor,
      contentAlign,
      imageUrl,
    };
     await emailTemplateModel.create(config);
    res.status(200).json({ message: "Configuration saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving configuration" });
  }
};

//get all the email templates
export const getAllEmailTemplates = async (req, res) => {
  try {
    const templates = await emailTemplateModel.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching email templates" });
  }
};
