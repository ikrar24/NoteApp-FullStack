import { v2 as cloudinary } from "cloudinary"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"


// cloudinary Storage folder setup 

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"NotesImages",
        allowed_formats:["jpg" , "png" , "jpeg" , "webp"], 
    }
})

const uploadNotes = multer({
    storage:storage,
})


export default uploadNotes 