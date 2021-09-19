const mongoose=require("mongoose");

const postSchema=new mongoose.Schema({
     _userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    title:{
        type:String,
        required:true,
        max:255,
        min:6
    },
    content:{
        type:String,
        required:true,
        max:1024,
        min:20
    },
    description:{
        type:String,
        required:true,
        max:1024,
    },
    image: {
        type: String,
        required: true,
    },
    time:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Post',postSchema);