import AdminApplicationsView from "@/components/Admin/Applications/AdminApplicationsView";

export const metadata = {
  title: "Applications | Admin – QuickHire",
  description: "View and manage all job applications submitted through QuickHire.",
};

export default function AdminApplicationsPage() {
  return <AdminApplicationsView />;
}
