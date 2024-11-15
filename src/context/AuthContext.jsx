import React, { createContext, useState, useEffect,useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AdminContext } from "./AdminContext";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const {aToken, setAToken} = useContext(AdminContext)

  useEffect(() => {
    
    if (aToken) {
        
        const decodedToken = jwtDecode(aToken);
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setUserRole(role);
    }
  }, [aToken]);

  const login = (aToken) => {
    localStorage.setItem("aToken", aToken);
    setAToken(aToken);
    const decodedToken = jwtDecode(aToken);
    setUserRole(decodedToken.role);
  };

  const logout = () => {
    localStorage.removeItem("aToken");
    setAToken("");
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ aToken, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
