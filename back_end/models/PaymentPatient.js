const mongoose=require("mongoose");

const paymentSchema=new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    _doctorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    email: { 
        type: String, 
        required: true
    },
    payments:[
        { 
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
            paymentId: { 
                type: String, 
                required: true
            },
            orderId: { 
                type: String, 
                required: true
            },
            time:{
                type:Date,
                default:Date.now
            },
        }
    ]
})

module.exports=mongoose.model('Payment',paymentSchema);

