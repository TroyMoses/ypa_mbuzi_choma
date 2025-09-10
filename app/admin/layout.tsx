import type React from "react";
import { redirect } from "next/navigation";
import { verifyAuth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await verifyAuth();

  if (!user) {
    redirect("/admin/login");
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
