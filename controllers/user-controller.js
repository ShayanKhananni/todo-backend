import User from "../models/user-model.js";
import jwt  from "jsonwebtoken";



export const getAllUsers = async (req,res,next) =>
{
  try
  {
    const users = await User.find({});
    res.status(200).json({users});
  }
  catch(err)
  {
    next(err);
  }
  
}

export const deleteUser = async (req,res) =>
{
  try
  {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);

    if(!user)
    {
     return res.json({message:"User Not found"});
    }

    res.status(200).json({message:"User Deleted Successfully"});
  }
  catch(err)
  {
    res.status(500).json({message:err.message})
  }
}


export const deleteAll = async (req,res) =>
{
  try
  {
     const deleted = await User.deleteMany({});
     res.status(200).send('All users are deleted');
  }
  catch(err)
  {
    next(err);
  }
   
}



export const home = (req,res,next) =>
{

  res.status(200).json({message:"Weclome to Home page"});
}




export const logout = (req,res,next) =>
{
  try
  {
  res.clearCookie("auth_token").status(200).json({ message: "Cookie Deleted" });
  }
  catch(err)
  {
    next(err);
  }
}

export const checkSession = (req,res,next) =>
{
  res.status(200).json({messge:"Session is valid!!"});
}


export const refreshSession = (req,res,next) =>
{
  const {id} = req.body;
  const token = jwt.sign({id},process.env.JWT_SECRET);
  res.cookie("auth_token",token,{
    // httpOnly: true,
    // sameSite: "Lax",
    // secure: true,
    expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRY) )
  }).status(200).json({message:"cookie is reset"});
}