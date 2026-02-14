import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Download,
    Trash2,
    Plus,
    ChevronLeft,
    ChevronRight,
    Save,
} from "lucide-react";

export default function REC09() {
    const alerts = {
        expired: 3,
        expiringSoon: 4,
        valid: 1,
    };

    const suppliers = [
        {
            id: 1,
            company: "A H Allen",
            service: "Steel stock holder",
            en1090: "2",
            iso9001: true,
            iso14001: true,
            iso45001: true,
            expiryDate: "12/15/2025",
            comments: "Comments",
        },
        {
            id: 2,
            company: "Upton Steel",
            service: "Steel stock holder",
            en1090: "2",
            iso9001: true,
            iso14001: true,
            iso45001: true,
            expiryDate: "12/15/2025",
            comments: "2 loads return dust",
        },
        {
            id: 3,
            company: "Aalco",
            service: "Steel stock holder",
            en1090: "2",
            iso9001: false,
            iso14001: true,
            iso45001: true,
            expiryDate: "12/15/2025",
            comments: "Comments",
        },
        {
            id: 4,
            company: "Thermacut",
            service: "Powder coat paint",
            en1090: "No",
            iso9001: true,
            iso14001: false,
            iso45001: false,
            expiryDate: "12/15/2025",
            comments: "Comments",
        },
        {
            id: 5,
            company: "Punities",
            service: "Fasteners",
            en1090: "No",
            iso9001: false,
            iso14001: false,
            iso45001: false,
            expiryDate: "12/15/2025",
            comments: "Comments",
        },
        {
            id: 6,
            company: "Charles Watts",
            service: "Welding supplies",
            en1090: "No",
            iso9001: false,
            iso14001: false,
            iso45001: false,
            expiryDate: "12/15/2025",
            comments: "Comments",
        },
        {
            id: 7,
            company: "Jotun",
            service: "Powder coat paint",
            en1090: "No",
            iso9001: true,
            iso14001: false,
            iso45001: false,
            expiryDate: "12/15/2025",
            comments: "Comments",
        },
        {
            id: 8,
            company: "Punities",
            service: "Fasteners",
            en1090: "No",
            iso9001: false,
            iso14001: false,
            iso45001: false,
            expiryDate: "12/15/2025",
            comments: "Comments",
        },
    ];

    const StatusBadge = ({ status }) => {
        return status ? (
            <div className="flex items-center gap-1 text-emerald-500 font-medium">
                <CheckCircle2 size={16} />
                <span>Yes</span>
            </div>
        ) : (
            <div className="flex items-center gap-1 text-red-500 font-medium">
                <XCircle size={16} />
                <span>NO</span>
            </div>
        );
    };

    return (
        <AdministratorLayout>
            <Head title="REC-09 - Approved Supplier" />

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
                            REC-09 - Approved Supplier
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-[#2185d5] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-600 transition-colors">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Alerts Section */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                    <h3 className="text-slate-700 font-bold mb-3">
                        Supplier Approval Alerts
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            {alerts.expired} Expired
                        </span>
                        <span className="px-3 py-1 bg-amber-400 text-white text-xs font-bold rounded-full">
                            {alerts.expiringSoon} Expiring Soon
                        </span>
                        <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                            {alerts.valid} Valid
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Service Description
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        EN1090 EX Class ▾
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        ISO9001
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        ISO14001
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        ISO45001
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Expiry Date
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Comments
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {suppliers.map((supplier) => (
                                    <tr
                                        key={supplier.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="bg-slate-50 px-3 py-2 rounded text-[13px] font-medium text-slate-700">
                                                {supplier.company}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="bg-slate-50 px-3 py-2 rounded text-[13px] font-medium text-slate-700">
                                                {supplier.service}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-600">
                                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded min-w-[60px]">
                                                {supplier.en1090}
                                                <ChevronLeft className="rotate-[-90deg] h-3 w-3 text-slate-400" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[13px]">
                                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded min-w-[80px]">
                                                <StatusBadge
                                                    status={supplier.iso9001}
                                                />
                                                <ChevronLeft className="rotate-[-90deg] h-3 w-3 text-slate-400" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[13px]">
                                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded min-w-[80px]">
                                                <StatusBadge
                                                    status={supplier.iso14001}
                                                />
                                                <ChevronLeft className="rotate-[-90deg] h-3 w-3 text-slate-400" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[13px]">
                                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded min-w-[80px]">
                                                <StatusBadge
                                                    status={supplier.iso45001}
                                                />
                                                <ChevronLeft className="rotate-[-90deg] h-3 w-3 text-slate-400" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="bg-slate-50 px-3 py-2 rounded text-[13px] font-medium text-slate-700">
                                                {supplier.expiryDate}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="bg-slate-50 px-3 py-2 rounded text-[13px] font-medium text-slate-500">
                                                {supplier.comments}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
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
                        <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                            <Plus size={20} />
                            Add New Supplier
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
