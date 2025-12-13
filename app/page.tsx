"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

const Home = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // wait for auth check

    if (user) {
      router.replace("/dashboard");
    } else {
      router.replace("/auth/login");
    }
  }, [loading, user, router]);

  return <p>Loading...</p>;
};

export default Home;
