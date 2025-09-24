import React, { useState } from "react";
import { FaRegSave, FaPencilAlt } from "react-icons/fa";
import { IoIosArrowBack, IoMdImages } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import useUserStore from "../Store/UseUserStore.js";
import { toast } from "react-toastify";
import LoadingEffects from "../Components/LoadingEffects.jsx";
import { GetToken } from "../Store/GetAuthToken.js";

function NotesDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { note: initialNote } = location.state || {};

  const [Edits, setEdits] = useState(false);
  const [ToggleImage, setToggleImage] = useState(false);
  const [fullscreenImg, setFullscreenImg] = useState(null);

  // Local note state to keep it reactive
  const [note, setNote] = useState(initialNote);
  const [title, setTitle] = useState(initialNote.title);
  const [content, setContent] = useState(initialNote.allDecriptions);

  const [TotalImages, setTotalImages] = useState(initialNote?.image || []);
  const [Loading, setLoading] = useState(false)

  // Zustand Updates
  const deleteUserFromStore = useUserStore(
    (state) => state.deleteUserFromStore
  );

  // Save function
  const handleSave = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://noteapp-fullstack-6ksr.onrender.com/api/notes/${note._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ title, allDecriptions: content }),
        }
      );

      const data = await response.json();
      toast.success(data.message)
      setNote((prev) => ({ ...prev, ...data })); // update local note state
      setEdits(false);

      // Update location.state as well
      navigate(location.pathname, {
        state: { ...location.state, note: { ...note, ...data } },
        replace: true,
      });
    } catch (error) {
      // console.error("Error updating note:", error);
      toast.error(error)
    }finally{
      setLoading(false)
    }
  };

  // Hare delete total Notes
const handleDeleteTotalNote = async () => {
  try {
    const response = await fetch(
      `https://noteapp-fullstack-6ksr.onrender.com/api/notes/${note._id}`,
      { method: "DELETE", 
        credentials: "include" , 
        body: {authToken: GetToken} , }
    );

    const data = await response.json();


    // ✅ Remove note from Zustand store
    deleteUserFromStore(note._id);

    // ✅ Navigate home
    window.location = "/";
  } catch (error) {
   
    toast.error(error)
  }finally{
    setLoading(false)
  }
};

  // Delete image
  const handleDelete = async (fileName) => {
    try {
      setLoading(true)
      const response = await fetch(
        `https://noteapp-fullstack-6ksr.onrender.com/api/notes/${note._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ filename: fileName }),
        }
      );

      const data = await response.json();
      // Update images locally
      toast.success(data.message)
      const updatedImages = TotalImages.filter(
        (img) => img.fileName !== fileName
      );
      setTotalImages(updatedImages);

      // Update local note state
      setNote((prev) => ({ ...prev, image: updatedImages }));

      // Update location.state as well
      navigate(location.pathname, {
        state: { ...location.state, note: { ...note, image: updatedImages } },
        replace: true,
      });

      
    } catch (error) {
      toast.success(error)
    }finally{
      setEdits(false);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="mt-5 ml-6 flex items-center justify-between w-[90vw]">
        <ul className="w-fit">
          <li className="background-icons text-3xl rounded-xl p-2 w-fit cursor-pointer">
            <Link onClick={() => navigate(-1)}>
              {" "}
              <IoIosArrowBack />{" "}
            </Link>
          </li>
        </ul>

        <ul className="w-fit flex gap-4">
          <li className="background-icons text-3xl rounded-xl p-3 w-fit cursor-pointer">
            {Edits ? (
              <FaRegSave className="text-xl" onClick={handleSave} />
            ) : (
              <FaPencilAlt className="text-xl" onClick={() => setEdits(true)} />
            )}
          </li>

          <li className="background-icons text-3xl rounded-xl p-3 w-fit cursor-pointer">
            <IoMdImages
              className="text-2xl"
              onClick={() => setToggleImage((prev) => !prev)}
            />
          </li>

          <li
            className={` ${
              Edits ? "flex" : "hidden"
            } background-icons text-3xl rounded-xl p-3 w-fit cursor-pointer`}
          >
            <MdDelete className="text-2xl" onClick={handleDeleteTotalNote} />
          </li>
        </ul>
      </nav>

      {/* Note Details */}
      <main className="w-screen p-5">
        {Edits ? (
          <>
            <input
              className="mt-5 text-4xl font-semibold background w-full border-b-2 border-gray-400 focus:outline-none p-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="mt-5 text-xl w-full border-b-2 border-gray-400 focus:outline-none background p-1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
          </>
        ) : (
          <>
            <h1 className="mt-5 text-4xl font-semibold">{note.title}</h1>
            <p className="mt-5 text-xl text-left">{note.allDecriptions}</p>
          </>
        )}
      </main>

      {/* Images Section */}
      {ToggleImage && (
        <div className="fixed inset-0 flex flex-col items-center justify-start p-5 overflow-y-scroll scrollbar-hide backdrop-blur-sm gap-5">
          <div className="relative rounded-lg background-icons p-3 ">
            <RxCross2
              className="text-2xl font-bold cursor-pointer"
              onClick={() => setToggleImage(false)}
            />
          </div>

          {TotalImages.length > 0 ? (
            TotalImages.map(
              (img) =>
                img.imageUrl && (
                  <div
                    key={img._id}
                    className="relative text-black w-[80%] shadow-lg overflow-hidden"
                    style={{ minHeight: "250px" }}
                  >
                    <img
                      src={img.imageUrl}
                      alt="noteImages"
                      loading="lazy"
                      className="object-contain w-full h-full z-[0] cursor-pointer"
                      onClick={() => setFullscreenImg(img.imageUrl)}
                    />

                    {Edits && (
                      <div className="absolute top-0 left-0 h-full w-full p-1 z-[10] flex items-center justify-center cursor-pointer backdrop-blur-sm">
                        <MdDelete
                          className="text-black text-4xl"
                          onClick={() => handleDelete(img.fileName)}
                        />
                      </div>
                    )}
                  </div>
                )
            )
          ) : (
            <p className="text-gray-500 mt-5">No images found for this note.</p>
          )}
        </div>
      )}

      {/* Fullscreen overlay */}
      {fullscreenImg && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <img
            src={fullscreenImg}
            alt="fullscreen"
            className="max-h-[90%] max-w-[90%] object-contain "
          />
          <button
            className="absolute top-5 right-5 text-white text-2xl p-2 bg-red-500 rounded"
            onClick={() => setFullscreenImg(null)}
          >
            <RxCross2 />
          </button>
        </div>
      )}
      {Loading && <LoadingEffects />}
    </>
  );
}

export default NotesDetails;
