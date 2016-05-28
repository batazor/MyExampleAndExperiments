import React from 'react' // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router'

import { App, Home, Foo, Maps, Auth, User, Todo, NotFound } from './components'

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="auth" component={ Auth } />
    <Route path="user" component={ User } />
    <Route path="foo" component={ Foo } />
    <Route path="maps" component={ Maps } />
    <Route path="todo" component={ Todo } />
    <Route path="*" component={ NotFound } />
  </Route>
)
