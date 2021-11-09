
import create from "zustand"
import {combine} from "zustand/middleware"



export const usePodcastFormStore = create(
  combine(
    {
        podcastDetails:{},
        tags: [],
        isComplete:false
    },
    (set) => ({
        updatePodcast: (info)=> set((s)=>({
            podcastDetails: {...s.podcastDetails, ...info}
        })), 
        addOrRemoveTag:(tag,isAdd)=>set((s)=>({
          
          tags: isAdd? [...s.tags, tag] : s.tags.filter(t=> t != tag),
          podcastDetails: {...s.podcastDetails, tags:isAdd? [...s.tags, tag] : s.tags.filter(t=> t != tag)}
        })),
        clear:() => set({
          podcastDetails: {},
          tags: [],
          isComplete: false
        })
       

    })
  )
);