import { createContext } from "react";
import { User } from "../models/user";

export type AuthContextType = {
  user: User | null;
  signin: (email: string, password: string) => Promise<boolean>;
  signout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextType>(null!);
