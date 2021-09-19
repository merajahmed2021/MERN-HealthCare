const mongoose=require("mongoose");

const appointmentSchema=new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    patient_name: { 
        type: String, 
        required: true
    },
    blood_group: { 
        type: String, 
        required: true
    },
    gender:{
        type: String, 
        required: true
    },  
    date_of_birth: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true
    },
    mobileno: { 
        type: String, 
        required: true
    },
    address:{
        type: String, 
        required: true
    },    
    _doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    doctor_name: { 
        type: String, 
        required: true
    },
    hospital_name: { 
        type: String, 
        required: true
    },
    date_of_appointment:{
        type: String, 
        required: true
    },
    appointment_type:{
        type: String, 
        required: true
    },
    appointment_mode:{
        type: String, 
        required: true
    },
    time:{
        type:Date,
        default:Date.now
    },
    checkup:[
      {
        symptoms:{
            type: String, 
        },
        diagnosis:{
            type: String, 
        },
        prescription:{
            type: String, 
        }
      }
    ]
})

module.exports=mongoose.model('Appointment',appointmentSchema);
