const router=require("express").Router();
const verify=require("./verifyToken");
const multer = require('multer');
let path = require('path');

const Appointment=require('../models/PatientAppointment');
const AppointmentHistory=require('../models/AppointmentsHistory');
const Profile =   require('../models/DoctorProfile');
const ProfileEdu =require('../models/DoctorProfileEdu'); 


// const {Profile,ProfileEdu}=require('../models/DoctorProfile');

//GET APPOINTMENT
router.get('/today_appointments',verify,async(req,res)=>{
    const user=req.user._id;
    const profileid=await Profile.find({'_userId':user});
    const doctorId=profileid[0]._id;
    try{
        posts = await Appointment.find({'_doctorId':doctorId});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET APPOINTMENT Patient by ID
router.get('/appointments/:id',verify,async(req,res)=>{
    // const user=req.user._id;
    // const profileid=await Profile.find({'_userId':user});
    // const doctorId=profileid[0]._id;
    // var appo= await  Appointment.find({'appointments._doctorId':doctorId});
 
    try{        
        posts = await  Appointment.findById(req.params.id);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

// CREATE CHECKUP FOR PATIENT
router.post('/create_checkup',verify,async (req,res)=>{
    const user=req.user._id;
    console.log(req.body);
    try{
        await Appointment.findOneAndUpdate({'_id':req.body.appointmentId}, 
        {
            $push: { 
                checkup:[req.body]
            },
        }, 
        { upsert: true, useFindAndModify: false},
        function (err, response) {
            if (err) throw err;
            res.json(response);
        })
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }    
});

//GET ALL CHECKUP OF INDIVIDUAL PATIENT 
router.get('/checkup_history/:id',verify,async(req,res)=>{
    const user=req.user._id;
    const profileid=await Profile.find({'_userId':user});
    const doctorId=profileid[0]._id;
    try{
        posts = await  AppointmentHistory.find({'_userId':req.params.id,'_doctorId':doctorId});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});


//DELETE CHECKUP
router.get('/checkup_delete/:id',async(req,res)=>{
    console.log(req.params.id);
    try{
        try {
            await Appointment.update({'_id':req.params.id}, {'$unset': {checkup:1}}, false, true);
              res.status(200).json("Post has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
    }catch(err){
        res.status(500).json(err);
    }
});

// CREATE APPOINTMENT HISTORY
router.get('/appointments_change_status/:id',verify,async(req,res)=>{
    try{        
        posts = await  Appointment.findById(req.params.id);
        // .then(()=>{
            // console.log(posts);
            // Inserting the doc in destination collection
            AppointmentHistory.insertMany(posts)
                .then(d => {
                    console.log("Saved Successfully");
                })
                .catch(error => {
                    console.log(error);
            })

             // Removing doc from the source collection
            Appointment.deleteOne(posts)
                .then(d => {
                    console.log("Removed succesfully")
                })
                .catch(error => {
                    console.log(error);
            });
        // });

        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

// CREATE DOCTOR PROFILE

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
router.route('/create').post(upload.single('image'),verify,async (req, res) => {
    const user=req.user._id;
    const profile = new Profile({  
        _userId:user,
       first_name:req.body.first_name,
       last_name:req.body.last_name,
       basic_details:req.body.basic_details,
       gender:req.body.gender,
       year_of_experiences:req.body.year_of_experiences,
       address:req.body.address,
       city:req.body.city,
       country:req.body.country,
       mobileno:req.body.mobileno,
       hospital:req.body.hospital,
       image:req.file.filename,
       service:req.body.service
   });
    try{
        const savedProfile=await profile.save();
        res.send(savedProfile);
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
});


// CREATE DOCTOR EDUCATION
router.post('/create/education',verify,async (req,res)=>{
    const user=req.user._id;
    // console.log(req.body);
    
    if(ProfileEdu.find({'_userId':user})){
        console.log("User found");
        await ProfileEdu.findOneAndUpdate({'_userId':user}, 
        {
            $push: {educations:[req.body]},
        }, 
        { upsert: true, useFindAndModify: false},
        function (err, response) {
            if (err) throw err;
            res.json(response);
        })
    }else{
        console.log("User Not found");
        const profileEdu = new ProfileEdu({
            _userId:user,
            educations:[{
                degree:req.body.degree,
                university:req.body.university,
                year:req.body.year,
            }]
        });
        try{
            const savedProfile=await profileEdu.save();
            res.send(savedProfile);
         }catch(err){
             res.status(400).send(err);
             console.log(err);
         }
    }
});

// CREATE DOCTOR EXPERIENCES
router.post('/create/experiences',verify,async (req,res)=>{
    const user=req.user._id;
    if(ProfileEdu.find({'_userId':user})){
        console.log("User found");
        await ProfileEdu.findOneAndUpdate({'_userId':user}, 
        {
            $push: {experiences:[req.body]},
        }, 
        { upsert: true, useFindAndModify: false},
        function (err, response) {
            if (err) throw err;
            res.json(response);
        })
    }else{
        console.log("User Not found");
        const profileEdu = new ProfileEdu({
            _userId:user,
            experiences:[req.body]
        });
        try{
            const savedProfile=await profileEdu.save();
            res.send(savedProfile);
         }catch(err){
             res.status(400).send(err);
             console.log(err);
         }
    }



});

//GET DOCTOR PROFILE
router.get('/',async(req,res)=>{
    try{
        posts = await Profile.find();
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET DOCTOR EDUCATION
router.get('/education',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await ProfileEdu.find({'_userId':user});
        if(posts.length==0){
            console.log("Not found");
        }else{
            res.status(200).json(posts[0].educations);
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//GET DOCTOR EDUCATION
router.get('/experiences',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await ProfileEdu.find({'_userId':user});
        if(posts.length==0){
            console.log("Not found");
        }else{
            res.status(200).json(posts[0].experiences);
        }
        // res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE DOCTOR EDUCATION
router.delete('/delete/:id',async(req,res)=>{
    try{
        const post= await ProfileEdu.findById(req.params.id);
            try {
              await post.delete();
              res.status(200).json("Post has been deleted...");
            } catch (err) {
              res.status(500).json(err);
            }
    }catch(err){
        res.status(500).json(err);
    }
});



//GET APPOINTMENT
// router.get('/appointments',verify,async(req,res)=>{
//     const user=req.user._id;
//     const profileid=await Profile.find({'_userId':user});
//     const doctorId=profileid[0]._id;

//     try{
//         posts = await Appointment.find();
//         // console.log(posts);
//         var data=[];
//         for(var i=0;i<posts.length;i++){
//            data.push(
//             {
//                 _id:posts[i]._id,
//                 _userId:posts[i]._userId,
//                 patient_name:posts[i].patient_name,
//                 blood_group:posts[i].blood_group,
//                 mobileno:posts[i].mobileno,
//                 address:posts[i].address,
//                 email:posts[i].email
//               }
//            )
//         }
//         res.status(200).json(data);
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

//GET APPOINTMENT Patient by ID
// router.get('/appointments/:id',verify,async(req,res)=>{
    // const user=req.user._id;
    // const profileid=await Profile.find({'_userId':user});
    // const doctorId=profileid[0]._id;
    // console.log(doctorId);

//   /  var appo= await  Appointment.find({'appointments._doctorId':doctorId});
    // console.log(appo);
    // apps=await data[0].appointments.find({'_doctorId':doctorId});
    // console.log(apps);

    
    // var data = await  Appointment.aggregate([
        // Still match the document
        // { "$match": { 
            // "appointments": { 
                // "$elemMatch": {'_doctorId':doctorId}
            // }
        // }},
        
        // unwind the array for the matched documents
        // { "$unwind": "$appointments" },
        
        // Match only the elements
        // { "$match": { "appointments._doctorId": doctorId } },
        // 
        // Group back to the original form if you want
    //     { "$group": {
    //         "_id": "$_id",
    //         "appointments": { "$push": "$appointments" }
    //     }}
        
    // ])
    // console.log(data);
   


    // try{
    //     var posts=[];
    //     for(var i=0;i<data.length;i++){
    //         if(data[i]._id==req.params.id){
                // console.log(data[i].appointments);
                // posts.push(data[i]);
                // for(var j=0;j<data[i].appointments.length;j++){
                //     posts.push(data[i].appointments[j]);
                // }
                // break;
            // }
        // }
        // console.log(posts);
        // posts = await  Appointment.findById(req.params.id);
        // console.log(posts.appointments);
        // res.status(200).json(posts);
    // }catch(err){
        // res.status(500).json(err);
    // }
// });




// router.put('/update/:id',async (req,res)=>{
//     try {
//         const post = await Post.findById(req.params.id);
//           try {
//             const updatedPost = await Post.findByIdAndUpdate(req.params.id,
//               {$set: req.body,},{ new: true }
//             );
//             res.status(200).json(updatedPost);
//           } catch (err) {
//             res.status(500).json(err);
//           }
//       } catch (err) {
//         res.status(500).json(err);
//       }
// });


module.exports=router;