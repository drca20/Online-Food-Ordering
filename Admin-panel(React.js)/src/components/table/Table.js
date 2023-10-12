import {useState,useEffect} from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from 'axios';



const List = () => {
    const [rows,setRows] = useState([]);
    useEffect(()=>{

      axios.get("http://localhost:3001/read/users").then((result)=>{
     
       axios.get("http://localhost:3001/read/records/latest").then((response)=>{
     
         
     
         // const items = response.data.filter(dt => {
         //   return delete dt.items
         // })
         const users = result.data;
         console.log(users)
         const data = response.data;
         const items = data.map(dt=>dt.items)
         
         setRows(data)
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
     
         
     
     
         let c=-1
         
         setRows(data.map(item=>{
         c++
         return {...item,total:finalPrice[c],customer_name:users.map(user => {
           
           if(item.customerId === user._id){
             return user.name
           }
           return ""
         })}
        }))
     
        console.log(data)
     
         
         
      
       
     }).catch((err)=>{
       console.log("No data")
       
     })
     
      })
     
       
     },[])
    
    

    return (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Tracking ID</TableCell>
               
                <TableCell className="tableCell">Customer</TableCell>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Amount</TableCell>
                <TableCell className="tableCell">Payment Method</TableCell>
                <TableCell className="tableCell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">{row._id}</TableCell>
                  <TableCell className="tableCell">{row.customer_name}</TableCell>
                  <TableCell className="tableCell">{row.createdAt}</TableCell>
                  <TableCell className="tableCell">{row.total}</TableCell>
                  <TableCell className="tableCell">{row.paymentType}</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${row.status}`}>{row.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}





export default List;