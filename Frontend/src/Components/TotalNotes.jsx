import React, { useEffect } from "react";
import useUserStore from "../Store/UseUserStore";
import { useSearchStore } from "../Store/SearchValue";
import LoadingEffects from "./LoadingEffects";
import { Link } from "react-router-dom"
function TotalNotes() {
  const { error, fetchUsers, loading, users } = useUserStore();
  const { initialValue } = useSearchStore();




  // Get all notes safely
  const allNotes = users?.user?.notes || [];

  // Search query
  const query = initialValue?.trim().toLowerCase() || "";

  // Filter notes based on search query
  const filteredNotes =
    query === ""
      ? allNotes
      : allNotes.filter((note) => note.title.toLowerCase().includes(query));

  // Colors for notes (when no search query)
  const colors = ["bg-green-400", "bg-red-300", "bg-yellow-200"];

  return (
    <main className="flex items-center justify-start w-screen mt-5 flex-col gap-7 overflow-y-auto scrollbar-hide px-5 pb-20 h-[calc(100vh-80px)]">
      {loading ? (
       <LoadingEffects/>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredNotes.length === 0 ? (
        <p className="text-gray-500">No notes found</p>
      ) : (
        filteredNotes.map((note, index) => (
          <Link
          to={`/notedetails/${note._id}`}
            key={note._id}
             state={{ note }}
            className={`flex items-start justify-start flex-col gap-5 w-[90%] p-5 rounded-md md:p-12 ${
              query ? "bg-blue-200" : colors[index % colors.length]
            }`}
          >
            <div>
              <h1 className="text-xl text-black">{note.title}</h1>
            </div>
          </Link>
        ))
      )}
    </main>
  );
}

export default TotalNotes;
