const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Proveedor=require('./Proveedor');
const cliente=require('./cliente');
const Venta = require('./Venta');
const app=express();

//Settings 
app.set('port',process.env.PORT||3600);
app.set('view engine','ejs')
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

//Middlewares
app.use(express.urlencoded({extended:false}))
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


//Consulta general cliente
app.get('/cliente', async(req,res)=>{
    const clientes = await cliente.find();
    res.render('cliente',{clientes})
})

//Insertar cliente
app.post('/insertarCliente', async(req,res)=>{
    const clienteInsertardo = new cliente(req.body);
    await clienteInsertardo.save();
    res.redirect("/cliente")
})
//Eliminar cliente
app.get('/eliminarCliente/:id', async(req,res)=>{
    await cliente.findOneAndDelete({idCliente:req.params.id},req.body);
    res.redirect("/cliente")
})

//Actualizar cliente
app.post('/actualizarCliente/:id', async(req,res)=>{
    await cliente.findOneAndUpdate({idCliente:req.params.id},req.body);
    res.redirect("/cliente")
})
//Consulta individual cliente
app.get('/consultaCliente/:id', async(req,res)=>{
    const cliente1 = await cliente.findOne({idCliente:req.params.id});
    res.render('editarCliente',{cliente1}) 
})
app.listen(app.get('port'),()=>{
    console.log('Server on port: ' + app.get('port'));
});

app.post("/insertar",async (req, res)=>{
    //Aqui van las instrucciones necesarias para insertar los datos del producto recibido en el body de MongoDB
    const productoInsertado = new Producto(req.body);
    await productoInsertado.save();
    res.redirect("/");
});
