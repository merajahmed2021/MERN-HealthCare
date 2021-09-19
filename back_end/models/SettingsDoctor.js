const mongoose=require("mongoose");

const settingSchema=new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    new_appointmentFee: { 
        type: String, 
        required: true
    },
    old_appointmentFee: { 
        type: String, 
        required: true
    },
    appointment_type:{
        type: String, 
        required: true
    },
    patient_allowed:{
        type: String, 
        required: true
    },
    payment_mode:{
        type:Boolean,
        required: true
    },
    appointment_booking:{
        type:Boolean,
        required: true
    },
    time:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model('Settings',settingSchema);

