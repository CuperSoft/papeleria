const express=require('express');
const morgan=require('morgan');
const app=express();

//Settings 
app.set('port',process.env.PORT||3600);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.get("/",(req,res)=>{
   console.log(req.body);
   res.send("Petición recibida...");
})

app.listen(app.get('port'),()=>{
    console.log('Server on port: ' + app.get('port'));
});