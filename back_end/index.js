const express=require('express');
const app=express();
const mongoose=require("mongoose");
const dotenv = require("dotenv");
var cors = require('cors');
// For image
const multer = require("multer");
const path = require("path");
// Import Route
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const doctorProfileRoute=require("./routes/doctor");
const appointment=require('./routes/patient');
const payment=require('./routes/payment');
const settings=require('./routes/settings');
const dashboard=require('./routes/dashboard');

dotenv.config();
// Connect to database
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex: true },
  () => console.log("Connect to db")
);

app.use(cors());
// Middleware
app.use(express.json());


app.use("/images", express.static(path.join(__dirname, "/images")));

// Route middleware
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/doctor", doctorProfileRoute);
app.use("/api/patient", appointment);
app.use("/payment", payment);
app.use("/api/settings", settings);
app.use("/api/dashboard", dashboard);

app.listen(5000,()=>console.log('Server up and running'));