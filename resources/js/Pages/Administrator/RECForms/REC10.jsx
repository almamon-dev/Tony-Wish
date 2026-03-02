import React, { useEffect, useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Download, Save, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function REC10({ initialOrder = null }) {
    const { data, setData, post, processing } = useForm({
        id: initialOrder?.id || null,
        company: initialOrder?.company || "Just Simple Quality",
        supplier: initialOrder?.supplier || "A H Allen",
        delAddress: initialOrder?.del_address || "Unit 1, Example St, London",
        poNumber: initialOrder?.po_number || "PO-2025-001",
        jobNumber: initialOrder?.job_number || "JOB-123",
        date: initialOrder?.date ? initialOrder.date.split('T')[0] : "2025-12-15",
        items: initialOrder?.items && initialOrder.items.length > 0 
            ? initialOrder.items.map(item => ({
                id: item.item_no || "",
                description: item.description || "",
                unit: item.unit || "",
                qty: item.qty || "",
                costEach: item.cost_each || "",
                totalCost: item.total_cost || ""
            }))
            : [
                {
                    id: "1",
                    description: "5mm drill",
                    unit: "Ea",
                    qty: "10",
                    costEach: "1.50",
                    totalCost: "15.00",
                }
            ],
        notes: initialOrder?.notes || "Please deliver by Friday.",
        orderedBy: initialOrder?.ordered_by || "Rifat Ahamed",
    });

    const [totals, setTotals] = useState({
        subTotal: 0,
        vat: 0,
        grandTotal: 0
    });

    useEffect(() => {
        if (initialOrder) {
            setData((prev) => ({
                ...prev,
                id: initialOrder.id,
                company: initialOrder.company || "",
                supplier: initialOrder.supplier || "",
                delAddress: initialOrder.del_address || "",
                poNumber: initialOrder.po_number || "",
                jobNumber: initialOrder.job_number || "",
                date: initialOrder.date ? initialOrder.date.split('T')[0] : "",
                notes: initialOrder.notes || "",
                orderedBy: initialOrder.ordered_by || "",
                items: initialOrder.items && initialOrder.items.length > 0
                    ? initialOrder.items.map(item => ({
                        id: item.item_no || "",
                        description: item.description || "",
                        unit: item.unit || "",
                        qty: item.qty || "",
                        costEach: item.cost_each || "",
                        totalCost: item.total_cost || ""
                    }))
                    : prev.items,
            }));
        }
    }, [initialOrder]);

    const calculateTotals = (currentItems) => {
        let sub = 0;
        currentItems.forEach(item => {
            const total = parseFloat(item.totalCost) || 0;
            sub += total;
        });

        const v = sub * 0.20; // 20% VAT
        const g = sub + v;

        setTotals({
            subTotal: sub.toFixed(2),
            vat: v.toFixed(2),
            grandTotal: g.toFixed(2)
        });
    };

    useEffect(() => {
        calculateTotals(data.items);
    }, [data.items]);

    const handleItemChange = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        
        // Auto calculate total cost if qty or costEach changes
        if (field === 'qty' || field === 'costEach') {
            const qty = parseFloat(newItems[index].qty) || 0;
            const cost = parseFloat(newItems[index].costEach) || 0;
            newItems[index].totalCost = (qty * cost).toFixed(2);
        }

        setData("items", newItems);
    };

    const addItemRow = () => {
        setData("items", [
            ...data.items, 
            { id: "", description: "", unit: "", qty: "", costEach: "", totalCost: "" }
        ]);
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-10.store"), {
            onSuccess: () => {
                toast.success("Purchase Order saved successfully!");
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data. Please check the form.");
            },
        });
    };

    // Make sure we always show at least 15 rows for the design, but only iterate over actual items or pad
    const paddedItems = [...data.items];
    while(paddedItems.length < 15) {
        paddedItems.push({ _empty: true });
    }

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
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-sm hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Download size={18} />
                            Export PDF
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {processing ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save size={18} />
                            )}
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-8 max-w-5xl mx-auto">
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
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800 p-0">
                                    <input 
                                        type="text" 
                                        name="company"
                                        value={data.company}
                                        onChange={e => setData("company", e.target.value)}
                                        className="w-full h-full border-none px-3 py-3 text-xs focus:ring-0" 
                                        placeholder="Company"
                                    />
                                </div>
                            </div>
                            <div className="flex border-b border-slate-300">
                                <div className="w-32 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center text-slate-600">
                                    Supplier
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800 p-0">
                                    <input 
                                        type="text" 
                                        name="supplier"
                                        value={data.supplier}
                                        onChange={e => setData("supplier", e.target.value)}
                                        className="w-full h-full border-none px-3 py-3 text-xs focus:ring-0" 
                                        placeholder="Supplier"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="w-32 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center text-slate-600">
                                    Del Address
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800 p-0">
                                    <input 
                                        type="text" 
                                        name="delAddress"
                                        value={data.delAddress}
                                        onChange={e => setData("delAddress", e.target.value)}
                                        className="w-full h-full border-none px-3 py-3 text-xs focus:ring-0" 
                                        placeholder="Delivery Address"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="flex-1 w-full md:w-1/2 flex flex-col">
                            <div className="flex border-b border-slate-300">
                                <div className="w-40 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center justify-end text-slate-600">
                                    Purchase Order Number
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800 p-0">
                                    <input 
                                        type="text" 
                                        name="poNumber"
                                        value={data.poNumber}
                                        onChange={e => setData("poNumber", e.target.value)}
                                        className="w-full h-full border-none px-3 py-3 text-xs focus:ring-0" 
                                        placeholder="PO Number"
                                    />
                                </div>
                            </div>
                            <div className="flex border-b border-slate-300">
                                <div className="w-40 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center justify-end text-slate-600">
                                    Job Number
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800 p-0">
                                    <input 
                                        type="text" 
                                        name="jobNumber"
                                        value={data.jobNumber}
                                        onChange={e => setData("jobNumber", e.target.value)}
                                        className="w-full h-full border-none px-3 py-3 text-xs focus:ring-0" 
                                        placeholder="Job Number"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-1">
                                <div className="w-40 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center justify-end text-slate-600">
                                    Date
                                </div>
                                <div className="p-3 text-xs flex-1 font-medium text-slate-800 p-0">
                                    <input 
                                        type="date" 
                                        name="date"
                                        value={data.date}
                                        onChange={e => setData("date", e.target.value)}
                                        className="w-full h-full border-none px-3 py-3 text-xs focus:ring-0 text-slate-500" 
                                    />
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
                                {paddedItems.map((item, index) => {
                                    if (item._empty) {
                                        return (
                                            <tr key={index} className="border-b border-slate-300 last:border-0 h-10 bg-slate-50/20">
                                                <td className="p-3 text-xs border-r border-slate-300"></td>
                                                <td className="p-3 text-xs border-r border-slate-300"></td>
                                                <td className="p-3 text-xs border-r border-slate-300"></td>
                                                <td className="p-3 text-xs border-r border-slate-300"></td>
                                                <td className="p-3 text-xs border-r border-slate-300"></td>
                                                <td className="p-3 text-xs"></td>
                                            </tr>
                                        )
                                    }

                                    return (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-300 last:border-0 h-10 hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="p-0 text-xs border-r border-slate-300 text-slate-500">
                                                <input 
                                                    type="text" 
                                                    value={item.id}
                                                    onChange={e => handleItemChange(index, "id", e.target.value)}
                                                    className="w-full h-full border-none bg-transparent px-3 py-3 text-xs focus:ring-0 text-center"
                                                />
                                            </td>
                                            <td className="p-0 text-xs border-r border-slate-300 font-medium text-slate-800">
                                                <input 
                                                    type="text" 
                                                    value={item.description}
                                                    onChange={e => handleItemChange(index, "description", e.target.value)}
                                                    className="w-full h-full border-none bg-transparent px-3 py-3 text-xs focus:ring-0"
                                                />
                                            </td>
                                            <td className="p-0 text-xs border-r border-slate-300 text-center text-slate-600">
                                                <input 
                                                    type="text" 
                                                    value={item.unit}
                                                    onChange={e => handleItemChange(index, "unit", e.target.value)}
                                                    className="w-full h-full border-none bg-transparent px-3 py-3 text-xs focus:ring-0 text-center"
                                                />
                                            </td>
                                            <td className="p-0 text-xs border-r border-slate-300 text-center text-slate-600">
                                                <input 
                                                    type="number" 
                                                    value={item.qty}
                                                    onChange={e => handleItemChange(index, "qty", e.target.value)}
                                                    className="w-full h-full border-none bg-transparent px-3 py-3 text-xs focus:ring-0 text-center"
                                                />
                                            </td>
                                            <td className="p-0 text-xs border-r border-slate-300 text-right text-slate-600 relative">
                                                <span className="absolute left-2 top-3 text-slate-400">£</span>
                                                <input 
                                                    type="number" 
                                                    step="0.01"
                                                    value={item.costEach}
                                                    onChange={e => handleItemChange(index, "costEach", e.target.value)}
                                                    className="w-full h-full border-none bg-transparent pl-6 pr-3 py-3 text-xs focus:ring-0 text-right"
                                                />
                                            </td>
                                            <td className="p-0 text-xs text-right font-medium text-slate-800 relative">
                                                <span className="absolute left-2 top-3 text-slate-400">£</span>
                                                <input 
                                                    type="number" 
                                                    step="0.01"
                                                    value={item.totalCost}
                                                    onChange={e => handleItemChange(index, "totalCost", e.target.value)}
                                                    className="w-full h-full border-none bg-transparent pl-6 pr-3 py-3 text-xs focus:ring-0 text-right"
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                                {/* Add row btn */}
                                <tr className="border-b border-t-2 border-slate-300 bg-slate-50/50">
                                    <td colSpan="6" className="p-0">
                                        <button 
                                            onClick={addItemRow}
                                            className="w-full py-2 flex justify-center items-center gap-2 text-xs font-bold text-[#2185d5] hover:bg-slate-100 transition-colors"
                                        >
                                            <Plus size={14} /> Add Item Row
                                        </button>
                                    </td>
                                </tr>

                                {/* Totals */}
                                <tr className="border-t border-slate-300">
                                    <td colSpan="4" rowSpan="3" className="border-r border-slate-300"></td>
                                    <td className="p-3 text-xs font-bold text-right border-r border-slate-300 border-b border-slate-300 bg-slate-50 text-slate-600">
                                        Total
                                    </td>
                                    <td className="p-3 text-xs text-right border-b border-slate-300 font-bold text-slate-800">
                                        £{totals.subTotal}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 text-xs font-bold text-right border-r border-slate-300 border-b border-slate-300 bg-slate-50 text-slate-600">
                                        VAT @ 20%
                                    </td>
                                    <td className="p-3 text-xs text-right border-b border-slate-300 font-bold text-slate-800">
                                        £{totals.vat}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-3 text-xs font-bold text-right border-r border-slate-300 bg-slate-50 text-slate-600">
                                        Total with VAT
                                    </td>
                                    <td className="p-3 text-xs font-bold text-right text-slate-800 text-lg text-emerald-600">
                                        £{totals.grandTotal}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="border-x border-b border-slate-300">
                        <div className="h-32 p-0 border-b border-slate-300 flex flex-col">
                            <h4 className="text-xs font-bold mb-0 text-slate-700 p-3 pb-0">
                                Notes:
                            </h4>
                            <textarea
                                name="notes"
                                value={data.notes}
                                onChange={e => setData("notes", e.target.value)}
                                className="w-full flex-1 border-none text-xs text-slate-600 leading-relaxed px-3 pb-3 focus:ring-0 resize-none bg-transparent"
                            ></textarea>
                        </div>
                        <div className="flex">
                            <div className="w-32 bg-slate-50 p-3 text-xs font-bold border-r border-slate-300 flex items-center text-slate-600">
                                Ordered by:
                            </div>
                            <div className="p-0 text-xs flex-1 font-medium text-slate-800">
                                <input
                                    type="text"
                                    name="orderedBy"
                                    value={data.orderedBy}
                                    onChange={e => setData("orderedBy", e.target.value)}
                                    className="w-full h-full border-none focus:ring-0 px-3 py-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
