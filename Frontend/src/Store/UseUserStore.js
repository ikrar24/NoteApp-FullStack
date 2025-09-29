// Store/UseUserStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  users: null, // user object (not array)
  loading: false,
  error: null,

  // Fetch logged-in user
  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const res = await fetch("https://noteapp-fullstack-6ksr.onrender.com/api/user", {
        credentials: "include",
      });
      const data = await res.json();
      set({ users: data, loading: false }); // ✅ direct user object
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Add new note to current user (local update)
  addNoteToUser: (newNote) => {
    set((state) => {
      if (!state.users?.user) return state;
      return {
        users: {
          ...state.users,
          user: {
            ...state.users.user,
            notes: [newNote, ...(state.users.user.notes || [])],
          },
        },
      };
    });
  },

  // Update an existing note
  updateNoteInUser: (updatedNote) => {
    set((state) => {
      if (!state.users?.user) return state;
      return {
        users: {
          ...state.users,
          user: {
            ...state.users.user,
            notes: state.users.user.notes.map((note) =>
              note._id === updatedNote._id ? updatedNote : note
            ),
          },
        },
      };
    });
  },

  // Delete a note by ID
  deleteNoteFromUser: (noteId) => {
    set((state) => {
      if (!state.users?.user) return state;
      return {
        users: {
          ...state.users,
          user: {
            ...state.users.user,
            notes: state.users.user.notes.filter((note) => note._id !== noteId),
          },
        },
      };
    });
  },
}));

export default useUserStore;
