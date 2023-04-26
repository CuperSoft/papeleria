const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Proveedor=require('./Proveedor');
const app=express();

//Settings 
app.set('port',process.env.PORT||3600);

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

//Eliminar
app.delete("/eliminar/:cb",async(req,res)=>{
    await Proveedor.findOneAndDelete({clave:req.params.cb});
    res.json('{"status":"proveedor eliminado"}');
})

app.post("/insertar",async(req,res)=>{
    const proveedorInsertado=new Proveedor(req.body);
    await proveedorInsertado.save();
    res.json('{"status":"proveedor insertado"}');
});

app.listen(app.get('port'),()=>{
    console.log('Server on port: ' + app.get('port'));
});