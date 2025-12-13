"use client";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
      <main className="w-full">{children}</main>
    </div>
  );
};

export default MainLayout;
