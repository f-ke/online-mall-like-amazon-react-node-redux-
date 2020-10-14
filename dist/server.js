"use strict";

var _express = _interopRequireDefault(require("express"));

var _data = _interopRequireDefault(require("./data"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userroute = _interopRequireDefault(require("./route/userroute"));

var _productRoute = _interopRequireDefault(require("./route/productRoute"));

var _orderRoute = _interopRequireDefault(require("./route/orderRoute"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//config mogodb
const mongoDbUrl = _config.default.MONGODB_URL;

_mongoose.default.connect(mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = (0, _express.default)();
app.use(_bodyParser.default.json()); //FOR POST REQUEST

app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use("/api/users", _userroute.default);
app.use("/api/products", _productRoute.default);
app.use("/api/orders", _orderRoute.default);
app.get("/api/config/paypal", (req, res) => {
  res.send(_config.default.PAYPAL_CLIENT_ID);
}); // app.get("/api/products",(req, res)=>{
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

app.listen(_config.default.PORT, () => {
  console.log("server start sucessfully at localhost:5000");
});
app.use(_express.default.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`)));