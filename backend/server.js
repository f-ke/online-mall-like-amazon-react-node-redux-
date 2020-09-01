import express from 'express';
import data from './data';
const app = express();
app.get("/api/products",(req, res)=>{
    res.send(data.products)
});
// kuayu
// app.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
//   });
  

app.listen(5000, ()=>{
    console.log("server start sucessfully at localhost:5000");
}
    );