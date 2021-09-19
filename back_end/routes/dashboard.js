const router=require("express").Router();
const verify=require("./verifyToken");
const Post=require("../models/Post");
const User=require("../models/User");

const Appointment=require('../models/PatientAppointment');
const AppointmentHistory=require('../models/AppointmentsHistory');
const DoctorProfile=require('../models/DoctorProfile');


router.get('/total_doctors',async(req,res)=>{
    try{
        post = await DoctorProfile.countDocuments();
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/total_patients',async(req,res)=>{
    try{
        post = await User.countDocuments({'category':'patient'});
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/total_blogs',async(req,res)=>{
    try{
        post = await Post.countDocuments();
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/user_total_appointments',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await Appointment.countDocuments({'_userId':user});
        post2 = await AppointmentHistory.countDocuments({'_userId':user});
        console.log(posts);
        res.status(200).json({'upcoming_appointment':posts,'past_appointment':post2});
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/doctor_total_patients',verify,async(req,res)=>{
    const user=req.user._id;
    const profileid=await DoctorProfile.findOne({'_userId':user});
    const doctorId=profileid._id;
    try{
        posts = await Appointment.countDocuments({'_doctorId':doctorId});
        post2 = await AppointmentHistory.countDocuments({'_doctorId':doctorId});
        console.log({'upcoming_appointment':posts,'past_appointment':post2});
        res.status(200).json({'upcoming_appointment':posts,'past_appointment':post2});
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports=router;