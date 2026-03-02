import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Save,
    Trash2,
    Plus,
    Upload,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC06({ initialPlans = [] }) {
    const { data, setData, post, processing } = useForm({
        plans: initialPlans,
        deletedIds: [],
    });

    const addPlan = () => {
        const newPlan = {
            id: 'new_' + Date.now(),
            operation_activity: "",
            controlling_documents: "",
            acceptance_criteria: "",
            verifying_document: "",
            inspection_points_internal: "",
            inspection_points_external: "",
        };
        setData('plans', [...data.plans, newPlan]);
    };

    const deletePlan = (id) => {
        if (typeof id === 'string' && id.startsWith('new_')) {
            setData('plans', data.plans.filter(p => p.id !== id));
        } else {
            setData({
                ...data,
                plans: data.plans.filter(p => p.id !== id),
                deletedIds: [...data.deletedIds, id]
            });
        }
    };

    const handleInputChange = (id, field, value) => {
        const updatedPlans = data.plans.map(p => 
            p.id === id ? { ...p, [field]: value } : p
        );
        setData('plans', updatedPlans);
    };

    const handleSave = () => {
        post(route('administrator.rec-forms.rec-06.store'), {
            onSuccess: () => {
                toast.success("Inspection and test plan saved successfully!");
            },
            onError: (err) => {
                console.error(err);
                toast.error("Failed to save. Please check for errors.");
            }
        });
    };

    return (
        <AdministratorLayout>
            <Head title="REC-06 - Inspection & Test Plan (ITP)" />

            <div className="space-y-4 pb-10">
                {/* Header Section */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm p-4 text-[14px]">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-slate-800 tracking-tight">
                            REC-06: Inspection & Test Plan (ITP)
                        </h1>
                        <Link
                            href={route("administrator.rec-forms.index")}
                            className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden p-2">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left border-separate border-spacing-x-1 border-spacing-y-1">
                            <thead>
                                <tr className="text-slate-500 text-[11px] font-semibold text-center h-6">
                                    <th className="px-1 min-w-[180px]">Operation Activity</th>
                                    <th className="px-1 min-w-[140px]">Controlling Document(s)</th>
                                    <th className="px-1 min-w-[140px]">Acceptance Criteria</th>
                                    <th className="px-1 min-w-[120px]">Verifying Document</th>
                                    <th className="px-1 min-w-[120px]">Inspection Points<br/>Internal</th>
                                    <th className="px-1 min-w-[120px]">Inspection Points<br/>External</th>
                                    <th className="px-1 min-w-[60px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.plans.map((p) => (
                                    <tr key={p.id} className="align-top">
                                        <td className="px-0.5">
                                            <textarea 
                                                value={p.operation_activity}
                                                onChange={(e) => handleInputChange(p.id, "operation_activity", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[11px] font-medium text-slate-600 px-2 py-1.5 focus:ring-1 focus:ring-blue-100 min-h-[50px] leading-snug scrollbar-hide"
                                                placeholder="Activity description..."
                                            />
                                        </td>
                                        <td className="px-0.5">
                                            <textarea 
                                                value={p.controlling_documents}
                                                onChange={(e) => handleInputChange(p.id, "controlling_documents", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[11px] font-medium text-slate-600 px-2 py-1.5 focus:ring-1 focus:ring-blue-100 min-h-[50px] leading-snug scrollbar-hide"
                                                placeholder="Documents..."
                                            />
                                        </td>
                                        <td className="px-0.5">
                                            <textarea 
                                                value={p.acceptance_criteria}
                                                onChange={(e) => handleInputChange(p.id, "acceptance_criteria", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[11px] font-medium text-slate-600 px-2 py-1.5 focus:ring-1 focus:ring-blue-100 min-h-[50px] leading-snug scrollbar-hide"
                                                placeholder="Criteria..."
                                            />
                                        </td>
                                        <td className="px-0.5">
                                            <textarea 
                                                value={p.verifying_document}
                                                onChange={(e) => handleInputChange(p.id, "verifying_document", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[11px] font-medium text-slate-600 px-2 py-1.5 focus:ring-1 focus:ring-blue-100 min-h-[50px] leading-snug scrollbar-hide text-center"
                                                placeholder="Register..."
                                            />
                                        </td>
                                        <td className="px-0.5">
                                            <textarea 
                                                value={p.inspection_points_internal}
                                                onChange={(e) => handleInputChange(p.id, "inspection_points_internal", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[11px] font-medium text-slate-600 px-2 py-1.5 focus:ring-1 focus:ring-blue-100 min-h-[50px] leading-snug scrollbar-hide text-center"
                                                placeholder="Internal..."
                                            />
                                        </td>
                                        <td className="px-0.5">
                                            <textarea 
                                                value={p.inspection_points_external}
                                                onChange={(e) => handleInputChange(p.id, "inspection_points_external", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[11px] font-medium text-slate-600 px-2 py-1.5 focus:ring-1 focus:ring-blue-100 min-h-[50px] leading-snug scrollbar-hide text-center"
                                                placeholder="External..."
                                            />
                                        </td>
                                        <td className="px-0.5">
                                            <div className="flex items-center justify-center gap-1 h-full">
                                                <button 
                                                    onClick={() => deletePlan(p.id)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-all"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:bg-slate-50 rounded-md transition-all">
                                                    <Upload size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {data.plans.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="py-10 text-center">
                                            <div className="flex flex-col items-center gap-1 text-slate-300">
                                                <Upload size={32} strokeWidth={1} />
                                                <p className="text-[12px]">No instructions found. Click below to add one.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-4 pt-2 border-t border-slate-50">
                        <button 
                            onClick={addPlan}
                            className="bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-[12px] px-10 py-2.5 rounded-md flex items-center justify-center gap-2 transition-all shadow-sm"
                        >
                            <Plus size={14} strokeWidth={2.5} className="text-slate-400" />
                            Add New Instruction
                        </button>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="flex justify-end pt-4">
                    <button 
                        onClick={handleSave}
                        disabled={processing}
                        className="flex items-center gap-2 px-10 py-3 bg-[#2c8af8] text-white rounded-sm hover:bg-blue-600 transition-all text-[13px] font-bold tracking-tight shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {processing ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        {processing ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </div>
        </AdministratorLayout>
    );
}
