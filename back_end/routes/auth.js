const router=require("express").Router();
const User=require("../models/User");
const jwt=require("jsonwebtoken");
const {registerValidation,loginValidation}=require("../validation")
const bcrypt=require("bcryptjs");


router.post('/register',async (req,res)=>{    
    // Validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Check if the user is already in the database
    const emailExist=await User.findOne({email:req.body.email});
    if (emailExist) return res.status(400).send('email already exists..');

    //Hash passwords
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);

    // Create a new user
    const user=new User({
        email:req.body.email,
        password:hashedPassword,
        category:req.body.category,
    });

    try{
       const savedUser=await user.save();
       res.send(savedUser);
    //    res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }

});

router.post('/login',async (req,res)=>{
    
    // Validation
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // Check if the user email exists in the database
    const user=await User.findOne({email:req.body.email});

    const validPass=await bcrypt.compare(req.body.password,user.password);

    if(!user){
        return res.status(400).send('Email not exists');
    }else if(!validPass){
        return res.status(400).send('Password is wrong');
    }else{
        const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)        
        res.header("auth-token",token);
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            category: user.category,
            accessToken: token
        });
        // return res.send(user);
    }


});


module.exports=router;