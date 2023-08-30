import React, { useState, useEffect } from "react";
import { useApi } from "../../config/apiTESTE";
import { User } from "../models/user";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setuser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem("authToken");
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) {
          setuser(data.user);
        }
      }
    };

    validateToken();
  }, []);

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    if (data.user && data.token) {
      setuser(data.user);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const signout = async () => {
    setuser(null);
    setToken("");
    await api.logout();
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await api.register(name, email, password);

    return true;
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};