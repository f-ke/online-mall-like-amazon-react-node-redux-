import mongoose from 'mongoose';
const shippingSchema = new mongoose.Schema({
    address:{type:String, required:true}, 
    city:{type:String, required:true}, 
    country:{type:String, required:true}, 
    postcode:{type:String, required:true}, 
})
const paymentSchema = new mongoose.Schema({
    paymentmethod:{type:String,required:true}
})
const orderItemSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    qty:{type:Number,required:true},
    image:{type:String, required:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
})
const orderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    orderItems:[orderItemSchema],
    shipping: shippingSchema,
    payment:paymentSchema,
    itemPrice:{type:Number, required:true},
    taxPrice:{type:Number, required:true},
    shippingPrice:{type:Number, required:true},
    totalPrice:{type:Number, required:true},
    isDelivered:{type:Boolean,default:false},
    isPaid:{type:Boolean,default:false},
    paidAt:{type:Date},
    deliveredAt:{type:Date}

},{timestamps:true});
 const orderModel = mongoose.model("Order", orderSchema);
 export default orderModel;