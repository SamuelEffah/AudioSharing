import React, {useCallback,useState ,useEffect} from "react"
import { Plus } from "../icons"

const tagsList = [
    {
        label:"History"
    },
    {
        label:"Art & Entertainment"
    },
    {
        label:"Sports"
    },
    {
        label:"Comedy"
    },
    {
        label:"News & Politics"
    }
    ,
    {
        label:"Business & Technology"
    }
]

const TagPill = ({label,cb,indx,...props}) =>{
   
    const [selected, setSelected] = useState(false)

    return (
        <div 
        onClick={(e)=> {
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

const Tags = ({...props})=>{
    const [tagList, setTagsList] = useState([])

 
    return(
        <div className="w-full relative">
        
        <p className="text-primary-600 mb-3 ">Tags</p>
        <div className="w-full flex flex-wrap items-center">
           {tagsList.map((v,i)=>{
            
               return <TagPill  
               key={i} 
         
               indx={i}
                label={v.label}/>
           })}
        </div>
        </div>
    )
}

export default Tags