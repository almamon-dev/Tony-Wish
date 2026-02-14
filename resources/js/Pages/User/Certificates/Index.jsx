import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import {
    Award,
    Calendar,
    ShieldCheck,
    ArrowRightCircle,
    Download,
    Eye,
} from "lucide-react";

export default function CertificatesIndex() {
    const stats = [
        {
            label: "Total Certificates",
            value: "3",
            icon: <Award size={18} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "This Year",
            value: "3",
            icon: <Award size={18} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "Expiring Soon",
            value: "0",
            icon: <Award size={18} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
        },
    ];

    const certificates = [
        {
            id: "CERT-2025-089",
            title: "ISO 27001",
            subtitle: "Information Security",
            issued: "Oct 20, 2025",
            expires: "Oct 20, 2026",
            status: "Active",
        },
        {
            id: "CERT-2025-056",
            title: "ISO 9001",
            subtitle: "Quality Management",
            issued: "Oct 20, 2025",
            expires: "Oct 20, 2026",
            status: "Active",
        },
        {
            id: "CERT-2025-056",
            title: "ISO 14001",
            subtitle: "Environmental",
            issued: "Oct 20, 2025",
            expires: "Oct 20, 2026",
            status: "Active",
        },
    ];

    return (
        <UserLayout>
            <Head title="My Certificates" />

            <div className="space-y-6 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800 tracking-tight leading-none">
                        My Certificates
                    </h1>
                    <p className="text-slate-500 font-medium mt-3">
                        View certificates issued after procedure completion
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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

                {/* Certificates Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {certificates.map((cert, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-[20px] border border-slate-100 shadow-sm p-5 transition-all hover:shadow-md"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                                    <Award size={20} />
                                </div>
                                <span className="px-3 py-1 bg-white border border-blue-200 text-blue-500 rounded-lg text-[11px] font-bold">
                                    {cert.status}
                                </span>
                            </div>

                            <div className="mb-8">
                                <p className="text-[13px] font-bold text-slate-400 mb-0.5">
                                    {cert.title}
                                </p>
                                <h3 className="text-[16px] font-bold text-slate-800">
                                    {cert.subtitle}
                                </h3>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-slate-50">
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] font-bold text-slate-400">
                                        Certificate ID
                                    </span>
                                    <span className="text-[12px] font-bold text-slate-700">
                                        {cert.id}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] font-bold text-slate-400">
                                        Issued
                                    </span>
                                    <span className="text-[12px] font-bold text-slate-700">
                                        {cert.issued}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] font-bold text-slate-400">
                                        Expires
                                    </span>
                                    <span className="text-[12px] font-bold text-slate-700">
                                        {cert.expires}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-3">
                                <button className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[13px] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                    View
                                </button>
                                <button className="flex-1 px-4 py-2 bg-[#2c8af8] hover:bg-blue-600 text-white rounded-xl text-[13px] font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </UserLayout>
    );
}
