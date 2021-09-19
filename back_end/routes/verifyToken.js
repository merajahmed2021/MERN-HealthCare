const jwt=require("jsonwebtoken");

module.exports=function (req,res,next){
   // console.log(req.headers.authorization);
   let token=null;
   if(req.headers.authorization){
      token=req.headers.authorization.split(" ")[1];
   }

   // console.log(token);
    if(!token) return res.status(401).send("Access denied"); 
    
    try{
       const verified=jwt.verify(token,process.env.TOKEN_SECRET);
       req.user=verified;
       next();
    }catch(err){
       res.status(400).send("Invalid Token");
    }   
}