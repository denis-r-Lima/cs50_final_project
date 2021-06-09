import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/LoginPage'
import Scheduler from './components/Scheduler'

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="*" component={Scheduler} />
      </Switch>
    </Router>
  )
}

export default Routes
