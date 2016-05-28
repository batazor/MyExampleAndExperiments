import { Router } from 'express'

export default () => {
  let todo = Router()

  todo.get('/', (req, res) => {
    console.log('ADD TODO GET')
    res.json('get todo')
  })

  todo.post('/', (req, res) => {
    console.log('ADD TODO POST')
    res.json('post todo')
  })


  return todo
}
