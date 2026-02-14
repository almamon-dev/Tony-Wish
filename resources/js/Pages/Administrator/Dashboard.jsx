import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import {
    Users,
    Clock,
    CheckCircle2,
    Award,
    MoreHorizontal,
    Plus,
    CheckSquare,
    Eye,
    TrendingUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function Dashboard({ auth }) {
    const stats = [
        {
            label: "Active Users",
            value: "156",
            sub: "Team members working",
            update: "3 new this week",
            color: "text-blue-500",
            bg: "bg-blue-50",
            icon: <Users size={22} />,
            updateColor: "text-emerald-500 bg-emerald-50",
        },
        {
            label: "Pending Approvals",
            value: "8",
            sub: "Require your Review",
            color: "text-amber-500",
            bg: "bg-amber-50",
            icon: <Clock size={22} />,
        },
        {
            label: "Completed Procedures",
            value: "28",
            sub: "Require your Review",
            update: "15% increase",
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            icon: <CheckCircle2 size={22} />,
            updateColor: "text-emerald-500 bg-emerald-50",
        },
        {
            label: "Certificates issued",
            value: "12",
            sub: "This quarter",
            color: "text-purple-600",
            bg: "bg-purple-50",
            icon: <Award size={22} />,
        },
    ];

    const pendingApprovals = [
        {
            title: "ISO 9001 Quality Review",
            user: "Tom Wilson",
            time: "2 hours ago",
        },
        {
            title: "Document Upload Approval",
            user: "Emma Brown",
            time: "5 hours ago",
        },
        {
            title: "Procedure Completion",
            user: "Mike Davis",
            time: "1 day ago",
        },
    ];

    const teamPerformance = [
        {
            name: "Tom Wilson",
            tasks: 15,
            completed: 12,
            progress: 80,
            inProgress: 3,
            status: "Active",
        },
        {
            name: "Emma Brown",
            tasks: 12,
            completed: 10,
            progress: 80,
            inProgress: 2,
            status: "Active",
        },
        {
            name: "Mike Davis",
            tasks: 18,
            completed: 15,
            progress: 80,
            inProgress: 3,
            status: "Active",
        },
        {
            name: "Lisa Anderson",
            tasks: 10,
            completed: 7,
            progress: 80,
            inProgress: 3,
            status: "Active",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="Administrator Dashboard" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-[28px] font-black text-slate-800 tracking-tight leading-none">
                        Company Owner Dashboard
                    </h1>
                    <p className="text-[14px] text-slate-500 font-medium">
                        Welcome back! Here's an overview of your company's
                        performance.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm transition-all hover:shadow-md group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-[15px] font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                                    {stat.label}
                                </h3>
                                <div
                                    className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                                >
                                    {stat.icon}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p
                                    className={`text-[32px] font-black ${stat.color} leading-none tracking-tight`}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-[13px] font-semibold text-slate-400">
                                    {stat.sub}
                                </p>
                            </div>

                            {stat.update && (
                                <div className="mt-5 flex">
                                    <div
                                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold ${stat.updateColor} gap-1.5 border border-transparent`}
                                    >
                                        {stat.update} <TrendingUp size={12} />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Middle Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pending Approvals */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="text-[17px] font-black text-slate-800">
                                Pending Approval
                            </h2>
                            <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-50 rounded-lg">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>
                        <div className="p-8 space-y-4">
                            {pendingApprovals.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl group hover:bg-white hover:shadow-md hover:shadow-slate-100/50 transition-all border border-transparent hover:border-slate-100"
                                >
                                    <div>
                                        <h4 className="text-[15px] font-bold text-slate-800 mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-[13px] text-slate-400 font-semibold tracking-wide">
                                            {item.user} . {item.time}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="bg-[#2c8af8] text-white px-5 py-2 rounded-xl text-[13px] font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                            Approve
                                        </button>
                                        <button className="bg-white border border-slate-200 text-slate-600 px-5 py-2 rounded-xl text-[13px] font-bold hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
                                            Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Completion Chart */}
                    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center relative">
                        <h2 className="text-[17px] font-black text-slate-800 w-full mb-10">
                            Procedure Completion Trends
                        </h2>
                        <div className="relative w-52 h-52 flex items-center justify-center">
                            <svg
                                className="w-full h-full transform -rotate-90 transition-all"
                                viewBox="0 0 100 100"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="transparent"
                                    stroke="#f1f5f9"
                                    strokeWidth="12"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="transparent"
                                    stroke="#10b981"
                                    strokeWidth="12"
                                    strokeDasharray="180 264"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="transparent"
                                    stroke="#3b82f6"
                                    strokeWidth="12"
                                    strokeDashoffset="-185"
                                    strokeDasharray="50 264"
                                    strokeLinecap="round"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="42"
                                    fill="transparent"
                                    stroke="#f59e0b"
                                    strokeWidth="12"
                                    strokeDashoffset="-240"
                                    strokeDasharray="24 264"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
                                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-[0.15em]">
                                    Total Procedure
                                </p>
                                <h4 className="text-4xl font-black text-slate-800 tracking-tighter">
                                    50
                                </h4>
                            </div>
                        </div>
                        <div className="w-full mt-12 grid grid-cols-1 gap-y-3.5 px-2">
                            {[
                                {
                                    label: "Completed",
                                    value: 28,
                                    color: "bg-emerald-500",
                                },
                                {
                                    label: "In Progress",
                                    value: 14,
                                    color: "bg-blue-500",
                                },
                                {
                                    label: "Pending",
                                    value: 8,
                                    color: "bg-amber-500",
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                                        ></div>
                                        <span className="text-[13px] font-bold text-slate-500">
                                            {item.label}
                                        </span>
                                    </div>
                                    <span className="text-[13px] font-black text-slate-800">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Team Performance Table */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-[17px] font-black text-slate-800">
                            Team Performance Overview
                        </h2>
                        <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-50 rounded-lg">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                    <div className="overflow-x-auto px-4">
                        <table className="w-full text-left border-collapse mt-4">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[12px] font-extrabold text-slate-400 uppercase tracking-widest rounded-l-2xl">
                                        User Name
                                    </th>
                                    <th className="px-6 py-5 text-[12px] font-extrabold text-slate-400 uppercase tracking-widest text-center">
                                        Assigned Task
                                    </th>
                                    <th className="px-6 py-5 text-[12px] font-extrabold text-slate-400 uppercase tracking-widest text-center">
                                        Completed
                                    </th>
                                    <th className="px-6 py-5 text-[12px] font-extrabold text-slate-400 uppercase tracking-widest text-center">
                                        In Progress
                                    </th>
                                    <th className="px-6 py-5 text-[12px] font-extrabold text-slate-400 uppercase tracking-widest">
                                        Completion Rate
                                    </th>
                                    <th className="px-8 py-5 text-[12px] font-extrabold text-slate-400 uppercase tracking-widest text-center rounded-r-2xl">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {teamPerformance.map((user, i) => (
                                    <tr
                                        key={i}
                                        className="group hover:bg-slate-50/30 transition-all"
                                    >
                                        <td className="px-8 py-5 font-bold text-slate-700 text-[14px]">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-700 text-[14px] text-center">
                                            {user.tasks}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-700 text-[14px] text-center">
                                            {user.completed}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-700 text-[14px] text-center">
                                            {user.inProgress}
                                        </td>
                                        <td className="px-6 py-5 min-w-[220px]">
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                    <div
                                                        className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-1000"
                                                        style={{
                                                            width: `${user.progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-[13px] font-black text-slate-400 w-10">
                                                    {user.progress}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span className="px-4 py-1.5 bg-slate-50 border border-slate-100 text-[11px] font-black text-slate-500 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all tracking-wider">
                                                {user.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex items-center justify-end gap-8 px-8 py-6 border-t border-slate-50 mt-4">
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                                Items per page:
                            </span>
                            <div className="relative group">
                                <select className="h-10 pl-4 pr-10 bg-slate-50 border border-slate-100 rounded-xl text-[13px] text-slate-600 font-black appearance-none cursor-pointer focus:border-blue-300 outline-none transition-all">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <span className="text-[13px] font-black text-slate-700 tracking-tight">
                                1 - 4 of 4
                            </span>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-sm active:scale-95">
                                    <ChevronLeft size={20} />
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all shadow-sm active:scale-95">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Action Center */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                        <h2 className="text-[18px] font-black text-slate-800 mb-2">
                            Action Center
                        </h2>
                        <p className="text-[13px] text-slate-400 font-bold mb-10">
                            Quick actions and pending items
                        </p>
                        <div className="space-y-4">
                            {[
                                {
                                    label: "Assign New Task",
                                    icon: <Plus size={18} />,
                                    color: "text-blue-500",
                                },
                                {
                                    label: "Approve Procedure",
                                    icon: <CheckSquare size={18} />,
                                    color: "text-blue-500",
                                },
                                {
                                    label: "Review Upload",
                                    icon: <Eye size={18} />,
                                    color: "text-blue-500",
                                },
                                {
                                    label: "Issue certificate",
                                    icon: <Award size={18} />,
                                    color: "text-blue-500",
                                },
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    className="w-full flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl text-[14px] font-black text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
                                >
                                    <span className={action.color}>
                                        {action.icon}
                                    </span>
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Monthly Overview Bar Chart */}
                    <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-[18px] font-black text-slate-800">
                                Monthly Overview
                            </h2>
                            <div className="flex items-center gap-8">
                                <div className="flex items-center gap-2.5 text-[13px] font-bold text-slate-500">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    Completed
                                </div>
                                <div className="flex items-center gap-2.5 text-[13px] font-bold text-slate-500">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    Pending
                                </div>
                            </div>
                        </div>
                        <div className="h-[280px] relative flex items-end justify-between px-10 pb-10">
                            {[0, 20, 40, 60, 80, 100].reverse().map((val) => (
                                <div
                                    key={val}
                                    className="absolute left-0 right-0 border-t border-slate-100/50"
                                    style={{
                                        bottom: `${val + 10}%`,
                                        height: "1px",
                                    }}
                                >
                                    <span className="absolute -left-12 -translate-y-1/2 text-[11px] font-black text-slate-200">
                                        {val}
                                    </span>
                                </div>
                            ))}
                            {[
                                { month: "Aug", completed: 55, pending: 15 },
                                { month: "Sep", completed: 75, pending: 25 },
                                { month: "Oct", completed: 58, pending: 20 },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="relative flex flex-col items-center gap-5 w-24"
                                >
                                    <div className="flex items-end gap-2.5 h-[200px] mb-2">
                                        <div
                                            className="w-8 bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 shadow-lg shadow-blue-500/20"
                                            style={{
                                                height: `${item.pending * 1.8}%`,
                                            }}
                                        ></div>
                                        <div
                                            className="w-8 bg-emerald-500 rounded-t-lg transition-all hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
                                            style={{
                                                height: `${item.completed * 1.8}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <span className="text-[13px] font-black text-slate-400 uppercase tracking-widest">
                                        {item.month}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
