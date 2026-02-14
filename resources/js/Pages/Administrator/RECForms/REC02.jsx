import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    Trash2,
    Plus,
    ChevronDown,
    Upload,
} from "lucide-react";

export default function REC02() {
    const roles = [
        {
            id: 1,
            title: "Managing Director (MD)",
            responsibilities:
                "Leads company strategy, governance, and high-level decision-making. Oversees financial performance, stakeholder engagement, and regulatory compliance. Sets long-term goals and ensures alignment across departments.",
            qty: 1,
        },
        {
            id: 2,
            title: "Production Manager",
            responsibilities:
                "Oversees all production activities, manages teams, ensures output meets quality and delivery standards, and resolves operational issues. Implements production plans, monitors KPIs, and drives continuous improvement. Coordinates with QA, planning, and commercial departments to ensure alignment.",
            qty: 1,
        },
        {
            id: 3,
            title: "Admin",
            responsibilities:
                "Provides administrative support across departments, including document handling, scheduling, filing, and internal communications. Maintains controlled records, assists with audit preparation, updates registers, and supports coordination between teams. Ensures documentation is correctly formatted, stored, and retrievable in line with PR-01 Document Control.",
            qty: 2,
        },
        {
            id: 4,
            title: "Responsible Welding Coordinator (RWC)",
            responsibilities:
                "Manages welding compliance, oversees welder qualifications, maintains WPQR/PQRs, and ensures adherence to EN 1090 and ISO 3834. Supports inspections and repairs.",
            qty: 1,
        },
        {
            id: 5,
            title: "Inspection Technician",
            responsibilities:
                "Performs quality inspections using visual, dimensional, and instrument-based methods. Verifies compliance with specifications, records results, and flags non-conformances. Supports PR-05 and PR-06 inspection stages.",
            qty: 1,
        },
        {
            id: 6,
            title: "Responsible Welding Coordinator",
            responsibilities:
                "Manages welding compliance, oversees welder qualifications, maintains WPQR/PQRs, and ensures adherence to EN 1090 and ISO 3834. Supports inspections and repairs.",
            qty: 1,
        },
        {
            id: 7,
            title: "Plater",
            responsibilities:
                "Positions and aligns steel plates for welding or assembly. Reads drawings, prepares surfaces, and ensures correct fit-up. Supports fabrication teams and contributes to structural integrity.",
            qty: 6,
        },
        {
            id: 8,
            title: "Welder (MIG/TIG/MMA)",
            responsibilities:
                "Welds components using MIG, TIG, and MMA techniques. Follows WPS, inspects own work, and ensures weld quality and traceability.",
            qty: 3,
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-02 - Personnel Structure & Responsibilities" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link
                            href={route("administrator.rec-forms.index")}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#2185d5] transition-colors mb-2 text-sm font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to REC Forms
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800">
                            REC-02 Personnel Structure & Responsibilities
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#2185d5] rounded-xl hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Upload size={18} />
                            Upload company structure
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Download size={18} />
                            Export PDF
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-xl hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-blue-500/20">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                    <h2 className="text-lg font-bold text-slate-700 mb-6">
                        Company Structure & Responsibilities
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="px-6 py-4 text-left text-[13px] font-bold text-slate-600 w-[25%]">
                                        Job Title
                                    </th>
                                    <th className="px-6 py-4 text-left text-[13px] font-bold text-slate-600 w-[60%]">
                                        Responsibilities
                                    </th>
                                    <th className="px-6 py-4 text-center text-[13px] font-bold text-slate-600 w-[10%]">
                                        Qty
                                    </th>
                                    <th className="px-6 py-4 text-center text-[13px] font-bold text-slate-600 w-[5%]">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {roles.map((role) => (
                                    <tr
                                        key={role.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex items-start justify-between gap-2">
                                                <span className="text-[13px] font-medium text-slate-700">
                                                    {role.title}
                                                </span>
                                                <ChevronDown
                                                    size={16}
                                                    className="text-slate-400 mt-0.5"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <p className="text-[13px] text-slate-500 leading-relaxed">
                                                {role.responsibilities}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 align-top text-center">
                                            <span className="text-[13px] font-medium text-slate-700">
                                                {role.qty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 align-top text-center">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-all mx-auto">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add New Button */}
                    <div className="mt-8">
                        <button className="w-full py-3 bg-[#2185d5] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
                            <Plus size={18} />
                            Add New Job Role
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
