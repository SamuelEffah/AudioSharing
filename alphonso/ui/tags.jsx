import React, {useCallback,useState ,useEffect} from "react"
import { Plus } from "../icons"
import { usePodcastFormStore } from "../stores/usePodcastFormStore"

const tagsLabels = [
    {
        label:"history"
    },
    {
        label:"art & entertainment"
    },
    {
        label:"sports"
    },
    {
        label:"comedy"
    },
    {
        label:"news & politics"
    }
    ,
    {
        label:"business & technology"
    }
]

const TagPill = ({label,isSelected,cb,indx,...props}) =>{
    const {addOrRemoveTag} = usePodcastFormStore()
    const [selected, setSelected] = useState(isSelected || false)

    return (
        <div 
        onClick={(e)=> {
            addOrRemoveTag(label, !selected)
            setSelected(!selected)
         
            
            }}
        style={{ backgroundColor: selected ? "#1F2125" : "transparent",
        borderColor: selected ? "" : "#1F2125" }}
        className={`mb-3 h-10 flex items-center  mr-2.5 text-primary-300
        ${selected ? 'justify-between ': 'justify-center border-2'}
         cursor-pointer relative p-1 px-4 bg-accent rounded-full`} 
        {...props}
        >
            <p>{label}</p>
            {selected ? (
            <button className=" pl-4 w-8 h-8 rounded-full ">
             <Plus className="transform rotate-45"/>
            </button>

            ) : null}
        </div>
    )

}

const Tags = ({tagsList,isEdit=false ,...props})=>{
    const [tagList, setTagsList] = useState(tagsLabels)
    const {tags} = usePodcastFormStore()
 
    
 
    return(
        <div className="w-full relative">
        
        <p className="text-primary-600 mb-3 ">Tags</p>
        <div className="w-full flex flex-wrap items-center">
           {tagList.map((v,i)=>{
            
               return <TagPill  
               key={i} 
                isSelected={isEdit && tagsList && tagsList.includes(v.label) ? true : false}
               indx={i}
                label={v.label}/>
           })}
        </div>
        </div>
    )
}

export default Tags