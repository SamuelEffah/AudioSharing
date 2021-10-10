
import create from "zustand"
import {combine} from "zustand/middleware"



export const useProfileStore = create(
  combine(
    {
        profile: {}
    },
    (set) => ({
        addProfile: (p) =>set({
            profile: p
        }),
        updateProfile: (info)=> set((s)=>({
          profile: {...s.profile, ...info}
        }))
    })
  )
);