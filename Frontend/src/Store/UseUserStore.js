// useUserStore.js
import { create } from "zustand";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch("https://noteapp-fullstack-6ksr.onrender.com/api/user", {
        credentials: "include",
      });

      const data = await res.json();
      // console.log("API Response:", data);

      // yahan direct set karo
      set({
        users: data.users || data, // agar response { users: [...] } hai to data.users lo
        loading: false,
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },


//  Delete user locally after successful API delete
  deleteUserFromStore: (userId) => {
    set((state) => ({
      users: Array.isArray(state.users) ? state.users.filter(user => user._id !== userId) : [],
    }));
  },


}));

export default useUserStore;
