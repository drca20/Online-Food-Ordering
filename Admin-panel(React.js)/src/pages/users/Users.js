import React from "react";
import './users.scss';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Datatable from "./datatable/Datatable";


const Users = () =>{
    return (
        <div className="users">
            
            <Sidebar />
            <div className="usersContainer">
                <Navbar />
                
                <Datatable  />
            </div>


        </div>
    )
}

export default Users;