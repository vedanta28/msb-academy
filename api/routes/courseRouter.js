const express = require("express");
const router = express.Router();
const {getAllCourses}= require("../controllers/courseController");

router
    .route('/')
    .get(async (req,res)=>{
    const courses=await getAllCourses();
    res.status(200).json({
        status:"success",
        data:{
            courses
        }
    })
});

module.exports=router;