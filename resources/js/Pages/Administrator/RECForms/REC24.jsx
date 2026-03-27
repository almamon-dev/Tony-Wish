import React, { useState, useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Save,
    AlertTriangle,
    Upload,
    Download,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC24({ initialWaste = null }) {
    const { data, setData, post, processing } = useForm({
        waste: initialWaste || {
            lastReviewDate: "",
            status: "Draft",
        },
        items: initialWaste?.items?.map(item => ({
            ...item,
            date: item.date ? item.date.split('T')[0] : ""
        })) || [
            { wasteType: "", quantity: "", disposalMethod: "", contractor: "", notesNumber: "", date: "" }
        ],
    });

    useEffect(() => {
        if (initialWaste) {
            const formattedItems = initialWaste.items?.map(item => ({
                ...item,
                date: item.date ? item.date.split('T')[0] : ""
            }));
            setData({
                waste: {
                    ...initialWaste,
                    lastReviewDate: initialWaste.last_review_date ? initialWaste.last_review_date.split('T')[0] : "",
                },
                items: formattedItems.length > 0 ? formattedItems : [{ wasteType: "", quantity: "", disposalMethod: "", contractor: "", notesNumber: "", date: "" }]
            });
        }
    }, [initialWaste]);

    const addItem = () => {
        setData("items", [...data.items, { wasteType: "", quantity: "", disposalMethod: "", contractor: "", notesNumber: "", date: "" }]);
    };

    const removeItem = (index) => {
        const newItems = [...data.items];
        newItems.splice(index, 1);
        setData("items", newItems);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...data.items];
        newItems[index][field] = value;
        setData("items", newItems);
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-24.store"), {
            onSuccess: () => toast.success("Waste Handling record saved successfully!"),
        });
    };

    return (
        <AdministratorLayout>
            <Head title="REC-24 - Waste Handling" />

            <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href={route("administrator.rec-forms.index")} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-2 text-sm font-medium">
                            <ArrowLeft size={16} /> Back to REC Forms
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">REC-24 - Waste Handling</h1>
                        <p className="text-sm text-slate-500">Record and monitor all waste disposal and contractor details.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSave} disabled={processing} className="flex items-center gap-2 px-6 py-2 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
                            {processing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />} Save REC-24
                        </button>
                    </div>
                </div>

                {/* Associated Documents */}
                <div className="bg-[#f0f7ff] border border-[#d1e6ff] rounded-sm p-4 text-[#00529b] font-bold text-sm">
                   Associated Documents
                </div>

                {/* Main Table */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700 uppercase text-[11px] font-bold border-b border-slate-200 divide-x divide-slate-200">
                                    <th className="px-5 py-4 min-w-[150px]">Waste Type</th>
                                    <th className="px-5 py-4 min-w-[120px]">Quantity</th>
                                    <th className="px-5 py-4 min-w-[150px]">Disposal Method</th>
                                    <th className="px-5 py-4 min-w-[150px]">Contractor</th>
                                    <th className="px-4 py-4 min-w-[150px]">Notes Number</th>
                                    <th className="px-4 py-4 min-w-[120px]">Date</th>
                                    <th className="px-4 py-4 min-w-[100px] text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-colors divide-x divide-slate-100">
                                        <td className="p-2 px-4 shadow-inner bg-slate-50/20"><input type="text" value={item.wasteType} onChange={e => updateItem(index, "wasteType", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs" /></td>
                                        <td className="p-2 px-4"><input type="text" value={item.quantity} onChange={e => updateItem(index, "quantity", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs font-bold text-slate-700" /></td>
                                        <td className="p-2 px-4"><input type="text" value={item.disposalMethod} onChange={e => updateItem(index, "disposalMethod", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs" /></td>
                                        <td className="p-2 px-4"><input type="text" value={item.contractor} onChange={e => updateItem(index, "contractor", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs" /></td>
                                        <td className="p-2 px-4"><input type="text" value={item.notesNumber} onChange={e => updateItem(index, "notesNumber", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs" /></td>
                                        <td className="p-2 px-4"><input type="date" value={item.date} onChange={e => updateItem(index, "date", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs" /></td>
                                        <td className="p-2">
                                            <div className="flex justify-center gap-1">
                                                <button onClick={() => removeItem(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-sm shadow-sm bg-white"><Trash2 size={16} /></button>
                                                <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-sm shadow-sm bg-white"><Upload size={16} /></button>
                                                <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-sm shadow-sm bg-white"><Download size={16} className="rotate-180" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-white border-t border-slate-100 shadow-inner">
                        <button onClick={addItem} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-sm hover:bg-slate-50 font-bold transition-all text-xs shadow-sm capitalize tracking-tight">
                            <Plus size={16} /> Add New Row
                        </button>
                    </div>
                </div>

                {/* Alerts */}
                <div className="bg-amber-50 border border-amber-100 rounded-sm p-6 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-slate-800 font-bold text-sm">Waste Handling Due Alerts</h3>
                            <div className="flex gap-2 mt-1">
                                <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full border border-red-600">3 Expired</span>
                                <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-full border border-amber-600">4 Expiring Soon</span>
                                <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full border border-emerald-600 shadow-sm">1 Valid</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSave} disabled={processing} className="flex items-center gap-2 px-6 py-2 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 font-bold transition-all text-xs shadow-lg shadow-blue-500/10">
                        <Save size={16} /> Save REC-23
                    </button>
                </div>
            </div>
        </AdministratorLayout>
    );
}
