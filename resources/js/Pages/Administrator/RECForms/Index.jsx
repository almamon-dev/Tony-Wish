import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Search,
    ChevronDown,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    UserCircle2,
    ShieldCheck,
    Users,
    LayoutGrid,
    Info,
    ArrowRight,
    ClipboardEdit,
    ExternalLink,
    Eye,
} from "lucide-react";

export default function RECFormsIndex() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedRole, setSelectedRole] = useState("All roles");

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
            description:
                "Company information, leadership, and strategic decisions (REC-01, REC-02)",
            color: "text-purple-600",
            bg: "bg-purple-50/50",
            icon: <ShieldCheck size={18} />,
            borderColor: "border-purple-200",
        },
        {
            role: "Administrator",
            description:
                "Management systems, policies, planning, and compliance (Most RECs)",
            color: "text-blue-600",
            bg: "bg-blue-50/50",
            icon: <ShieldCheck size={18} />,
            borderColor: "border-blue-200",
        },
        {
            role: "User",
            description:
                "Operational records, production, incidents (REC-15, REC-16, REC-17, REC-28, REC-29)",
            color: "text-emerald-600",
            bg: "bg-emerald-50/50",
            icon: <Users size={18} />,
            borderColor: "border-emerald-200",
        },
    ];

    const recForms = [
        {
            id: "REC-01",
            title: "Controlled Document Register",
            subtitle: "Master list of all REC forms",
            description:
                "Master list of all REC forms with revision tracking and compliance references.",
            category: "Management",
            fields: 4,
            role: "Account Holder",
            action: "View/Assign Form",
        },
        {
            id: "REC-02",
            title: "Personnel Numbers & Responsibilities",
            subtitle: "Responsibilities and structures",
            description:
                "Responsibilities and structures with detailed organizational chart.",
            category: "Management",
            fields: 4,
            role: "Account Holder",
            action: "View/Assign Form",
        },
        {
            id: "REC-03",
            title: "Training & Communication Register",
            subtitle: "Training records and protocols",
            description:
                "Training records and continuous monitoring protocols.",
            category: "Management",
            fields: 6,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-04",
            title: "Policies Status (Meetings)",
            subtitle: "Safety, pollution and smoking",
            description: "Safety, pollution and smoking meeting records.",
            category: "Planning",
            fields: 4,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-05",
            title: "Maintenance & Calibration",
            subtitle: "Equipment maintenance",
            description: "Equipment maintenance and calibration records.",
            category: "Planning",
            fields: 4,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-06",
            title: "Inspection & Test Plan",
            subtitle: "Quality inspection procedures",
            description: "Quality inspection and testing procedures.",
            category: "Planning",
            fields: 3,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-07",
            title: "Welding Specifications and Qualifications",
            subtitle: "Working procedure and technical",
            description: "Welding procedures and welder qualifications",
            category: "Security",
            fields: 3,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-08",
            title: "Project Review & Ord. Conf.",
            subtitle: "Project review documentation",
            description: "Project review documentation and job cards.",
            category: "Support",
            fields: 12,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-09",
            title: "Agreement & Communication",
            subtitle: "Contract and external communication",
            description: "Contract and external communication agreements.",
            category: "Support",
            fields: 3,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-10",
            title: "Purchase Order",
            subtitle: "Purchase order validation",
            description: "Purchase order validation process for procurement.",
            category: "Operations",
            fields: 7,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-11",
            title: "Delivery Note",
            subtitle: "Delivery documentation",
            description:
                "Delivery documentation for material receipt and traceability.",
            category: "Operations",
            fields: 10,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-12",
            title: "Declaration of Performance (DoP)",
            subtitle: "UK Construction compliance",
            description:
                "UK Construction Products Regulations - UKCA marking and DoP compliance for EN 1090.",
            category: "Operations",
            fields: 4,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-13",
            title: "Non-Conformance Register",
            subtitle: "Register of non-conformities",
            description: "Register of non-conformities and correction record.",
            category: "Performance",
            fields: 6,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-14",
            title: "Customer Feedback",
            subtitle: "Satisfaction monitoring",
            description:
                "Customer feedback and satisfaction monitoring - ISO 9001:2015 Clause 9.1.2.",
            category: "Performance",
            fields: 4,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-15",
            title: "Company Policies",
            subtitle: "Quality and Ethical Policies",
            description:
                "Quality, Environmental and Health & Safety Policies - ISO 9001, ISO 14001, ISO 45001.",
            category: "Management",
            fields: 8,
            role: "User",
            action: "View/Assign Form",
        },
        {
            id: "REC-16",
            title: "Legal Compliance Register",
            subtitle: "Legal & regulatory tracking",
            description:
                "Legal & regulatory compliance tracking and expiry warnings - ISO 9001, ISO 14001, ISO 45001.",
            category: "Management",
            fields: 5,
            role: "User",
            action: "View/Assign Form",
        },
        {
            id: "REC-17",
            title: "Internal Audits",
            subtitle: "ISO 9001 & ISO 14001 Audits",
            description:
                "EN1090 execution class 2 audit checklist - ISO 9001:2015 & ISO 14001:2015 & ISO 45001:2018.",
            category: "Performance",
            fields: 15,
            role: "User",
            action: "View/Assign Form",
        },
        {
            id: "REC-18",
            title: "Control of Non-Conforming Outputs",
            subtitle: "Management of non-conforming",
            description: "Management of non-conforming product/service.",
            category: "Operations",
            fields: 6,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-19",
            title: "Monitoring, Measurement & Analysis",
            subtitle: "Performance monitoring procedures",
            description: "Performance monitoring and measurement procedures.",
            category: "Performance",
            fields: 4,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-20",
            title: "Environmental Aspects & Impacts",
            subtitle: "Aspects & Impacts register",
            description: "Identification of environmental aspects - ISO 14001.",
            category: "Environmental",
            fields: 8,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-21",
            title: "Asset Management",
            subtitle: "Information asset inventory",
            description:
                "Information asset inventory and classification - ISO 27001.",
            category: "Security",
            fields: 12,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-22",
            title: "Monitor & Measure",
            subtitle: "Performance tracking log",
            description: "Track and log all monitoring parameters and measurements - ISO 14001.",
            category: "Environmental",
            fields: 9,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-23",
            title: "Incident Investigation Report",
            subtitle: "Incident & NC tracking",
            description: "Log and investigate all workplace incidents - ISO 45001.",
            category: "Health & Safety",
            fields: 10,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-24",
            title: "Waste Handling",
            subtitle: "Waste disposal record",
            description: "Record and monitor all waste disposal and contractor details - ISO 14001.",
            category: "Environmental",
            fields: 6,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-25",
            title: "Legal & Compliance Register",
            subtitle: "Environmental law compliance",
            description:
                "Environmental legal and compliance obligations - ISO 14001.",
            category: "Environmental",
            fields: 9,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-26",
            title: "Emergency Preparedness",
            subtitle: "Emergency response plans",
            description:
                "Environmental emergency preparedness and response - ISO 14001.",
            category: "Environmental",
            fields: 5,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-27",
            title: "Environmental Objectives & Targets",
            subtitle: "Performance improvement goals",
            description: "Environmental performance objectives - ISO 14001.",
            category: "Environmental",
            fields: 4,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-28",
            title: "Hazard Identification & Risk Assessment",
            subtitle: "OH&S risk management",
            description: "OH&S hazard identification - ISO 45001.",
            category: "Health & Safety",
            fields: 15,
            role: "User",
            action: "View/Assign Form",
        },
        {
            id: "REC-29",
            title: "Safety Equipment Checklist",
            subtitle: "Routine inspection records",
            description:
                "Safety equipment inspection tracking and maintenance records - ISO 45001.",
            category: "Health & Safety",
            fields: 9,
            role: "User",
            action: "View/Assign Form",
        },
        {
            id: "REC-30",
            title: "OH&S Consultation & Participation",
            subtitle: "Worker engagement records",
            description:
                "Worker consultation and participation records - ISO 45001.",
            category: "Health & Safety",
            fields: 6,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-31",
            title: "Operational Control",
            subtitle: "Method statements & Controls",
            description:
                "Operational control and method statements for ISO compliance.",
            category: "Operations",
            fields: 8,
            role: "Administrator",
            action: "Fill Form",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC Forms Management" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[28px] font-black text-slate-800 tracking-tight leading-none">
                            REC Forms Management
                        </h1>
                        <p className="text-[14px] text-slate-500 font-medium mt-3">
                            Manage and fill out REC forms and assign responsibility
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
                                    {stat.label}
                                </h3>
                                <p className="text-[32px] font-black text-slate-700 leading-none">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-sm ${stat.iconBg} ${stat.color} flex items-center justify-center`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Alert */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-sm p-5 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-sm bg-white border border-blue-100 flex items-center justify-center text-[#2c8af8] shrink-0">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h4 className="text-[14px] font-black text-[#2c8af8] uppercase tracking-wider">
                            Administrator Access - All REC Forms
                        </h4>
                        <p className="text-[13px] text-slate-500 font-medium mt-1">
                            As an Administrator, you have access to all 31 REC
                            forms. You can fill forms directly or assign them to
                            Business Owner or Users. Forms are indexed by
                            responsible role.
                        </p>
                    </div>
                </div>

                {/* Roles Guide */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[#2185d5]">
                        <ShieldCheck size={18} />
                        <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-widest">
                            Role Responsibility Guide
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {rolesGuide.map((guide, i) => (
                            <div
                                key={i}
                                className={`p-5 rounded-sm border ${guide.borderColor} ${guide.bg} space-y-2`}
                            >
                                <div
                                    className={`flex items-center gap-2 ${guide.color}`}
                                >
                                    {guide.icon}
                                    <span className="text-[14px] font-black uppercase tracking-wider">
                                        {guide.role}
                                    </span>
                                </div>
                                <p className="text-[12px] text-slate-500 font-bold leading-relaxed">
                                    {guide.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Forms Table */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden p-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest rounded-l-sm">
                                        REC ID
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Form Title
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest">
                                        Responsibility
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-black text-slate-500 uppercase tracking-widest text-right rounded-r-sm">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {recForms.map((form, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/30 transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="w-16 h-10 bg-slate-50 border border-slate-100 rounded-sm flex items-center justify-center text-[12px] font-black text-slate-400 group-hover:text-[#2185d5] group-hover:bg-blue-50 transition-all uppercase">
                                                {form.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <h3 className="text-[14px] font-bold text-slate-700 leading-tight">
                                                {form.title}
                                            </h3>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                                                form.category === "Management"
                                                    ? "bg-blue-50 text-blue-500 border-blue-100"
                                                    : form.category === "Planning"
                                                      ? "bg-purple-50 text-purple-500 border-purple-100"
                                                      : form.category === "Security"
                                                        ? "bg-red-50 text-red-500 border-red-100"
                                                        : "bg-emerald-50 text-emerald-500 border-emerald-100"
                                            }`}>
                                                {form.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter flex items-center gap-1.5">
                                                <Users size={14} className="text-slate-300" />
                                                {form.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Link
                                                href={route(
                                                    `administrator.rec-forms.${form.id.toLowerCase()}`
                                                )}
                                                className="inline-flex items-center gap-2 bg-[#2c8af8] hover:bg-blue-600 text-white px-5 h-10 rounded-sm font-black text-[12px] transition-all shadow-lg shadow-blue-500/10 active:scale-95 uppercase tracking-widest"
                                            >
                                                Open Project
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
        </AdministratorLayout>
    );
}
