import express from 'express'
import fs from 'fs-extra'

// import { product } from './products' 

import multer from 'multer'
const router=express.Router()

////////////// for addings files ////////////////

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
  console.log(file)
    cb(null, file.originalname,file.mimetype)
  }
})

const upload = multer({ storage: storage })


////////// for removing files//////////////

router.post('/', upload.single('file') , (req , res)=>{
    fs.remove('images/Screenshot (1).png', err => {
        if (err) return console.error(err)
        console.log('success!')
      })
    res.send({ message: "uploaded"})
   
})



export default router
