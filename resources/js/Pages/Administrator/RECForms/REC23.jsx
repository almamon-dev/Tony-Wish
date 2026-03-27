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
    Calendar,
    ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC23({ initialIncident = null }) {
    const { data, setData, post, processing } = useForm({
        incident: initialIncident || {
            lastReviewDate: "",
            status: "Draft",
        },
        items: initialIncident?.items?.map(item => ({
            ...item,
            occurrenceDate: item.occurrence_date ? item.occurrence_date.split('T')[0] : "",
            forecastedClosureDate: item.forecasted_closure_date ? item.forecasted_closure_date.split('T')[0] : ""
        })) || [
            { occurrenceDate: "", location: "", incidentDescription: "", immediateAction: "", rootCause: "", correctiveAction: "", preventiveAction: "", notes: "", forecastedClosureDate: "", closed: "No" }
        ],
    });

    useEffect(() => {
        if (initialIncident) {
            const formattedItems = initialIncident.items?.map(item => ({
                ...item,
                occurrenceDate: item.occurrence_date ? item.occurrence_date.split('T')[0] : "",
                forecastedClosureDate: item.forecasted_closure_date ? item.forecasted_closure_date.split('T')[0] : ""
            }));
            setData({
                incident: {
                    ...initialIncident,
                    lastReviewDate: initialIncident.last_review_date ? initialIncident.last_review_date.split('T')[0] : "",
                },
                items: formattedItems.length > 0 ? formattedItems : [{ occurrenceDate: "", location: "", incidentDescription: "", immediateAction: "", rootCause: "", correctiveAction: "", preventiveAction: "", notes: "", forecastedClosureDate: "", closed: "No" }]
            });
        }
    }, [initialIncident]);

    const addItem = () => {
        setData("items", [...data.items, { occurrenceDate: "", location: "", incidentDescription: "", immediateAction: "", rootCause: "", correctiveAction: "", preventiveAction: "", notes: "", forecastedClosureDate: "", closed: "No" }]);
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

    const updateMain = (field, value) => {
        setData("incident", { ...data.incident, [field]: value });
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-23.store"), {
            onSuccess: () => toast.success("Incident Investigation report saved successfully!"),
        });
    };

    return (
        <AdministratorLayout>
            <Head title="REC-23 - Incident Investigation" />

            <div className="space-y-6 max-w-[1500px] mx-auto pb-12">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href={route("administrator.rec-forms.index")} className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-2 text-sm">
                            <ArrowLeft size={16} /> Back to REC Forms
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">REC-23 - Incident Investigation Report</h1>
                        <p className="text-sm text-slate-500">Log and investigate all workplace incidents and non-conformities.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSave} disabled={processing} className="flex items-center gap-2 px-6 py-2 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50">
                            {processing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />} Save REC-23
                        </button>
                    </div>
                </div>

                {/* ISO Info */}
                <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm">
                   <h3 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-wider">REC-23: Incident Investigation Report</h3>
                   <p className="text-xs text-slate-500 font-medium italic">Standard: ISO 45001 Clause: 10.2</p>
                </div>

                {/* Associated Documents */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 uppercase tracking-wider mb-4 text-xs">Associated Documents</h3>
                    <button className="flex items-center gap-2 px-4 py-2 border border-blue-200 text-blue-600 rounded-sm hover:bg-blue-50 font-bold transition-all text-xs">
                        <Upload size={18} /> Upload Documents (Photos, Reports, etc.)
                    </button>
                </div>

                {/* Main Table */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-center border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-100 divide-x divide-slate-100">
                                    <th className="px-4 py-3 min-w-[130px]">Occurrence Date</th>
                                    <th className="px-4 py-3 min-w-[120px]">Location</th>
                                    <th className="px-4 py-3 min-w-[200px]">Incident Description</th>
                                    <th className="px-4 py-3 min-w-[180px]">Immediate Action</th>
                                    <th className="px-4 py-3 min-w-[150px]">Root Cause</th>
                                    <th className="px-4 py-3 min-w-[150px]">Corrective Action</th>
                                    <th className="px-4 py-3 min-w-[150px]">Preventive Action</th>
                                    <th className="px-4 py-3 min-w-[150px]">Notes</th>
                                    <th className="px-4 py-3 min-w-[130px]">Forecasted Closure Date</th>
                                    <th className="px-4 py-3 min-w-[100px]">Closed?</th>
                                    <th className="px-4 py-3 min-w-[70px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-slate-50 transition-colors divide-x divide-slate-100">
                                        <td className="p-2"><input type="date" value={item.occurrenceDate} onChange={e => updateItem(index, "occurrenceDate", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs" /></td>
                                        <td className="p-2"><input type="text" value={item.location} onChange={e => updateItem(index, "location", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs" /></td>
                                        <td className="p-2"><textarea value={item.incidentDescription} onChange={e => updateItem(index, "incidentDescription", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs min-h-[50px] resize-none" /></td>
                                        <td className="p-2"><textarea value={item.immediateAction} onChange={e => updateItem(index, "immediateAction", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs min-h-[50px] resize-none" /></td>
                                        <td className="p-2"><textarea value={item.rootCause} onChange={e => updateItem(index, "rootCause", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs min-h-[50px] resize-none" /></td>
                                        <td className="p-2"><textarea value={item.correctiveAction} onChange={e => updateItem(index, "correctiveAction", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs min-h-[50px] resize-none" /></td>
                                        <td className="p-2"><textarea value={item.preventiveAction} onChange={e => updateItem(index, "preventiveAction", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs min-h-[50px] resize-none" /></td>
                                        <td className="p-2"><input type="text" value={item.notes} onChange={e => updateItem(index, "notes", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs opacity-70" /></td>
                                        <td className="p-2"><input type="date" value={item.forecastedClosureDate} onChange={e => updateItem(index, "forecastedClosureDate", e.target.value)} className="w-full border-none focus:ring-0 p-1 text-xs" /></td>
                                        <td className="p-2">
                                            <select value={item.closed} onChange={e => updateItem(index, "closed", e.target.value)} className={`w-full border border-slate-100 rounded-sm p-1 text-xs font-bold ${item.closed === 'Yes' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
                                        </td>
                                        <td className="p-2">
                                            <div className="flex justify-center gap-1">
                                                <button onClick={() => removeItem(index)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-sm"><Trash2 size={16} /></button>
                                                <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-sm"><Upload size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                        <button onClick={addItem} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-sm hover:bg-slate-50 font-bold transition-all text-xs">
                            <Plus size={16} /> Add New Row
                        </button>
                    </div>
                </div>

                {/* Due Alerts */}
                <div className="bg-amber-50 border border-amber-100 rounded-sm p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-sm">Incident Investigation Report Due Alerts</h3>
                            <div className="flex gap-2 mt-1">
                                <span className="px-3 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full border border-red-600 shadow-sm">3 Expired</span>
                                <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-full border border-amber-600 shadow-sm">4 Expiring Soon</span>
                                <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded-full border border-emerald-600 shadow-sm">1 Valid</span>
                            </div>
                        </div>
                        <button onClick={handleSave} disabled={processing} className="flex items-center gap-2 px-6 py-2 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 font-bold transition-all text-xs shadow-lg shadow-blue-500/10">
                            <Save size={16} /> Save REC-24
                        </button>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </AdministratorLayout>
    );
}
