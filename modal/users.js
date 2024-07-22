

import mongoose from 'mongoose';


const { Schema } = mongoose



// const UserSchema = new mongoose.Schema({
//     name: {
//         type : Schema.Types.String,
//         required : true
//     },
//     email: {
//         type : Schema.Types.String,
//         required : true,
//         unique: true
//     }, 
//     phone: {

        
//         type : Schema.Types.Number,
//         required : true




        
//     },
//     password: {

//         type : Schema.Types.String,
//         // required : true

//     }
    
// },
// {
//     timestamps:{
//         createdAt:'create',
//         updatedAt:'updated_at'
//     }

// })
// const User = mongoose.model('User', UserSchema);


// export default User





const UserSchema = new mongoose.Schema({
    name: {
        type : Schema.Types.String,
        required : true
    },
    email: {
        type : Schema.Types.String,
        required : true,
        // unique: true
    }, 
    phone: {

        type : Schema.Types.Number,
        required : true

    },
    adress: {

        type : Schema.Types.String,
        required : true

    },

    items:{
       type: Schema.Types.Array,
       required:true
    
    },
    
},
{
    timestamps:{
        createdAt:'create',
        updatedAt:'updated_at'
    }

})
const User = mongoose.model('User', UserSchema);


export default User
