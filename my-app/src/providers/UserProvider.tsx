"use client";

import { auth } from "@/_firebase/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import { set } from "firebase/database";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loginLoading: boolean;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  const [loginLoading, setLoginLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoginLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loginLoading }}>
      {children}
    </UserContext.Provider>
  );
};
