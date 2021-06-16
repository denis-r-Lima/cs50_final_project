import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/LoginPage'
import Scheduler from './components/Scheduler'
import UserPage from './components/UserPage'
import { IsAuthenticatedContextProvider } from './context/isAuthenticatedContext'
import PrivateRoute from './utils/privateRoute'

const Routes: React.FC = () => {
  return (
    <IsAuthenticatedContextProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact>
            <UserPage />
          </PrivateRoute>
          <Route path="/login" exact component={Login} />
          <Route path="*" component={Scheduler} />
        </Switch>
      </Router>
    </IsAuthenticatedContextProvider>
  )
}

export default Routes
