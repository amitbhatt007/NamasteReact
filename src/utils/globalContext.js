import React, { useContext } from "react";

const initialState = {
  user: { name: "Amit", email: "amit@example.com" },
  cart: [],
};

const GlobalContext = React.createContext(initialState);

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export default GlobalContext;
