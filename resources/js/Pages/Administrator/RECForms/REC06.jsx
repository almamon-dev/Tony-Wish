import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    Trash2,
    MoreHorizontal,
    Plus,
    Eye,
} from "lucide-react";

export default function REC06() {
    const items = [
        {
            id: 1,
            activity:
                "Contract Review — Completion of product technical review and establishment of component specification",
            controllingDoc: "REC-08 Project Review & Job Card",
            acceptanceCriteria:
                "Client specification, EN 1090-2, execution class",
            verifyingDoc: "Signed REC-08",
            internal: "Inspection Points Internal",
            external: "R",
        },
        {
            id: 2,
            activity:
                "Contract Review — Completion of product technical review and establishment of component specification",
            controllingDoc: "REC-09 Project Review & Job Card",
            acceptanceCriteria:
                "Client specification, EN 1090-2, execution class",
            verifyingDoc: "Signed REC-08",
            internal: "Inspection Points Internal",
            external: "R",
        },
        {
            id: 3,
            activity:
                "Contract Review — Completion of product technical review and establishment of component specification",
            controllingDoc: "REC-08 Project Review & Job Card",
            acceptanceCriteria:
                "Client specification, EN 1090-2, execution class",
            verifyingDoc: "Signed REC-08",
            internal: "Inspection Points Internal",
            external: "R",
        },
        {
            id: 4,
            activity:
                "Contract Review — Completion of product technical review and establishment of component specification",
            controllingDoc: "REC-08 Project Review & Job Card",
            acceptanceCriteria:
                "Client specification, EN 1090-2, execution class",
            verifyingDoc: "Signed REC-08",
            internal: "Inspection Points Internal",
            external: "R",
        },
        {
            id: 5,
            activity:
                "Contract Review — Completion of product technical review and establishment of component specification",
            controllingDoc: "REC-08 Project Review & Job Card",
            acceptanceCriteria:
                "Client specification, EN 1090-2, execution class",
            verifyingDoc: "Signed REC-08",
            internal: "Inspection Points Internal",
            external: "R",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-06 - Inspection & Test Plan (ITP)" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("administrator.rec-forms.index")}
                            className="bg-white p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:text-[#2185d5] hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                        <h1 className="text-xl font-bold text-slate-800">
                            REC-06 Inspection & Test Plan (ITP)
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#2185d5] rounded-xl hover:bg-blue-50 transition-all text-sm font-bold shadow-sm">
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

                {/* Main Content */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-dashed border-slate-200">
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[20%]">
                                        Operation Activity
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[15%]">
                                        Controlling Document(s)
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[15%]">
                                        Acceptance Criteria
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[10%]">
                                        Verifying Document
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[15%]">
                                        Inspection Points Internal
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[15%]">
                                        Inspection Points External
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[5%]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="space-y-4">
                                {items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="group transition-colors"
                                    >
                                        <td className="px-2 py-3 align-top">
                                            <div className="bg-slate-50 rounded-xl p-4 text-[13px] font-medium text-slate-700 min-h-[120px]">
                                                {item.activity}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 align-top">
                                            <div className="bg-slate-50 rounded-xl p-4 text-[13px] font-medium text-slate-700 min-h-[120px] flex items-center">
                                                {item.controllingDoc}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 align-top">
                                            <div className="bg-slate-50 rounded-xl p-4 text-[13px] font-medium text-slate-700 min-h-[120px] flex items-center">
                                                {item.acceptanceCriteria}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 align-top">
                                            <div className="bg-slate-50 rounded-xl p-4 text-[13px] font-medium text-slate-700 min-h-[120px] flex items-center">
                                                {item.verifyingDoc}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 align-top">
                                            <div className="bg-slate-50 rounded-xl p-4 text-[13px] font-medium text-slate-700 min-h-[120px] flex items-center">
                                                {item.internal}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 align-top">
                                            <div className="bg-slate-50 rounded-xl p-4 text-[13px] font-medium text-slate-700 min-h-[120px] flex items-center justify-center">
                                                {item.external}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 align-top">
                                            <div className="flex items-center justify-center gap-2 h-[120px]">
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#2185d5] hover:bg-blue-50 transition-all">
                                                    <Upload size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Add New Button */}
                    <div className="mt-4">
                        <button className="w-full py-4 rounded-2xl border border-slate-200 border-dashed text-slate-500 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                            <Plus size={18} />
                            Add New Instruction
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
