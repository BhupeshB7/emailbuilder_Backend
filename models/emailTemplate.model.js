import mongoose from "mongoose";

const emailTemplateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    titleFontSize: { type: String, default: "16px" },
    titleFontColor: { type: String, default: "#000000" },
    titleAlign: {
      type: String,
    },
    contentFontSize: { type: String, default: "14px" },
    contentFontColor: { type: String, default: "#000000" },
    contentAlign: {
      type: String,
    },
    imageUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("EmailTemplate", emailTemplateSchema);
