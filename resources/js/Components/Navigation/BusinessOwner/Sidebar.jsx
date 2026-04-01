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
    const { url, props } = usePage();
    const { auth } = props;
    const currentPath = url.split("?")[0];

    const menuItems = [
        {
            label: "Dashboard",
            route: "business-owner.dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        {
            label: "Subscription & Billing",
            route: "business-owner.subscription.index",
            icon: <CreditCard size={20} />,
        },
        {
            label: "Procedures Overview",
            route: "business-owner.procedures.index",
            icon: <ClipboardList size={20} />,
        },
        {
            label: "Company Management",
            route: "business-owner.company.index",
            icon: <Building2 size={20} />,
        },
        {
            label: "Reports",
            route: "business-owner.reports.index",
            icon: <BarChart3 size={20} />,
        },
        {
            label: "Settings",
            route: "business-owner.settings.index",
            icon: <Settings size={20} />,
        },
        {
            label: "Help & Support",
            route: "business-owner.help-support.index",
            icon: <HelpCircle size={20} />,
        },
    ];

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-100 no-scrollbar">
            {/* Logo Section */}
            <div className={`h-[120px] flex items-center transition-all ${isCollapsed ? 'px-6' : 'px-10'}`}>
                <Link href={route('business-owner.dashboard')} className="flex items-center">
                    <img 
                        src="/img/logo.png" 
                        alt="Logo" 
                        className={`h-11 w-auto transition-all object-contain ${
                            isCollapsed 
                                ? "w-[30px] object-left overflow-hidden" 
                                : ""
                        }`}
                    />
                </Link>
            </div>

            {/* Menu Section */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto pt-4 no-scrollbar">
                {menuItems.map((item, i) => {
                    const isActive = route().current(item.route);
                    return (
                        <Link
                            key={i}
                            href={route(item.route)}
                            className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all group
                                ${
                                    isActive
                                        ? "bg-emerald-50 text-emerald-600 font-bold"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                                }`}
                        >
                            <div
                                className={`${isActive ? "text-emerald-500" : "text-slate-400 group-hover:text-emerald-500"}`}
                            >
                                {item.icon}
                            </div>
                            {!isCollapsed && (
                                <span className="text-[13px]">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Subscription Status Card */}
            {!isCollapsed && auth.user?.subscription && (
                <div className="px-4 py-4 mb-2 mx-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Plan</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                auth.user.subscription.is_active 
                                    ? 'bg-emerald-500/10 text-emerald-600' 
                                    : (auth.user.subscription.has_plan ? 'bg-rose-500/10 text-rose-600' : 'bg-slate-500/10 text-slate-600')
                            }`}>
                                {auth.user.subscription.is_active 
                                    ? 'Active' 
                                    : (auth.user.subscription.has_plan ? 'Expired' : 'Inactive')}
                            </span>
                        </div>
                        <div className="font-bold text-slate-800 text-[13px] truncate">
                            {auth.user.subscription.is_active ? auth.user.subscription.plan : 'Purchase a Plan'}
                        </div>
                        
                        {!auth.user.subscription.is_active && (
                            <Link 
                                href={route('business-owner.subscription.index')}
                                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-center text-[12px] font-black transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest"
                            >
                                {auth.user.subscription.has_plan ? 'Renew Now' : 'Get Started'}
                            </Link>
                        )}
                    </div>
                </div>
            )}

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
