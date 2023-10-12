import React from "react";
import './orders.scss';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "./datatable/Datatable";


const Menus = () =>{
    return (
        <div className="orders">
            
            <Sidebar />
            <div className="ordersContainer">
                <Navbar />
                
                <Datatable  />
            </div>


        </div>
    )
}

export default Menus;