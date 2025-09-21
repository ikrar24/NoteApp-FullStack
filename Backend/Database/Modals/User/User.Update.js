import deleteImg from "../../Cloudinary/DeleteImg.js";
import UseSchema from "../../Schema/User.Schema.js";

const UpdateUserImg = async (req, res) => {
  try {
    const { fullName, filename , bio } = req.body;
    const file = req.file;

    // Prepare updated data object
    const updatedData = {};
    if (fullName) updatedData.fullName = fullName;
    if (bio) updatedData.bio = bio;

    if (filename) {
      // Delete old image from Cloudinary
      await deleteImg(filename , updatedData);
    }

    if (file) {
      updatedData.profileImage = {
        Image: file.path,
        imageName: file.filename,
      };
    }

    const updatedUser = await UseSchema.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

console.log("BODY", req.body);
console.log("FILE", req.file);
console.log("UPDATED DATA", updatedData);




    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("found error", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default UpdateUserImg;
