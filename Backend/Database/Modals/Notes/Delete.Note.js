// Backend: DeleteNote.js
import NoteSchema from "../../Schema/Notes.Schema.js";
import deleteImg from "../../Cloudinary/DeleteImg.js"; // Cloudinary delete function

const DeleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Note ID is required" });

    const noteToDelete = await NoteSchema.findById(id);
    if (!noteToDelete) return res.status(404).json({ message: "Note not found" });

    // Delete associated images from Cloudinary
    if (noteToDelete.image && noteToDelete.image.length > 0) {
      for (const img of noteToDelete.image) {
        if (img.fileName) {
          await deleteImg(img.fileName);
        }
      }
    }

    // Delete note from DB
    await NoteSchema.findByIdAndDelete(id);

    res.status(200).json({ message: "Note and associated images deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default DeleteNote;
