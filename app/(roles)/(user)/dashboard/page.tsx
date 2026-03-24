"use client";

import Link from "next/link";
import { useUser } from "@/hooks/useUser";

interface SectionCard {
  key: string;
  label: string;
  description: string;
  href: string;
  atom: string;
}

const SECTION_CARDS: SectionCard[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    description: "View your main statistics and overview.",
    href: "/admin/dashboard",
    atom: "view_dashboard",
  },
  {
    key: "jobs",
    label: "Jobs",
    description: "Access and manage job records when granted.",
    href: "/admin/jobs",
    atom: "manage_jobs",
  },
  {
    key: "applications",
    label: "Applications",
    description: "See submitted applications under your permissions.",
    href: "/admin/applications",
    atom: "view_applications",
  },
  {
    key: "users",
    label: "User Management",
    description: "Manage users only when this atom is assigned.",
    href: "/admin/users",
    atom: "manage_users",
  },
  {
    key: "leads",
    label: "Leads",
    description: "Work with leads assigned to your access level.",
    href: "/admin/leads",
    atom: "view_leads",
  },
  {
    key: "tasks",
    label: "Tasks",
    description: "View and execute team tasks.",
    href: "/admin/tasks",
    atom: "view_tasks",
  },
  {
    key: "reports",
    label: "Reports",
    description: "Open reports and analytics if permitted.",
    href: "/admin/reports",
    atom: "view_reports",
  },
  {
    key: "audit",
    label: "Audit Logs",
    description: "Track administrative activity and changes.",
    href: "/admin/audit-logs",
    atom: "view_audit_logs",
  },
  {
    key: "settings",
    label: "Settings",
    description: "Configure system settings when allowed.",
    href: "/admin/settings",
    atom: "manage_settings",
  },
];

export default function UserDashboardPage() {
  const { name, permissions, hasPermission, isLoading } = useUser();

  const grantedSections = SECTION_CARDS.filter((item) => hasPermission(item.atom));

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome{name ? `, ${name}` : ""}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your dashboard is assembled dynamically from your granted permission atoms.
        </p>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <p className="text-sm font-medium">Active permissions</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {permissions.length ? (
            permissions.map((atom) => (
              <span key={atom} className="text-xs rounded-full border px-2 py-1 bg-muted/30">
                {atom}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">No permissions assigned yet.</span>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Granted sections</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {grantedSections.length ? (
            grantedSections.map((section) => (
              <Link key={section.key} href={section.href} className="rounded-lg border bg-white p-4 hover:border-primary/50 transition-colors">
                <p className="font-medium">{section.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                <p className="text-xs text-primary mt-3">Requires: {section.atom}</p>
              </Link>
            ))
          ) : (
            <div className="rounded-lg border bg-white p-4 text-sm text-muted-foreground">
              No section is currently assigned to your account. Contact your manager/admin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
