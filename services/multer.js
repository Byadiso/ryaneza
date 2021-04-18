import multer from "multer";
import cloudinary  from "cloudinary" ;
import { CloudinaryStorage }  from "multer-storage-cloudinary" ;



const storage =  new CloudinaryStorage({  
    cloudinary: cloudinary,  
    folder: "myProperty",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    
    });


var upload = multer({ storage: storage });


export default  upload;

