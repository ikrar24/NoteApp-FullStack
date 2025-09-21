import  express  from "express";
import uploadNotes from "../../Cloudinary/Note.Config.Cloudinary.js";
import CreateNote from "./Create.Note.js";
import DeleteNote from "./Delete.Note.js";
import UpdateNote from "./Update.Note.js";

const NoteRoutes = express.Router();

NoteRoutes.post("/" , uploadNotes.array("noteImage", 5) , CreateNote )

NoteRoutes.put("/:id" , uploadNotes.array("noteImage", 5) , UpdateNote )

NoteRoutes.delete("/:id", DeleteNote)

export default NoteRoutes;