import express from "express"
import user from "../routes/user.js"
import upload from  "./upload.js"
const router=express.Router()


//////////// link routes ///////////


// router.use('/product', user)
router.use('/upload', upload )
router.use('/users', user )


////// root pee / hota //////

// router.use('/', user )

export default router