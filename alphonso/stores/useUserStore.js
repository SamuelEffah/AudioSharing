
import create from "zustand"
import {combine} from "zustand/middleware"



export const useUserStore = create(
  combine(
    {
        user: {}
    },
    (set) => ({
        addUser: (p) =>set({
            user: p
        }),
        updateUser: (info)=> set((s)=>({
          user: {...s.user, ...info}
        }))
    })
  )
);