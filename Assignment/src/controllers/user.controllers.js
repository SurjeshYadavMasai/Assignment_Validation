const express = require("express");

const { body, validationResult } = require('express-validator');
const User = require("../models/user.models.js");

const router = express.Router();
//get operations
router.get("/" , async(req,res)=>{
    try{
const users = await User.find().lean().exec();
return res.status(201).send(users);
    }catch(err){
        res.status(500).send({message:err.message});
    }
});

//post operations

router.post("/",
//checking for the firts name validatation
body("first_name")
.trim().not().isEmpty()
.withMessage("First Name cannot be Empty"),

//checking for validation of last name
body("last_name").trim().not().isEmpty().withMessage("LastName cannot be Empty"),

//checking for the email validation
body("email").trim().not().isEmpty().withMessage("Email cannot be empty")
.custom(async(value)=>{
    const user = await User.findOne({email:value});
    if(user){
        throw new Error("Email is already taken");
    }
    return true;
}),

//checking valid email pincode
body("pincode").not().isEmpty().withMessage("Pincode is required")
.custom((value)=>{
    const pass=/^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;
    if(!value.match(pass)){
     throw new Error("Password must be strong");
    }
    return true;
}),
body("age").not()
.isEmpty()
.withMessage("Age cannot be Empty")
.isNumeric()
.withMessage("Age must be between 1 to 100").custom((val)=>{
    if(val<1||val>100){
        throw new Error ("Incorrect Age Provided");
    }
    return true;
}),





          
  // password must be at least 5 chars long
  
 async (req, res) => {
   try{
console.log(body("firstName"))
    const errors = validationResult(req);
    console.log({errors});
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user= await User.create(req.body);
  return res.status(201).send(user);

   
   
    }catch(err){
        res.status(500).send({message:err.message});
    }
});


module.exports=router;