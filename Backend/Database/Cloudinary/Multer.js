import multer from "multer"
import {CloudinaryStorage} from "multer-storage-cloudinary"
import cloudinary from "./CloudinaryConfig.js"


const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "User_profiles",
        allowed_formats:["jpg", "png" , "jpeg"],
        public_id:(req, file) => Date.now() + '_' + file.originalname.split('.')[0],
    }
})

const upload = multer({storage})

export default upload