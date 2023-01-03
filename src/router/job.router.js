 const express = require('express')
const jobRouter=express.Router();
const jobModel=require("../model/job.model")


jobRouter.get("/",async(req,res)=>{
  try {
    let jobs= await jobModel.find({});
  return  res.send(jobs)
    
  } catch (error) {
    return res.send(error)
  }
})

jobRouter.post("/joblisting",async(req,res)=>{
    try {
        const{company,city,location,role,level,contract,position,language}=req.body;
        let date=new Date();
        let timeStamp=date.toUTCString();
        let profile=new jobModel({company,postedAt:timeStamp,city,location,role,level,contract,position,language})
        profile=await profile.save();
        return res.send('job created successfully')
    } catch (e) {
        return  res.send(e)
    }
})

jobRouter.get("/jobsortasc",async(req,res)=>{
    try {
        let jobs= await jobModel.find({}).sort({postedAt:1});
      return  res.send(jobs)
        
      } catch (error) {
        return res.send(error)
      }
    
})

jobRouter.get("/jobsortdesc",async(req,res)=>{
    try {
        let jobs= await jobModel.find({}).sort({postedAt:-1});
      return  res.send(jobs)
        
      } catch (error) {
        return res.send(error)
      }
    
})
jobRouter.get("/jobfilter",async(req,res)=>{
    try {
        const {level}=req.body;
        let jobs= await jobModel.find({level:level});
      return  res.send(jobs)
        
      } catch (error) {
        return res.send(error)
      }
    
})
module.exports=jobRouter