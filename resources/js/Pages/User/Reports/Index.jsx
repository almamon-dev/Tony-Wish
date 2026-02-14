import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { CheckCircle2, FileText, Clock, Award, TrendingUp } from "lucide-react";

export default function PersonalReport() {
    const stats = [
        {
            label: "Completion Rate",
            value: "80%",
            badge: "5% Increase",
            badgeColor: "text-emerald-500",
            icon: <CheckCircle2 size={18} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
        },
        {
            label: "Task Completed",
            value: "12",
            icon: <FileText size={18} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "Avg Time Per Task",
            value: "3.2 days",
            icon: <Clock size={18} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
        {
            label: "Certificates Earned",
            value: "3",
            icon: <Award size={18} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
    ];

    const monthlyActivity = [
        { month: "Aug", value: 40 },
        { month: "Sep", value: 65 },
        { month: "Oct", value: 72 },
    ];

    const ratings = [
        { label: "Quality of Work", value: 65 },
        { label: "Quality of Work", value: 65 },
        { label: "Quality of Work", value: 65 },
    ];

    const recentUploads = [
        {
            name: "Security Assessment",
            procedure: "ISO 9001",
            date: "Oct 27, 2025",
            time: "3 days",
            rating: "Excellent",
        },
        {
            name: "Quality Documentation",
            procedure: "ISO 9001",
            date: "Oct 27, 2025",
            time: "3 days",
            rating: "Good",
        },
        {
            name: "Environmental Report",
            procedure: "ISO 9001",
            date: "Oct 27, 2025",
            time: "3 days",
            rating: "Excellent",
        },
    ];

    return (
        <UserLayout>
            <Head title="Personal Report" />

            <div className="space-y-6 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800 tracking-tight leading-none">
                        Personal Report
                    </h1>
                    <p className="text-slate-500 font-medium mt-3">
                        Your performance and task summary
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-5 rounded-[20px] border border-slate-100 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-[14px] font-bold text-slate-500">
                                    {stat.label}
                                </h3>
                                <div
                                    className={`w-9 h-9 rounded-[10px] ${stat.bg} ${stat.color} flex items-center justify-center opacity-80`}
                                >
                                    {stat.icon}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p
                                    className={`text-[28px] font-bold text-slate-700 leading-none tracking-tight`}
                                >
                                    {stat.value}
                                </p>
                                {stat.badge && (
                                    <div className="flex items-center gap-1.5 mt-2">
                                        <TrendingUp
                                            size={12}
                                            className={stat.badgeColor}
                                        />
                                        <span
                                            className={`text-[11px] font-bold ${stat.badgeColor}`}
                                        >
                                            {stat.badge}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Monthly Activity Chart */}
                    <div className="lg:col-span-7 bg-white rounded-[20px] border border-slate-100 shadow-sm p-6 overflow-hidden">
                        <div className="mb-10">
                            <h2 className="font-bold text-slate-800 text-[17px]">
                                Monthly Activity
                            </h2>
                            <p className="text-[12px] text-slate-400 font-medium mt-1">
                                upload files related to your assigned procedures
                            </p>
                        </div>

                        <div className="h-[180px] relative mt-10 ml-8">
                            {/* Grid Lines */}
                            <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pointer-events-none">
                                {[100, 80, 60, 40, 20, 0].map((v) => (
                                    <div
                                        key={v}
                                        className="relative w-full border-t border-slate-50 flex items-center h-0"
                                    >
                                        <span className="absolute -left-10 text-[10px] font-bold text-slate-300 w-8 text-right pr-2">
                                            {v}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Bars */}
                            <div className="absolute inset-0 flex items-end justify-around px-8">
                                {monthlyActivity.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center h-full w-full max-w-[60px] relative"
                                    >
                                        <div className="flex-1 w-full flex items-end">
                                            <div
                                                className="w-full bg-[#2c8af8] rounded-t-md transition-all duration-700 ease-out min-h-[4px]"
                                                style={{
                                                    height: `${item.value}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-[12px] font-bold text-slate-400 mt-4 absolute -bottom-8">
                                            {item.month}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Overall Rating */}
                    <div className="lg:col-span-5 bg-white rounded-[20px] border border-slate-100 shadow-sm p-6">
                        <div className="bg-rose-50/30 rounded-2xl p-6 mb-8 border border-rose-50/50">
                            <p className="text-[12px] font-bold text-slate-400 mb-1">
                                Overall Rating
                            </p>
                            <h2 className="text-[28px] font-bold text-slate-800">
                                Excellent
                            </h2>
                            <p className="text-[11px] font-medium text-slate-400 mt-1 italic">
                                Based on 72 completed tasks
                            </p>
                        </div>

                        <div className="space-y-6">
                            {ratings.map((rate, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[12px] font-bold text-slate-500">
                                            {rate.label}
                                        </span>
                                        <span className="text-[12px] font-bold text-slate-400">
                                            {rate.value}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full"
                                            style={{ width: `${rate.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-5">
                        <h2 className="font-bold text-slate-800 text-[17px]">
                            My Uploads
                        </h2>
                        <p className="text-[12px] text-slate-400 font-medium">
                            Document you've uploaded
                        </p>
                    </div>

                    <div className="overflow-x-auto px-3 pb-3">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 rounded-lg overflow-hidden">
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500 first:rounded-l-lg">
                                        File Name
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500">
                                        Procedure
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500">
                                        Completed date
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500">
                                        Time Taken
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500 text-center last:rounded-r-lg">
                                        Rating
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recentUploads.map((row, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/10 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-bold text-slate-600 text-[13px]">
                                            {row.name}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-400 text-[13px]">
                                            {row.procedure}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-400 text-[13px]">
                                            {row.date}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-400 text-[13px]">
                                            {row.time}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`px-4 py-1 rounded-full text-[11px] font-bold border ${
                                                    row.rating === "Excellent"
                                                        ? "bg-white text-blue-500 border-blue-100"
                                                        : "bg-white text-emerald-500 border-emerald-100"
                                                }`}
                                            >
                                                {row.rating}
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
