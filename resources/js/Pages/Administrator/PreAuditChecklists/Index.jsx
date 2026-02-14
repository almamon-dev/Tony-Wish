import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import {
    Plus,
    FileText,
    CheckCircle2,
    Clock,
    Edit2,
    Eye,
    ChevronDown,
} from "lucide-react";
import CreateChecklistModal from "./Partials/CreateChecklistModal";

export default function PreAuditChecklists() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const stats = [
        {
            label: "Total Checklist",
            value: "18",
            icon: <FileText size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
            iconBg: "bg-blue-100/50",
        },
        {
            label: "Completed",
            value: "12",
            icon: <CheckCircle2 size={20} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            iconBg: "bg-emerald-100/50",
        },
        {
            label: "In Progress",
            value: "6",
            icon: <Clock size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
            iconBg: "bg-amber-100/50",
        },
    ];

    const checklists = [
        {
            name: "Pre-Audit Checklist Q4",
            procedure: "ISO 9001",
            createdBy: "Mike Davis",
            status: "In Progress",
            completion: 65,
        },
        // ... (other items can remain, or be dynamically rendered if needed, but for now we keep static for the list)
        {
            name: "Environmental Review",
            procedure: "ISO 9001",
            createdBy: "Mike Davis",
            status: "In Progress",
            completion: 65,
        },
        {
            name: "Pre-Audit Checklist Q4",
            procedure: "ISO 9001",
            createdBy: "Mike Davis",
            status: "Completed",
            completion: 100,
        },
        {
            name: "Pre-Audit Checklist Q4",
            procedure: "ISO 9001",
            createdBy: "Mike Davis",
            status: "In Progress",
            completion: 65,
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="Pre-Audit Checklists" />

            <div className="space-y-8 pb-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[28px] font-black text-slate-800 tracking-tight leading-none">
                            Pre-Audit Checklists
                        </h1>
                        <p className="text-[14px] text-slate-500 font-medium mt-3">
                            Create and track pre-audit reports
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 bg-[#2c8af8] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-[14px] transition-all shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Create Checklist
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    {stat.label}
                                </h3>
                                <p className="text-[32px] font-black text-slate-700 leading-none">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-2xl ${stat.iconBg} ${stat.color} flex items-center justify-center`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Table Card */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 rounded-xl overflow-hidden">
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest rounded-l-xl">
                                        Procedure Name
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Procedure
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Created By
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Completion
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest text-center rounded-r-xl">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {checklists.map((item, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/30 transition-colors group"
                                    >
                                        <td className="px-6 py-5 font-bold text-slate-700 text-[14px]">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-500 text-[14px]">
                                            {item.procedure}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-500 text-[14px]">
                                            {item.createdBy}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-[12px] font-black border ${
                                                    item.status === "Completed"
                                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                        : "bg-amber-50 text-amber-600 border-amber-100"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4 min-w-[140px]">
                                                <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${
                                                            item.completion ===
                                                            100
                                                                ? "bg-emerald-500"
                                                                : "bg-emerald-400"
                                                        }`}
                                                        style={{
                                                            width: `${item.completion}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-[13px] font-black text-slate-400 whitespace-nowrap">
                                                    {item.completion}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-md">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="h-9 px-4 flex items-center justify-center gap-2 rounded-xl border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-md text-[13px] font-black uppercase">
                                                    <Eye size={16} />
                                                    view
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateChecklistModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </AdministratorLayout>
    );
}
