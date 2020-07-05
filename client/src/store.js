
import React, { createContext, useReducer } from "react";

const initialState = {
  isLogged: false,
  currentUser: {
    id: -1,
    firstName: "",
    lastName: "",
    email: "",
  }
};

const UserContext = createContext(initialState);

let reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      const newState = {...state, isLogged: true, ...action.payload};
      return newState;

    case "LOGOUT_USER":
      return {...initialState, isLogged: false};
    default:
      throw new Error("case does not exists");
  }
}

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export { UserContext, StateProvider };
