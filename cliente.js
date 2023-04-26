const {Schema,model}=require ('mongoose');

const clienteSchema=new Schema({
    idCliente:{
        type:String,
        require:true,
        unique:true
    },
    nombre:String,
    apellidos:String,
    correo:String,
    telefono:String,
    edad:Number
},{
    versionKey:false,
    timestamps:true
});
module.exports=model('Cliente',clienteSchema);