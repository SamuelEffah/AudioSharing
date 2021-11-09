import create from "zustand"
import {combine} from "zustand/middleware"
import { persist } from "zustand/middleware"


export const usePlayerStore = create(
  combine(
    {
      episode:{
        description: "",
        file_name: "",
        id: "",
        inserted_at: "",
        name: "Mars Journey",
        num_of_listeners: 0,
        podcast_id: "",
        poster: ""

      },
      ref: null,
      isPlaying: false,
      isPause: false,
      isLoading: false,
    },
    (set) => ({
        play: (episode) =>set({
            episode:{...episode},
            isPlaying: true,
            isPause: false,
            isLoading: false
          
        }),
        playCurrent: ()=> set({
            isPlaying: true,
            isPause: false,
        }),
        pause: ()=>set({
            isPlaying:false,
            isPause: true
        }),
        addRef: (ref)=>set({
          ref: ref
        })
        //TODO: next, prev, pause, fecth
    })
  )
);