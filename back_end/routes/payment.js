const router=require("express").Router();
const verify=require("./verifyToken");
const Razorpay = require("razorpay");
const crypto=require('crypto');
const Payment=require('../models/PaymentPatient');
const Account=require('../models/PaymentDoctor');
const Profile =   require('../models/DoctorProfile');

// require("dotenv").config();
// const express = require("express");

// const router = express.Router();

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: 50000, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");
        // console.log("ORDER = " ,order);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post("/success",verify ,async (req, res) => {
    const user=req.user._id;
    console.log("Success body = ",req.body);
    try {

        // getting the details back from our font-end
        const {orderCreationId,razorpayPaymentId,razorpayOrderId,razorpaySignature,} = req.body;
        
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        let generatedSignature = hmac.digest('hex');

        if (generatedSignature !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        console.log("\n\nSUCCESS = " ,{
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });

        if(Payment.find({'_userId':user,'_doctorId':req.body.doctorId})){
            console.log("User found");
            await Payment.findOneAndUpdate({'_userId':user,'_doctorId':req.body.doctorId}, 
            {
                $push: {payments:[
                    { 
                        doctor_name:req.body.doctor_name,
                        hospital_name: req.body.hospital_name,
                        date_of_appointment:req.body.date_of_appointment,
                        orderId:razorpayOrderId,
                        paymentId:razorpayPaymentId,
                    }
                ]},
            }, 
            { upsert: true, useFindAndModify: false},
            function (err, response) {
                if (err) throw err;
                res.json(response);
            })
        }else{
            console.log("User Not found");
            const payment = new Payment({
                _userId:user,
                _doctorId:req.body.doctorId,            
                email:req.body.email,
                payments:[
                    { 
                        doctor_name:req.body.doctor_name,
                        hospital_name: req.body.hospital_name,
                        date_of_appointment:req.body.date_of_appointment,
                        orderId:razorpayOrderId,
                        paymentId:razorpayPaymentId,
                    }
                ],
            });
            try{
               const savedPayment=await payment.save();
               console.log("\n\n PAYMENT DETAILS SAVED TO DATABASE = ",savedPayment);
               res.send(savedPayment);
            }catch(err){
                res.status(400).send(err);
                console.log(err);
            }   
        }

         // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        // res.json({
        //     msg: "success",
        //     orderId: razorpayOrderId,
        //     paymentId: razorpayPaymentId,
        // });

    } catch (error) {
        res.status(500).send(error);
    }
});

//GET DOCTOR PROFILE
router.get('/all_payments',verify,async(req,res)=>{
    const user=req.user._id;
    try{
        posts = await Payment.find({'_userId':user});
        var payments=[];
        for(var i=0;i<posts.length;i++){
            var pay=posts[i].payments;
            for(j=0;j<pay.length;j++){
                payments.push(pay[j]);
            }
        }
        console.log(payments);
        res.status(200).json(payments);
    }catch(err){
        res.status(500).json(err);
    }
});

// CREATE DOCTOR ACCOUNT DETAILS

router.post('/doctor_account',verify,async(req,res)=>{
    console.log(req.body);
    const user=req.user._id;

    posts = await Account.findOne({'_userId':user});
    if(posts){      
        try{
            const doc = await Account.findOneAndUpdate({'_userId':user},
            {
                beneficiary_name:req.body.beneficiary_name,            
                accountno:req.body.accountno,
                ifsc_code:req.body.ifsc_code,  
            });
            res.send(doc);
         }catch(err){
             res.status(400).send(err);
             console.log(err);
         } 
    }else{
        const account = new Account({
            _userId:user,
            beneficiary_name:req.body.beneficiary_name,            
            accountno:req.body.accountno,
            ifsc_code:req.body.ifsc_code,
        });
        try{
           const savedAccount=await account.save();
           console.log("\n\n PAYMENT DETAILS SAVED TO DATABASE = ",savedAccount);
           res.send(savedAccount);
        }catch(err){
            res.status(400).send(err);
            console.log(err);
        }   
    }
});


router.get('/doctor_payments',verify,async(req,res)=>{
    const user=req.user._id;
    // console.log("USER ID = ",user);
    const profileid=await Profile.find({'_userId':user});
    const doctorId=profileid[0]._id;
    // console.log("Doctor Profile ID = ",doctorId);
    try{
        posts = await Payment.find({'_doctorId':doctorId});
        var payments=[];
        for(var i=0;i<posts.length;i++){
            var pay=posts[i].payments;
            for(j=0;j<pay.length;j++){
                payments.push(pay[j]);
            }
        }
        // console.log(payments);
        res.status(200).json(payments);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;