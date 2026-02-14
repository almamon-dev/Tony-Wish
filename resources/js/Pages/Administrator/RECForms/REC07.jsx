import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    AlertTriangle,
    Upload,
    Calendar,
    Users,
    Trash2,
    MoreHorizontal,
    Plus,
    Eye,
} from "lucide-react";

export default function REC07() {
    const alerts = {
        expired: 2,
        expiringSoon: 1,
        valid: 14,
    };

    const employees = [
        {
            id: 1,
            name: "Mark Wilson",
            ref001: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "overdue",
            },
            ref001_2: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "overdue",
            },
            ref002: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "valid",
            },
            ref004: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "expiringSoon",
            },
        },
        {
            id: 2,
            name: "Toby Watt",
            ref001: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "overdue",
            },
            ref001_2: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "overdue",
            },
            ref002: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "valid",
            },
            ref004: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "expiringSoon",
            },
        },
        {
            id: 3,
            name: "John Morris",
            ref001: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "overdue",
            },
            ref001_2: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "valid",
            },
            ref002: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "overdue",
            },
            ref004: { prolongation: "N/A", reTest: "N/A", status: "none" },
        },
        {
            id: 4,
            name: "Fred Jones",
            ref001: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "overdue",
            },
            ref001_2: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "overdue",
            },
            ref002: {
                prolongation: "20/11/2026",
                reTest: "20/11/2027",
                status: "valid",
            },
            ref004: { prolongation: "N/A", reTest: "N/A", status: "none" },
        },
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case "overdue":
                return "bg-red-50 text-red-600";
            case "expiringSoon":
                return "bg-amber-50 text-amber-600";
            case "valid":
                return "bg-emerald-50 text-emerald-600";
            default:
                return "text-slate-400";
        }
    };

    return (
        <AdministratorLayout>
            <Head title="REC-07 - Welding Specifications and Qualifications" />

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
                            REC-07 Welding Specifications and Qualifications
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Eye size={16} />
                            Preview
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

                {/* Alerts Section */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h3 className="text-slate-800 font-bold text-sm mb-1">
                                Welder Qualification Alerts
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.expired} Expired
                                </span>
                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.expiringSoon} Expiry soon
                                </span>
                                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.valid} Valid
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2185d5] text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm">
                            <Upload size={14} />
                            Upload WPS
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2185d5] text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm">
                            <Upload size={14} />
                            Upload WPQR
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-slate-100">
                        <h3 className="text-[15px] font-bold text-slate-700">
                            Weld Procedure (WPS) + Weld Procedure Qualification
                            (WPQR)
                        </h3>
                        <button className="flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-[#2185d5] transition-colors">
                            <Plus size={16} />
                            Add New Weld Procedure
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th
                                        rowSpan="3"
                                        className="border border-slate-200 px-4 py-2 text-left text-[11px] font-bold text-slate-600 w-48"
                                    >
                                        Name
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-2 text-center text-[11px] font-bold text-slate-600"
                                    >
                                        Fillet Weld
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-2 text-center text-[11px] font-bold text-slate-600"
                                    >
                                        Fillet Weld
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-2 text-center text-[11px] font-bold text-slate-600"
                                    >
                                        Fillet Weld
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-2 text-center text-[11px] font-bold text-slate-600"
                                    >
                                        Butt Weld
                                    </th>
                                    <th
                                        rowSpan="3"
                                        className="border border-slate-200 px-4 py-2 text-center text-[11px] font-bold text-slate-600 w-24"
                                    >
                                        Actions
                                    </th>
                                </tr>
                                <tr className="bg-slate-50/50">
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-1 text-center text-[10px] font-medium text-slate-500 bg-white"
                                    >
                                        Ref 001
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-1 text-center text-[10px] font-medium text-slate-500 bg-white"
                                    >
                                        Ref 001
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-1 text-center text-[10px] font-medium text-slate-500 bg-white"
                                    >
                                        Ref 002
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-1 text-center text-[10px] font-medium text-slate-500 bg-white"
                                    >
                                        Ref 004
                                    </th>
                                </tr>
                                <tr className="bg-slate-50/50">
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-1 text-center text-[10px] font-bold text-slate-600 uppercase tracking-wider"
                                    >
                                        MIG
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-1 text-center text-[10px] font-bold text-slate-600 uppercase tracking-wider"
                                    >
                                        MIG
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-1 text-center text-[10px] font-bold text-slate-600 uppercase tracking-wider"
                                    >
                                        MIG
                                    </th>
                                    <th
                                        colSpan="2"
                                        className="border border-slate-200 px-4 py-1 text-center text-[10px] font-bold text-slate-600 uppercase tracking-wider"
                                    >
                                        TIG
                                    </th>
                                </tr>
                                <tr className="bg-slate-50">
                                    <th className="border border-slate-200"></th>
                                    <th className="border border-slate-200 px-2 py-1 text-center text-[9px] font-medium text-slate-400 uppercase">
                                        Prolongation
                                    </th>
                                    <th className="border border-slate-200 px-2 py-1 text-center text-[9px] font-medium text-slate-400 uppercase">
                                        Re-Test
                                    </th>
                                    <th className="border border-slate-200 px-2 py-1 text-center text-[9px] font-medium text-slate-400 uppercase">
                                        Prolongation
                                    </th>
                                    <th className="border border-slate-200 px-2 py-1 text-center text-[9px] font-medium text-slate-400 uppercase">
                                        Re-Test
                                    </th>
                                    <th className="border border-slate-200 px-2 py-1 text-center text-[9px] font-medium text-slate-400 uppercase">
                                        Prolongation
                                    </th>
                                    <th className="border border-slate-200 px-2 py-1 text-center text-[9px] font-medium text-slate-400 uppercase">
                                        Re-Test
                                    </th>
                                    <th className="border border-slate-200 px-2 py-1 text-center text-[9px] font-medium text-slate-400 uppercase">
                                        Prolongation
                                    </th>
                                    <th className="border border-slate-200 px-2 py-1 text-center text-[9px] font-medium text-slate-400 uppercase">
                                        Re-Test
                                    </th>
                                    <th className="border border-slate-200"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr
                                        key={emp.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="border border-slate-200 px-4 py-3 text-[13px] font-bold text-slate-700 bg-white">
                                            {emp.name}
                                        </td>
                                        <td
                                            className={`border border-slate-200 px-2 py-3 text-[11px] font-bold text-center ${getStatusClass(emp.ref001.status)}`}
                                        >
                                            {emp.ref001.prolongation}
                                        </td>
                                        <td
                                            className={`border border-slate-200 px-2 py-3 text-[11px] font-bold text-center ${getStatusClass(emp.ref001.status)}`}
                                        >
                                            {emp.ref001.reTest}
                                        </td>
                                        <td
                                            className={`border border-slate-200 px-2 py-3 text-[11px] font-bold text-center ${getStatusClass(emp.ref001_2.status)}`}
                                        >
                                            {emp.ref001_2.prolongation}
                                        </td>
                                        <td
                                            className={`border border-slate-200 px-2 py-3 text-[11px] font-bold text-center ${getStatusClass(emp.ref001_2.status)}`}
                                        >
                                            {emp.ref001_2.reTest}
                                        </td>
                                        <td
                                            className={`border border-slate-200 px-2 py-3 text-[11px] font-bold text-center ${getStatusClass(emp.ref002.status)}`}
                                        >
                                            {emp.ref002.prolongation}
                                        </td>
                                        <td
                                            className={`border border-slate-200 px-2 py-3 text-[11px] font-bold text-center ${getStatusClass(emp.ref002.status)}`}
                                        >
                                            {emp.ref002.reTest}
                                        </td>
                                        <td
                                            className={`border border-slate-200 px-2 py-3 text-[11px] font-bold text-center ${getStatusClass(emp.ref004.status)}`}
                                        >
                                            {emp.ref004.prolongation}
                                        </td>
                                        <td
                                            className={`border border-slate-200 px-2 py-3 text-[11px] font-bold text-center ${getStatusClass(emp.ref004.status)}`}
                                        >
                                            {emp.ref004.reTest}
                                        </td>
                                        <td className="border border-slate-200 px-2 py-3 bg-white">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="text-[#2185d5] hover:text-blue-600 transition-colors">
                                                    <Upload size={14} />
                                                </button>
                                                <button className="text-red-400 hover:text-red-500 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Add New Button */}
                    <div className="p-2 border-t border-slate-100 bg-slate-50/50">
                        <button className="w-full py-2.5 rounded-lg border border-slate-200 hover:bg-white text-slate-500 font-bold text-[13px] transition-all flex items-center justify-center gap-2">
                            <Plus size={16} />
                            Add New Employee
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
