import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    AlertTriangle,
    Upload,
    Trash2,
    Calendar,
    Users,
    MoreHorizontal,
    Plus,
} from "lucide-react";

export default function REC05() {
    const alerts = {
        overdue: 2,
        dueSoon: 1,
        scheduled: 0,
    };

    const items = [
        {
            id: 1,
            type: "Calibration",
            description: "Weld set",
            serialNo: "WS001",
            location: "Main shop",
            notes: "Yearly Calibration",
            lastService: "9/1/2024",
            nextDue: "9/1/2025",
            status: "overdue",
        },
        {
            id: 2,
            type: "Calibration",
            description: "Weld set",
            serialNo: "WS002",
            location: "Main shop",
            notes: "Yearly Calibration",
            lastService: "9/1/2024",
            nextDue: "9/1/2025",
            status: "overdue",
        },
        {
            id: 3,
            type: "Calibration",
            description: "Weld set",
            serialNo: "WS001",
            location: "Main shop",
            notes: "Yearly Calibration",
            lastService: "9/1/2024",
            nextDue: "9/1/2025",
            status: "overdue",
        },
        {
            id: 4,
            type: "Calibration",
            description: "Weld set",
            serialNo: "WS001",
            location: "Main shop",
            notes: "Yearly Calibration",
            lastService: "9/1/2024",
            nextDue: "9/1/2025",
            status: "overdue",
        },
        {
            id: 5,
            type: "Service",
            description: "Overhead Crane",
            serialNo: "OC01",
            location: "Main Shop",
            notes: "LOLER inspection",
            lastService: "9/1/2024",
            nextDue: "9/1/2025",
            status: "overdue",
        },
        {
            id: 6,
            type: "Service",
            description: "Fork Truck",
            serialNo: "FT001",
            location: "Main Shop",
            notes: "LOLER inspection",
            lastService: "9/1/2024",
            nextDue: "9/1/2025",
            status: "overdue",
        },
        {
            id: 7,
            type: "Service",
            description: "Fork Truck",
            serialNo: "FT002",
            location: "Main Shop",
            notes: "LOLER inspection",
            lastService: "9/1/2024",
            nextDue: "9/1/2025",
            status: "overdue",
        },
        {
            id: 8,
            type: "Service",
            description: "Laser",
            serialNo: "No 1",
            location: "Main Shop",
            notes: "Service",
            lastService: "12/1/2024",
            nextDue: "12/1/2025",
            status: "dueSoon",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-05 - Maintenance & Calibration" />

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
                            REC-05: Maintenance & Calibration
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
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h3 className="text-slate-800 font-bold text-sm mb-1">
                                Maintenance/Calibration Due Alerts
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.overdue} Overdue
                                </span>
                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.dueSoon} Due Soon (30 days)
                                </span>
                                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.scheduled} Scheduled
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Service or Calibration
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Serial No.
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Notes / Actions Required
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Last Service / Calibration
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Next Due Date
                                    </th>
                                    <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-3">
                                            <div className="relative">
                                                <select
                                                    className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/10"
                                                    defaultValue={item.type}
                                                >
                                                    <option>Calibration</option>
                                                    <option>Service</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3">
                                            <input
                                                type="text"
                                                defaultValue={item.description}
                                                className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/10"
                                            />
                                        </td>
                                        <td className="px-6 py-3">
                                            <input
                                                type="text"
                                                defaultValue={item.serialNo}
                                                className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/10"
                                            />
                                        </td>
                                        <td className="px-6 py-3">
                                            <input
                                                type="text"
                                                defaultValue={item.location}
                                                className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/10"
                                            />
                                        </td>
                                        <td className="px-6 py-3">
                                            <input
                                                type="text"
                                                defaultValue={item.notes}
                                                className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/10"
                                            />
                                        </td>
                                        <td className="px-6 py-3">
                                            <input
                                                type="text"
                                                defaultValue={item.lastService}
                                                className="w-full bg-slate-50 border-none rounded-lg px-3 py-2 text-[13px] font-medium text-slate-700 shadow-sm focus:ring-2 focus:ring-blue-500/10"
                                            />
                                        </td>
                                        <td className="px-6 py-3">
                                            <span
                                                className={`text-[11px] font-bold px-2 py-1 rounded inline-block w-full text-center ${
                                                    item.status === "overdue"
                                                        ? "bg-red-50 text-red-600"
                                                        : item.status ===
                                                            "dueSoon"
                                                          ? "bg-amber-50 text-amber-600"
                                                          : "bg-emerald-50 text-emerald-600"
                                                }`}
                                            >
                                                {item.nextDue}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#2185d5] hover:bg-blue-50 transition-all">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Add New Button */}
                    <div className="p-4 border-t border-slate-100">
                        <button className="w-full py-3 rounded-xl border border-slate-200 border-dashed text-slate-500 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                            <Plus size={18} />
                            Add New Item
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
