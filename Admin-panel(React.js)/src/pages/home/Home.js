import React from "react";
import "./home.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import axios from "axios";
import { useState,useEffect } from "react";




const Home = () =>{

    const [data,setData] = useState([])
    const [total,SetTotal]=useState(0)
    const [totalUsers,setTotalUsers]=useState(0)
    const [totalOrders,setTotalOrders]=useState(0)
    const [overRallSales,setOverRallSales]=useState(0)
    

    useEffect(()=>{

        axios.get("/read/users/count").then((result)=>{
       
         axios.get("/read/orders").then((response)=>{
       
           
       
           // const items = response.data.filter(dt => {
           //   return delete dt.items
           // })


           const data1 = response.data;
                const items1 = data1.map(dt=>dt.items)
                setTotalUsers(result.data.count)
     
                setData(data1)
                setTotalOrders(data1.length)
                let listItems=[]
                
                listItems.push(items1.map(item=>Object.values(item)))
                //console.log(listItems)
                const finalItemList = Object.values(listItems[0])
                
                let finalizeItems = []
                let finalPriceList = []
                for(var i = 0;i<finalItemList.length;i++){
                  finalizeItems=finalItemList[i]
            
                  finalPriceList.push(finalizeItems.map(finalize=> finalize.item.price * finalize.qty))
            
                }
                
                let finalPrice=[]
            
                for(let j=0;j<finalPriceList.length;j++){
                  
                  let sum=0
                  finalPriceList[j].map(price=> sum+=price)
            
                  finalPrice.push(sum)
            
                  
                }
     
                let sum=0
                for(let c=0;c<finalPrice.length;c++){
                 sum+=finalPrice[c]
     
                }
                setOverRallSales(sum)
                console.log(sum)











         
     

           let dateToday= new Date().toISOString();
           let today = new Date();
            today.setDate(today.getDate() - 7);
            let date = new Date(today).toISOString();
            console.log(date)
            console.log(dateToday)


            axios.post("/read/records/latest/sevendays",
                {
                    "lastDate":date,
                    "todayDate":dateToday
                }
            ).then((response)=>{

                
                const data = response.data;
                const items = data.map(dt=>dt.items)
            
                let listItems=[]
                
                listItems.push(items.map(item=>Object.values(item)))
                //console.log(listItems)
                const finalItemList = Object.values(listItems[0])
                
                let finalizeItems = []
                let finalPriceList = []
                for(var i = 0;i<finalItemList.length;i++){
                  finalizeItems=finalItemList[i]
            
                  finalPriceList.push(finalizeItems.map(finalize=> finalize.item.price * finalize.qty))
            
                }
                
                let finalPrice=[]
            
                for(let j=0;j<finalPriceList.length;j++){
                  
                  let sum=0
                  finalPriceList[j].map(price=> sum+=price)
            
                  finalPrice.push(sum)
            
                  
                }
     
                let sum=0
                for(let c=0;c<finalPrice.length;c++){
                 sum+=finalPrice[c]
     
                }
                SetTotal(sum)

            })
            console.log("total",overRallSales)
            console.log("Total 7 days",total)



           
       
       
           

           
           
        //   setData(data.map(item=>{
        //    c++
        //    return {...item,total:finalPrice[c],customer_name:users.map(user => {
             
        //      if(item.customerId === user._id){
        //        return user.name
        //      }
        //      return ""
        //    })}
        //   }))
       
         
       
           
           
        
         
       }).catch((err)=>{
         console.log("No data")
         
       })
       
        })
       
         
       },[])

    




    return(
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="users" total={totalUsers}/>
                    <Widget type="orders" total={totalOrders}/>
                    <Widget type="earnings" total={total}/>
                </div>
                <div className="charts">
                    <Featured total={total}/>
                    <Chart title="6 Months chart" aspect={2/1}/>
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Orders</div>
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Home;