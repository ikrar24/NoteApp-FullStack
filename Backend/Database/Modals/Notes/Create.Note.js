import NoteSchema from "../../Schema/Notes.Schema.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserSchema from "../../Schema/User.Schema.js";

dotenv.config();

const CreateNote = async (req, res) => {
 try {
 const { title, allDecriptions } = req.body;

 const token = req.cookies.authToken;

 
 

 if (!token) {
 return res.status(401).json({ message: "You're not an authorized user" });
 }

 // ✅ Decode token
 const decoded = jwt.verify(token, process.env.TOKEN_SECRETE);


 

 const authUserId = decoded.userID;



 


 // ✅ Validation
 if (!title || !allDecriptions) {
 return res.status(400).json({ message: "All fields are required" });
 }

// ✅ Handle images (if any)
const image = req.files?.map(file => ({
imageUrl: file.path,
 fileName: file.filename
 })) || [];

if (image.length > 5) {
 return res.status(400).json({ message: "Maximum 5 images allowed" });
 }


// ✅ Create note
const note = await NoteSchema.create({
  title,
  allDecriptions,
  image,
  createdBy: authUserId
});

// ✅ Add note to user.notes array
const updatedUser = await UserSchema.findByIdAndUpdate(
  authUserId,
  { $push: { notes: note._id } },
  { new: true }
).populate("notes");






 res.status(201).json({
 message: "Note created successfully",
 note
 });


 } catch (error) {
  console.log("CreateNote Error: ", error);
 res.status(500).json({ error: "Internal Server Error", details: error.message });
 }
};

export default CreateNote;
