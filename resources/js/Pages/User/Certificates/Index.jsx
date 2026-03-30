import React, { useState } from "react";
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
import CertificatePreviewModal from "./Partials/CertificatePreviewModal";

export default function CertificatesIndex({ certificates = [], stats: dbStats }) {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleView = (cert) => {
        setSelectedCertificate(cert);
        setIsModalOpen(true);
    };

    const stats = [
        {
            label: "Total Certificates",
            value: dbStats?.total || "0",
            icon: <Award size={18} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "This Year",
            value: dbStats?.thisYear || "0",
            icon: <Award size={18} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "Expiring Soon",
            value: dbStats?.expiringSoon || "0",
            icon: <Award size={18} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
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
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="bg-white rounded-[20px] border border-slate-100 shadow-sm p-5 transition-all hover:shadow-md"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100">
                                    <Award size={20} />
                                </div>
                                <span className={`px-3 py-1 bg-white border ${cert.status === 'Active' ? 'border-blue-200 text-blue-500' : 'border-slate-200 text-slate-500'} rounded-lg text-[11px] font-bold`}>
                                    {cert.status}
                                </span>
                            </div>

                            <div className="mb-0">
                                <p className="text-[13px] font-bold text-slate-400 mb-0.5 truncate uppercase">
                                    {cert.title}
                                </p>
                                <h3 className="text-[16px] font-bold text-slate-800 line-clamp-1">
                                    {cert.subtitle}
                                </h3>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-slate-50 mt-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-[12px] font-bold text-slate-400">
                                        Certificate ID
                                    </span>
                                    <span className="text-[12px] font-bold text-slate-700">
                                        {cert.certificate_id}
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
                                <button 
                                    onClick={() => handleView(cert)}
                                    className="flex-1 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-[13px] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <Eye size={16} />
                                    View
                                </button>
                                <button 
                                    onClick={() => handleView(cert)}
                                    className="flex-1 px-4 py-2 bg-[#2c8af8] hover:bg-blue-600 text-white rounded-xl text-[13px] font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                                >
                                    <Download size={16} />
                                    Download
                                </button>
                            </div>
                        </div>
                    ))}
                    {certificates.length === 0 && (
                        <div className="col-span-full py-20 bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-slate-300 shadow-sm mb-4">
                                <Award size={32} />
                            </div>
                            <h3 className="text-slate-600 font-bold text-[18px]">No Certificates Yet</h3>
                            <p className="text-slate-400 text-[14px] mt-1 max-w-xs">
                                Completed procedures will appear here once issued by your administrator.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <CertificatePreviewModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                certificate={selectedCertificate}
            />
        </UserLayout>
    );
}

