import React, { useContext, useEffect } from "react"
import { useRouter } from 'next/router'
import {Spinner} from "./../icons"
import { useTokenStore } from "../stores/useTokens";



const Auth = ()=>{
    const router = useRouter()
    const {a,r,error}  = router.query
    const hasTokens = useTokenStore((s)=> !!(s.accessToken && s.refreshToken))
    const {addTokens} = useTokenStore()
 
  useEffect(() => {
    if(hasTokens){
      router.push("/discovery")
    }
  }, [hasTokens])


  useEffect(()=>{
    if(a && r){
      addTokens(a,r)
      router.push("/discovery")
    }
  },[a,r,addTokens])

  useEffect(()=>{
    if(hasTokens){
      router.push("/discovery")
    }
  },[hasTokens])
    
    


    return(
        <div className="w-full h-full flex items-center justify-center">
        <Spinner/>
     </div>
    )
}


export default Auth;