import React, { useContext } from "react";
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import DiscountIcon from '@mui/icons-material/Discount';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {Link} from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";


const Sidebar = ()=>{
    const {dispatch}=useContext(DarkModeContext);

    
        
    

    return(

        
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">Admin</span>
                </Link>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                    <Link to="/" style={{textDecoration:"none"}}>
                        <DashboardIcon className="icon"/>
                        <span>DashBoard</span>
                        </Link>
                    </li>
                    <p className="title">LISTS</p>
                    <li>
                    <Link to="/users" style={{textDecoration:"none"}}>
                        <PersonOutlineOutlinedIcon className="icon"/>
                        <span>Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/menus" style={{textDecoration:"none"}}>
                        <FastfoodIcon className="icon"/>
                        <span>Menus</span>
                        </Link>
                    </li>
                    <li>
                    <Link to="/orders" style={{textDecoration:"none"}}>
                        <BorderColorIcon className="icon"/>
                        <span>Orders</span>
                        </Link>
                    </li>
                 
                    <li>
                        <AccountBoxIcon className="icon"/>
                        <span>Admin</span>
                    </li>
                    <li>
                        <LogoutIcon className="icon"/>
                        <Link to="/logout" style={{textDecoration:"none"}}>
                        <span >Logout</span>
                        </Link>
    
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption" onClick={()=> dispatch({type:"LIGHT"})}></div>
                <div className="colorOption" onClick={()=> dispatch({type:"DARK"})}></div>
            </div>

        </div>
    )
}

export default Sidebar;