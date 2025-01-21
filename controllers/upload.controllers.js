import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';
import streamifier from 'streamifier';

const storage = multer.memoryStorage();  
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }  
}).single('image');

export const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // console.error('Multer error:', err);
            return res.status(500).json({ error: 'An unknown error occurred' });
        }
        next();
    });
};

export const uploadImage = async (req, res) => {
    try {
        // console.log('Request file:', req.file);

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
 
        const uploadFromBuffer = () => {
            return new Promise((resolve, reject) => {
                let stream = cloudinaryV2.uploader.upload_stream(
                    { folder: "your_folder_name" },  
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await uploadFromBuffer();
        // console.log('Cloudinary result:', result);

        return res.status(200).json({
            imageUrl: result.secure_url,
            message: 'Image uploaded successfully'
        });

    } catch (error) {
        // console.error('Upload error:', error);
        return res.status(500).json({
            error: "Error uploading to Cloudinary",
            details: error.message
        });
    }
};
