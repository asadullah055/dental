"use client";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import client from "../api/client";
import useAuth from "../hooks/useAuth";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, router, loading]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-white">
      <DashboardLayout />
      <div className="flex-1 flex flex-col">
        <div className="w-full border-b border-gray-300 sticky top-0 left-0 z-20 bg-white">
          <div className="flex items-center justify-end p-2">
            <span>{user?.user_metadata?.full_name.split(" ")[0]}</span>
            <button
              className="ml-4 p-2 bg-red-500 text-white rounded cursor-pointer"
              onClick={() => {
                client.auth.signOut();
              }}
            >
              Log out
            </button>
          </div>
        </div>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
