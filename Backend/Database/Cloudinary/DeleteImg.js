
import cloudinary from "./CloudinaryConfig.js"


const deleteImg = async(filename,updatedData )=>{
    try {

       
        



await cloudinary.uploader.destroy(filename);

    } catch (error) {
        console.log("Error From Deleting Image" , error);
    }


}


export default deleteImg;