import create from "zustand"
import {combine} from "zustand/middleware"
import { persist } from "zustand/middleware"


export const usePodcastStore = create(
  combine(
    {
        podcast: {},
        episodes: []
    },
    (set) => ({
        addPodcast: (p) =>set({
            podcast: p
        }),
        addEpisodes: (e) => set({
          episodes: e
        }),
        addFav: (a)=>set((s)=>({
          podcast:{...s.podcast, is_favorite: a}
        })),
        clear: ()=>set({
            podcast:{}
        })
        //TODO: next, prev, pause, fecth
    })
  )
);