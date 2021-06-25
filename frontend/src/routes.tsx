import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/LoginPage'
import Scheduler from './components/Scheduler'
import UserPage from './components/UserPage'
import MyAccount from './components/UserPage/MyAccount'
import SettingsPage from './components/UserPage/SettingsPage'
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
          <PrivateRoute path="/settings">
            <SettingsPage />
          </PrivateRoute>
          <PrivateRoute path="/myaccount">
            <MyAccount />
          </PrivateRoute>
          <Route path="*" component={Scheduler} />
        </Switch>
      </Router>
    </IsAuthenticatedContextProvider>
  )
}

export default Routes
