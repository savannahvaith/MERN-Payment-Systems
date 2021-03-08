const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const {DB_NAME} = process.env.DB_NAME;

const ProductSchema = new Schema({
    img:String,
    title:{
        type:String,
        required:true
    },
    price:Number
});

const Product = model('Product', ProductSchema);

mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`,{useNewUrlParser:true, useUnifiedTopology:true}, (err) => {
    if(err){
        console.error(err);
    }else{
        console.log(`Successfully connected to database`);
    }
});

module.exports={"Product":Product};