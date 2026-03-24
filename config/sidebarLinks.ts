import type React from "react";
import type { IconSvgElement } from "@hugeicons/react";
import {
	Bell,
	FileText,
	List,
	ShieldCheck,
} from "lucide-react";
import {
	DashboardSquare02Icon,
	PackageAddIcon,
	Settings01Icon,
	UserMultiple03Icon,
} from "@hugeicons/core-free-icons";

export interface SidebarSubLink {
	label: string;
	href: string;
	roles?: string[];
}

export interface SidebarLink {
	label: string;
	href: string;
	icon: React.ElementType | React.ReactElement | IconSvgElement;
	subLinks?: SidebarSubLink[];
	roles?: string[];
}

export const sidebarLinks: SidebarLink[] = [
	{
		label: "Dashboard",
		href: "/admin/dashboard",
		icon: DashboardSquare02Icon,
		roles: ["admin"],
	},
	{
		label: "Job Management",
		href: "/admin/jobs",
		icon: PackageAddIcon,
		roles: ["admin"],
	},
	{
		label: "Applications",
		href: "/admin/applications",
		icon: FileText,
		roles: ["admin"],
	},
	{
		label: "Categories",
		href: "/admin/categories",
		icon: List,
		roles: ["admin"],
	},
	{
		label: "User Management",
		href: "/admin/users",
		icon: UserMultiple03Icon,
		roles: ["admin"],
	},
	{
		label: "Privacy & policy",
		href: "/admin/privacy-policy",
		icon: ShieldCheck,
		roles: ["admin"],
	},
	{
		label: "Notifications",
		href: "/admin/notifications",
		icon: Bell,
		roles: ["admin"],
	},
	{
		label: "Settings",
		href: "/admin/settings",
		icon: Settings01Icon,
		roles: ["admin"],
	},
];
