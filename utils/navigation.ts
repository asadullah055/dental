import {
  BarChart3,
  Calendar,
  CircleDollarSign,
  History,
  Settings,
  TestTube2,
  Users,
} from "lucide-react";

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Contacts", href: "/contacts", icon: Users },
  { name: "History", href: "/history", icon: History },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Agent Settings", href: "/agent-settings", icon: TestTube2 },
  { name: "Subscription", href: "/subscription", icon: CircleDollarSign },
  { name: "Settings", href: "/settings", icon: Settings },
];
