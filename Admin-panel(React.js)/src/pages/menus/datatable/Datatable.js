import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./datatable.scss"
import axios from 'axios'
import { useState,useEffect } from 'react';


export default function Datatable() {
const [data,setData] = useState([])




  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}> */}
              <div className="viewButton" onClick={()=>handleUpdate(params.row._id)}>Update</div>
            {/* </Link> */}
            <div
              className="deleteButton" onClick={()=>HandleDelete(params.row._id)}
              
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];


  const userColumns = [{field:"_id",headerName:"_id",width:50},
        {field:"name",headerName:"name",width:150},
        {field:"image",headerName:"image",windth:100},
        {field:"price",headerName:"price",width:100},
        {field:"size",headerName:"size",width:100}
]

 
  








     
const HandleDelete= async(id)=>{
  
  console.log(id)

  axios.delete(`/menu/delete/${id}`).then((res)=>{
      console.log(res.status)
      if(res.status === 200){
          window.location="/menus"
        
       
        

      }
    })


}

const handleUpdate = (id)=>{
  window.location.href=`/menus/${id}`;
}

useEffect(()=>{
  axios.get("/read").then((response)=>{
    
      console.log(response.data)
       setData(response.data)
   
    
  }).catch((err)=>{
    console.log("No data")
    
  })
},[])


 


  return (

    <React.Fragment>
    <div className='datatable' >

      <button className='add_item' onClick={()=> window.location.href='/menus/new'}>Add New Dish</button>
      
      <DataGrid className='datagrid'
        rows={data}
        getRowId={(row) => row._id}
        columns={userColumns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </React.Fragment>
  );
  
}

