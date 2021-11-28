import React from "react";

import { User } from '../models/User';

interface GlobalsType {
  loggedInState: boolean,
  currentUser: User | undefined,
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
};
const Context = React.createContext<GlobalsType>(undefined!);

export default Context;
