import type React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getAuthData } from "@/lib/authtoken";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = await getAuthData();

  // Check if this is the login page by examining the URL
  const isLoginPage =
    typeof window !== "undefined"
      ? window.location.pathname === "/admin/login"
      : false;

  // If not login page, check authentication
  if (!isLoginPage) {
    if (!authData || !authData.is_admin || authData.role !== "admin") {
      redirect("/admin/login");
    }
  }

  // If it's the login page, render without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
