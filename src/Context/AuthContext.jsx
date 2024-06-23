import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        token: action.token,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

const initialUser = JSON.parse(localStorage.getItem("data"));
const initialToken = JSON.parse(localStorage.getItem("token"));

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: initialUser,
    token: initialToken,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
