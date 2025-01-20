# Email Template API

This is a  backend for managing email templates, uploading images, and rendering email layouts using Express.js and MongoDB.

## Features
- Create and store email templates
- Retrieve all saved email templates
- Render email templates with dynamic content
- Upload images to Cloudinary
- Download rendered email templates

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- Handlebars (for template rendering)
- Multer (for file uploads)
- Cloudinary (for image storage)
```

## Environment Variables

PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running the Server

Start the development server:
```sh
npm start
```

## API Endpoints

### Email Templates
- **POST** `/api/uploadEmailConfig` - Upload a new email template
- **GET** `/api/getAllEmailTemplates` - Get all saved templates

### Email Rendering
- **GET** `/api/getEmailLayout` - Get the email layout
- **POST** `/api/renderAndDownloadTemplate` - Render and download an email template

### Image Upload
- **POST** `/api/uploadImage` - Upload an image to Cloudinary

## Folder Structure
```
- controllers/    # Contains API logic
- models/         # Mongoose schema
- routes/         # API routes
- templates/      # HTML templates for emails
- uploads/        # Temporary file storage
- server.js       # Main server file
```
