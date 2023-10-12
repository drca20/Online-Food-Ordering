import React from "react";
import './featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Featured = (props)=>{
    return(
        <div className="featured" >
            <div className="top">
                <h1 className="title">
                    Total Sales
                    <MoreVertIcon fontSize="small"/>
                </h1>

            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={(70)} text={"70%"} strokeWidth={5} />
                </div>
                <p className="title">
                    Total Sales Made Last Seven Days
                </p>
                <p className="amount">
                    {props.total+" Rs"}
                </p>
                <p className="desc">
                    Transactions may be in processing. Some latest payment maynot be included
                </p>
                

            </div>

        </div>
    )
}

export default Featured;
