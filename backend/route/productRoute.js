import Product from '../model/productModel';
import express from 'express';

const router = express.Router();
router.get("/",async(req,res)=>{
    const products = await Product.find({});
    res.send(products);
})

router.post("/", async (req, res)=>{
    console.log(req.body)
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        
        
    })
    const newProduct = await product.save();
    if(newProduct){
       return res.status(201).send({message:"newProduct create", data:newProduct})
    }
     return res.status(500).send({message:'failed to create'});
})

router.put("/:id", async (req, res)=>{
    //console.log(req.body)
    const productId = req.params.id;
    const product = await Product.findOne({_id:productId});
    if(product){
        
            product.name= req.body.name
            product.price=req.body.price
            product.image = req.body.image
            product.brand= req.body.brand
            product.category= req.body.category
            product. countInStock= req.body.countInStock
            product.description= req.body.description;
            const newProduct = await product.save();
        if(newProduct){
          return  res.status(201).send({msg:"update suceessfully", product:newProduct})
        }
           
        }
        
        return res.status(500).send({msg:"update failed"})
        
            
            
        })

    
    

export default router