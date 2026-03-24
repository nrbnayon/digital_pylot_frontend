"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { UsersTable } from "@/components/Admin/Users/UsersTable";
import { UserPermissionsModal } from "@/components/Admin/Users/UserPermissionsModal";

export default function UsersPage() {
  const { hasPermission } = useUser();
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  // Fallback check (proxy.ts should handle this, but client side check is extra safety)
  if (!hasPermission("manage_users")) {
    return <div className="p-10 text-xl font-bold text-red-500">Access Denied: You do require manage_users permission</div>;
  }

  // Load dummy data or fetch from backend API
  useEffect(() => {
    // In real app: fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
    // For now we simulate with dummy data 
    import("@/data/usersData").then((m) => {
       // We add dummy permissions to each user for demonstration
       const loadedUsers = m.usersData.map((u: any) => ({
           ...u,
           permissions: u.role === "admin" ? ["view_dashboard", "manage_jobs", "manage_users"] : ["view_dashboard"]
       }));
       setUsers(loadedUsers);
    });
  }, []);

  const handleEditPermissions = (user: any) => {
    setSelectedUser(user);
  };

  const handleSavePermissions = (userId: string, newPermissions: string[]) => {
    // API Call: PUT /api/users/:id { permissions: newPermissions }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, permissions: newPermissions } : u));
    setSelectedUser(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
          Add New User
        </button>
      </div>

      <UsersTable users={users} onEditPermissions={handleEditPermissions} />
      
      {selectedUser && (
        <UserPermissionsModal 
           user={selectedUser} 
           onClose={() => setSelectedUser(null)} 
           onSave={handleSavePermissions} 
        />
      )}
    </div>
  );
}
