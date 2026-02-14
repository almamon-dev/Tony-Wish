import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    Trash2,
    Plus,
    Calendar,
} from "lucide-react";

export default function REC13() {
    const ncrs = [
        {
            id: 1,
            jobNo: "C14568",
            openedDate: "01/15/2025",
            nrpType: "Supplier",
            issueSummary: "Goods damaged by supplier",
            rootCause: "Damage during transport",
            actionTaken:
                "Goods repaired internally; supplier notified via email",
            actionPerson: "D. Wilson",
            status: "Closed",
            closed: true,
        },
        {
            id: 2,
            jobNo: "C14568",
            openedDate: "01/16/2025",
            nrpType: "Supplier",
            issueSummary: "Goods damaged by supplier",
            rootCause: "Damage during transport",
            actionTaken:
                "Goods repaired internally; supplier notified via email",
            actionPerson: "D. Wilson",
            status: "Closed",
            closed: true,
        },
        {
            id: 3,
            jobNo: "C14568",
            openedDate: "01/15/2025",
            nrpType: "Supplier",
            issueSummary: "Goods damaged by supplier",
            rootCause: "Damage during transport",
            actionTaken:
                "Goods repaired internally; supplier notified via email",
            actionPerson: "D. Wilson",
            status: "Closed",
            closed: true,
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-13 - Non Conformance Register" />

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
                            REC-13 - Non Conformance Register
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
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
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-24">
                                        Job No
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Opened Date
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-24">
                                        NRP Type
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Issue Summary
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Root Cause
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Action Taken
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-24">
                                        Action
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Target Close Date
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {ncrs.map((ncr) => (
                                    <tr
                                        key={ncr.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-[13px] font-bold text-slate-700 text-center">
                                            {ncr.jobNo}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700">
                                            <div className="flex items-center gap-2">
                                                {ncr.openedDate}
                                                <Calendar
                                                    size={14}
                                                    className="text-slate-400"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700">
                                            {ncr.nrpType}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-slate-600">
                                            {ncr.issueSummary}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-slate-600">
                                            {ncr.rootCause}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-slate-600">
                                            {ncr.actionTaken}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700">
                                            {ncr.actionPerson}
                                        </td>
                                        <td className="px-4 py-4 text-[13px]">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-slate-700">
                                                    {ncr.status}
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                    <input
                                                        type="checkbox"
                                                        checked={ncr.closed}
                                                        readOnly
                                                        className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 h-3.5 w-3.5"
                                                    />
                                                    <span className="text-xs text-slate-500">
                                                        Mark Closed
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="text-blue-500 hover:text-blue-700 transition-colors">
                                                    <Download size={16} />
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Button */}
                    <div className="mt-8">
                        <button className="w-full py-3 border border-slate-200 rounded-xl text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm shadow-sm bg-white">
                            <Plus size={18} />
                            Add New NCR
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
