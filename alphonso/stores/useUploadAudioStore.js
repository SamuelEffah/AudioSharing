
import create from "zustand"
import {combine} from "zustand/middleware"



export const useUploadAudioStore = create(
  combine(
    {
        file: null,
        status: null,
  
    },
    (set) => ({
        addFile: (p) =>set({
            file: p
        }),
        updateStatus: (status)=> set((s)=>({
            status: status
        }))

    })
  )
);