const mongoose = require("mongoose");

const productSchema =new  mongoose.Schema({
    productName : {
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true
    }
})

const ProductModel = mongoose.model("product",productSchema);
module.exports = ProductModel;
