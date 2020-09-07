import User from '../model/userModel';
import express from 'express';
import {getToken} from '../util'
const router = express.Router();
router.get("/createadmin",async(req, res)=>{
      
      
       try{
        const user = new User({
            name:"fanfan",
            email:"1945334800@qq.com",
            password:"123456",
            isAdmin:true
        });
        const newUser = await user.save();
        res.send(user);

       }catch(error){
               res.send({msg:error.message})
       }
})

// router.post("/signin",async (req, res)=>{
  
      
//        const signUser = await User.findOne({
           
//            email:req.body.email,
//            password:req.body.password

//        });

//        if(signUser){
//            res.send({
//                _id: signUser.id,
//                name:signUser.name,
//                email:signUser.email,
//                isAdmin:signUser.isAdmin,
//                token:getToken(user)
//                //install jsonwebtoken for security key
//         })
//        }else{
//            res.status(401).send({msg:"no valid email"})
//        }

   

// })
router.post('/signin', async (req, res) => {

    const signinUser = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });
    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser)
      })
  
    } else {
      res.status(401).send({ msg: 'Invalid Email or Password.' });
    }
  
  })
  
  router.post('/register', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      })
    } else {
      res.status(401).send({ msg: 'Invalid User Data.' });
    }
  
  })


export default router;