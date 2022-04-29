import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isAdmin: false,
  token: "",
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("isAdmin", payload.isAdmin);
      return {
        ...state,
        ...payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};