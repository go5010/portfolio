"use client";

import { auth } from "@/_firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  // const [user, setUser] = useState<User | null>({
  //   id: 1,
  //   name: "a",
  //   email: "a",
  // });
  const [user, setUser] = useState<User | null>(null);

  const value = { user };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const loginUser = { id: user.uid, email: user.email! };
        setUser(loginUser);
      } else {
        setUser(user);
      }
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
