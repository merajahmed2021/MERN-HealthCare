const router=require("express").Router();
const verify=require("./verifyToken");
// const Settings=require("../models/DoctorSettings");
const Settings =require('../models/SettingsDoctor');
const DoctorProfile=require('../models/DoctorProfile');



// CREATE DOCTOR ACCOUNT DETAILS
router.post('/doctor_settings',verify,async(req,res)=>{
    const user=req.user._id;
    console.log("DATA FROM FRONTEND = ",req.body);

    posts = await Settings.findOne({'_userId':user});
    if(posts){
      
        try{
            const doc = await Settings.findOneAndUpdate({'_userId':user},
            {
                new_appointmentFee:req.body.new_appointmentFee,            
                old_appointmentFee:req.body.old_appointmentFee,
                appointment_type:req.body.appointment_type,
                patient_allowed:req.body.patient_allowed,
                payment_mode:req.body.payment_mode,
                appointment_booking:req.body.appointment_booking,  
            });
            res.send(doc);
         }catch(err){
             res.status(400).send(err);
             console.log(err);
         } 
    }else{
        const setting = new Settings({
            _userId:user,
            new_appointmentFee:req.body.new_appointmentFee,            
            old_appointmentFee:req.body.old_appointmentFee,
            appointment_type:req.body.appointment_type,
            patient_allowed:req.body.patient_allowed,
            payment_mode:req.body.payment_mode,
            appointment_booking:req.body.appointment_booking,
        });
        try{
           const savedSetting=await setting.save();
           res.send(savedSetting);
        }catch(err){
            res.status(400).send(err);
            console.log(err);
        }   
    
    }
});

router.get('/get_doctor_settings',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await Settings.findOne({'_userId':user});
       res.send(posts);
       
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }   
});


router.get('/doctor_settings/:id',async(req,res)=>{
    try{
        posts = await DoctorProfile.findById(req.params.id);
        edu=await Settings.findOne({'_userId':posts._userId});  
        console.log(edu);      
        res.status(200).json(edu);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;