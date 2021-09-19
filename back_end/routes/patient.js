const router=require("express").Router();
const verify=require("./verifyToken");
const Appointment=require('../models/PatientAppointment');
const DoctorProfile=require('../models/DoctorProfile');
const AppointmentHistory=require('../models/AppointmentsHistory');
const DoctorEdu =require('../models/DoctorProfileEdu'); 

//GET DOCTOR PROFILE
router.get('/',async(req,res)=>{
    try{
        posts = await DoctorProfile.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET DOCTOR PROFILE BY ID
router.get('/doctor_profile/:id',async(req,res)=>{
    try{
        posts = await DoctorProfile.findById(req.params.id);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/doctor_education/:id',async(req,res)=>{
    try{
        posts = await DoctorProfile.findById(req.params.id);
        // console.log(posts._userId);

        edu=await DoctorEdu.find({'_userId':posts._userId});
        // console.log(edu);
        
        res.status(200).json(edu);
    }catch(err){
        res.status(500).json(err);
    }
});


// CREATE APPOINTMENT
router.post('/create_appointment',verify,async (req,res)=>{
    const user=req.user._id;
    const appointment = new Appointment({
        _userId:user,
        patient_name:req.body.patient_name,
        blood_group:req.body.blood_group,
        gender:req.body.gender,
        date_of_birth:req.body.date_of_birth,
        email:req.body.email,
        mobileno:req.body.mobileno,
        address:req.body.address,
        _doctorId:req.body.doctorId,
        doctor_name:req.body.doctor_name,
        hospital_name:req.body.hospital_name,
        date_of_appointment:req.body.date_of_appointment,
        appointment_type:req.body.appointment_type, 
        appointment_mode:req.body.appointment_mode, 
    });
    try{
       const savedAppoint=await appointment.save();
       res.send(savedAppoint);
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }   
});

// Get Pending Appointment  of patient
router.get('/appointment_pending',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await Appointment.find({'_userId':user});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE Pending Appointment
router.delete('/delete_appointment/:id',async(req,res)=>{
    try{
        const post= await Appointment.findById(req.params.id);
            try {
              await post.delete();
              res.status(200).json("Appointment has been deleted...");
            } catch (err) {
              res.status(500).json(err);
            }
    }catch(err){
        res.status(500).json(err);
    }
});


// Get Appointment History of patient
router.get('/appointment_history',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await AppointmentHistory.find({'_userId':user});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});



//GET APPOINTMENT STATUS BY ID
router.get('/appointment_status/:id',async(req,res)=>{
    try{
        posts = await Appointment.findById(req.params.id);
        // console.log("Doctor ID = ",posts._doctorId);
        findDoctor=await Appointment.find({'_doctorId':posts._doctorId});
        var status=null;
        for(var i=0;i<findDoctor.length;i++){
            // console.log("APPOINTMENT= " , i);
            // console.log(findDoctor[i])
            if(findDoctor[i]._id==req.params.id){
               status=i+1;
            }
        }
        // console.log("Present Status of = " ,req.params.id,'is === ',status);
        res.status(200).json({"status":status,"total":findDoctor.length});
    }catch(err){
        res.status(500).json(err);
    }
});

// router.post('/create',verify,async (req,res)=>{
//     const user=req.user._id;
//     const appointment = new Appointment({
//         _userId:user,
//         patient_name:req.body.patient_name,
//         blood_group:req.body.blood_group,
//         gender:req.body.gender,
//         date_of_birth:req.body.date_of_birth,
//         email:req.body.email,
//         mobileno:req.body.mobileno,
//         address:req.body.address,
        
//     });
//     try{
//        const savedAppoint=await appointment.save();
//        res.send(savedAppoint);
//     }catch(err){
//         res.status(400).send(err);
//         console.log(err);
//     }
// });


module.exports=router;