// types/user.ts
export interface User {  
id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "guest" | "creator";
  image?: string;
  status?: "Active" | "Inactive" | "Pending";
  location?: string;
  date?: string;
  phone?: string;
  
}
