import React,{useEffect} from "react";
import Link from "next/link";
import  {useRouter} from "next/router"
import { Github, Google, Spinner } from "../../icons";
import { useDetectScreenSize } from "../../shared-hooks/useDetectScreenSize";

import { useTokenStore } from "../../stores/useTokens";

const ProviderAuth = ({ provider, isLoading = false, icon, url, ...props }) => {
  return (
    <button
   
  
      style={{ backgroundColor: "#222427" }}
      disabled={isLoading}
      className={`
            mb-4
          flex  relative justify-center items-center
           w-full h-14 rounded-xl focus:outline-none
           ${
             isLoading
               ? "opacity-50 cursor-not-allowed"
               : "opacity-80 cursor-pointer"
           }
           `}
      {...props}
    >
      <span className="absolute left-0 ">{icon}</span>
      <p className="font-medium text-base">Log in with {provider}</p>
    </button>
  );
};

const Login = () => {
  const router = useRouter()
  const {push} = useRouter()

  const {a, r, error} = router.query
  const screenSize = useDetectScreenSize()
  const hasTokens = useTokenStore((s)=> !!(s.accessToken && s.refreshToken))
  const {addTokens} = useTokenStore()
  let width = "450px"
  if (screenSize == "big-screen"){
    width = "450px"
  }
  if (screenSize == "desktop" || screenSize == "tablet"){
    width = "400px"
  }
  if(screenSize == "mobile"){
    width="90%"
  }

  // useEffect(() => {
  //   if(hasTokens){
  //     router.push("/discovery")
  //     console.log("no tokens")
  //   }
  // }, [hasTokens])

  //set tokens 

  useEffect(()=>{
    if(hasTokens){
      router.push("/discovery")
    }
  },[hasTokens, router.push])

  return (
    <div
      className="w-full relative flex 
          flex-col items-center text-primary-700
           "
    >
      <div
      style={{width: width}}
        className="flex relative flex-col mt-20 items-center 
               bg-primary-100 
               rounded-md h-80     
               "
      >
        <div className="w-10/12 flex flex-col  h-96 ">
          <div>
            <h3 className="font-semibold  text-2xl py-5">Welcome</h3>
            <small className="text-primary-600">
              By clicking below you&apos;re agree to
              <Link href="/">
                <a className="underline px-1.5 font-md "> Privacy Policy </a>
              </Link>
              and
              <Link href="/">
                <a className="underline px-1.5  font-md "> Term of Service </a>
              </Link>
            </small>
          </div>
          <div className="mt-10">
            <ProviderAuth
              provider="Github"
              isLoading={false}
              icon={<Github width={40} height={40} />}
              onClick={(e) => {
                e.preventDefault();
                 window.location.href = process.env.NEXT_PUBLIC_API_URL + "/auth/github";
              }}
            />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
