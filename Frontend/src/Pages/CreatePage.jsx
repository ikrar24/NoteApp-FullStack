import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import LoadingEffects from "../Components/LoadingEffects";
import ImageUploading from "react-images-uploading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GetToken } from "../Store/GetAuthToken";
import useUserStore from "../Store/UseUserStore";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]); // react-images-uploading format
  const [loading, setLoading] = useState(false);
  const maxNumber = 5;
  const navigate = useNavigate();

  const addNoteToUser = useUserStore((state) => state.addNoteToUser);
 
 
 
  const handleSave = async () => {
    if (!title && !content && images.length === 0) {
      toast.warn("Please add something before saving!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("allDecriptions", content);

      images.forEach((img) => {
        formData.append("noteImage", img.file); // append each file
      });

      const response = await fetch(
        "https://noteapp-fullstack-6ksr.onrender.com/api/notes",
        {
          method: "POST",
          credentials: "include", // ✅ send cookies
          body: formData, authToken: GetToken ,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save note");
      }

      const data = await response.json();
      console.log("Note saved:", data);
      toast.success(data.message);
        if (data.note) {
        addNoteToUser(data.note);
      }


      // Reset form
      setTitle("");
      setContent("");
      setImages([]);

      // Optional: navigate to home or note list after saving
      navigate("/"); 
    } catch (error) {
      console.error("Save Note Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-fit">
        {/* Navbar */}
        <nav className="mt-5 ml-6 flex items-center justify-between w-[90vw]">
          <ul className="w-fit">
            <li className="background-icons text-3xl rounded-xl p-2 w-fit cursor-pointer">
              <a href="/"> <IoIosArrowBack /> </a>
            </li>
          </ul>

          <ul className="w-fit">
            <li
              onClick={handleSave}
              className={`background-icons text-3xl rounded-xl p-2 w-fit cursor-pointer ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <FaRegSave />
            </li>
          </ul>
        </nav>

        {/* Inputs */}
        <div className="flex items-center justify-center flex-col w-screen mt-10 gap-2">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value.trimStart())}
            className="w-[95%] p-5 background text-4xl outline-none"
          />
          <textarea
            name="Notes"
            placeholder="Type Something"
            value={content}
            onChange={(e) => setContent(e.target.value.trimStart())}
            className="w-[95%] h-[50vh] p-5 background text-xl outline-none"
          ></textarea>

          <ImageUploading
            multiple
            value={images}
            onChange={(imageList) => setImages(imageList)}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
              <div className="flex flex-col items-center w-[95%] mt-3">
                <button
                  type="button"
                  onClick={onImageUpload}
                  {...dragProps}
                  className="background-icons shadow-sm p-3 px-4 rounded-xl"
                  disabled={loading} // disable while saving
                >
                  Upload Images (Max {maxNumber})
                </button>

                {/* Scrollable Preview */}
                <div className="flex flex-wrap gap-3 mt-3 w-full max-h-[400px] overflow-y-auto">
                  {imageList.map((image, index) => (
                    <div key={index} className="relative w-[150px] h-[150px]">
                      <img
                        src={image.data_url}
                        alt={`Note Image ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => onImageRemove(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
      </section>

      {loading && <LoadingEffects />}
    </>
  );
}

export default CreatePage;
