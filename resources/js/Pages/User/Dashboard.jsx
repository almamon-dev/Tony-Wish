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
    Eye,
} from "lucide-react";
import ProcedureModal from "./Procedures/Partials/ProcedureModal";

export default function Dashboard({ auth, stats: dbStats, tasks: dbTasks = [] }) {
    const [activeTab, setActiveTab] = useState("All Tasks");
    const [selectedProcedure, setSelectedProcedure] = useState(null);

    const stats = [
        {
            label: "Total Tasks",
            value: dbStats?.total || "0",
            sub: "Assigned to you",
            icon: <ClipboardList size={22} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "In Progress",
            value: dbStats?.inProgress || "0",
            sub: "Active Tasks",
            badge: dbStats?.inProgress > 0 ? `${dbStats.inProgress} active` : "None",
            badgeColor: "bg-rose-50 text-rose-500",
            icon: <Clock size={22} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
        {
            label: "Completed",
            value: dbStats?.completed || "0",
            sub: "Success rate",
            badge: "Great Work",
            badgeColor: "bg-emerald-50 text-emerald-500",
            icon: <CheckCircle2 size={22} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
        },
        {
            label: "Overdue",
            value: dbStats?.overdue || "0",
            sub: dbStats?.overdue > 0 ? "Needs attention" : "On Track!",
            icon: <AlertCircle size={22} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
    ];

    const tasks = dbTasks.map(task => ({
        ...task,
        name: task.name,
        status: task.status,
        progress: task.progress,
        date: task.date,
        priority: task.priority,
    }));

    const tabs = [
        { name: "All Tasks", count: dbTasks.length },
        { name: "Active", count: dbTasks.filter(t => t.status !== 'Completed').length },
        { name: "Completed", count: dbTasks.filter(t => t.status === 'Completed').length },
    ];

    const filteredTasks = tasks.filter(task => {
        if (activeTab === "Active") return task.status !== 'Completed';
        if (activeTab === "Completed") return task.status === 'Completed';
        return true;
    });

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
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-slate-400">
                                    <th className="px-6 py-3 text-[12px] font-bold">
                                        Task Name
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold">
                                        Progress
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-center">
                                        Priority
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map((task, i) => (
                                    <tr
                                        key={i}
                                        className="group transition-all hover:bg-slate-50/50"
                                    >
                                        <td className="px-6 py-4 bg-white border-y border-l border-slate-50 first:rounded-l-2xl font-bold text-slate-700 text-[14px]">
                                            {task.name}
                                        </td>
                                        <td className="px-6 py-4 bg-white border-y border-slate-50 text-center">
                                            <span
                                                className={`px-4 py-1 rounded-full text-[11px] font-bold border ${
                                                    task.status === "Completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                    task.status === "In Progress" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                    "bg-slate-50 text-slate-400 border-slate-200"
                                                }`}
                                            >
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 bg-white border-y border-slate-50 min-w-[150px]">
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${task.progress === 100 ? "bg-emerald-500" : "bg-[#2c8af8]"}`}
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
                                        <td className="px-6 py-4 bg-white border-y border-slate-50 font-bold text-slate-400 text-[13px] whitespace-nowrap">
                                            {task.date}
                                        </td>
                                        <td className="px-6 py-4 bg-white border-y border-slate-50 text-center">
                                            <span
                                                className={`px-3 py-0.5 rounded text-[10px] font-bold border ${
                                                    task.priority === "High"
                                                        ? "bg-rose-50 text-rose-500 border-rose-100"
                                                        : task.priority === "Medium"
                                                          ? "bg-amber-50 text-amber-500 border-amber-100"
                                                          : "bg-slate-50 text-slate-400 border-slate-200"
                                                }`}
                                            >
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 bg-white border-y border-r border-slate-50 last:rounded-r-2xl text-center">
                                            <button 
                                                onClick={() => setSelectedProcedure(task)}
                                                className="h-8 w-8 flex items-center justify-center rounded-lg bg-white border border-slate-100 text-slate-400 hover:text-[#2c8af8] hover:border-[#2c8af8]/30 transition-all mx-auto"
                                            >
                                                <Eye size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedProcedure && (
                <ProcedureModal 
                    procedure={selectedProcedure} 
                    onClose={() => setSelectedProcedure(null)} 
                />
            )}
        </UserLayout>
    );
}
