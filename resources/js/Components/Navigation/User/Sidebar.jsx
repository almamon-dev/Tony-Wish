import React from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    ClipboardList,
    UploadCloud,
    FileCheck,
    BarChart3,
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
            label: "Procedures",
            path: "/user/procedures",
            icon: <ClipboardList size={20} />,
            active: currentPath === "/user/procedures",
        },
        {
            label: "Upload Center",
            path: "/user/upload-center",
            icon: <UploadCloud size={20} />,
            active: currentPath === "/user/upload-center",
        },
        {
            label: "Certificates",
            path: "/user/certificates",
            icon: <FileCheck size={20} />,
            active: currentPath === "/user/certificates",
        },
        {
            label: "Reports",
            path: "/user/reports",
            icon: <BarChart3 size={20} />,
            active: currentPath === "/user/reports",
        },
        {
            label: "Help",
            path: "/user/help",
            icon: <HelpCircle size={20} />,
            active: currentPath === "/user/help",
        },
    ];

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Logo Section */}
            <div className="h-[100px] flex items-center px-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex-shrink-0">
                        <svg viewBox="0 0 40 40" className="w-full h-full">
                            <circle
                                cx="20"
                                cy="20"
                                r="18"
                                fill="none"
                                stroke="#2c8af8"
                                strokeWidth="4"
                            />
                            <path
                                d="M20 5 A15 15 0 1 1 5 20"
                                stroke="#f59e0b"
                                strokeWidth="4"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    {!isCollapsed && (
                        <div>
                            <p className="text-[15px] font-bold text-slate-800 leading-none">
                                just simple quality
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                FABRICATION EDITION
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item, i) => (
                    <Link
                        key={i}
                        href={item.path}
                        className={`w-full flex items-center py-3 px-4 rounded-xl transition-all group
                            ${item.active ? "bg-[#2c8af8]/5 text-[#2c8af8]" : "text-slate-500 hover:bg-slate-50"}
                            ${isCollapsed ? "justify-center px-0" : ""}`}
                    >
                        <div
                            className={`${isCollapsed ? "" : "mr-3"} ${item.active ? "text-[#2c8af8]" : "text-slate-400 group-hover:text-slate-600"}`}
                        >
                            {item.icon}
                        </div>
                        {!isCollapsed && (
                            <span className="font-bold text-[14px]">
                                {item.label}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Logout Footer */}
            <div className="p-4 border-t border-slate-50">
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="w-full flex items-center py-3 px-4 rounded-xl text-rose-500 font-bold text-[14px] hover:bg-rose-50 transition-all group"
                >
                    <LogOut
                        size={20}
                        className="mr-3 text-rose-400 group-hover:text-rose-500"
                    />
                    {!isCollapsed && <span>Logout</span>}
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
