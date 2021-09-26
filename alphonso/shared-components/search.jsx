import React, {useState, useMemo,useEffect,useRef, useCallback} from  "react"
import SearchBar from "../ui/search_bar"
import Link from "next/link"
import {useDetectOutside} from "./../shared-hooks/useDetectOutside"
import {Search as SearchIcon } from "../icons"
import Avatar from "../ui/avatar";



const SearchItem = ({ item }) => {
    return (
      <Link href={`/profile/${item.username}`}>
      <a >

        <div
  
        key={item?.id}
        className="mb-2.5 w-full flex pl-2"
      >
        <Avatar url={item?.profile_url} />
        <div className="cursor-default pl-2">
          <p style={{ fontSize: "13px" }} className="font-semibold">
            {item?.fullname}
          </p>
          <small>@{item?.username}</small>
        </div>
      </div>


      </a>
      </Link>
     
    );
  };


const SearchResults = ({results})=>{
    console.log(results)
    return (
        <div
        style={{backgroundColor: "#111314",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
         className="bg-primary-100 rounded-b-xl absolute top-12 z-50 py-6 w-full h-auto overflow-y-auto">
          {results.length > 0 ? 
            (
            <>
                   {results.map((result)=>{
                  return <SearchItem key={result.id} item={result}/>
              })}
                  </>
          ):

          (<div className="flex justify-center">
            <p className="text-base font-semibold">Try search for @samEffah</p>
          </div>)
        
         
           }
        </div>
    )
}

const Search = ({...props})=>{
    const ref = useRef(null)
    const [query, setQuery] = useState("")
    const [isSearch, setIsSearch] = useState(false)
    const [results, setResults] = useState([])
    useDetectOutside(ref, ()=> setIsSearch(false))

    useEffect(()=>{
        if(query){
            setIsSearch(true)
            console.log("adfdasfsa")
        }
        return ()=>{
            setIsSearch(false)
        }
    },[query])

    
  useMemo(() => {
    if (query) {
      let url = "http://localhost:4001/search/" + query;
      const getResults = async () => {
        await fetch(url)
          .then((res) => res.json())
          .then((data) =>
           setResults(data.results));
         
      };
      getResults();
    }
  }, [query]);

    return (
        <div
        ref={ref} 
        className="w-11/12 relative mb-10">
            <div className="bg-primary-100  relative h-14 w-full flex items-center rounded-xl">
            <div className="flex items-center justify-center w-1/12">
 
            </div>
            <div className="w-11/12 relative h-full ">
            <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            className="w-full h-full bg-primary-100 rounded-l-xl outline-none" 
            type="text"  placeholder="search for anyone or podcast"
             
            />

            </div>
        </div>
       
      {isSearch ? (
          <SearchResults results={results}/>
      ) : null}
        </div>
    )
}


export default Search