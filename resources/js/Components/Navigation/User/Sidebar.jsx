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
    const { url, props } = usePage();
    const { auth } = props;
    const currentPath = url.split("?")[0];

    const menuItems = [
        {
            label: "Dashboard",
            route: "user.dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            label: "Procedures",
            route: "user.procedures.index",
            icon: <ClipboardList size={20} />,
        },
        {
            label: "Upload Center",
            route: "user.upload-center.index",
            icon: <UploadCloud size={20} />,
        },
        {
            label: "Certificates",
            route: "user.certificates.index",
            icon: <FileCheck size={20} />,
        },
        {
            label: "Reports",
            route: "user.reports.index",
            icon: <BarChart3 size={20} />,
        },
        {
            label: "Help",
            route: "user.help.index",
            icon: <HelpCircle size={20} />,
        },
    ];

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Logo Section */}
            <div className={`h-[100px] flex items-center transition-all ${isCollapsed ? 'px-6' : 'px-8'}`}>
                <Link href={route('user.dashboard')} className="flex items-center">
                    <img 
                        src="/img/logo.png" 
                        alt="Logo" 
                        className={`h-10 w-auto transition-all object-contain ${
                            isCollapsed 
                                ? "w-[28px] object-left overflow-hidden" 
                                : ""
                        }`}
                    />
                </Link>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item, i) => {
                    const isActive = route().current(item.route);
                    return (
                        <Link
                            key={i}
                            href={route(item.route)}
                            className={`w-full flex items-center py-3 px-4 rounded-xl transition-all group
                                ${isActive ? "bg-[#2c8af8]/5 text-[#2c8af8]" : "text-slate-500 hover:bg-slate-50"}
                                ${isCollapsed ? "justify-center px-0" : ""}`}
                        >
                            <div
                                className={`${isCollapsed ? "" : "mr-3"} ${isActive ? "text-[#2c8af8]" : "text-slate-400 group-hover:text-slate-600"}`}
                            >
                                {item.icon}
                            </div>
                            {!isCollapsed && (
                                <span className="font-bold text-[14px]">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Subscription Status Card */}
            {!isCollapsed && auth.user?.subscription && (
                <div className="px-5 py-4 mb-3 mx-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Plan Status</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                                auth.user.subscription.is_active ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                            }`}>
                                {auth.user.subscription.is_active ? 'Active' : 'Expired'}
                            </span>
                        </div>
                        <div className="font-bold text-slate-800 text-[13px] truncate">
                            {auth.user.subscription.plan || 'No Active Plan'}
                        </div>
                        
                        {!auth.user.subscription.is_active && (
                            <div className="text-[11px] text-slate-400 font-medium leading-tight mt-1">
                                Please contact your account administrator to renew.
                            </div>
                        )}
                    </div>
                </div>
            )}

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
