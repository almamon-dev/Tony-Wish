import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import { Plus, Award, Calendar, Clock, Edit2, Eye } from "lucide-react";
import IssueCertificateModal from "./Partials/IssueCertificateModal";

export default function CertificatesIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const stats = [
        {
            label: "Total issued",
            value: "42",
            icon: <Award size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
        },
        {
            label: "This month",
            value: "12",
            icon: <Calendar size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
        },
        {
            label: "Pending issue",
            value: "6",
            icon: <Clock size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
            iconBg: "bg-amber-100/50",
        },
    ];

    const certificates = [
        {
            id: "CRT-2025-001",
            procedure: "ISO 9001",
            issuedTo: "Oct 20, 2025",
            issuedDate: "Oct 20, 2025",
            validUntil: "Oct 20, 2025",
        },
        {
            id: "CRT-2025-002",
            procedure: "ISO 9001",
            issuedTo: "Oct 20, 2025",
            issuedDate: "Oct 20, 2025",
            validUntil: "Oct 20, 2025",
        },
        {
            id: "CRT-2025-003",
            procedure: "ISO 9001",
            issuedTo: "Oct 20, 2025",
            issuedDate: "Oct 20, 2025",
            validUntil: "Oct 20, 2025",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="Certificates" />

            <div className="space-y-8 pb-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[28px] font-black text-slate-800 tracking-tight leading-none">
                            Certificates
                        </h1>
                        <p className="text-[14px] text-slate-500 font-medium mt-3">
                            Issue and view procedure certificates
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 bg-[#2c8af8] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-[14px] transition-all shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Issue Certificate
                    </button>
                </div>

                {/* Statistics Section */}
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

                {/* Table Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 rounded-xl overflow-hidden">
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest rounded-l-xl">
                                        Certificate ID
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Procedure
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Issued To
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Issued Date
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Valid Until
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest text-center rounded-r-xl">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {certificates.map((cert, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/30 transition-colors group"
                                    >
                                        <td className="px-6 py-5 font-bold text-slate-700 text-[14px]">
                                            {cert.id}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-500 text-[14px]">
                                            {cert.procedure}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-500 text-[14px]">
                                            {cert.issuedTo}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-500 text-[14px]">
                                            {cert.issuedDate}
                                        </td>
                                        <td className="px-6 py-5 font-bold text-slate-500 text-[14px]">
                                            {cert.validUntil}
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

            <IssueCertificateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </AdministratorLayout>
    );
}
