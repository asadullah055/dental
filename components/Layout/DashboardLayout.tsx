"use client";

import { navigation } from "@/utils/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout() {
  const pathname = usePathname();

  return (
    <aside className="w-96 h-screen border-r border-gray-200 bg-white shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-xl font-bold">Dental Clinic</h1>
        <p className="text-sm text-gray-500">Dashboard</p>
      </div>
      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg 
                  text-sm font-medium transition-all
                  ${
                    active
                      ? "primary-button"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
