import type React from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AuthGuard } from "@/components/admin/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AdminSidebar>{children}</AdminSidebar>
    </AuthGuard>
  );
}
