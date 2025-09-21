import deleteImg from "../../Cloudinary/DeleteImg.js";
import NoteSchema from "../../Schema/Notes.Schema.js"

const UpdateNote = async (req, res) => {
  try {
    const { title, filename , allDecriptions } = req.body;
    const image = req.file?.path;

    console.log(filename);
    
     const note = await NoteSchema.findById(req.params.id);

    if (!note) return res.status(404).json({ error: "Note not found" });


       if (filename) {
      // Delete from Cloudinary
      await deleteImg(filename);

      // Remove from note.image array
      note.image = note.image.filter(img => img.fileName !== filename);

      // Save updated note
      await note.save();
    }


    const updatedData = {};
    if (title) updatedData.title = title;
    if (allDecriptions) updatedData.allDecriptions = allDecriptions;
    if (image) updatedData.image = image;

    const updatedUser = await NoteSchema.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("found error", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default UpdateNote;
