// import cloudinary from 'cloudinary';
import {CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
var cloudinary = require('cloudinary').v2;

import dotenv  from 'dotenv';



dotenv.config();


cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;