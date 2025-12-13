import { AuthContext } from "@/components/context/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
  // Implementation of the useAuth hook
  const context = useContext(AuthContext);
  if (!AuthContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
