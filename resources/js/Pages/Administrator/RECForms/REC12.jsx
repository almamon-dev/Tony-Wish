import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Download, Save, Plus } from "lucide-react";

export default function REC12() {
    const dopData = {
        productLabel: "UKCA Product Label Product",
        standard: "EN 1090-1:2009 + A1:2011 EXC 2",
        rows: [
            {
                field: "UKCA Mark",
                info: "[Affix UKCA logo as per marking regulations]",
            },
            {
                field: "Manufacturer",
                info: "Just Simple Quality Ltd\n[Insert works address]\nTel: [Insert]\n[Insert]",
            },
            {
                field: "Product Identification",
                info: "JSQ-SB-BEAM-UC203-133-25-5355J2",
            },
            {
                field: "Intended Use",
                info: "Structural steel members for load-bearing use in construction works — EN 1090-1, EN 1090-2 EXC 2",
            },
            {
                field: "Declared Performance",
                info: "• Tolerances: Class 1 to EN 1090-2\n• Steel Grade: S355J2 (fully weldable)\n• Fracture toughness: 27J at -20°C\n• Corrosion resistance: C3 (Medium)\n• Dimensional tolerances: Class 1",
            },
            {
                field: "Notified Body",
                info: "No. [XYXX] — [Name of UK Approved Body]\nFPC Certificate: [XXXX/XX]",
            },
            {
                field: "DoP Reference",
                info: "[Enter matching REC-12 DoP number]",
            },
            {
                field: "Date of UKCA Marking",
                info: "01/11/2025",
                isDate: true,
            },
        ],
    };

    return (
        <AdministratorLayout>
            <Head title="REC-12 - Declaration of Performance (DoP)" />

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
                            REC-12 - Declaration of Performance (DoP)
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Download size={18} />
                            Export PDF
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-xl hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-blue-500/20">
                            <Save size={18} />
                            Save All Previous
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8 max-w-4xl mx-auto">
                    {/* Top Inputs */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 text-center">
                        <span className="font-bold text-slate-700 block mb-2 text-sm">
                            UKCA Product Label Product
                        </span>
                        <div className="font-bold text-lg text-slate-800 uppercase tracking-wide">
                            {dopData.productLabel}
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-6 flex justify-center items-center gap-2">
                        <span className="font-bold text-slate-600 text-sm">
                            Standard:
                        </span>
                        <span className="font-bold text-slate-800 bg-slate-200 px-3 py-1 rounded text-sm">
                            {dopData.standard}
                        </span>
                    </div>

                    {/* DoP Table */}
                    <div className="border border-slate-300 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-100 border-b border-slate-300">
                                    <th className="w-1/3 p-3 text-sm font-bold text-slate-700 border-r border-slate-300 text-center">
                                        Field
                                    </th>
                                    <th className="w-2/3 p-3 text-sm font-bold text-slate-700 text-center">
                                        Information
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-300">
                                {dopData.rows.map((row, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            {row.field}
                                        </td>
                                        <td className="p-4 text-sm text-slate-600 whitespace-pre-line align-top">
                                            {row.isDate ? (
                                                <div className="flex items-center gap-2">
                                                    {row.info}
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-slate-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                                    />
                                                </div>
                                            ) : (
                                                row.info
                                            )}
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
                            Add New DoP Document
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
