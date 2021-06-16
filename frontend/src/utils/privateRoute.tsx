import React, { ReactNode, useEffect, useState } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useIsAuthenticatedContext } from '../context/isAuthenticatedContext'
import api from './api'

interface PrivateRouteProps extends RouteProps {
  children: ReactNode
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
  const {isAuthenticated, toggleIsAuthenticated, setUser} = useIsAuthenticatedContext()
  const [loading, setLoading] = useState<boolean>(true)

  const apiCall = async () => {
    try {
      const user = (await api.get('/check_auth')).data

      if (user) {
        setUser(user)
        toggleIsAuthenticated()
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    apiCall()
  }, [])

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated && !loading ? (
          children
        ) : loading ? (
          <></>
        ) : (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
