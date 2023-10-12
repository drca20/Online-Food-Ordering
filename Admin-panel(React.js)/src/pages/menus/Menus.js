import React from "react";
import './menus.scss';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "./datatable/Datatable";


const Menus = () =>{
    return (
        <div className="menu">
            
            <Sidebar />
            <div className="menuContainer">
                <Navbar />
                
                <Datatable  />
            </div>


        </div>
    )
}

export default Menus;