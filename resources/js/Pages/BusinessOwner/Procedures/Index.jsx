import React from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head } from "@inertiajs/react";
import { ClipboardList, CheckCircle2, FileText } from "lucide-react";

export default function ProceduresIndex({ procedures = [] }) {
    const stats = [
        {
            label: "Total Procedures",
            value: procedures.length.toString(),
            icon: <ClipboardList size={20} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
        },
        {
            label: "Completed",
            value: procedures.filter(p => p.status === 'Completed').length.toString(),
            sub: `${((procedures.filter(p => p.status === 'Completed').length / (procedures.length || 1)) * 100).toFixed(0)}% completion rate`,
            icon: <CheckCircle2 size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "Active",
            value: procedures.filter(p => p.status !== 'Completed').length.toString(),
            icon: <FileText size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
    ];

    return (
        <BusinessOwnerLayout>
            <Head title="Procedures Overview" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800">
                        Procedures Overview
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Read-only view of all procedures under your company
                    </p>
                </div>

                {/* Stats Grid */}
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

                            <div className="space-y-1">
                                <p
                                    className={`text-[32px] font-bold text-slate-700 leading-none tracking-tight`}
                                >
                                    {stat.value}
                                </p>
                                {stat.sub && (
                                    <p className="text-[13px] font-medium text-slate-400 mt-2">
                                        {stat.sub}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-5 border-b border-slate-50">
                        <h2 className="font-bold text-slate-800 text-[18px]">
                            All Procedures
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500">
                                        Procedure Name
                                    </th>
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500">
                                        Assigned To
                                    </th>
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500 text-center">
                                        Status
                                    </th>
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500">
                                        Progress
                                    </th>
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500">
                                        Due Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {procedures.map((proc, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/30 transition-colors"
                                    >
                                        <td className="px-8 py-5 font-medium text-slate-600 text-[14px]">
                                            {proc.name}
                                        </td>
                                        <td className="px-8 py-5 font-medium text-slate-600 text-[14px]">
                                            {proc.assigned}
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${
                                                    proc.status === "Completed"
                                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                        : "bg-slate-50 text-slate-600 border-slate-100"
                                                }`}
                                            >
                                                {proc.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 min-w-[200px]">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${proc.status === "Completed" ? "bg-emerald-500" : "bg-slate-500"}`}
                                                        style={{
                                                            width: `${proc.progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-[12px] font-bold text-slate-400">
                                                    {proc.progress}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 font-medium text-slate-600 text-[14px]">
                                            {proc.date}
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
