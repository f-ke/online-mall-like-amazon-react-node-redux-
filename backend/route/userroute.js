import User from '../model/userModel';
import express from 'express';
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

export default router;