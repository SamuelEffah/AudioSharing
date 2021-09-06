import React from "react"
import { Menu, Search } from "../icons"
import { openDrawerModal } from "./drawer_mobile"
import { openSearchModal } from "./search_modal"


const NavBarMobile = ({...props})=>{


    return (
        <div

        style={{height:"50px", backgroundColor:"#121213"}} 
        className="
        flex justify-center items-center justify-center
        text-primary-700 bg-accent z-50 fixed w-full top-0 left-0">
            
            <button 
            onClick={()=> openDrawerModal()}
            className="
            absolute left-2 outline-none
            w-10 h-10 bg-primary-100
            flex justify-center items-center
            rounded-full
            ">
                <Menu width={24} height={24}/>
            </button>
            
            <div className="">
                <p>Logo</p>
            </div>
            <button 
            onClick={()=> openSearchModal()}
            className="
            absolute right-2 outline-none
            w-10 h-10 flex-shrink-0
       
            flex justify-center items-center
            rounded-full
            ">
                <Search width={27} height={27}/>
            </button>
        </div>
    )
}


export default NavBarMobile