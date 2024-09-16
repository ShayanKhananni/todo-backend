import express from "express";

const router = express.Router();
router.get('/testing',(req,res)=>
{
  res.status(200).json({message:'end point is working'});
})

