import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
 
  username:{
    type:String,
    require:true,
    unique:[true,'Username already exist']
  },
  email:{
    type:String,
    require:true,
    unique:[true,'Email already exist']
  },
  password:{
    type:String,
    require:true,
  },
  photoURL:
  {
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s"
  }
},{timestamps:true})


const User = mongoose.model('User',UserSchema); 

export default User;