import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import { Plus, Award, Calendar, Clock, Edit2, Eye } from "lucide-react";
import IssueCertificateModal from "./Partials/IssueCertificateModal";

export default function CertificatesIndex({ certificates: dbCertificates = [], procedures = [], users = [], stats: dbStats }) {
    const [isBySearch, setIsBySearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [viewMode, setViewMode] = useState("issue"); // "issue", "edit", "view"

    const handleIssueNew = () => {
        setSelectedCertificate(null);
        setViewMode("issue");
        setIsModalOpen(true);
    };

    const handleEdit = (cert) => {
        setSelectedCertificate(cert);
        setViewMode("edit");
        setIsModalOpen(true);
    };

    const handleView = (cert) => {
        setSelectedCertificate(cert);
        setViewMode("view");
        setIsModalOpen(true);
    };

    const stats = [
        {
            label: "Total issued",
            value: dbStats?.total || "0",
            icon: <Award size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
        },
        {
            label: "This month",
            value: dbStats?.thisMonth || "0",
            icon: <Calendar size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
        },
        {
            label: "Pending issue",
            value: dbStats?.pending || "0",
            icon: <Clock size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
            iconBg: "bg-amber-100/50",
        },
    ];

    const filteredCertificates = dbCertificates.filter((cert) =>
        (cert.certificate_id?.toLowerCase() || "").includes(isBySearch.toLowerCase()) ||
        (cert.procedure?.toLowerCase() || "").includes(isBySearch.toLowerCase()) ||
        (cert.issuedTo?.toLowerCase() || "").includes(isBySearch.toLowerCase())
    );

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
                        onClick={handleIssueNew}
                        className="inline-flex items-center justify-center gap-2 bg-[#2c8af8] hover:bg-blue-600 text-white px-6 py-2.5 rounded-md font-black text-[14px] transition-all shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap"
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
                            className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md"
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
                <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-[18px] font-black text-slate-800">
                            Recent Certificates
                        </h2>
                        <div className="relative max-w-sm w-full">
                            <input
                                type="text"
                                value={isBySearch}
                                onChange={(e) => setIsBySearch(e.target.value)}
                                placeholder="Search certificates..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-md text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
                            />
                            <Plus size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-45" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="text-slate-400">
                                    <th className="px-6 py-4 text-[13px] font-black uppercase tracking-widest">
                                        Certificate ID
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black uppercase tracking-widest">
                                        Procedure
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black uppercase tracking-widest">
                                        Issued To
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black uppercase tracking-widest">
                                        Issued Date
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black uppercase tracking-widest">
                                        Valid Until
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black uppercase tracking-widest text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCertificates.map((cert, i) => (
                                    <tr
                                        key={i}
                                        className="group transition-all hover:bg-slate-50/50"
                                    >
                                        <td className="px-6 py-5 bg-white border-y border-l border-slate-50 first:rounded-l-2xl font-bold text-slate-700 text-[14px]">
                                            {cert.certificate_id}
                                        </td>
                                        <td className="px-6 py-5 bg-white border-y border-slate-50 font-bold text-slate-500 text-[14px]">
                                            {cert.procedure}
                                        </td>
                                        <td className="px-6 py-5 bg-white border-y border-slate-50 font-bold text-slate-500 text-[14px]">
                                            {cert.issuedTo}
                                        </td>
                                        <td className="px-6 py-5 bg-white border-y border-slate-50 font-bold text-slate-500 text-[14px]">
                                            {cert.issuedDate}
                                        </td>
                                        <td className="px-6 py-5 bg-white border-y border-slate-50 font-bold text-slate-500 text-[14px]">
                                            {cert.validUntil}
                                        </td>
                                        <td className="px-6 py-5 bg-white border-y border-r border-slate-50 last:rounded-r-2xl">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleEdit(cert)}
                                                    className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-md"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button 
                                                    onClick={() => handleView(cert)}
                                                    className="h-9 px-4 flex items-center justify-center gap-2 rounded-md border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-md text-[13px] font-black uppercase tracking-wider"
                                                >
                                                    <Eye size={16} />
                                                    view
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCertificates.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-slate-400 font-medium bg-slate-50/20 rounded-md border border-dashed border-slate-100 italic">
                                            No certificates found...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <IssueCertificateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                procedures={procedures}
                users={users}
                certificate={selectedCertificate}
                mode={viewMode}
            />
        </AdministratorLayout>
    );
}



