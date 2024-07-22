// const express= require("express")

import cors from 'cors'
import express from 'express'
import router from './routes/routes.js'
import mongoose from './db/index.js'
const app = express()
const PORT= process.env.PORT || 8000


const db= mongoose.connection;
db.on("error", console.error.bind(console,"connection error"))
db.once("open", function(){
    console.log("db connected!")
})

app.get('/',(req, res)=>{

    res.send("hello world")

})

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


//// for getting api routing method / dosra way  //////

app.use(express.json())
app.use(cors())



/////// api agar /user hogi to call hojaye gi data show ho jaye ga ////////



// app.get('/users',(req, res)=>{

//     res.send(users)

// })



// app.use('/users',router)




///// for post something //// 


app.post('/user',(req, res)=>{
    users.push({id:users.length+1,...req.body})
    // console.log("reqqqq", req)
    res.send({message:"user added successfully"})
    
    
})

//// for delete ////

app.delete('/user/:id',(req,res)=>{
    // console.log("req---",req.params)
    let index=users.findIndex(v=>v.id===Number(req.params.id))
    if(index!==-1){
        
        users.splice(index,1)
    }
    res.send({message:"user deleted successfully"})
    

})

//// for update ////

app.put('/user/:id',(req, res)=>{
    let index=users.findIndex(v=>v.id===Number(req.params.id))
    if(index!==-1){

        users.splice(index,1, {id:Number( req.params.id),...req.body})
        
    }
    
    res.send({message:"user update successfully"})
})


// app.use('/product', router)



///////////////// api key aur next call hoga jb jb api call hogi aur query mein apkikey mile gi //////////

// app.use('/', (req,res,next)=>{

    
//     console.log("req agayi..", req.query )
//     // next()



//     //// api key yehogi toh show hogi ////////////
    
// if(req?.query?.apiKey === "123"){
//         next()
//     }
//     else{
//         res.status(401).send({message :"not allowed"})
//     }
// })   

//////////// first api then next link  //////////  
    
    app.use('/api', router )  


app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`)
    
});   