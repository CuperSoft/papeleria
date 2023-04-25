const {Schema,model}=require ('mongoose');

const proveedorSchema=new Schema({
    clave:{
        type:String,
        require:true,
        unique:true
    },
    nombre:String,
    apellidos:String,
    empresa:String,
    telefono:String,
    rfc:String
},{
    versionKey:false,
    timestamps:true
});
module.exports=model('proveedor',proveedorSchema);