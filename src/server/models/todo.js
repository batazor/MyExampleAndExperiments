import mongoose, { Schema } from 'mongoose'

const TodoSchema = new Schema({

  title: { type: String, default: 'Default title' },
  text: { type: String, default: 'Default description' },
  completed: { type: Boolean, default: false },
  created_at: { type: Date },
  update_at: { type: Date },

})

let Todo = mongoose.model('todos', TodoSchema)

export default Todo

export const getListOfTodos = () => {
  return new Promise((resolve, reject) => {
    Todo.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

export const getTodoByPosition = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Todo.find({}).exec((err, res) => {
      err ? reject(err) : resolve(res[id])
    })
  })
}

export const getTodoById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Todo.findOne({
      id: id
    }).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

export const addTodo = (root, {text, completed}) => {
  let newTodo = new Todo({text: text, completed: completed})

  return new Promise((resolve, reject) => {
    newTodo.save((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

export const updateTodo = (root, {_id, text, completed}) => {
  let updateTodo = {
    text: text,
    completed: completed
  }

  return new Promise((resolve, reject) => {
    Todo.findOneAndUpdate(
      { _id: _id },
      { $set: updateTodo },
      { returnNewDocument: true }
    ).exec((err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}
