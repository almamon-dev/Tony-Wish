import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Users, Settings, FolderTree, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        {
            label: "Total Users",
            value: "1,254",
            icon: <Users size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "Total Categories",
            value: "42",
            icon: <FolderTree size={20} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
        },
        {
            label: "System Status",
            value: "Stable",
            icon: <Settings size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
    ];

    return (
        <AdminLayout>
            <Head title="System Admin Dashboard" />

            <div className="space-y-8 pb-10">
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800">
                        System Admin Dashboard
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Manage global platform settings and users
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-[15px] font-bold text-slate-600">
                                    {stat.label}
                                </h3>
                                <div
                                    className={`w-10 h-10 rounded-[10px] ${stat.bg} ${stat.color} flex items-center justify-center`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <p className="text-[32px] font-bold text-slate-700 leading-none">
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
                    <h2 className="text-[18px] font-bold text-slate-800 mb-4">
                        Platform Overview
                    </h2>
                    <p className="text-slate-500">
                        Welcome to the System Administration area. Here you can
                        configure global settings, manage user accounts across
                        all companies, and oversee the category structure.
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
