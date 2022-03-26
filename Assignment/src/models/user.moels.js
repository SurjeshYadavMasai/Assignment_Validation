const mongoose = require("mongoose");

//schema
 
const userSchema= new mongoose.Schema(
    {
       "first_name":{type:String, required:true},
       "last_name":{type:String,required:true},
       "email":{type:String,required:true},
       "pincode":{type:String,required:true},
       "age":{type:Number,required:true},
       "gender":{type:String,enum:["Male","Female","Others"],required:true},
    },
    {
        versionKey:false,
        timestamps:true,
    }
);
const User = mongoose.model("user",userSchema);

module.exports=User;