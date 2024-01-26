import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";


const RootLayout = ()=>{
    return(
        <div className="flex">
            <Header />
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout;