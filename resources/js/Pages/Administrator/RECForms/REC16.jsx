import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Download,
    Trash2,
    Plus,
    Save,
    Pencil,
    Paperclip,
    Eye,
} from "lucide-react";

export default function REC16() {
    const alerts = {
        expired: 3,
        expiringSoon: 4,
        valid: 1,
    };

    const legalRequirements = [
        {
            id: 1,
            regulation: "EN 1090 FPC",
            department: "Fabrication & Workshop",
            status: "Compliant",
            evidence:
                "Waste transfer notes, hazardous waste consignment records",
            responsiblePerson: "Operations Manager",
            notes: "Notes / Actions",
            frequency: "Yearly",
            nextReview: "09/15/2025",
            overdueDays: 58,
            document: "EN1090-Certificate.pdf",
        },
        {
            id: 2,
            regulation: "EN 1090 FPC",
            department: "Fabrication & Workshop",
            status: "Compliant",
            evidence:
                "Waste transfer notes, hazardous waste consignment records",
            responsiblePerson: "Operations Manager",
            notes: "Notes / Actions",
            frequency: "Yearly",
            nextReview: "09/15/2025",
            overdueDays: 58,
            document: "EN1090-Certificate.pdf",
        },
        {
            id: 3,
            regulation: "EN 1090 FPC",
            department: "Fabrication & Workshop",
            status: "Compliant",
            evidence:
                "Waste transfer notes, hazardous waste consignment records",
            responsiblePerson: "Operations Manager",
            notes: "Notes / Actions",
            frequency: "Yearly",
            nextReview: "09/15/2025",
            overdueDays: 58,
            document: "EN1090-Certificate.pdf",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-16 - Legal Compliance Register" />

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
                            REC-16 - Legal Compliance Register
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

                {/* Alerts Section */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                        <AlertTriangle size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-slate-800 font-bold text-sm mb-1">
                            Legal Compliance Register Due Alerts
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                                {alerts.expired} Expired
                            </span>
                            <span className="px-2 py-0.5 bg-amber-400 text-white text-[10px] font-bold rounded-full">
                                {alerts.expiringSoon} Expiring Soon
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                                {alerts.valid} Valid
                            </span>
                        </div>
                    </div>
                </div>

                {/* Warning Banner */}
                <div className="bg-white border-l-4 border-amber-400 p-4 shadow-sm rounded-r-xl flex items-start gap-3">
                    <AlertTriangle
                        size={18}
                        className="text-amber-500 shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-slate-600">
                        <span className="font-bold text-amber-500">
                            Expiry Date Warning System:
                        </span>{" "}
                        This register includes automatic expiry date warnings.
                        Review dates are color-coded based on urgency. Upload
                        and save all associated compliance documents for audit
                        trail.
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1200px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Legal Requirement / Regulation
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Applicable Department / Process
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Current Compliance Status
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-48">
                                        Evidence / Records Held
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Responsible Person
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Notes / Actions
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-24">
                                        Review Frequency
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-36">
                                        Next Review (Color Coded)
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Documents
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {legalRequirements.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700 align-top">
                                            {item.regulation}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-slate-600 align-top">
                                            {item.department}
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            <div className="flex items-center gap-1 text-[13px] font-medium text-slate-700">
                                                {item.status}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-slate-600 align-top">
                                            {item.evidence}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-slate-600 align-top">
                                            {item.responsiblePerson}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-slate-600 align-top">
                                            {item.notes}
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            <div className="flex items-center gap-1 text-[13px] text-slate-600">
                                                {item.frequency}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            <div className="flex items-start gap-2">
                                                <AlertTriangle
                                                    size={16}
                                                    className="text-amber-500 mt-0.5"
                                                    fill="currentColor"
                                                />
                                                <div>
                                                    <div className="text-[13px] font-bold text-slate-700">
                                                        {item.nextReview}
                                                    </div>
                                                    <div className="text-[11px] font-medium text-amber-600">
                                                        {item.overdueDays} days
                                                        overdue
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 align-top">
                                            <a
                                                href="#"
                                                className="flex items-center gap-1 text-[12px] font-medium text-blue-500 hover:text-blue-700 hover:underline"
                                            >
                                                <Paperclip size={14} />
                                                {item.document}
                                            </a>
                                        </td>
                                        <td className="px-4 py-4 text-center align-top">
                                            <button className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Button */}
                    <div className="mt-6">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-lg hover:bg-blue-600 transition-all text-sm font-bold shadow-sm">
                            <Plus size={18} />
                            Add New Row
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-sm font-bold text-slate-800 mb-4">
                        Expiry Date Warning System - Review Date Color Coding:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-amber-500 shrink-0 mt-0.5"
                                fill="currentColor"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Overdue- Immedicate
                                </span>{" "}
                                <br /> action required
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-red-500 shrink-0 mt-0.5"
                                fill="currentColor"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Critical Work
                                </span>
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-amber-400 shrink-0 mt-0.5"
                                fill="currentColor"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Warning- within 1
                                </span>{" "}
                                <br /> month
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-yellow-400 shrink-0 mt-0.5"
                                fill="currentColor"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Caution within 3
                                </span>{" "}
                                <br /> months
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-emerald-500 shrink-0 mt-0.5"
                                fill="currentColor"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Good- More than
                                </span>{" "}
                                <br /> 3 months
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
