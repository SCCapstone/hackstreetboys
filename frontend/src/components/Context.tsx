import React from "react";
import { useEffect, useState, useContext } from 'react';

import { User } from '../models/User';

interface GlobalsType {
  loggedInState: boolean,
  currentUser: User | undefined,
  token: string | undefined,
  id: number | undefined,
  isAdmin: boolean,
  email: string | undefined,
  loading: boolean,

  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>,
  setId: React.Dispatch<React.SetStateAction<number | undefined>>,
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>,
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
};
const Context = React.createContext<GlobalsType>(undefined!);

const ContextProvider = ({ children }: any) => {
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ user, setUser ] = useState<User>();
  const [ token, setToken ] = useState<string>();
  const [ id, setId ] = useState<number>();
  const [ isAdmin, setAdmin ] = useState<boolean>(false);
  const [ email, setEmail ] = useState<string>();
  const [ loading, setLoading ] = useState<boolean>(true);

  const globals = {
      loggedInState: loggedIn,
      currentUser: user,
      token,
      id,
      isAdmin,
      email,
      loading,

      setLoggedIn,
      setUser,
      setToken,
      setId,
      setAdmin,
      setEmail,
      setLoading
    }

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      globals.setUser(foundUser);
      globals.setLoggedIn(true);

      const savedToken = localStorage.getItem('token');
      if (savedToken)
        globals.setToken(savedToken);
      const savedId = localStorage.getItem('id');
      if (savedId)
        globals.setId(+savedId);
      const savedAdmin = Boolean(JSON.parse(localStorage.getItem('admin') || 'false'));
      if (savedAdmin)
        globals.setAdmin(savedAdmin);
      const savedEmail = localStorage.getItem('email');
      if (savedEmail)
        globals.setEmail(savedEmail);

      globals.setLoading(false);
    }
  }, []);

  return (
    <Context.Provider value={globals}>
      {children}
    </Context.Provider>
  )
}

const useGlobalContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
}

export {Context, ContextProvider, useGlobalContext};
export default Context;
