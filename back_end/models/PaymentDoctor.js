const mongoose=require("mongoose");

const accountSchema=new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    beneficiary_name: { 
        type: String, 
        required: true
    },
    accountno: { 
        type: String, 
        required: true
    },
    ifsc_code:{
        type: String, 
        required: true
    },
    time:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model('Account',accountSchema);

