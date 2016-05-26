import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

// Create user schema
const TodoSchema = new Schema({

  title: String,
  completed: Boolean,
  created_at: Date,
  update_at: Date

})

const Todo = mongoose.model('todos', TodoSchema)

export default Todo
