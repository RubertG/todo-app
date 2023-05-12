import { useContext } from "react";
import { contextUser } from "../context/contextUser";

export function useAuthContext() {
   const authContext = useContext(contextUser)
   if (!authContext) throw new Error("Context inexistente")
   return authContext
}