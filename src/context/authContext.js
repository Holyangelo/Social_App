import { createContext, useEffect, useState } from "react";
import axios from 'axios';
/*URL */
const url = "http://localhost:4000/auth/login";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async(inputs) => {
    /* Create Login POST */
    const response = await axios.post(url, inputs, {
      withCredentials: true
    });
    /* Create current user */
    setCurrentUser(response.data.rest);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
