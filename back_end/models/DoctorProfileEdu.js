const mongoose=require("mongoose");


const profileEduSchema=new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    educations:[
        {
            degree: { 
                type: String, 
                required: true
            },
            university: { 
                type: String, 
                required: true
            },
            year:{
                type: String, 
                required: true
            },
        }
    ]
    ,
    experiences:[
        {
            type:{
                type:String,
                required:true
            },
            detail:{
                type:String,
                required:true
            },
            time_duration:{
                type:String,
                required:true
            }
        }
    ]
})

module.exports=mongoose.model('ProfileEdu',profileEduSchema);

