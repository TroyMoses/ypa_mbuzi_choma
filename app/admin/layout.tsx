import type React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if this is the login page
  const isLoginPage = children?.props?.segment === "login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
