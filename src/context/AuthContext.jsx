import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { AdminContext } from "./AdminContext";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const { aToken, setAToken } = useContext(AdminContext);
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (!aToken) {
      console.warn("Token is null or undefined");
      return;
    }

  }, [aToken, email]);

  const login = (aToken) => {
    // localStorage.removeItem("aToken");
    localStorage.setItem("aToken", aToken);
    //localStorage.removeItem("email");
    try {
      const decodedToken = jwtDecode(aToken);
      const emailDecoded =
        decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];

      const role =
        decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      setEmail(emailDecoded);
      setUserRole(role);
    } catch (error) {
      console.error("Error decoding token:", error.message);
    }
    setAToken(aToken);
    const decodedToken = jwtDecode(aToken);
    const emailDecoded =
      decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];

    const role =
      decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    setEmail(emailDecoded);
    localStorage.setItem("email", emailDecoded);

    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("aToken");
    localStorage.removeItem("email");

    setAToken("");
    setEmail("");
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ aToken, userRole, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};
