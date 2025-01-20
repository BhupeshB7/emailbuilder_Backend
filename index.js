import express from "express";
import cors from "cors";
import { v2 as cloudinaryV2 } from "cloudinary";
import emailRoutes from "./routes/email.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import configRoutes from "./routes/config.routes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();
const app = express();

app.use(express.json());
app.use(cors({ origin: "https://emailbuildertemplate.netlify.app" }));
app.use("/uploads", express.static("uploads"));
 
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api", emailRoutes);
app.use("/api", uploadRoutes);
app.use("/api", configRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
