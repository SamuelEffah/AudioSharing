import create from "zustand"
import {combine} from "zustand/middleware"
import { persist } from "zustand/middleware"


export const usePodcastStore = create(
  combine(
    {
        podcast: {}
    },
    (set) => ({
        addPodcast: (p) =>set({
            podcast: p
        }),
        clear: ()=>set({
            podcast:{}
        })
        //TODO: next, prev, pause, fecth
    })
  )
);