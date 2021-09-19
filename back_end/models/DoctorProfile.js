const mongoose=require("mongoose");

const profileSchema=new mongoose.Schema({
    _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    first_name: { 
        type: String, 
        required: true
    },
    last_name: { 
        type: String, 
        required: true
    },
    basic_details:{
        type: String, 
        required: true
    },
    gender:{
        type: String, 
        required: true
    },
    year_of_experiences:{
        type: String, 
        required: true
    },
    address:{
        type: String, 
        required: true
    },
    city:{
        type: String, 
        required: true
    },
    country:{
        type: String, 
        required: true
    },
    mobileno:{
        type: String, 
        required: false
    },
    hospital:{
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    service:{
        type: String,
        required: true,

    },
    time:{
        type:Date,
        default:Date.now
    }
})

// const profileEduSchema=new mongoose.Schema({
//     _userId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         required: true, 
//         ref: 'User' 
//     },
//     degree: { 
//         type: String, 
//         required: true
//     },
//     university: { 
//         type: String, 
//         required: true
//     },
//     year:{
//         type: String, 
//         required: true
//     },
// })

module.exports=mongoose.model('Profile',profileSchema);
// module.exports=mongoose.model('ProfileEdu',profileEduSchema);
