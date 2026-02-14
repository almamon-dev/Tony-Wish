import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    CreditCard,
    ClipboardList,
    Building2,
    BarChart3,
    Settings,
    HelpCircle,
    LogOut,
} from "lucide-react";

const Sidebar = ({ isCollapsed }) => {
    const { url } = usePage();
    const currentPath = url.split("?")[0];

    const menuItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: <LayoutDashboard size={20} />,
            active: currentPath === "/dashboard",
        },
        {
            label: "Subscription & Billing",
            path: "/business-owner/subscription-billing",
            icon: <CreditCard size={20} />,
            active: currentPath === "/business-owner/subscription-billing",
        },
        {
            label: "Procedures Overview",
            path: "/business-owner/procedures",
            icon: <ClipboardList size={20} />,
            active: currentPath === "/business-owner/procedures",
        },
        {
            label: "Company Management",
            path: "/business-owner/company-management",
            icon: <Building2 size={20} />,
            active: currentPath === "/business-owner/company-management",
        },
        {
            label: "Reports",
            path: "/business-owner/reports",
            icon: <BarChart3 size={20} />,
            active: currentPath === "/business-owner/reports",
        },
        {
            label: "Settings",
            path: "/business-owner/settings",
            icon: <Settings size={20} />,
            active: currentPath === "/business-owner/settings",
        },
        {
            label: "Help & Support",
            path: "/business-owner/help-support",
            icon: <HelpCircle size={20} />,
            active: currentPath === "/business-owner/help-support",
        },
    ];

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-100 no-scrollbar">
            {/* Logo Section */}
            <div className="h-[80px] flex items-center px-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-emerald-500 rounded-lg text-white font-bold text-xl">
                        Q
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col leading-none">
                            <span className="text-[14px] font-bold text-slate-800 tracking-tight">
                                just simple quality
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                FABRICATION EDITION
                            </span>
                        </div>
                    )}
                </div>
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
                                    ? "bg-emerald-50 text-emerald-600 font-bold"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                            }`}
                    >
                        <div
                            className={`${item.active ? "text-emerald-500" : "text-slate-400 group-hover:text-emerald-500"}`}
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
