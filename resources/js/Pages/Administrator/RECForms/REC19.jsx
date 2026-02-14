import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Trash2,
    Plus,
    Save,
    Upload,
    Eye,
    AlertTriangle,
    Calendar,
    Printer,
    Share2,
    MoreHorizontal,
} from "lucide-react";

export default function REC19() {
    const [aspects, setAspects] = useState([
        {
            id: 1,
            aspect: "Chemical Storage",
            hazard: "Potential leaks/spills",
            impact: "Soil/Groundwater contam...",
            riskRating: "High",
            controlMeasures: "Bunded storage, spill kits",
            averageRisk: "Medium",
            date: "10/12/2024",
            nextReview: "10/12/2026",
            status: "valid", // for color coding
        },
        {
            id: 2,
            aspect: "Welding Operations",
            hazard: "Fumes, UV radiation",
            impact: "Air pollution, Health...",
            riskRating: "High",
            controlMeasures: "Extraction systems, PPE",
            averageRisk: "Low",
            date: "10/12/2024",
            nextReview: "10/12/2025",
            status: "valid",
        },
        {
            id: 3,
            aspect: "Waste Cutting",
            hazard: "Noise pollution",
            impact: "Noise pollution",
            riskRating: "Medium",
            controlMeasures: "Ear protection, electric...",
            averageRisk: "Low",
            date: "10/22/2024",
            nextReview: "10/12/2025",
            status: "valid",
        },
        {
            id: 4,
            aspect: "Waste Disposal",
            hazard: "Incorrect waste stream",
            impact: "Landfill pollution",
            riskRating: "Medium",
            controlMeasures: "Segregation, licensed disposal",
            averageRisk: "Low",
            date: "10/25/2024",
            nextReview: "10/17/2026",
            status: "valid",
        },
        {
            id: 5,
            aspect: "Energy Consumption",
            hazard: "High electricity use",
            impact: "Carbon emissions",
            riskRating: "Medium",
            controlMeasures: "LED lighting, switch off policy",
            averageRisk: "Medium",
            date: "07/12/2024",
            nextReview: "10/17/2026",
            status: "valid",
        },
    ]);

    return (
        <AdministratorLayout>
            <Head title="REC-19 - Aspects, Hazards, and Impacts Register" />

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
                        {/* Breadcrumbs or search can go here if needed as seen in screenshot */}
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                    {/* Form Header Actions */}
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                        <h1 className="text-xl font-bold text-slate-800">
                            REC-19 - Aspects, Hazards, and Impacts Register
                        </h1>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50">
                                <Printer size={16} />
                                Print
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50">
                                <Share2 size={16} />
                                Share
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2185d5] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-600">
                                <Plus size={16} />
                                Add New
                            </button>
                        </div>
                    </div>

                    {/* Renewal Period Settings */}
                    <div className="mb-8">
                        <h2 className="text-sm font-bold text-slate-700 mb-3 border-b border-slate-100 pb-1">
                            Renewal Period Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Last Review Date
                                </label>
                                <input
                                    type="text"
                                    value="01/05/2023"
                                    readOnly
                                    className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Renewal Period
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value="Yearly"
                                        readOnly
                                        className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
                                    />
                                    <div className="absolute right-0 top-0 h-full px-2 flex items-center bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-r-lg border-l border-slate-200">
                                        Valid
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Last Review Date
                                </label>
                                <input
                                    type="text"
                                    value="15/05/2024"
                                    readOnly
                                    className="w-full h-9 px-3 bg-[#2185d5] border border-blue-400 rounded-lg text-sm font-bold text-white text-center"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Next Review Date
                                </label>
                                <div className="text-[10px] text-slate-400 mb-1">
                                    Approx. 2 Weeks From new Cycle Start
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Associated Documents */}
                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-3 border-b border-slate-100 pb-1">
                            <h2 className="text-sm font-bold text-slate-700">
                                Associated Documents
                            </h2>
                            <button className="text-blue-500 text-xs font-bold flex items-center gap-1 hover:underline">
                                <Upload size={14} />
                                Upload Documents
                            </button>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-center text-sm text-slate-400 flex flex-col items-center gap-2 border-dashed">
                            <Upload size={24} className="text-slate-300" />
                            <span>No documents associated yet</span>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full min-w-[1000px] border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-y border-slate-200">
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200">
                                        Aspect
                                    </th>
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200">
                                        Hazard
                                    </th>
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200">
                                        Impact
                                    </th>
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-24">
                                        Risk Rating <br /> H/M/L
                                    </th>
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200">
                                        Control Measures
                                    </th>
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-24">
                                        Average Risk <br /> H/M/L
                                    </th>
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-24">
                                        Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-24">
                                        Next Review
                                    </th>
                                    <th className="px-4 py-3 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-24">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {aspects.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-[12px] font-medium text-slate-700 border-r border-slate-100">
                                            {item.aspect}
                                        </td>
                                        <td className="px-4 py-3 text-[12px] text-slate-600 border-r border-slate-100">
                                            {item.hazard}
                                        </td>
                                        <td className="px-4 py-3 text-[12px] text-slate-600 border-r border-slate-100">
                                            {item.impact}
                                        </td>
                                        <td className="px-4 py-3 text-[12px] font-bold text-slate-700 border-r border-slate-100 uppercase">
                                            {item.riskRating}
                                        </td>
                                        <td className="px-4 py-3 text-[12px] text-slate-600 border-r border-slate-100">
                                            {item.controlMeasures}
                                        </td>
                                        <td className="px-4 py-3 text-[12px] font-bold text-slate-700 border-r border-slate-100 uppercase">
                                            {item.averageRisk}
                                        </td>
                                        <td className="px-4 py-3 text-[12px] text-slate-600 border-r border-slate-100">
                                            {item.date}
                                        </td>
                                        <td className="px-4 py-3 text-[12px] text-slate-600 border-r border-slate-100">
                                            {item.nextReview}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button className="text-blue-500 hover:text-blue-700">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="text-slate-500 hover:text-slate-700">
                                                    <Download size={14} />
                                                </button>
                                                <button className="text-red-400 hover:text-red-600">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button className="flex items-center gap-2 text-[#2185d5] font-bold text-xs hover:underline mb-8">
                        <Plus size={14} />
                        Add New Row
                    </button>

                    {/* Alerts Footer */}
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-slate-800 font-bold text-sm mb-1">
                                Aspects, Hazards and Impacts Register Due Alerts
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                                    0 Expired
                                </span>
                                <span className="px-2 py-0.5 bg-amber-400 text-white text-[10px] font-bold rounded-full">
                                    2 Expiring Soon
                                </span>
                                <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                                    1 Valid
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-amber-50/50 rounded-lg p-3 text-[11px] text-amber-800 border-l-4 border-amber-400">
                        <strong>Warning System:</strong> This record checks
                        expiry data warning System. Review dates are color-coded
                        based on urgency. Upload and save all relevant documents
                        for audit trail.
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8 mt-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 mb-4">
                                Signature / Verified
                            </h3>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        Verified By
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        With Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-end gap-2">
                            <div className="flex-1">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800 font-medium"
                                    value="Tony Doe"
                                    readOnly
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Signed
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-800 font-medium"
                                    value="Signed"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
                            Save Draft
                        </button>
                        <button className="px-4 py-2 bg-[#2185d5] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
