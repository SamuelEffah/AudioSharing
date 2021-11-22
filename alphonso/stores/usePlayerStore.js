import create from "zustand"
import {combine} from "zustand/middleware"
import { persist } from "zustand/middleware"


export const usePlayerStore = create(
  combine(
    {
      episode:{
        description: "",
        episodes: "",
        id: "",
        inserted_at: "",
        name: "",
        num_of_listeners: 0,
        podcast_id: "",
        poster_url: ""

      },
      ref: null,
      isPlaying: false,
      isPause: false,
      isLoading: false,
    },
    (set) => ({
        play: (data) =>set({
            episode:{
              ...data,
              episodes: 'http://localhost:5000/api/v1/audio/?fl='+data.episodes
            
            },
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