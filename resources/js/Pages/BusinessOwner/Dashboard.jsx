import React from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Users,
    ClipboardList,
    Calendar,
    Zap,
    MoreHorizontal,
    ArrowUpRight,
    Search,
    ChevronRight,
    FileText,
} from "lucide-react";

export default function Dashboard({ auth }) {
    const stats = [
        {
            label: "Total Users",
            value: "24",
            sub: "Added from instances",
            update: "12% new last month",
            color: "text-blue-500",
            bg: "bg-blue-50",
            icon: <Users size={20} />,
        },
        {
            label: "Active Procedures",
            value: "42",
            sub: "Employer dashboard",
            update: "5 Active last month",
            color: "text-amber-500",
            bg: "bg-amber-50",
            icon: <ClipboardList size={20} />,
        },
        {
            label: "Billing Cycle",
            value: "Monthly",
            sub: "Next invoice on Nov 15, 2023",
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            icon: <Calendar size={20} />,
        },
        {
            label: "Company Status",
            value: "Active",
            sub: "Subscription active",
            color: "text-purple-500",
            bg: "bg-purple-50",
            icon: <Zap size={20} />,
        },
    ];

    const activities = [
        {
            name: "Tony Richardson",
            action: "Just uploaded a procedure",
            time: "2 hours ago",
            img: "https://ui-avatars.com/api/?name=Tony+Richardson&background=10b981&color=fff",
        },
        {
            name: "Rifat Ahamed (Company Partner)",
            action: "Been Active",
            time: "5 hours ago",
            img: "https://ui-avatars.com/api/?name=Rifat+Ahamed&background=3b82f6&color=fff",
        },
        {
            name: "Rashedul Haque (Designation)",
            action: "Just Created New Invoice",
            time: "1 day ago",
            img: "https://ui-avatars.com/api/?name=Rashedul+Haque&background=f59e0b&color=fff",
        },
        {
            name: "Hashibur (System Admin)",
            action: "Logged in via system auth",
            time: "2 days ago",
            img: "https://ui-avatars.com/api/?name=Hashibur&background=673ab7&color=fff",
        },
    ];

    const invoices = [
        {
            id: "INV-0023-001",
            date: "Oct 15, 2023",
            amount: "$250.00",
            status: "Paid",
        },
        {
            id: "INV-0023-002",
            date: "Oct 15, 2023",
            amount: "$324.00",
            status: "Paid",
        },
        {
            id: "INV-0024-001",
            date: "Oct 15, 2023",
            amount: "$465.00",
            status: "Paid",
        },
        {
            id: "INV-0025-001",
            date: "Oct 15, 2023",
            amount: "$130.00",
            status: "Paid",
        },
    ];

    return (
        <BusinessOwnerLayout>
            <Head title="Business Owner Dashboard" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800">
                        Dashboard Overview
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Welcome back! Here's what's happening with your company.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-5 rounded-[20px] border border-slate-100 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-[15px] font-bold text-slate-500">
                                    {stat.label}
                                </h3>
                                <div
                                    className={`w-10 h-10 rounded-[10px] ${stat.bg} ${stat.color} flex items-center justify-center opacity-80`}
                                >
                                    {stat.icon}
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <p
                                    className={`text-[28px] font-bold ${stat.color} leading-none tracking-tight`}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-[13px] font-medium text-slate-400">
                                    {stat.sub}
                                </p>
                            </div>

                            {stat.update && (
                                <div className="mt-5 flex">
                                    <div
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold ${stat.color} ${stat.bg} gap-1.5`}
                                    >
                                        {stat.update} <ArrowUpRight size={13} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Middle Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Current Subscription */}
                    <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 shadow-sm p-6 overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-bold text-slate-800">
                                Current Subscription
                            </h2>
                        </div>
                        <p className="text-[12px] text-slate-400 font-medium mb-8">
                            Professional Plan
                        </p>

                        <div className="space-y-6">
                            <div className="flex justify-between text-sm">
                                <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                                    Monthly Cost
                                </span>
                                <span className="font-bold text-slate-800">
                                    $130.00
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                                    VAT (5% VAT)
                                </span>
                                <span className="font-bold text-slate-800">
                                    $6.50
                                </span>
                            </div>
                            <div className="flex justify-between text-sm pt-4 border-t border-slate-50">
                                <span className="font-bold text-slate-800 uppercase tracking-wider text-[12px]">
                                    Total Payable
                                </span>
                                <span className="font-bold text-slate-800">
                                    $136.50
                                </span>
                            </div>

                            <div className="space-y-4 pt-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[12px] font-bold text-slate-800">
                                            Quota (24 / 50)
                                        </span>
                                        <span className="text-[12px] font-bold text-slate-500">
                                            48%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full shadow-sm"
                                            style={{ width: "48%" }}
                                        ></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-[12px] font-bold text-slate-800">
                                            Procedures (42 / 100)
                                        </span>
                                        <span className="text-[12px] font-bold text-slate-500">
                                            42%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full shadow-sm"
                                            style={{ width: "42%" }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-[#2c8af8] hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                                <Zap size={16} fill="white" />
                                Upgrade Plan
                            </button>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 shadow-sm p-6 overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="font-bold text-slate-800">
                                Recent Activity
                            </h2>
                        </div>
                        <p className="text-[12px] text-slate-400 font-medium mb-8">
                            Latest updates from your team
                        </p>

                        <div className="space-y-6">
                            {activities.map((activity, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 group cursor-pointer"
                                >
                                    <img
                                        src={activity.img}
                                        alt=""
                                        className="w-10 h-10 rounded-full ring-2 ring-slate-50 group-hover:ring-emerald-100 transition-all"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[13px] font-bold text-slate-800 truncate">
                                            {activity.name}
                                        </h4>
                                        <p className="text-[11px] text-slate-400 font-medium">
                                            {activity.action} . {activity.time}
                                        </p>
                                    </div>
                                    <ChevronRight
                                        size={16}
                                        className="text-slate-200 group-hover:text-slate-400 transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Invoices */}
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-50">
                        <h2 className="font-bold text-slate-800">
                            Recent Invoices
                        </h2>
                        <p className="text-[12px] text-slate-400 font-medium">
                            Track your last company subscriptions
                        </p>
                    </div>
                    <div className="overflow-x-auto px-4 pb-4">
                        <table className="w-full text-left border-collapse mt-4">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider rounded-l-xl">
                                        Invoice ID
                                    </th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-[12px] font-bold text-slate-400 uppercase tracking-wider text-center rounded-r-xl">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {invoices.map((inv, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4 font-bold text-slate-700 text-[13px]">
                                            {inv.id}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-500 text-[13px]">
                                            {inv.date}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800 text-[13px]">
                                            {inv.amount}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[11px] font-bold rounded-lg border border-emerald-100">
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-100 text-slate-400 hover:text-[#2c8af8] hover:border-[#2c8af8] transition-all bg-white shadow-sm">
                                                <FileText size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
}
