import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, usePage } from "@inertiajs/react";
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
    X,
} from "lucide-react";

export default function Dashboard({ auth, stats: dbStats, recentProcedures = [], teamPerformance = [], monthlyOverview = [] }) {
    const { flash } = usePage().props;

    const handleApprove = (id) => {
        if (confirm("Are you sure you want to approve this procedure?")) {
            router.patch(route('administrator.procedures.update', id), {
                status: 'completed',
                progress: 100
            });
        }
    };
    
    const stats = [
        {
            label: "Active Users",
            value: dbStats?.activeUsers || "0",
            sub: "Team members working",
            update: "Real-time count",
            color: "text-blue-500",
            bg: "bg-blue-50",
            icon: <Users size={22} />,
            updateColor: "text-emerald-500 bg-emerald-50",
        },
        {
            label: "Pending Procedures",
            value: dbStats?.pending || "0",
            sub: "Require your Review",
            color: "text-amber-500",
            bg: "bg-amber-50",
            icon: <Clock size={22} />,
        },
        {
            label: "Completed Procedures",
            value: dbStats?.completed || "0",
            sub: "Archived records",
            update: `${dbStats?.total || 0} total`,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            icon: <CheckCircle2 size={22} />,
            updateColor: "text-emerald-500 bg-emerald-50",
        },
        {
            label: "In Progress",
            value: dbStats?.inProgress || "0",
            sub: "Ongoing tasks",
            color: "text-purple-600",
            bg: "bg-purple-50",
            icon: <TrendingUp size={22} />,
        },
    ];

    const pendingApprovals = recentProcedures.filter(p => p.status === 'pending_review').map(proc => ({
        id: proc.id,
        title: proc.name,
        user: proc.assigned_user?.first_name ? `${proc.assigned_user.first_name} ${proc.assigned_user.last_name}` : 'Unassigned',
        time: proc.uploaded_at ? new Date(proc.uploaded_at).toLocaleDateString() : (proc.created_at ? new Date(proc.created_at).toLocaleDateString() : 'N/A'),
    }));

    // SVG Circular Chart Math
    const total = dbStats?.total || 0;
    const completedCount = dbStats?.completed || 0;
    const inProgressCount = dbStats?.inProgress || 0;
    const pendingCount = dbStats?.pending || 0;

    const circumference = 2 * Math.PI * 42; // ~263.89

    const completedStroke = total > 0 ? (completedCount / total) * circumference : 0;
    const inProgressStroke = total > 0 ? (inProgressCount / total) * circumference : 0;
    const pendingStroke = total > 0 ? (pendingCount / total) * circumference : 0;

    const inProgressOffset = -completedStroke;
    const pendingOffset = -(completedStroke + inProgressStroke);

    return (
        <AdministratorLayout>
            <Head title="Account Holder Dashboard" />

            <div className="space-y-8 pb-10">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-green-600" />
                        <p className="font-medium text-sm">{flash.success}</p>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-[28px] font-black text-slate-800 tracking-tight leading-none">
                        Account Holder Dashboard
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
                            className="bg-white p-6 rounded-md border border-slate-100 shadow-sm transition-all hover:shadow-md group"
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
                        </div>
                    ))}
                </div>

                {/* Middle Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Pending Approvals */}
                    <div className="lg:col-span-2 bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="text-[17px] font-black text-slate-800">
                                Pending Approval
                            </h2>
                        </div>
                        <div className="p-8 space-y-4 flex-1">
                            {pendingApprovals.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 py-10 italic">
                                    No procedures waiting for approval.
                                </div>
                            ) : (
                                pendingApprovals.map((item, i) => (
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
                                            <button 
                                                onClick={() => handleApprove(item.id)}
                                                className="bg-[#2c8af8] text-white px-5 py-2 rounded-xl text-[13px] font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Completion Chart */}
                    <div className="bg-white rounded-md border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center relative">
                        <h2 className="text-[17px] font-black text-slate-800 w-full mb-10">
                            Procedure Completion Trends
                        </h2>
                        <div className="relative w-52 h-52 flex items-center justify-center">
                            <svg
                                className="w-full h-full transform -rotate-90"
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
                                {/* Completed - Emerald */}
                                {completedCount > 0 && (
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="42"
                                        fill="transparent"
                                        stroke="#10b981"
                                        strokeWidth="12"
                                        strokeDasharray={`${completedStroke} ${circumference}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000"
                                    />
                                )}
                                {/* In Progress - Blue */}
                                {inProgressCount > 0 && (
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="42"
                                        fill="transparent"
                                        stroke="#3b82f6"
                                        strokeWidth="12"
                                        strokeDashoffset={inProgressOffset}
                                        strokeDasharray={`${inProgressStroke} ${circumference}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000"
                                    />
                                )}
                                {/* Pending - Amber */}
                                {pendingCount > 0 && (
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="42"
                                        fill="transparent"
                                        stroke="#f59e0b"
                                        strokeWidth="12"
                                        strokeDashoffset={pendingOffset}
                                        strokeDasharray={`${pendingStroke} ${circumference}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000"
                                    />
                                )}
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 text-center">
                                <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-[0.15em]">
                                    Total Procedures
                                </p>
                                <h4 className="text-4xl font-black text-slate-800 tracking-tighter">
                                    {total}
                                </h4>
                            </div>
                        </div>
                        <div className="w-full mt-12 grid grid-cols-1 gap-y-3.5 px-2">
                            {[
                                {
                                    label: "Completed",
                                    value: completedCount,
                                    color: "bg-emerald-500",
                                },
                                {
                                    label: "In Progress",
                                    value: inProgressCount,
                                    color: "bg-blue-500",
                                },
                                {
                                    label: "Pending",
                                    value: pendingCount,
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
                <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                        <h2 className="text-[17px] font-black text-slate-800">
                            Team Performance Overview
                        </h2>
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
                                {teamPerformance && teamPerformance.length > 0 ? (
                                    teamPerformance.map((user, i) => (
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-10 text-center text-slate-400 italic">
                                            No team members found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 gap-6">
                    {/* Monthly Overview Bar Chart */}
                    <div className="bg-white rounded-md border border-slate-100 shadow-sm p-8">
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
                        <div className="h-[300px] w-full mt-10 relative pr-4">
                            {/* Y-Axis Labels Column */}
                            <div className="absolute inset-y-0 left-0 w-12 flex flex-col pointer-events-none">
                                {[0, 20, 40, 60, 80, 100].map((val) => (
                                    <div
                                        key={val}
                                        className="absolute left-0 right-0 flex items-center justify-end pr-4"
                                        style={{ bottom: `calc(${val}% + 40px)` }}
                                    >
                                        <span className="text-[12px] font-bold text-slate-400">
                                            {val}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Chart Area */}
                            <div className="ml-12 h-full relative px-10">
                                {/* Grid Lines */}
                                {[0, 20, 40, 60, 80, 100].map((val) => (
                                    <div
                                        key={val}
                                        className="absolute left-0 right-0 border-t border-slate-100"
                                        style={{ bottom: `calc(${val}% + 40px)` }}
                                    ></div>
                                ))}

                                {/* Bars Container */}
                                <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-around px-8">
                                    {monthlyOverview.map((item, i) => {
                                        const chartHeight = 200; // Peak height for bars
                                        return (
                                            <div
                                                key={i}
                                                className="relative flex flex-col items-center group w-32"
                                            >
                                                <div className="flex items-end gap-1.5 h-[200px] mb-4">
                                                    {/* Pending Bar */}
                                                    <div
                                                        className="w-10 bg-[#2185d5] transition-all hover:brightness-105 shadow-sm rounded-t-[2px]"
                                                        style={{
                                                            height: `${(item.pending / 100) * chartHeight}px`,
                                                        }}
                                                    ></div>
                                                    {/* Completed Bar */}
                                                    <div
                                                        className="w-10 bg-[#10b981] transition-all hover:brightness-105 shadow-sm rounded-t-[2px]"
                                                        style={{
                                                            height: `${(item.completed / 100) * chartHeight}px`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="h-10 flex items-center">
                                                    <span className="text-[13px] font-bold text-slate-500 uppercase tracking-widest">
                                                        {item.month}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
