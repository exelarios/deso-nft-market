import { createContext, useContext } from "react";

export const UserContext = createContext({});

export function useUserContext() {
  const userContext = useContext(UserContext);
  return userContext;
}