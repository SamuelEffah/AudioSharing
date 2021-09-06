import React from "react"
import Head from "next/head"



export const Layout = ({children})=>{


    return(
        <>
        <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Podcast</title>
        </Head>
        {children}
        </>
    )
}