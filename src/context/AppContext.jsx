import { createContext } from "react";
import { doctors } from "../assets/assets";
import { useState } from "react";
export const AppContext = createContext();
import axios from "axios";
const AppContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({})
  const getUserByEmail = async (user) => {
    const response = await axios.get(
      `https://localhost:7235/api/Patients/${user}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }

    );
    setUserData(response.data);
    
  }
  const value = {
    doctors,
    user,
    setUser,
    getUserByEmail,
    userData,
    setUserData
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
