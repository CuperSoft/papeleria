const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Proveedor=require('./Proveedor');
const Venta = require('./Venta');
const app=express();

//Settings 
app.set('port',process.env.PORT||3600);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); 

//Conexión a mongodb atlas
mongoose.connect("mongodb+srv://dbUser:230486PRO@cluster0.qjy1x.mongodb.net/papeleriadb?retryWrites=true&w=majority")
.then(db=> console.log("Mongodb atlas connected"))
.catch(err=> console.error(err));

//Routes
app.get("/",async(req,res)=>{
    const proveedores=await Proveedor.find();
    res.json(proveedores);
});

app.post("/insertar",async(req,res)=>{
    const proveedorInsertado=new Proveedor(req.body);
    await proveedorInsertado.save();
    res.json('{"status":"proveedor insertado"}');
}); 

//Insertar nuevas Ventas
app.post("/insertarVenta",async(req,res)=>{
    const VentaInsertada=new Venta(req.body);
    await VentaInsertada.save();
    res.redirect("/verVentas");
});

//Traer todos las Ventas
app.get("/verVentas",async (req, res)=>{
    const ventas = await Venta.find();
    res.render('indexVentas', {ventas});
});

//Elimina todas las ventas
app.get("/eliminartodaslasventas", async(req, res) =>{
    await Venta.deleteMany();
    res.redirect("/verVentas");
});

app.listen(app.get('port'),()=>{
    console.log('Server on port: ' + app.get('port'));
});

app.post("/insertar",async (req, res)=>{
    //Aqui van las instrucciones necesarias para insertar los datos del producto recibido en el body de MongoDB
    const productoInsertado = new Producto(req.body);
    await productoInsertado.save();
    res.redirect("/");
});
