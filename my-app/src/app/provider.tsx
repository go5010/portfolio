"use client";

import { app, firebaseConfig } from "@/_firebase/firebaseConfig";
import { ReactNode, useEffect } from "react";
import { FirebaseAppProvider } from "reactfire";
// import { RecoilRoot } from "recoil";
// import { UserProvider } from "./userContext";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} firebaseApp={app}>
      {/* <UserProvider>
        <RecoilRoot> */}
      {children}
      {/* </RecoilRoot>
      </UserProvider> */}
    </FirebaseAppProvider>
  );
}
