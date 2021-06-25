import React, { createContext, ReactNode, useContext, useState } from 'react'

type IsAuthenticatedContextData = {
  isAuthenticated: boolean
  toggleIsAuthenticated: () => void
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
}

export const IsAuthenticatedContext = createContext(
  {} as IsAuthenticatedContextData
)

type IsAuthenticatedContextProviderProps = {
  children: ReactNode
}

type UserType = {
  id: number
  name: string
}

export const IsAuthenticatedContextProvider: React.FC<IsAuthenticatedContextProviderProps> =
  ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<UserType>({} as UserType)

    const toggleIsAuthenticated = () => {
      setIsAuthenticated(current => !current)
    }

    return (
      <IsAuthenticatedContext.Provider
        value={{ isAuthenticated, toggleIsAuthenticated, user, setUser }}
      >
        {children}
      </IsAuthenticatedContext.Provider>
    )
  }

export const useIsAuthenticatedContext = () => {
  return useContext(IsAuthenticatedContext)
}
