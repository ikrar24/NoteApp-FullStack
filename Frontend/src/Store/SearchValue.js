import { create } from "zustand"




const useSearchStore = create((set)=>({
initialValue:"",
setInitialValue:(value)=>set({initialValue:value})


}))

export { useSearchStore}