import React from "react";
import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () =>{
    const {dispatch}=useContext(DarkModeContext);
    return(
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search ...."/>
                    <SearchIcon className="icon"/>
                </div>
                <div className="items">
                    <div className="item">
                        <DarkModeIcon className="icon" onClick={()=>dispatch({type:"TOGGLE"})}/>
                    </div>
                    <div className="item">
                        <MenuIcon className="icon" />
                    </div>
                    <div className="item">
                        <LanguageIcon className="icon"/>
                    </div>
                    <div className="item">
                        <img alt="anc" className="avatar" />
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Navbar;