import React, {useState, useCallback,useEffect,useRef} from  "react"
import SearchBar from "../ui/search_bar"
import {useDetectOutside} from "./../shared-hooks/useDetectOutside"




const SearchResults = ({results})=>{

    return (
        <div
        style={{backgroundColor: "#212121",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
         className="bg-primary-100 rounded-b-xl absolute top-12 z-50 py-6 w-full h-auto overflow-y-auto">
          {results && results.length == 0 ? 
          (<div className="flex justify-center">
            <p className="text-base font-semibold">Try search for @samEffah</p>
          </div>)
           : null}
        </div>
    )
}

const Search = ({...props})=>{
    const ref = useRef(null)
    const [query, setQuery] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [results, setResults] = useState([])
    useDetectOutside(ref, ()=> setIsSearch(false))
    
    useEffect(() => {
        if(query){
            setIsSearch(true)
        }
        return () => {
            setIsSearch(false)
        }
    }, [query])

    return (
        <div
        ref={ref} 
        className="w-11/12 relative mb-10">
        <SearchBar value={query} onChange={(e)=> setQuery(e.target.value)}/>
       
       {  isSearch ? (
           <SearchResults results={results}/>
       ) : null}
        </div>
    )
}


export default Search