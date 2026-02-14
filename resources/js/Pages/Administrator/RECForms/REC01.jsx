import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Download, Save, Check } from "lucide-react";

export default function REC01() {
    const standards = [
        "EN 1090",
        "ISO 9001",
        "ISO 14001",
        "ISO 45001",
        "EN 15085",
        "NHSS 20",
    ];

    const [records, setRecords] = useState([
        {
            id: "REC-01",
            description: "Controlled Document Register",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-02",
            description: "Personnel Structure & Responsibilities",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-03",
            description: "Training & Competence Register",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-04",
            description: "Toolbox Talks & Meetings",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-05",
            description: "Maintenance & Calibration",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": false,
                "ISO 45001": false,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-06",
            description: "Inspection & Test Plan",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": false,
                "ISO 45001": false,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-07",
            description: "Welding Specifications and Qualifications",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": false,
                "ISO 45001": false,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-08",
            description: "Project Review & Job Card",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": false,
                "ISO 45001": false,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-09",
            description: "Approved Supplier",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": false,
                "ISO 45001": false,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-10",
            description: "Purchase Order",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": false,
                "ISO 45001": false,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-11",
            description: "Delivery Note",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": false,
                "ISO 45001": false,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-12",
            description: "Declaration of Performance (DoP)",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": false,
                "ISO 45001": false,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-13",
            description: "Non-Conformance Reg",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-14",
            description: "Customer Feedback",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-15",
            description: "Company Policies",
            standards: {
                "EN 1090": false,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-16",
            description: "Compliance Register",
            standards: {
                "EN 1090": false,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-17",
            description: "Internal Audit",
            standards: {
                "EN 1090": false,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-18",
            description: "Management Review & Risk Objectives Record",
            standards: {
                "EN 1090": false,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-19",
            description: "Aspects, Hazards, and Impacts Register",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-20",
            description: "Significant Procedures",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-21",
            description: "Emergency Readiness",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": false,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-22",
            description: "Monitor & Measure",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": false,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-23",
            description: "Incident Investigation Report",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-24",
            description: "Waste Handling",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": true,
                "ISO 45001": false,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-25",
            description: "Permit to Work",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": true,
                "ISO 45001": false,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-26",
            description: "Emergency Drill",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-27",
            description: "Monitoring",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": false,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-28",
            description: "Occup Health Surv Log",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": false,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-29",
            description: "Safety Equipment Checklist",
            standards: {
                "EN 1090": false,
                "ISO 9001": false,
                "ISO 14001": false,
                "ISO 45001": true,
                "EN 15085": false,
                "NHSS 20": false,
            },
            revisionDate: "9/1/2025",
        },
        {
            id: "REC-30",
            description: "Project Folders",
            standards: {
                "EN 1090": true,
                "ISO 9001": true,
                "ISO 14001": true,
                "ISO 45001": true,
                "EN 15085": true,
                "NHSS 20": true,
            },
            revisionDate: "9/1/2025",
        },
    ]);

    const toggleStandard = (recordId, standard) => {
        setRecords(
            records.map((record) => {
                if (record.id === recordId) {
                    return {
                        ...record,
                        standards: {
                            ...record.standards,
                            [standard]: !record.standards[standard],
                        },
                    };
                }
                return record;
            }),
        );
    };

    return (
        <AdministratorLayout>
            <Head title="REC-01 - Controlled Document Register" />

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
                            REC-01 - Controlled Document Register
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Master list of all REC forms with revision tracking
                            and compliance references.
                        </p>
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
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-100/50 border-b border-slate-200">
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-700 uppercase tracking-wider w-[10%]">
                                        Record No ▾
                                    </th>
                                    <th className="px-4 py-3 text-left text-[11px] font-bold text-slate-700 uppercase tracking-wider w-[35%]">
                                        Description ▾
                                    </th>
                                    <th className="px-1 py-1 text-center text-[10px] font-bold text-slate-700 uppercase tracking-wider w-[45%] border-l border-slate-200">
                                        <div className="border-b border-slate-200 pb-1 mb-1 bg-white/50">
                                            Used on Standard
                                        </div>
                                        <div className="grid grid-cols-6 gap-0">
                                            {standards.map((std) => (
                                                <div
                                                    key={std}
                                                    className="flex flex-col items-center justify-center px-1"
                                                >
                                                    <span className="text-[9px] leading-tight text-slate-600">
                                                        {std
                                                            .split(" ")
                                                            .map((part, i) => (
                                                                <div key={i}>
                                                                    {part}
                                                                </div>
                                                            ))}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </th>
                                    <th className="px-4 py-3 text-center text-[11px] font-bold text-slate-700 uppercase tracking-wider w-[10%] border-l border-slate-200 bg-blue-100/50">
                                        Revision
                                        <br />
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {records.map((record, index) => (
                                    <tr
                                        key={record.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-4 py-2 text-[12px] font-medium text-slate-700">
                                            {record.id}
                                        </td>
                                        <td className="px-4 py-2 text-[12px] font-medium text-slate-700">
                                            {record.description}
                                        </td>
                                        <td className="px-0 py-0 border-l border-slate-100">
                                            <div className="grid grid-cols-6 gap-0 h-full">
                                                {standards.map((standard) => (
                                                    <button
                                                        key={standard}
                                                        onClick={() =>
                                                            toggleStandard(
                                                                record.id,
                                                                standard,
                                                            )
                                                        }
                                                        className="flex items-center justify-center py-2 border-r border-slate-50 last:border-r-0 hover:bg-slate-100 transition-colors w-full h-full cursor-pointer"
                                                    >
                                                        {record.standards[
                                                            standard
                                                        ] ? (
                                                            <div className="w-4 h-4 bg-[#2185d5] rounded-[3px] flex items-center justify-center text-white">
                                                                <Check
                                                                    size={10}
                                                                    strokeWidth={
                                                                        4
                                                                    }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-4 h-4 border border-slate-200 rounded-[3px] bg-white group-hover:border-blue-300"></div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[12px] font-medium text-slate-600 text-center border-l border-slate-100 bg-blue-50/10">
                                            {record.revisionDate}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Placeholder */}
                    <div className="border-t border-slate-200 p-4 flex items-center justify-between text-xs text-slate-500">
                        <div>Showing 30 of 30 records</div>
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
                                disabled
                            >
                                Previous
                            </button>
                            <button
                                className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
                                disabled
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
