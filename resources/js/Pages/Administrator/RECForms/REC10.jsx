import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Download, Save, Plus, Trash2 } from "lucide-react";

export default function REC10() {
    const purchaseOrder = {
        company: "Just Simple Quality",
        supplier: "A H Allen",
        delAddress: "Unit 1, Example St, London",
        poNumber: "PO-2025-001",
        jobNumber: "JOB-123",
        date: "12/15/2025",
        items: [
            {
                id: 1,
                description: "5mm drill",
                unit: "Ea",
                qty: 10,
                costEach: "1.50",
                totalCost: "15.00",
            },
        ],
        notes: "Please deliver by Friday.",
        orderedBy: "Rifat Ahamed",
    };

    return (
        <AdministratorLayout>
            <Head title="REC-10 - Purchase Order" />

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
                            REC-10 - Purchase Order
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
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-8 max-w-5xl mx-auto">
                    {/* Form Header */}
                    <div className="bg-slate-50 text-center py-3 font-bold text-slate-800 border-x border-t border-slate-300 text-sm uppercase tracking-wide">
                        PURCHASE ORDER
                    </div>

                    {/* Company Info Grid */}
                    <div className="flex flex-col md:flex-row border border-slate-300">
                        {/* Left Column */}
                        <div className="flex-1 w-full md:w-1/2 md:border-r border-b md:border-b-0 border-slate-300 flex flex-col">
                            <div className="flex border-b border-slate-300">
                                <div className="w-32 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center text-slate-600">
                                    Company
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800">
                                    {purchaseOrder.company}
                                </div>
                            </div>
                            <div className="flex border-b border-slate-300">
                                <div className="w-32 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center text-slate-600">
                                    Supplier
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800">
                                    {purchaseOrder.supplier}
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="w-32 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center text-slate-600">
                                    Del Address
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800">
                                    {purchaseOrder.delAddress}
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1 w-full md:w-1/2 flex flex-col">
                            <div className="flex border-b border-slate-300">
                                <div className="w-40 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center justify-end text-slate-600">
                                    Purchase Order Number
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800">
                                    {purchaseOrder.poNumber}
                                </div>
                            </div>
                            <div className="flex border-b border-slate-300">
                                <div className="w-40 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center justify-end text-slate-600">
                                    Job Number
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800">
                                    {purchaseOrder.jobNumber}
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="w-40 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center justify-end text-slate-600">
                                    Date
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800">
                                    {purchaseOrder.date}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="border-x border-b border-slate-300 mt-[-1px]">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-300 bg-slate-50">
                                    <th className="w-16 p-3 text-xs font-bold text-left border-r border-slate-300 text-slate-600">
                                        Item
                                    </th>
                                    <th className="p-3 text-xs font-bold text-left border-r border-slate-300 text-slate-600">
                                        Description
                                    </th>
                                    <th className="w-20 p-3 text-xs font-bold text-center border-r border-slate-300 text-slate-600">
                                        Unit
                                    </th>
                                    <th className="w-20 p-3 text-xs font-bold text-center border-r border-slate-300 text-slate-600">
                                        Qty
                                    </th>
                                    <th className="w-28 p-3 text-xs font-bold text-right border-r border-slate-300 text-slate-600">
                                        Cost Each
                                    </th>
                                    <th className="w-28 p-3 text-xs font-bold text-right text-slate-600">
                                        Total Cost
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...purchaseOrder.items, ...Array(15)].map(
                                    (item, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-300 last:border-0 h-10 hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="p-3 text-xs border-r border-slate-300 text-slate-500">
                                                {item?.id || ""}
                                            </td>
                                            <td className="p-3 text-xs border-r border-slate-300 font-medium text-slate-800">
                                                {item?.description}
                                            </td>
                                            <td className="p-3 text-xs border-r border-slate-300 text-center text-slate-600">
                                                {item?.unit}
                                            </td>
                                            <td className="p-3 text-xs border-r border-slate-300 text-center text-slate-600">
                                                {item?.qty}
                                            </td>
                                            <td className="p-3 text-xs border-r border-slate-300 text-right text-slate-600">
                                                {item
                                                    ? `£${item.costEach}`
                                                    : ""}
                                            </td>
                                            <td className="p-3 text-xs text-right font-medium text-slate-800">
                                                {item
                                                    ? `£${item.totalCost}`
                                                    : ""}
                                            </td>
                                        </tr>
                                    ),
                                )}
                                {/* Totals */}
                                <tr className="border-t border-slate-300">
                                    <td
                                        colSpan="4"
                                        rowSpan="3"
                                        className="border-r border-slate-300"
                                    ></td>
                                    <td className="p-3 text-xs font-bold text-right border-r border-slate-300 border-b border-slate-300 bg-slate-50 text-slate-600">
                                        Total
                                    </td>
                                    <td className="p-3 text-xs text-right border-b border-slate-300 font-bold text-slate-800">
                                        £15.00
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 text-xs font-bold text-right border-r border-slate-300 border-b border-slate-300 bg-slate-50 text-slate-600">
                                        VAT @ 20%
                                    </td>
                                    <td className="p-3 text-xs text-right border-b border-slate-300 font-bold text-slate-800">
                                        £3.00
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 text-xs font-bold text-right border-r border-slate-300 bg-slate-50 text-slate-600">
                                        Total with VAT
                                    </td>
                                    <td className="p-3 text-xs font-bold text-right text-slate-800">
                                        £18.00
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="border-x border-b border-slate-300">
                        <div className="h-32 p-4 border-b border-slate-300">
                            <h4 className="text-xs font-bold mb-2 text-slate-700">
                                Notes:
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {purchaseOrder.notes}
                            </p>
                        </div>
                        <div className="flex">
                            <div className="w-32 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center text-slate-600">
                                Ordered by:
                            </div>
                            <div className="p-3 text-xs flex-1 font-medium text-slate-800">
                                {purchaseOrder.orderedBy}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
