const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')






const menuModel = require("../app/models/menu.js")
const usersModel = require("../app/models/adminUser.js")

const OrdersModel = require('../app/models/order.js')

// Middlewares 
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app) {
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    app.post('/remove-cart',cartController().remove)
    

    // Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)



    //route all gets

app.get("/read/records/latest",async(req,res)=>{
    OrdersModel.find({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
        
        res.send(post)
      });
})







app.get("/read/users/count",async(req,res)=>{
    
    usersModel.find().exec(function (err, results) {
        if(err){
            res.send({"Error":"Please try again after sometime"})
        }
        var count = results.length
        
        res.send({count:count})
      
      });
    
    
})


app.get("/read/users",async(req,res)=>{
    usersModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
         
        res.send(result)
    })
   
})



app.get("/read/orders", async(req,res)=>{
    OrdersModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
         
        res.send(result)
    })
   
})









app.get("/read", async(req,res)=>{
    menuModel.find({},(err,result)=>{
        if(err){
            res.send(err)
        }
         console.log("read")
        
        res.send(result)
    })
   
})


app.get("/read/:id",async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    menuModel.findById(id,(err,result)=>{
        if(err){
            res.send(err)
        }
         console.log("read")
        
        res.send(result)
    })
})





app.post('/uploadImg',async (req,res)=>{


    
        if(req.files === null){
            return res.status(400).json({msg:"No file Found"});
    
        }
        const file = req.files.file;
         
    
        file.mv(`/public/img/${file.name}`,err =>{
            if(err){
                console.log(err)
                return res.status(500).send(err)
            }
            
            return res.json({fileName1:file.name , filePath1:`${file.name}`}).status(200);
        })



})




app.post("/insert",async (req,res)=>{
        const name = req.body.name;
        const image = req.body.image;
        const price = req.body.price;
        const size = req.body.size;
        console.log(name)

      const menu = new menuModel({name:name,image:image,price:price,size:size})
     try {
         await menu.save();
         console.log("Inserted")
         res.send("Inserted")
        
     } catch (err) {
         console.error("error while inserting")
        res.send(err)
     }
})


app.post("/read/records/latest/sevendays",async(req,res)=>{
    const {lastDate,todayDate} = req.body;
    console.log(lastDate)
    OrdersModel.find({ 
        createdAt: {
              $gte: new Date(new Date(lastDate).setHours(00, 00, 00)),
              $lt: new Date(new Date(todayDate).setHours(23, 59, 59))
               }
        }).sort({ createdAt: 'asc'}).exec(function(err,result){
            if(err){
                console.log("Error line 56")
                res.send("Error")
            }
            
            res.send(result)
        })
       
})



app.post('/admin/login',async(req,res)=>{

    const {email,password} = req.body;
    if(!email || !password){
	
        return res.status(400).json({msg:"Please provide values"})
    }
    const user = await usersModel.findOne({email}).select('+password')

    if(!user){
	console.log("Error")
        return res.status(400).json({msg:"Invalid user"})
    }
    // const isCorrect = await user.comparePassword(password)
    const isCorrect = password === user.password ? true : false

    if(!isCorrect){
        return res.status(400).json({msg:"Invalid user"})
    }

    const token = user.createJWT()
    //password = undefined
    console.log(token)
    res.status(201).json({token})
})












app.put("/update/menu",async(req,res)=>{
    const id=req.body.id;
    const name = req.body.name;
    const image= req.body.image;
    const price =req.body.price;
    const size=req.body.size;


    try {
        await menuModel.findById(id, (err,updateFood)=>{
            updateFood.name = name;
            updateFood.image=image;
            updateFood.price=price;
            updateFood.size=size;
            updateFood.save();
            res.send("Updated")
        });

        
    } catch (err) {

        console.error(err)
    }
})



app.delete("/menu/delete/:id", async (req,res)=>{
    const id = req.params.id;

    await menuModel.findByIdAndRemove(id).exec();
    console.log("Deleted")
    res.send("Deleted");

})







}

module.exports = initRoutes

