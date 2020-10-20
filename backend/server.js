import express from 'express';
import data from './data';
import config from './config'

import mongoose from 'mongoose'
import userroute from './route/userroute'
import productRoute from './route/productRoute'
import orderRoute from './route/orderRoute'
import bodyParser from 'body-parser';
import path from 'path';
//config mogodb

const mongoDbUrl = config.MONGODB_URL
mongoose.connect(mongoDbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
},
    ).catch(error=>console.log(error.reason));
    
const app = express();
app.use(bodyParser.json());//FOR POST REQUEST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users",userroute);
app.use("/api/products",productRoute)
app.use("/api/orders",orderRoute)
app.get("/api/config/paypal",(req,res)=>{
    res.send(config.PAYPAL_CLIENT_ID);
})
// app.get("/api/products",(req, res)=>{
//     res.send(data.products)
// });
// app.get("/api/products/:id",(req, res)=>{
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id === productId);
//     if(product){
//         res.send(product);
//     }else{
//         res.status(404).send({msg:"not found"});
//     }
// });
// kuayu
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
//   });
  
/*if(process.env.NODE_ENV ==='production'){
   app.use(express.static('../frontend/build'))
 }
 */

app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
 res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
 });
app.listen(config.PORT, ()=>{
    console.log("server start sucessfully at localhost:5000");
}
    );


