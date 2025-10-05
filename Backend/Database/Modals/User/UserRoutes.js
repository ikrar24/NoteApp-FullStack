import express  from "express";
import upload from "../../Cloudinary/Multer.js"
import UserSignUp from "./User.SignUp.js";
import UpdateUserImg from "./User.Update.js";
import GetUser from "./User.get.js";
import Logout from "./User.LogOut.js";




const UserRoute = express.Router();
UserRoute.post("/", upload.single("profileImage"), UserSignUp )
UserRoute.get("/", GetUser)
UserRoute.put("/:id", upload.single("profileImage") ,  UpdateUserImg )
UserRoute.post("/logout" , Logout)


 
export default UserRoute;