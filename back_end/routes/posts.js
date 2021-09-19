const router=require("express").Router();
const verify=require("./verifyToken");
const Post=require("../models/Post");
const multer = require('multer');
let path = require('path');




router.get('/',async(req,res)=>{
    try{
        posts = await Post.find().sort('-time');
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/latest',async(req,res)=>{
    try{
        posts = await Post.find().sort('-time').limit(3);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});


router.get('/user',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await Post.find({'_userId':user}).sort('-time');
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});

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
    const post = new Post({
        _userId:user,
        title:req.body.title,
        content:req.body.content,
        description:req.body.description,
        image:req.file.filename
    });
    try{
       const savedPost=await post.save();
       res.send(savedPost);
    }catch(err){
        res.status(400).send(err);
        console.log(err);
    }
});




router.put('/update/:id',async (req,res)=>{
          try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id,
              {$set: req.body,},{ new: true }
            );
            res.status(200).json(updatedPost);
          } catch (err) {
            res.status(500).json(err);
          }
});

router.delete('/delete/:id',async(req,res)=>{
     try {
         const post= await Post.findById(req.params.id);
           await post.delete();
           res.status(200).json("Post has been deleted...");
     } catch (err) {
       res.status(500).json(err);
     }
});

//GET DOCTOR PROFILE BY ID
router.get('/blogs/:id',async(req,res)=>{
    try{
        posts = await Post.findById(req.params.id);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports=router;