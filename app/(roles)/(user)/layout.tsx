import PublicLayoutView from "@/components/Layouts/PublicLayoutView";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayoutView>{children}</PublicLayoutView>;
}
