"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type User = {
  id: number;
  name: string;
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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
