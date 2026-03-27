import React, { useState, useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Plus,
    Trash2,
    Save,
    Calendar,
    AlertTriangle,
    Upload,
    CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC22({ initialMonitor = null }) {
    const { data, setData, post, processing } = useForm({
        monitor: initialMonitor || {
            lastReviewDate: "",
            renewalPeriod: 1,
            renewalUnit: "Years",
            verifiedBy: "",
            withDate: "",
            status: "Draft",
        },
        items: initialMonitor?.items?.map(item => ({
            ...item,
            nextReviewDue: item.next_review_due ? item.next_review_due.split('T')[0] : ""
        })) || [
            { parameter: "", unit: "", method: "", result: "", limit: "", actionRequired: "", notes: "", frequency: "", nextReviewDue: "" }
        ],
    });

    useEffect(() => {
        if (initialMonitor) {
            const formattedItems = initialMonitor.items?.map(item => ({
                ...item,
                nextReviewDue: item.next_review_due ? item.next_review_due.split('T')[0] : ""
            }));
            setData({
                monitor: {
                    ...initialMonitor,
                    lastReviewDate: initialMonitor.last_review_date ? initialMonitor.last_review_date.split('T')[0] : "",
                    withDate: initialMonitor.with_date ? initialMonitor.with_date.split('T')[0] : "",
                },
                items: formattedItems.length > 0 ? formattedItems : [{ parameter: "", unit: "", method: "", result: "", limit: "", actionRequired: "", notes: "", frequency: "", nextReviewDue: "" }]
            });
        }
    }, [initialMonitor]);

    const addItem = () => {
        setData("items", [...data.items, { parameter: "", unit: "", method: "", result: "", limit: "", actionRequired: "", notes: "", frequency: "", nextReviewDue: "" }]);
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

    const updateMonitor = (field, value) => {
        setData("monitor", { ...data.monitor, [field]: value });
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-22.store"), {
            onSuccess: () => toast.success("Monitor & Measure record saved successfully!"),
        });
    };

    return (
        <AdministratorLayout>
            <Head title="REC-22 - Monitor & Measure" />

            <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href={route("administrator.rec-forms.index")} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-2 text-sm">
                            <ArrowLeft size={16} /> Back to REC Forms
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">REC-22 - Monitor & Measure</h1>
                        <p className="text-sm text-slate-500">Track and log all monitoring parameters and measurements.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSave} disabled={processing} className="flex items-center gap-2 px-6 py-2 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
                            {processing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />} Save REC-22
                        </button>
                    </div>
                </div>

                {/* Review Alert Placeholder */}
                <div className="bg-blue-50 border border-blue-100 rounded-sm p-4 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Calendar size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-slate-800 font-bold text-sm">Monitor & Measure Due Alerts</h3>
                        <div className="flex gap-2 mt-1">
                            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full border border-red-600">3 Expired</span>
                            <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full border border-amber-600">4 Expiring Soon</span>
                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full border border-emerald-600">1 Valid</span>
                        </div>
                    </div>
                </div>

                {/* Renewal Settings */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden text-sm">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider">Renewal Period Settings</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Default Renewal Period</label>
                            <input type="number" value={data.monitor.renewalPeriod} onChange={e => updateMonitor("renewalPeriod", e.target.value)} className="w-full bg-slate-50 border-transparent focus:border-blue-500 rounded-sm p-2 font-bold" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Unit</label>
                            <select value={data.monitor.renewalUnit} onChange={e => updateMonitor("renewalUnit", e.target.value)} className="w-full bg-slate-50 border-transparent focus:border-blue-500 rounded-sm p-2 font-bold">
                                <option value="Years">Year (s)</option>
                                <option value="Months">Month (s)</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Last Review Date</label>
                            <input type="date" value={data.monitor.lastReviewDate} onChange={e => updateMonitor("lastReviewDate", e.target.value)} className="w-full bg-slate-50 border-transparent focus:border-blue-500 rounded-sm p-2 font-bold" />
                        </div>
                        <div className="flex items-end text-xs italic text-slate-400 pb-2">Applies {data.monitor.renewalPeriod} {data.monitor.renewalUnit?.toLowerCase()} from today</div>
                    </div>
                </div>

                {/* Associated Documents */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6 overflow-hidden">
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider mb-4 text-sm">Associated Documents</h3>
                    <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 rounded-sm hover:bg-blue-50 font-bold transition-all text-sm">
                        <Upload size={18} /> Upload Documents
                    </button>
                </div>

                {/* Main Table */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-center border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 uppercase text-[11px] font-bold border-b border-slate-100">
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[150px]">Parameter</th>
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[100px]">Unit</th>
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[120px]">Method</th>
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[100px]">Result</th>
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[100px]">Limit</th>
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[150px]">Action Required</th>
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[150px]">Notes</th>
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[120px]">Frequency</th>
                                    <th className="px-4 py-3 border-r border-slate-100 min-w-[130px]">Next Review Due</th>
                                    <th className="px-4 py-3 min-w-[80px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-2 border-r border-slate-100"><input type="text" value={item.parameter} onChange={e => updateItem(index, "parameter", e.target.value)} className="w-full border-none focus:ring-0 p-1" /></td>
                                        <td className="p-2 border-r border-slate-100"><input type="text" value={item.unit} onChange={e => updateItem(index, "unit", e.target.value)} className="w-full border-none focus:ring-0 p-1" /></td>
                                        <td className="p-2 border-r border-slate-100"><input type="text" value={item.method} onChange={e => updateItem(index, "method", e.target.value)} className="w-full border-none focus:ring-0 p-1" /></td>
                                        <td className="p-2 border-r border-slate-100"><input type="text" value={item.result} onChange={e => updateItem(index, "result", e.target.value)} className="w-full border-none focus:ring-0 p-1 font-bold" /></td>
                                        <td className="p-2 border-r border-slate-100"><input type="text" value={item.limit} onChange={e => updateItem(index, "limit", e.target.value)} className="w-full border-none focus:ring-0 p-1" /></td>
                                        <td className="p-2 border-r border-slate-100">
                                            <select value={item.actionRequired} onChange={e => updateItem(index, "actionRequired", e.target.value)} className="w-full border-none focus:ring-0 p-1">
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </td>
                                        <td className="p-2 border-r border-slate-100"><input type="text" value={item.notes} onChange={e => updateItem(index, "notes", e.target.value)} className="w-full border-none focus:ring-0 p-1 opacity-70" /></td>
                                        <td className="p-2 border-r border-slate-100">
                                            <select value={item.frequency} onChange={e => updateItem(index, "frequency", e.target.value)} className="w-full border-none focus:ring-0 p-1">
                                                <option value="Monthly">Monthly</option>
                                                <option value="Quarterly">Quarterly</option>
                                                <option value="Yearly">Yearly</option>
                                            </select>
                                        </td>
                                        <td className="p-2 border-r border-slate-100"><input type="date" value={item.nextReviewDue} onChange={e => updateItem(index, "nextReviewDue", e.target.value)} className="w-full border-none focus:ring-0 p-1" /></td>
                                        <td className="p-2">
                                            <button onClick={() => removeItem(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-sm">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100">
                        <button onClick={addItem} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-sm hover:bg-slate-50 font-bold transition-all text-xs">
                            <Plus size={16} /> Add New Row
                        </button>
                    </div>
                </div>

                {/* Verification Section */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden text-sm">
                    <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800 uppercase tracking-wider">Verification & Status</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Verified By</label>
                            <input type="text" value={data.monitor.verifiedBy} onChange={e => updateMonitor("verifiedBy", e.target.value)} className="w-full bg-slate-50 border-transparent focus:border-blue-500 rounded-sm p-2 font-bold" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">With Date</label>
                            <input type="date" value={data.monitor.withDate} onChange={e => updateMonitor("withDate", e.target.value)} className="w-full bg-slate-50 border-transparent focus:border-blue-500 rounded-sm p-2 font-bold" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                            <select value={data.monitor.status} onChange={e => updateMonitor("status", e.target.value)} className="w-full bg-slate-50 border-transparent focus:border-blue-500 rounded-sm p-2 font-bold">
                                <option value="Draft">Draft</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
