import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import {
    Search,
    ChevronDown,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    Eye,
    Check,
    UploadCloud,
} from "lucide-react";

export default function UploadCenterIndex() {
    const [searchQuery, setSearchQuery] = useState("");

    const stats = [
        {
            label: "Total Uploads",
            value: "156",
            sublabel: "All available forms",
            icon: <UploadCloud size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
            iconBg: "bg-blue-100/50",
        },
        {
            label: "Pending Review",
            value: "12",
            sublabel: "Forms completed",
            icon: <Clock size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
            iconBg: "bg-amber-100/50",
        },
        {
            label: "Approved",
            value: "132",
            sublabel: "Forms approved",
            icon: <CheckCircle2 size={20} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            iconBg: "bg-emerald-100/50",
        },
        {
            label: "Rejected",
            value: "78%",
            sublabel: "Forms pending",
            icon: <AlertCircle size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
        },
    ];

    const uploads = [
        {
            id: 1,
            fileName: "Pre-Audit Checklist Q4",
            uploadedBy: "Tom Wilson",
            procedure: "ISO 9001",
            uploadDate: "Oct 27, 2025",
            size: "2.4 MB",
            status: "Approved",
        },
        {
            id: 2,
            fileName: "Pre-Audit Checklist Q4",
            uploadedBy: "Tom Wilson",
            procedure: "ISO 9001",
            uploadDate: "Oct 20, 2025",
            size: "2.4 MB",
            status: "Pending",
        },
        {
            id: 3,
            fileName: "Pre-Audit Checklist Q4",
            uploadedBy: "Tom Wilson",
            procedure: "ISO 9001",
            uploadDate: "Oct 20, 2025",
            size: "2.4 MB",
            status: "Approved",
        },
        {
            id: 4,
            fileName: "Quality_report_D4_.pdf",
            uploadedBy: "Tom Wilson",
            procedure: "ISO 9001",
            uploadDate: "Oct 24, 2025",
            size: "2.4 MB",
            status: "Approved",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="Upload Center" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none">
                        Upload Center
                    </h1>
                    <p className="text-[14px] text-slate-500 font-medium mt-1">
                        Manager documents uploaded by users
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-[14px] font-medium text-slate-400 uppercase tracking-tight">
                                    {stat.label}
                                </h3>
                                <div
                                    className={`w-10 h-10 rounded-xl ${stat.iconBg} ${stat.color} flex items-center justify-center`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <div>
                                <p className="text-[32px] font-bold text-slate-700 leading-none mb-4">
                                    {stat.value}
                                </p>
                                <p className="text-[12px] font-medium text-slate-400">
                                    {stat.sublabel}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-6 mt-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8fafc] border-b border-slate-50">
                                    <th className="px-6 py-5 text-[14px] font-bold text-slate-700">
                                        File Name
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700">
                                        Upload By
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700 text-center">
                                        Procedure
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700 text-center">
                                        Upload Date
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700 text-center">
                                        Size
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700 text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-5 text-[14px] font-bold text-slate-700 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {uploads.map((upload) => (
                                    <tr
                                        key={upload.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-5">
                                            <span className="text-[14px] font-medium text-slate-700">
                                                {upload.fileName}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5 text-[14px] font-medium text-slate-500">
                                            {upload.uploadedBy}
                                        </td>
                                        <td className="px-4 py-5 text-[14px] font-medium text-slate-500 text-center">
                                            {upload.procedure}
                                        </td>
                                        <td className="px-4 py-5 text-[14px] font-medium text-slate-500 text-center">
                                            {upload.uploadDate}
                                        </td>
                                        <td className="px-4 py-5 text-[14px] font-medium text-slate-500 text-center">
                                            {upload.size}
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${
                                                    upload.status === "Approved"
                                                        ? "bg-blue-50 text-blue-500 border-blue-100"
                                                        : "bg-amber-50 text-amber-500 border-amber-100"
                                                }`}
                                            >
                                                {upload.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-all bg-white">
                                                    <Eye
                                                        size={16}
                                                        className="text-slate-400"
                                                    />
                                                    view
                                                </button>
                                                {(upload.status === "Pending" ||
                                                    upload.id === 3) && (
                                                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-100 text-emerald-600 font-bold text-[13px] hover:bg-emerald-50 transition-all bg-white">
                                                        Approve
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
