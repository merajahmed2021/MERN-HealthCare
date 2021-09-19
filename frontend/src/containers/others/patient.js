const router=require("express").Router();
const verify=require("../../../../back_end/routes/verifyToken");
const Appointment=require('../../../../back_end/models/PatientAppointment');
const DoctorProfile=require('../../../../back_end/models/DoctorProfile');

router.post('/create',verify,async (req,res)=>{
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
        
    });
    try{
       const savedAppoint=await appointment.save();
       res.send(savedAppoint);
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
});

router.post('/book_appointment',verify,async (req,res)=>{
    const user=req.user._id;
    const userData=await Appointment.find({'_userId':user});
    // console.log(userData[0].appointments);
    // const apps=userData[0].appointments[0]._doctorId;
    // console.log(apps);

    // await Appointment.findOneAndUpdate({'_userId':user}, 
    // {
    //     $push: { 
    //         appointments:[
    //             {
    //                 _doctorId:req.body.doctorId,
    //                 doctor_name:req.body.doctor_name,
    //                 hospital_name:req.body.hospital_name,
    //                 date_of_appointment:req.body.date_of_appointment,
    //                 appointment_type:req.body.appointment_type,
    //                },
    //         ]
    //     },
    // }, 
    // { upsert: true, useFindAndModify: false},
    // function (err, response) {
    //     if (err) throw err;
    //     res.json(response);
    // })

    try {
        await Appointment.updateOne({'_userId':user}, {
            $push: { 
                appointments:[
                    {
                        _doctorId:req.body.doctorId,
                        doctor_name:req.body.doctor_name,
                        hospital_name:req.body.hospital_name,
                        date_of_appointment:req.body.date_of_appointment,
                        appointment_type:req.body.appointment_type,
                       },
                ]
            },
        })
      } catch (err) {
        // console.log(err)
      }
    


    // try{
    //    const savedAppoint=await appointment.save();
    //    res.send(savedAppoint);
    // }catch(err){
    //     res.status(400).send(err);
    //     console.log(err);
    // }
});


router.get('/',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await Appointment.find({'_userId':user});
        // console.log(posts[0].appointments);
        res.status(200).json(posts[0].appointments);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/doctor_profile/:id',async(req,res)=>{
    try{
        posts = await DoctorProfile.findById(req.params.id);
        // console.log(posts);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});



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

// router.delete('/delete/:id',async(req,res)=>{
//     try{
//         const post= await Post.findById(req.params.id);
//             try {
//               await post.delete();
//               res.status(200).json("Post has been deleted...");
//             } catch (err) {
//               res.status(500).json(err);
//             }
//     }catch(err){
//         res.status(500).json(err);
//     }
// });

module.exports=router;