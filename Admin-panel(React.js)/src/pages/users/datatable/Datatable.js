import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./datatable.scss"
import axios from 'axios'
import { useState,useEffect } from 'react';


export default function Datatable() {
const [data,setData] = useState([])




  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           {/* <Link to="/users/test" style={{ textDecoration: "none" }}> */}
  //             <div className="viewButton" onClick={()=>handleUpdate(params.row._id)}>Update</div>
  //           {/* </Link> */}
  //           <div
  //             className="deleteButton" onClick={()=>HandleDelete(params.row._id)}
              
  //           >
  //             Delete
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];


  const userColumns = [{field:"_id",headerName:"_id",width:150},
        {field:"name",headerName:"Name",width:150},
        {field:"role",headerName:"Role",windth:100},
        {field:"email",headerName:"Email",width:250}
        
]

 
  








     
// const HandleDelete= async(id)=>{
  
//   console.log(id)

//   axios.delete(`http://localhost:3001/menu/delete/${id}`).then((res)=>{
//       console.log(res.status)
//       if(res.status === 200){
//           window.location="/menus"
        
       
        

//       }
//     })


// }

// const handleUpdate = (id)=>{
//   window.location.href=`/menus/${id}`;
// }

useEffect(()=>{

 axios.get("/read/users").then((result)=>{

//   axios.get("http://localhost:3001/read/orders").then((response)=>{

    

//     // const items = response.data.filter(dt => {
//     //   return delete dt.items
//     // })
//     const users = result.data;
//     console.log(users)
//     const data = response.data;
//     const items = data.map(dt=>dt.items)
    
//     setData(data)
//     let listItems=[]
    
//     listItems.push(items.map(item=>Object.values(item)))
//     //console.log(listItems)
//     const finalItemList = Object.values(listItems[0])
    
//     let finalizeItems = []
//     let finalPriceList = []
//     for(var i = 0;i<finalItemList.length;i++){
//       finalizeItems=finalItemList[i]

//       finalPriceList.push(finalizeItems.map(finalize=> finalize.item.price * finalize.qty))

//     }
    
//     let finalPrice=[]

//     for(let j=0;j<finalPriceList.length;j++){
      
//       let sum=0
//       finalPriceList[j].map(price=> sum+=price)

//       finalPrice.push(sum)

      
//     }

    


//     let c=-1
    
//    setData(data.map(item=>{
//     c++
//     return {...item,total:finalPrice[c],customer_name:users.map(user => {
      
//       if(item.customerId === user._id){
//         return user.name
//       }
//       return ""
//     })}
//    }))

//    console.log(data)

    
    
 
  
// }).catch((err)=>{
//   console.log("No data")
  
// })

setData(result.data)

 })

  
},[])


 


  return (

    <React.Fragment>
    <div className='datatable' >

      
      <DataGrid className='datagrid'
        rows={data}
        getRowId={(row) => row._id}
        columns={userColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </React.Fragment>
  );
  
}

