import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import {
    ClipboardList,
    Clock,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    Search,
} from "lucide-react";

export default function Dashboard({ auth }) {
    const [activeTab, setActiveTab] = useState("All Tasks");

    const stats = [
        {
            label: "Total Tasks",
            value: "15",
            sub: "Assigned to you",
            icon: <ClipboardList size={22} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "In Progress",
            value: "3",
            sub: "Active Tasks",
            badge: "2 due this week",
            badgeColor: "bg-rose-50 text-rose-500",
            icon: <Clock size={22} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
        {
            label: "Completed",
            value: "12",
            sub: "80% Completion Rate",
            badge: "Great Work",
            badgeColor: "bg-emerald-50 text-emerald-500",
            icon: <CheckCircle2 size={22} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
        },
        {
            label: "Overdue",
            value: "0",
            sub: "On Track!",
            icon: <AlertCircle size={22} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
    ];

    const tasks = [
        {
            name: "ISO 9001 Quality Review",
            status: "In Progress",
            progress: 100,
            date: "Nov 5, 2025",
            priority: "High",
        },
        {
            name: "ISO 9001 Quality Review",
            status: "In Progress",
            progress: 100,
            date: "Nov 5, 2025",
            priority: "Medium",
        },
        {
            name: "ISO 9001 Quality Review",
            status: "Not Started",
            progress: 0,
            date: "Nov 5, 2025",
            priority: "Low",
        },
    ];

    const tabs = [
        { name: "All Tasks", count: 5 },
        { name: "Active", count: 3 },
        { name: "Completed", count: 2 },
    ];

    return (
        <UserLayout>
            <Head title="My Tasks Overview" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800 tracking-tight leading-none">
                        My Tasks Overview
                    </h1>
                    <p className="text-slate-500 font-medium mt-3">
                        Track your assigned tasks and progress
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-5 rounded-[20px] border border-slate-100 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-[14px] font-bold text-slate-500">
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
                                    className={`text-[28px] font-bold text-slate-700 leading-none tracking-tight`}
                                >
                                    {stat.value}
                                </p>
                                <p className="text-[12px] font-medium text-slate-400 mt-1.5">
                                    {stat.sub}
                                </p>
                            </div>

                            {stat.badge && (
                                <div className="mt-3">
                                    <span
                                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${stat.badgeColor} flex items-center w-fit gap-1`}
                                    >
                                        {stat.badge}
                                        {stat.badge === "Great Work" && (
                                            <TrendingUp size={10} />
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Tasks Table Section */}
                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5">
                        <h2 className="font-bold text-slate-800 text-[17px]">
                            All My Tabs
                        </h2>
                        <p className="text-[12px] text-slate-400 font-medium">
                            Complete view of your assign tasks
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="px-6 mb-5">
                        <div className="bg-slate-50/50 p-1 rounded-lg flex items-center w-fit gap-1.5 border border-slate-100/50">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`px-5 py-1.5 rounded-md text-[12px] font-bold transition-all ${
                                        activeTab === tab.name
                                            ? "bg-[#2c8af8] text-white shadow-md shadow-blue-500/10"
                                            : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {tab.name} ({tab.count})
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto px-3 pb-3">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 rounded-lg overflow-hidden">
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500 first:rounded-l-lg">
                                        Task Name
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500 text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500">
                                        Progress
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500 last:rounded-r-lg text-center">
                                        Priority
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {tasks.map((task, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/10 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-bold text-slate-600 text-[13px]">
                                            {task.name}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`px-4 py-1 rounded-full text-[11px] font-bold border ${
                                                    task.status ===
                                                    "In Progress"
                                                        ? "bg-blue-50 text-blue-500 border-blue-100"
                                                        : "bg-white text-slate-400 border-slate-200"
                                                }`}
                                            >
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 min-w-[150px]">
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${task.progress === 100 ? "bg-emerald-500" : "bg-slate-400"}`}
                                                        style={{
                                                            width: `${task.progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400">
                                                    {task.progress}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-400 text-[13px] whitespace-nowrap">
                                            {task.date}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`px-3 py-0.5 rounded text-[10px] font-bold border ${
                                                    task.priority === "High"
                                                        ? "bg-rose-50 text-rose-500 border-rose-100"
                                                        : task.priority ===
                                                            "Medium"
                                                          ? "bg-amber-50 text-amber-500 border-amber-100"
                                                          : "bg-slate-50 text-slate-400 border-slate-200"
                                                }`}
                                            >
                                                {task.priority}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
