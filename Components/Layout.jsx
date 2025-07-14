 import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'
 
 const Layout = () => {
   return (
     <div className=" min-h-screen flex flex-col bg-indigo-50">
        <Navbar/>
        <main className="flex-grow"> 
        <Outlet/>
        </main>
        <Footer/>
     </div>
   )
 }
 
 export default Layout
 