//contextを簡単に呼び出すためのhooks
"use client";

import { UserContext, UserContextType } from "@/providers/UserProvider";
import { useContext } from "react";

export const useLoginUser = (): UserContextType => useContext(UserContext);
