const todo = (state, action) => {
  switch (action.type) {
  case 'INIT_TODO':
    return {
      id: action.id,
      text: action.text,
      completed: false
    }
  case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      completed: false
    }
  case 'TOGGLE_TODO':
    if (state.id !== action.id) {
      return state
    }

    return Object.assign({}, state, {
      completed: !state.completed
    })
  default:
    console.log('123', action)
    return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
  case 'INIT_TODO':
    return [
      ...state,
      todo(undefined, action)
    ]
  case 'ADD_TODO':
    return [
      ...state,
      todo(undefined, action)
    ]
  case 'TOGGLE_TODO':
    return state.map(t =>
        todo(t, action)
      )
  default:
    return state
  }
}

export default todos
