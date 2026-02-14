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
    Check,
    X,
} from "lucide-react";

export default function REC18() {
    const agendaItems = [
        {
            id: 1,
            desc: "Review of Policies & Objectives",
            link: "QM",
            unique: "Yes",
            evidence: "System audit notes & policy updates",
            owner: "MD / All",
            status: "Open",
        },
        {
            id: 2,
            desc: "Compliance with Legal Requirements",
            link: "REC-16",
            unique: "Yes",
            evidence: "Compliance register update",
            owner: "MD / All",
            status: "Open",
        },
        {
            id: 3,
            desc: "Performance of External Providers",
            link: "REC-09",
            unique: "Yes",
            evidence: "Supplier review forms",
            owner: "MD / All",
            status: "Open",
        },
    ];

    const objectives = [
        {
            id: 1,
            obj: "Reduce Customer Complaints",
            ref: "OBJ-01",
            review: "Yes",
            evidence: "Complaint log analysis",
            status: "Open",
        },
        {
            id: 2,
            obj: "Reduce Non-Conforming Products",
            ref: "OBJ-02",
            review: "Yes",
            evidence: "NCR Report analysis",
            status: "Open",
        },
    ];

    const risks = [
        {
            id: 1,
            desc: "Failure of Critical Supply Chain",
            link: "RISK-01",
            unique: "Yes",
            riskOpp: "Risk",
            evidence: "Supplier audit schedule",
            owner: "MD / All",
            status: "Open",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-18 - Management Review & Risk Objectives Record" />

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
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                    {/* Header Actions */}
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                        <h1 className="text-xl font-bold text-slate-800">
                            REC-18 - Management Review & Risk Objectives Record
                        </h1>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50">
                                <Printer size={16} />
                                Print
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#2185d5] text-white rounded-lg text-xs font-bold shadow-sm hover:bg-blue-600">
                                <Plus size={16} />
                                Add New
                            </button>
                        </div>
                    </div>

                    {/* Renewal Period Settings - Similar to REC19 */}
                    <div className="mb-8 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Last Review Date
                                </label>
                                <input
                                    type="text"
                                    value="01/05/2023"
                                    readOnly
                                    className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Renewal Period
                                </label>
                                <input
                                    type="text"
                                    value="Yearly"
                                    readOnly
                                    className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Link
                                </label>
                                <input
                                    type="text"
                                    value="Meeting"
                                    readOnly
                                    className="w-full h-9 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Next Review Date
                                </label>
                                <input
                                    type="text"
                                    value="15/05/2024"
                                    readOnly
                                    className="w-full h-9 px-3 bg-[#2185d5] text-white font-bold border border-blue-400 rounded-lg text-sm text-center"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Associated Documents */}
                    <div className="mb-8">
                        <button className="w-full border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center gap-2 text-slate-400 hover:border-slate-300 hover:bg-slate-50 transition-all">
                            <Upload size={24} />
                            <span className="text-sm font-medium">
                                Upload Associated Documents
                            </span>
                        </button>
                    </div>

                    {/* Table 1: Management Review */}
                    <div className="mb-8 overflow-hidden rounded-xl border border-slate-200">
                        <div className="bg-[#2185d5] text-white px-4 py-2 font-bold text-sm uppercase flex items-center gap-2">
                            MANAGEMENT REVIEW - AGENDA ITEMS
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-12 text-center">
                                        No
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                        Description
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-20">
                                        Link
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-24">
                                        Unique?
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                        Evidence / Meeting Minutes
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                        Owner
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-24 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {agendaItems.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="p-3 text-xs text-center font-medium text-slate-500">
                                            {item.id}
                                        </td>
                                        <td className="p-3 text-xs font-medium text-slate-800">
                                            {item.desc}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.link}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.unique}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.evidence}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.owner}
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-2 bg-slate-50 border-t border-slate-200">
                            <button className="text-[11px] font-bold text-blue-500 flex items-center gap-1 hover:underline px-2">
                                <Plus size={12} /> Add Agenda Item
                            </button>
                        </div>
                    </div>

                    {/* Table 2: Objectives */}
                    <div className="mb-8 overflow-hidden rounded-xl border border-slate-200">
                        <div className="bg-emerald-500 text-white px-4 py-2 font-bold text-sm uppercase flex items-center gap-2">
                            OBJECTIVES
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-12 text-center">
                                        No
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                        Objectives
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-20">
                                        Ref
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-24">
                                        Review?
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                        Action / Evidence
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-24 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {objectives.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="p-3 text-xs text-center font-medium text-slate-500">
                                            {item.id}
                                        </td>
                                        <td className="p-3 text-xs font-medium text-slate-800">
                                            {item.obj}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.ref}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.review}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.evidence}
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-2 bg-slate-50 border-t border-slate-200">
                            <button className="text-[11px] font-bold text-emerald-500 flex items-center gap-1 hover:underline px-2">
                                <Plus size={12} /> Add Objective
                            </button>
                        </div>
                    </div>

                    {/* Table 3: Risks */}
                    <div className="mb-8 overflow-hidden rounded-xl border border-slate-200">
                        <div className="bg-red-500 text-white px-4 py-2 font-bold text-sm uppercase flex items-center gap-2">
                            RISKS
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-12 text-center">
                                        No
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                        Description
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-20">
                                        Link
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-24">
                                        Unique?
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                        Risk / Opportunity
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                        Evidence / Meeting Minutes
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                        Owner
                                    </th>
                                    <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-24 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {risks.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="p-3 text-xs text-center font-medium text-slate-500">
                                            {item.id}
                                        </td>
                                        <td className="p-3 text-xs font-medium text-slate-800">
                                            {item.desc}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.link}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.unique}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.riskOpp}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.evidence}
                                        </td>
                                        <td className="p-3 text-xs text-slate-600">
                                            {item.owner}
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="p-2 bg-slate-50 border-t border-slate-200">
                            <button className="text-[11px] font-bold text-red-500 flex items-center gap-1 hover:underline px-2">
                                <Plus size={12} /> Add Risk
                            </button>
                        </div>
                    </div>

                    {/* Warning Banner */}
                    <div className="mb-8 bg-amber-50 p-4 rounded-xl border border-amber-100 text-xs text-amber-800">
                        <span className="font-bold">
                            Date fit Requirements:
                        </span>{" "}
                        This record is review date warning active.
                        https://softvence.com/review-protection/week-validation.
                        100% strict. No check or expired will turn your
                        compliance status to...
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
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
                    <div className="mt-8 flex justify-end gap-3">
                        <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
                            <Save size={16} />
                            Save Draft
                        </button>
                        <button className="px-5 py-2.5 bg-[#2185d5] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center gap-2">
                            <Check size={16} />
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
