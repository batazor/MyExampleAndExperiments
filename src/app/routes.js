import React from 'react' // eslint-disable-line no-unused-vars
import { Route, IndexRoute } from 'react-router'

import requireAutentication from './containers/AuthenticatedComponent'
import { App, Home, Admin, Maps, Auth, User, Todo, NotFound } from './pages'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='auth' component={Auth} />
    <Route path='user' component={User} />
    <Route path='admin' component={requireAutentication(Admin)} />
    <Route path='maps' component={Maps} />
    <Route path='todo' component={Todo} />
    <Route path='*' component={NotFound} />
  </Route>
)
