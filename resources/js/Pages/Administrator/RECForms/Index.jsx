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
            title: "Access Control",
            subtitle: "Physical & Logical Access",
            description: "Information access control procedures - ISO 27001.",
            category: "Security",
            fields: 4,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-23",
            title: "Cryptography & Key Management",
            subtitle: "Encryption control mechanisms",
            description: "Cryptography controls - ISO 27001.",
            category: "Security",
            fields: 3,
            role: "Administrator",
            action: "Fill Form",
        },
        {
            id: "REC-24",
            title: "Incident Management",
            subtitle: "Security incident response",
            description: "Security incident management - ISO 27001.",
            category: "Security",
            fields: 5,
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
            title: "Incident Investigation",
            subtitle: "Accident & Near-miss reporting",
            description:
                "OH&S incident investigation and root-cause analysis - ISO 45001.",
            category: "Health & Safety",
            fields: 12,
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
                <div className="flex flex-col gap-1">
                    <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none">
                        REC Forms Management
                    </h1>
                    <p className="text-[14px] text-slate-500 font-medium mt-1">
                        Manage all REC forms and assign responsibility
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
                                <h3 className="text-[14px] font-medium text-slate-400">
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

                {/* Info Alert */}
                <div className="bg-[#f0f7ff] border border-[#d0e7ff] rounded-[8px] p-5 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#d0e7ff] flex items-center justify-center text-[#2c8af8] shrink-0">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h4 className="text-[15px] font-bold text-[#2c8af8]">
                            Administrator Access - All REC Forms
                        </h4>
                        <p className="text-[14px] text-slate-400 font-medium">
                            As an Administrator, you have access to all 30 REC
                            forms. You can fill forms directly or assign them to
                            Business Owner or Users. Forms are color-coded by
                            responsible role.
                        </p>
                    </div>
                </div>

                {/* Roles Guide */}
                <div className="space-y-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-purple-500">
                            <ShieldCheck size={18} />
                            <h3 className="text-[16px] font-bold text-slate-800">
                                Role Responsibility Guide
                            </h3>
                        </div>
                        <p className="text-[14px] text-slate-400 font-medium ml-7">
                            Who fills which REC forms
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {rolesGuide.map((guide, i) => (
                            <div
                                key={i}
                                className={`p-6 rounded-[8px] border ${guide.borderColor} ${guide.bg} space-y-3`}
                            >
                                <div
                                    className={`flex items-center gap-3 ${guide.color}`}
                                >
                                    {guide.icon}
                                    <span className="text-[16px] font-bold">
                                        {guide.role}
                                    </span>
                                </div>
                                <p className="text-[14px] text-slate-400 font-medium leading-relaxed">
                                    {guide.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm space-y-3">
                        <label className="text-[15px] font-bold text-slate-700">
                            Search RECs
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search by REC Number, Title...."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-10 px-4 bg-slate-50/50 border border-slate-100 rounded-lg text-[13px] focus:outline-none focus:border-blue-500 transition-all font-medium placeholder:text-slate-400"
                            />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm space-y-3">
                        <label className="text-[15px] font-bold text-slate-700">
                            Filter by Category
                        </label>
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                className="w-full h-10 pl-4 pr-10 bg-white border border-slate-100 rounded-lg text-[13px] font-medium text-slate-700 appearance-none focus:outline-none focus:border-blue-500"
                            >
                                <option>All Categories</option>
                                <option>Management</option>
                                <option>Planning</option>
                                <option>Security</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[12px] border border-slate-100 shadow-sm space-y-3">
                        <label className="text-[15px] font-bold text-slate-700">
                            Filter by Responsible Role
                        </label>
                        <div className="relative">
                            <select
                                value={selectedRole}
                                onChange={(e) =>
                                    setSelectedRole(e.target.value)
                                }
                                className="w-full h-10 pl-4 pr-10 bg-white border border-slate-100 rounded-lg text-[13px] font-medium text-slate-700 appearance-none focus:outline-none focus:border-blue-500"
                            >
                                <option>All Roles</option>
                                <option>Account Holder</option>
                                <option>Administrator</option>
                                <option>User</option>
                            </select>
                            <ChevronDown
                                size={16}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Forms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recForms.map((form, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-[16px] border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all group"
                        >
                            {/* Card Header */}
                            <div className="p-5 bg-[#f8fafc] border-b border-slate-50 relative">
                                <span
                                    className={`absolute top-5 right-5 px-3 py-1 rounded-lg text-[11px] font-medium border ${
                                        form.category === "Management"
                                            ? "bg-blue-50 text-blue-500 border-blue-200"
                                            : form.category === "Planning"
                                              ? "bg-purple-50 text-purple-500 border-purple-200"
                                              : form.category === "Security"
                                                ? "bg-red-50 text-red-500 border-red-200"
                                                : "bg-emerald-50 text-emerald-500 border-emerald-200"
                                    }`}
                                >
                                    {form.category}
                                </span>
                                <div className="space-y-1">
                                    <h3 className="text-[17px] font-bold text-slate-700">
                                        {form.id}
                                    </h3>
                                    <p className="text-[14px] font-medium text-slate-400">
                                        {form.title}
                                    </p>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-5 flex-1 flex flex-col gap-6">
                                <p className="text-[14px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                                    {form.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-blue-500">
                                        <FileText size={18} />
                                        <span className="text-[14px] font-medium text-slate-400">
                                            {form.fields} fields
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-400 bg-white text-blue-600">
                                        <UserCircle2 size={16} />
                                        <span className="text-[14px] font-medium">
                                            {form.role}
                                        </span>
                                    </div>
                                </div>

                                {form.id === "REC-01" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-01",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-02" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-02",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-03" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-03",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-04" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-04",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-05" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-05",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-06" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-06",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-07" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-07",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-08" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-08",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-09" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-09",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-10" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-10",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-11" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-11",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-12" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-12",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-13" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-13",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-16" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-16",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-18" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-18",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : form.id === "REC-19" ? (
                                    <Link
                                        href={route(
                                            "administrator.rec-forms.rec-19",
                                        )}
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </Link>
                                ) : (
                                    <button
                                        className={`w-full py-3.5 rounded-xl text-[16px] font-black transition-all flex items-center justify-center gap-3 ${
                                            form.action === "Fill Form"
                                                ? "bg-[#2185d5] text-white hover:bg-blue-600 shadow-sm active:scale-[0.98]"
                                                : "bg-white text-[#2185d5] border border-blue-200 hover:bg-slate-50"
                                        }`}
                                    >
                                        <FileText size={18} />
                                        {form.action}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdministratorLayout>
    );
}
