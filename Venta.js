const {scheema, model, Schema} = require ('mongoose');

const ventaSchema = new Schema({
    numVenta:{
        type:String,
        require:true,
        unique:true
    },
    producto:String,
    preciounitario:Number,
    cantidad:Number,
    total:Number,
    iva:String
}, {
    versionKey:false,
    timestamps:true
});
module.exports = model('venta', ventaSchema);