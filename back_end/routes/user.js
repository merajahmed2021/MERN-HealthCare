const router=require("express").Router();
const verify=require("./verifyToken");

router.get("/",verify,(req,res)=>{
    res.send(req.user);
    
    // res.json({posts:{title:'Post created',description:'NodeJs Auth System'}});
})

module.exports=router;