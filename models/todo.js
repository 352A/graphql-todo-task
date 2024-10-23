import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
});
  
export const todoModel= mongoose.model('Todo', todoSchema);