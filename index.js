const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Proveedor=require('./Proveedor');
const cliente=require('./cliente');
const Venta = require('./Venta');
const Dulces = require('./Dulces');
const app=express();

//Settings 
app.set('port',process.env.PORT||3600);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); 


//Conexión a mongodb atlas
mongoose.connect("mongodb+srv://juank21mal:gpUlTHOWU9Pak9F2@cluster0.xyimpq0.mongodb.net/Dulceria?retryWrites=true&w=majority")
.then(db=> console.log("Mongodb atlas connected"))
.catch(err=> console.error(err));

//Routes
app.get("/",async(req,res)=>{
    const dulces=await Dulces.find();
    res.render('indexDulceria',{dulces});
});

//Insertar dulces
app.post("/insertarDulce",async(req,res)=>{
    const dulceInsertado=new Dulces(req.body);
    await dulceInsertado.save();
    res.redirect("/");
}); 

//Editar
app.get("/:cb",async(req,res)=>{
    const dulces = await Dulces.findOne({codigobarras:req.params.cb});
    res.render('editarDulceria',{dulces});
})

//Actualizar
app.post("/actualizar/:cb",async(req,res)=>{
    await Dulces.findOneAndUpdate({codigobarras:req.params.cb},req.body);
    res.redirect("/");
});

//Eliminar
app.get("/eliminar/:cb",async(req,res)=>{
    await Dulces.findOneAndDelete({codigobarras:req.params.cb},req.body);
    res.redirect("/");
})

//Eliminar todos los dulces
app.get("/eliminartodoslosdulces",async(req,res)=>{
    await Dulces.deleteMany();
    res.redirect("/");
});

//Proveedores



//Insertar proveedor
app.post("/insertarProveedor",async(req,res)=>{
    const proveedorInsertado=new Proveedor(req.body);
    await proveedorInsertado.save();
    res.redirect("/Proveedor");
}); 

//Editar proveedor
app.get("/:id",async(req,res)=>{
    const proveedor = await Proveedor.findOne({clave:req.params.id});
    res.render('',{proveedor});
})

//Actualizar proveedor
app.post("/actualizar/:id",async(req,res)=>{
    await Proveedor.findOneAndUpdate({clave:req.params.id},req.body);
    res.redirect("/");
});

//Eliminar proveedor
app.get("/eliminar/:id",async(req,res)=>{
    await Proveedor.findOneAndDelete({clave:req.params.id},req.body);
    res.redirect("/");
})

//Eliminar todos los proveedores
app.get("/eliminartodoslosproveedores",async(req,res)=>{
    await Proveedor.deleteMany();
    res.redirect("/");
});

//Ventas

//Insertar venta
app.post("/insertarVenta",async(req,res)=>{
    const ventaInsertada=new Venta(req.body);
    await ventaInsertada.save();
    res.redirect("/");
}); 

//Editar venta
app.get("/:id",async(req,res)=>{
    const ventas = await Venta.findOne({idCliente:req.params.id});
    res.render('',{ventas});
})

//Actualizar venta
app.post("/actualizar/:id",async(req,res)=>{
    await Venta.findOneAndUpdate({numVenta:req.params.id},req.body);
    res.redirect("/");
});

//Eliminar venta
app.get("/eliminar/:id",async(req,res)=>{
    await Venta.findOneAndDelete({numVenta:req.params.id},req.body);
    res.redirect("/");
})

//Eliminar todos las ventas
app.get("/eliminartodaslasventas",async(req,res)=>{
    await Venta.deleteMany();
    res.redirect("/");
});

//Cliente






//Insertar cliente
app.post("/insertarCliente",async(req,res)=>{
    const clienteInsertado=new cliente(req.body);
    await clienteInsertado.save();
    res.redirect("/");
}); 

//Editar cliente
app.get("/:id",async(req,res)=>{
    const clientes = await cliente.findOne({idCliente:req.params.id});
    res.render('',{clientes});
})

//Actualizar cliente
app.post("/actualizarCliente/:id",async(req,res)=>{
    await cliente.findOneAndUpdate({idCliente:req.params.id},req.body);
    res.redirect("/");
});

//Eliminar cliente
app.get("/eliminarCliente/:id",async(req,res)=>{
    await cliente.findOneAndDelete({idCliente:req.params.id},req.body);
    res.redirect("/");
})

//Eliminar todos los clientes
app.get("/eliminartodoslosclientes",async(req,res)=>{
    await cliente.deleteMany();
    res.redirect("/");
});

app.listen(app.get('port'),()=>{
    console.log('Server on port: ' + app.get('port'));
});


