import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { UploadCloud, Clock, CheckCircle2, TrendingUp } from "lucide-react";

export default function UploadCenter() {
    const stats = [
        {
            label: "Total Uploads",
            value: "23",
            icon: <UploadCloud size={18} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "Pending Review",
            value: "2",
            icon: <Clock size={18} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
        {
            label: "Approved",
            value: "20",
            icon: <CheckCircle2 size={18} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
        },
        {
            label: "This Month",
            value: "8",
            icon: <TrendingUp size={18} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
    ];

    const uploads = [
        {
            name: "ISO 9001 Quality Review",
            procedure: "ISO 9001",
            date: "Oct 27, 2025",
            size: "2.4 MB",
            status: "Approved",
        },
        {
            name: "ISO 9001 Quality Review",
            procedure: "ISO 9001",
            date: "Oct 27, 2025",
            size: "1.2 MB",
            status: "Approved",
        },
        {
            name: "ISO 9001 Quality Review",
            procedure: "ISO 9001",
            date: "Oct 27, 2025",
            size: "3.1 MB",
            status: "Pending",
        },
    ];

    return (
        <UserLayout>
            <Head title="Upload Center" />

            <div className="space-y-6 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800 tracking-tight leading-none">
                        Upload Center
                    </h1>
                    <p className="text-slate-500 font-medium mt-3">
                        Upload completed work, reports and documents
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
                                    className={`w-9 h-9 rounded-[10px] ${stat.bg} ${stat.color} flex items-center justify-center opacity-80`}
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
                            </div>
                        </div>
                    ))}
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
                                        Update Date
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500">
                                        Size
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500 text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-[12px] font-bold text-slate-500 text-center last:rounded-r-lg">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {uploads.map((doc, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/10 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-bold text-slate-600 text-[13px]">
                                            {doc.name}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-400 text-[13px]">
                                            {doc.procedure}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-400 text-[13px]">
                                            {doc.date}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-400 text-[13px]">
                                            {doc.size}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`px-4 py-1 rounded-full text-[11px] font-bold border ${
                                                    doc.status === "Approved"
                                                        ? "bg-white text-blue-500 border-blue-100"
                                                        : "bg-white text-amber-500 border-amber-100"
                                                }`}
                                            >
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="px-4 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg text-[11px] font-bold hover:bg-slate-50 transition-all">
                                                View
                                            </button>
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
