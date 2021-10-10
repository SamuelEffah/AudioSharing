import create from "zustand"
import {combine} from "zustand/middleware"
import { persist } from "zustand/middleware"


export const useTokenStore = create(persist(
  combine(
    {
      isTokens: false,
      accessToken: null,
      refreshToken: null
    },
    (set) => ({
        addTokens: (a,r) =>set({
            isTokens: true,
            accessToken: a,
            refreshToken: r
        }), 
        clearTokens:()=> set({
          isTokens: false,
          accessToken: null,
          refreshToken: null
        })
    })
  )
));