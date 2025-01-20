import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';
import fs from 'fs';
import path from 'path';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = path.basename(file.originalname, fileExtension);
    cb(null, `${fileName}-${Date.now()}${fileExtension}`);
  },
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, 
    }
}).single('image'); 
 
export const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) { 
            return res.status(400).json({ error: err.message });
        } else if (err) { 
            return res.status(500).json({ error: 'An unknown error occurred' });
        } 
        next();
    });
};

export const uploadImage = async (req, res) => {
    try {
        console.log('Request file:', req.file); 

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const result = await cloudinaryV2.uploader.upload(req.file.path);
        console.log('Cloudinary result:', result); 

        await fs.promises.unlink(req.file.path);

        return res.status(200).json({
            imageUrl: result.secure_url,
            message: 'Image uploaded successfully'
        });

    } catch (error) {
        console.error('Upload error:', error); 
        return res.status(500).json({
            error: "Error uploading to Cloudinary",
            details: error.message
        });
    }
};