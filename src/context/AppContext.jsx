import { createContext } from "react";
import { doctors } from "../assets/assets";
import { useState } from "react";
export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [user, setUser] = useState({});
  const currencySymbol = '$'
  const value = {
    doctors,
    currencySymbol,
    user,
    setUser
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
