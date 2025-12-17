"use client";
import client from "@/app/api/client";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, loading } = useAuth();
  console.log(user);

  const router = useRouter();
  if (!loading && !user) {
    router.push("/auth/login");
    return null;
  }
  return (
    <div>
      This is the Dashboard Page
      <h2>{user?.email}</h2>
      <h2>{user?.user_metadata?.full_name.split(" ")[0]}</h2>
    
    </div>
  );
};

export default Dashboard;
