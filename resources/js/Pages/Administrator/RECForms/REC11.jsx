import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Trash2,
    Plus,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Save,
} from "lucide-react";

export default function REC11() {
    const deliveryNotes = [
        {
            id: 1,
            jobNumber: "C14560",
            supplier: "A H Allen",
            customer: "ABC Construction Ltd",
            description: "Steel Beam - IPE 200 x 50m",
            qty: 50,
            deliveryDate: "01/15/2025",
            receivedBy: "John Smith",
            notes: "All items in good condition",
        },
        {
            id: 2,
            jobNumber: "C14569",
            supplier: "A H Allen",
            customer: "ABC Construction Ltd",
            description: "Steel Beam - IPE 200 x 50m",
            qty: 50,
            deliveryDate: "01/15/2025",
            receivedBy: "John Smith",
            notes: "All items in good condition",
        },
        {
            id: 3,
            jobNumber: "C14567",
            supplier: "A H Allen",
            customer: "ABC Construction Ltd",
            description: "Steel Beam - IPE 200 x 50m",
            qty: 50,
            deliveryDate: "01/15/2025",
            receivedBy: "John Smith",
            notes: "All items in good condition",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-11 - Delivery Note" />

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
                            REC-11 - Delivery Note
                        </h1>
                    </div>
                    <div className="flex gap-3">
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
                    <div className="text-center py-4 mb-6">
                        <h2 className="text-xl font-bold text-slate-700 uppercase tracking-wide">
                            DELIVERY NOTES OUT
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Job Number
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Supplier
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-1/4">
                                        Item Description
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Qty
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Delivery Date
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Received By
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Notes
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {deliveryNotes.map((note) => (
                                    <tr
                                        key={note.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700">
                                            {note.jobNumber}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700">
                                            {note.supplier}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700">
                                            {note.customer}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-600">
                                            {note.description}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700 text-center">
                                            {note.qty}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700">
                                            <div className="flex items-center gap-2">
                                                <Calendar
                                                    size={14}
                                                    className="text-slate-400"
                                                />
                                                {note.deliveryDate}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-[13px] font-medium text-slate-700">
                                            {note.receivedBy}
                                        </td>
                                        <td className="px-4 py-4 text-[13px] text-slate-500">
                                            {note.notes}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="text-blue-500 hover:text-blue-700 transition-colors bg-blue-50 p-1.5 rounded-lg">
                                                    <Download size={16} />
                                                </button>
                                                <button className="text-red-500 hover:text-red-700 transition-colors bg-red-50 p-1.5 rounded-lg">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {/* <div className="mt-6 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <div className="h-1.5 flex-1 bg-slate-100 rounded-full w-48 overflow-hidden">
                                <div className="h-full bg-slate-300 w-1/3 rounded-full"></div>
                            </div>
                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div> */}

                    {/* Add Button */}
                    <div className="mt-8">
                        <button className="w-full py-3 border border-slate-200 rounded-xl text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm shadow-sm bg-white">
                            <Plus size={18} />
                            Add New Delivery Note
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
