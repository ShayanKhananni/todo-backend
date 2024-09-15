import mongoose, { mongo } from "mongoose";

const TodoSchema = mongoose.Schema({

  user_id:
  {
    type:mongoose.Schema.Types.ObjectId,
    requied: true,
    ref: 'User'
  },

  title:{
    type:String,
    requied: true
  },

  description:
  {
    type:String
  },

  date:
  {
    type: Date
  },

  time:
  {
    type:String
  },

  priority:
  {
    type:Number,
  }

}) 

TodoSchema.index({ user_id: 1, title: 1 }, { unique: true });

export const TodoModel = mongoose.model("Todo",TodoSchema);

