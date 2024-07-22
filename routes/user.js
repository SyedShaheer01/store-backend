import express from "express"
// import { product } from "./products.js"
import User from "../modal/users.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import Joi from "joi"
import  VerifyToken  from "../midlewhere/verifyToken.js"
const router=express.Router()

// const users = [

//     {
//         name:'akbar',
//         email:"akbar@gmail.com",
//         id:1
//     },
    

//     {

//         name:"ali",
//         email:"ali@gmail.com",
//         pass:123456,
//         id:2
//     },
//     {

//         name:"ali",
//         email:"ali@gmail.com",
//         pass:123456,
//         id:3
//     },
//     {

//         name:"ali",
//         email:"ali@gmail.com",
//         pass:123456,
//         id:4
//     }

// ]

const userSchema= Joi.object({
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    phone: Joi.number().required().min(10),
    adress: Joi.string().required(),
    items:Joi.array().required()
   //  password: Joi.string().required().min(6)
})

router.delete('/:id',async(req,res)=>{
   await User.deleteOne({_id:req.params.id})
   res.status(200).send({message:"success"})


})
    

router.get('/', VerifyToken, async(req,res)=>{
    const users =await User.find({}).select("-password") ///saray user get kr k laye ga aur password hatadega///
    res.send({users:users})

})

///////////// to link product //////////

//  router.get('/', (req,res)=>{
//     res.send(product)
//  })


///// for  user signup////////

router.post('/', async (req,res)=>{
   try{
    await userSchema.validateAsync(req.body);
   //  const password = await bcrypt.hash(req.body.password, 10); /// pass ko hash krne k liye method ///

     console.log("req-->",req.body)
     const user=  new User({...req.body})  //password ander ae ga
     const newUser= await user.save()
     const token= jwt.sign({_id:newUser._id, email:newUser.email},"STORE")
     
     return res.status(200).send({message: "successfully", user: newUser, token }) 
     
    }catch(err){
      return res.status(400).send({ status:400,message: err.message})



    }
 })


 


 //// fot user login/////////
 router.post('/login', async (req,res)=>{
    try{
        const {email, password}= req.body
        const user= await User.findOne({email})
        // .then(res=> res.toObject())/// for delet pass use toObject//
        //// aur find one find kre ga email ko k wo hai ya nh///
    if(!user){ //// agar email ghlat ho///
       return res.status(400).send({status:403,message:"invalid email"});
    }
    console.log("user>...", user)

  const compare= await bcrypt.compare(password,user.password); /// pass ko check krne k liye true ya false hai///

  if(!compare){ /// agar passs ghalat ho////
     return res.status(403).send({status:403,message:"wrong password"});

     
  }
  console.log("compare>>>", compare) 
  
  
  delete user.password /// method pss delete krne ka///

  ///jb user login hoga toh aik token genrate kr k dega////
  const token= jwt.sign({_id:user._id, email:user.email},"SMIT")//jo save krwnana wo sign mein dena hai aur next secret key///


     return res.status(200).send({user, token,message: "success"}) 
    }catch(err){
      return res.status(400).send({message:err.message})
    

    }
 })
export default router





