import React from "react";

import { User } from '../models/User';

interface GlobalsType {
  loggedInState: boolean,
  currentUser: User | undefined,
  token: string | undefined,
  id: number | undefined,
  isAdmin: boolean,
  email: string | undefined,

  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>,
  setId: React.Dispatch<React.SetStateAction<number | undefined>>,
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>,
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>
};
const Context = React.createContext<GlobalsType>(undefined!);

export default Context;
