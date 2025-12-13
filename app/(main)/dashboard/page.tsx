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
      <h2>{user?.user_metadata?.full_name}</h2>
      <button
        className="ml-4 p-2 bg-red-500 text-white rounded cursor-pointer"
        onClick={() => {
          client.auth.signOut();
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Dashboard;
