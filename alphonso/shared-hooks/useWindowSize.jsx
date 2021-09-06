import React, {useEffect,useRef, useState} from "react"




const useWindowSize = ()=>{
    console.log(ref)
    const ref = useRef(null)
    const [width, setWidth]  = useState()

    useEffect(()=>{
        const handleResize  = ()=>{
            setWidth(ref.current.clientWidth)
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    },[ref])


    return  {width, ref}
}


export default useWindowSize