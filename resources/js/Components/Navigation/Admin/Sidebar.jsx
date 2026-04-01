import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    CreditCard,
    LogOut,
    Users,
} from "lucide-react";

const Sidebar = ({ isCollapsed }) => {
    const { url } = usePage();
    const currentPath = url.split("?")[0];

    const menuItems = [
        {
            label: "Dashboard",
            path: route("admin.dashboard"),
            icon: <LayoutDashboard size={20} />,
            active: currentPath === "/admin/dashboard",
        },
        {
            label: "Plans",
            path: route("admin.plans.index"),
            icon: <CreditCard size={20} />,
            active: currentPath.includes("/admin/plans"),
        },
        {
            label: "Users",
            path: route("admin.users.index"),
            icon: <Users size={20} />,
            active: currentPath.includes("/admin/users"),
        },
    ];

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-100 no-scrollbar">
            {/* Logo Section */}
            <div className="h-[100px] flex items-center px-6">
                <Link href={route("admin.dashboard")} className="flex items-center gap-3">
                    <img
                        src="/img/logo.png"
                        alt="Logo"
                        className={`h-12 w-auto object-contain transition-all duration-300 ${
                            isCollapsed ? "scale-75 origin-left" : ""
                        }`}
                    />
                </Link>
            </div>

            {/* Menu Section */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto pt-4 no-scrollbar">
                {menuItems.map((item, i) => (
                    <Link
                        key={i}
                        href={item.path}
                        className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all group
                            ${
                                item.active
                                    ? "bg-[#0a66c2]/5 text-[#0a66c2] font-bold"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                            }`}
                    >
                        <div
                            className={`${item.active ? "text-[#0a66c2]" : "text-slate-400 group-hover:text-[#0a66c2]"}`}
                        >
                            {item.icon}
                        </div>
                        {!isCollapsed && (
                            <span className="text-[13px]">{item.label}</span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Logout Section */}
            <div className="p-4 border-t border-slate-50">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center gap-3 w-full py-2.5 px-3 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 font-medium transition-all group"
                >
                    <LogOut
                        size={20}
                        className="text-slate-400 group-hover:text-rose-500"
                    />
                    {!isCollapsed && (
                        <span className="text-[13px]">Logout</span>
                    )}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
