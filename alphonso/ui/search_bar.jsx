import React, {useState} from "react"
import { Search } from "../icons"


const SearchBar = ({className, ...props})=>{

    return (
        <div className="bg-primary-100  relative h-14 w-full flex items-center rounded-xl">
            <div className="flex items-center justify-center w-1/12">
                <Search width={20} height={20}/>
            </div>
            <div className="w-11/12 relative h-full ">
            <input
            className="w-full h-full bg-primary-100 rounded-l-xl outline-none" 
            type="text"  placeholder="search for anyone or podcast"
                {...props}
            />

            </div>
        </div>
    )
}

export default SearchBar