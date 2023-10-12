import "./updateMenu.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import Navbar from "../../../components/navbar/Navbar"
import {useState,useEffect} from "react"
import axios from "axios"


const UpdateMenu = () =>{
    
    const url = window.location;
    const id =url.toString().split("/")[4]
    


    const [name,setName] = useState("")
    const [fileName,setFileName] = useState("")
    const [price,setPrice] = useState(0)
    const [size,setSize] = useState("")
    const [fileUp,setFileUp] = useState('')
    const [flag,SetFlag]=useState(false)


    const onChange =e=>{
        setFileUp(e.target.files[0]);
        setFileName(e.target.files[0].name);
        console.log(fileName)

    }
  


    const uploadImage = async e => {

        console.log(fileName)
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',fileUp);
        SetFlag(false)


        try {
            const res = await axios.post('/uploadImg',formData,{
                headers:{
                    'Content-Type':'multipart/form-data',
                    
                }
            });
             const {filePath} = res.data;
             console.log(filePath);
             SetFlag(true)
            
        } catch (err) {
            if(err.response.status === 500){
                console.log('There was a problem with the server');

            }else{
                console.log("Error");
            }
            
        }

       
    
    }


    const onSubmitForm= async e =>{
        e.preventDefault();
       
        
            console.log("Submit")
             await axios.put("/update/menu",{
                id:id,
                name:name,
                image:fileName,
                price:price,
                size:size
                }).then((res)=>{
                    console.log(res.status)
                    if(res.status === 200){
                       window.location="/"
                    }
                  })

        

    }


    useEffect(()=>{
    axios.get(`/read/${id}`).then((response)=>{
    
     console.log(response.data)
     setName(response.data.name)
     setFileName(response.data.image)
     setPrice(response.data.price)
     setSize(response.data.size)
     console.log(response.data.image)
    
  }).catch((err)=>{
    console.log("No data")
    
  })
    },[])





    return(
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add Dish</h1>
                </div>

                <div className="bottom">
                    <div className="left">
                        <h1>Add Dish</h1>
                    </div>
                    <div className="right"><form onSubmit={onSubmitForm}>
                    {/* <div className="formInput">
                            <label>User Name</label>
                            <input type="file" placeholder="file img" />
                        </div>  */}


                            
                            
                        
                        <div className="formInput">
                            <label>Name</label>
                            <input type="text" placeholder="Dish Name.." onChange={e=>setName(e.target.value)} value={name} required  />

                        </div>  
                        <div className="formInput">
                            <label>Image</label>
                            <input type="file" placeholder="image Name" onChange={onChange} />{fileName}
                            <button onClick={uploadImage}>Upload Image</button>

                        </div>  
                        <div className="formInput">
                            <label>Price</label>
                            <input type="text" placeholder="price" onChange={e=> setPrice(e.target.value)} value={price} required />

                        </div>  
                        <div className="formInput">
                            <label>Size</label>
                            <input type="text" placeholder="Size" required onChange={e=>setSize(e.target.value)} value={size} />

                        </div>  
                        
                        

                        <button type="submit">Send</button>
                        

                    </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UpdateMenu;