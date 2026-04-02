import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Search,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    ShieldCheck,
    Users,
    ArrowRight,
} from "lucide-react";

export default function RECFormsIndex() {
    const [searchQuery, setSearchQuery] = useState("");

    const stats = [
        {
            label: "Total REC Forms",
            value: "31",
            sublabel: "All available forms",
            icon: <FileText size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
            iconBg: "bg-blue-100/50",
        },
        {
            label: "Completed",
            value: "18",
            sublabel: "Forms completed",
            icon: <CheckCircle2 size={20} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            iconBg: "bg-emerald-100/50",
        },
        {
            label: "In Progress",
            value: "7",
            sublabel: "Partially filled",
            icon: <Clock size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
            iconBg: "bg-amber-100/50",
        },
        {
            label: "Not Started",
            value: "5",
            sublabel: "Forms pending",
            icon: <AlertCircle size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
        },
    ];

    const rolesGuide = [
        {
            role: "Account Holder",
            description: "Company information, leadership, and strategic decisions (REC-01, REC-02)",
            color: "text-purple-600",
            bg: "bg-purple-50/50",
            icon: <ShieldCheck size={18} />,
            borderColor: "border-purple-200",
        },
        {
            role: "Administrator",
            description: "Management systems, policies, planning, and compliance (Most RECs)",
            color: "text-blue-600",
            bg: "bg-blue-50/50",
            icon: <ShieldCheck size={18} />,
            borderColor: "border-blue-200",
        },
        {
            role: "User",
            description: "Operational records, production, incidents (REC-15, REC-16, REC-17, REC-28, REC-29)",
            color: "text-emerald-600",
            bg: "bg-emerald-50/50",
            icon: <Users size={18} />,
            borderColor: "border-emerald-200",
        },
    ];

    const recForms = [
        { id: "REC-01", title: "Controlled Document Register", category: "Management", role: "Account Holder" },
        { id: "REC-02", title: "Personnel Numbers & Responsibilities", category: "Management", role: "Account Holder" },
        { id: "REC-03", title: "Training & Communication Register", category: "Management", role: "Administrator" },
        { id: "REC-04", title: "Policies Status (Meetings)", category: "Planning", role: "Administrator" },
        { id: "REC-05", title: "Maintenance & Calibration", category: "Planning", role: "Administrator" },
        { id: "REC-06", title: "Inspection & Test Plan", category: "Planning", role: "Administrator" },
        { id: "REC-07", title: "Welding Specifications and Qualifications", category: "Security", role: "Administrator" },
        { id: "REC-08", title: "Project Review & Ord. Conf.", category: "Support", role: "Administrator" },
        { id: "REC-09", title: "Agreement & Communication", category: "Support", role: "Administrator" },
        { id: "REC-10", title: "Purchase Order", category: "Operations", role: "Administrator" },
        { id: "REC-11", title: "Delivery Note", category: "Operations", role: "Administrator" },
        { id: "REC-12", title: "Declaration of Performance (DoP)", category: "Operations", role: "Administrator" },
        { id: "REC-13", title: "Non-Conformance Register", category: "Performance", role: "Administrator" },
        { id: "REC-14", title: "Customer Feedback", category: "Performance", role: "Administrator" },
        { id: "REC-15", title: "Company Policies", category: "Management", role: "User" },
        { id: "REC-16", title: "Legal Compliance Register", category: "Management", role: "User" },
        { id: "REC-17", title: "Internal Audits", category: "Performance", role: "User" },
        { id: "REC-18", title: "Control of Non-Conforming Outputs", category: "Operations", role: "Administrator" },
        { id: "REC-19", title: "Monitoring, Measurement & Analysis", category: "Performance", role: "Administrator" },
        { id: "REC-20", title: "Environmental Aspects & Impacts", category: "Environmental", role: "Administrator" },
        { id: "REC-21", title: "Asset Management", category: "Security", role: "Administrator" },
        { id: "REC-22", title: "Monitor & Measure", category: "Environmental", role: "Administrator" },
        { id: "REC-23", title: "Incident Investigation Report", category: "Health & Safety", role: "Administrator" },
        { id: "REC-24", title: "Waste Handling", category: "Environmental", role: "Administrator" },
        { id: "REC-25", title: "Legal & Compliance Register", category: "Environmental", role: "Administrator" },
        { id: "REC-26", title: "Emergency Preparedness", category: "Environmental", role: "Administrator" },
        { id: "REC-27", title: "Environmental Objectives & Targets", category: "Environmental", role: "Administrator" },
        { id: "REC-28", title: "Hazard Identification & Risk Assessment", category: "Health & Safety", role: "User" },
        { id: "REC-29", title: "Safety Equipment Checklist", category: "Health & Safety", role: "User" },
        { id: "REC-30", title: "OH&S Consultation & Participation", category: "Health & Safety", role: "Administrator" },
        { id: "REC-31", title: "Operational Control", category: "Operations", role: "Administrator" },
    ];

    const filteredForms = recForms.filter(f => 
        f.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        f.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AdministratorLayout>
            <Head title="REC Forms Management" />

            <div className="space-y-6 max-w-[1600px] mx-auto pb-12 px-4 md:px-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-[26px] font-black text-slate-800 tracking-tight leading-none uppercase">
                            REC Forms Management
                        </h1>
                        <p className="text-[14px] text-slate-500 font-medium mt-3">
                            Manage and fill out REC forms and assign responsibility
                        </p>
                    </div>
                    <div className="relative group max-w-sm w-full md:w-[300px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2185d5] transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search forms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200 rounded-sm text-[13px] focus:outline-none focus:border-[#2185d5] transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Vertical Column for Stats on Mobile, Grid on Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm flex items-center justify-between group hover:border-slate-200 transition-all">
                            <div>
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{stat.label}</h3>
                                <p className="text-[28px] font-black text-slate-700 leading-none">{stat.value}</p>
                            </div>
                            <div className={`w-11 h-11 rounded-sm ${stat.iconBg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-105`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Responsibility Guide Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rolesGuide.map((guide, i) => (
                        <div key={i} className={`p-4 rounded-sm border ${guide.borderColor} ${guide.bg} flex gap-3 items-start`}>
                            <div className={`${guide.color} mt-0.5 shrink-0`}>{guide.icon}</div>
                            <div className="space-y-1">
                                <span className={`text-[12px] font-black uppercase tracking-wider ${guide.color}`}>{guide.role}</span>
                                <p className="text-[11px] text-slate-500 font-bold leading-relaxed">{guide.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Table with Responsive Scrolling */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest w-24">ID</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest min-w-[250px]">Form Title</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest w-36">Category</th>
                                    <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest w-40">Responsibility</th>
                                    <th className="px-6 py-4 text-right text-[11px] font-black text-slate-500 uppercase tracking-widest w-28">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredForms.map((form, i) => (
                                    <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="w-14 h-9 bg-slate-50 border border-slate-100 rounded-sm flex items-center justify-center text-[11px] font-black text-slate-400 group-hover:text-[#2185d5] group-hover:bg-blue-50 transition-all uppercase">
                                                {form.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <h3 className="text-[14px] font-bold text-slate-700 leading-tight group-hover:text-slate-950 transition-colors">{form.title}</h3>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-sm border whitespace-nowrap ${
                                                ['Management', 'Planning'].includes(form.category)
                                                    ? "bg-blue-50 text-blue-500 border-blue-100"
                                                    : "bg-emerald-50 text-emerald-500 border-emerald-100"
                                            }`}>
                                                {form.category}
                                            </span>
                                        </td>

                                        
                                        <td className="px-6 py-4">
                                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter flex items-center gap-1.5">
                                                <Users size={14} className="text-slate-300" />
                                                {form.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={route(`administrator.rec-forms.${form.id.toLowerCase()}`)}
                                                className="inline-flex items-center gap-2 bg-[#2c8af8] hover:bg-blue-600 text-white px-4 h-9 rounded-sm font-black text-[11px] transition-all active:scale-95 uppercase tracking-widest"
                                            >
                                                Open
                                                <ArrowRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-thin::-webkit-scrollbar { width: 4px; height: 4px; }
                .scrollbar-thumb-slate-200::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .scrollbar-track-transparent::-webkit-scrollbar-track { background: transparent; }
            `}} />
        </AdministratorLayout>
    );
}
