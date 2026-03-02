import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, router } from "@inertiajs/react";
import {
    ArrowLeft,
    FileText,
    CheckCircle2,
    Calendar,
    Users,
    ClipboardList,
    AlertCircle,
    Building2,
    Clock,
    Tag,
} from "lucide-react";

export default function ShowChecklist({ checklist }) {
    const calculateCompletion = () => {
        let totalItems = 0;
        let completedItems = 0;
        
        checklist.areas?.forEach(area => {
            area.items?.forEach(item => {
                totalItems++;
                if (item.is_completed) completedItems++;
            });
        });

        if (totalItems === 0) return 0;
        return Math.round((completedItems / totalItems) * 100);
    };

    const completionStatus = calculateCompletion();

    return (
        <AdministratorLayout>
            <Head title={`View - ${checklist.name}`} />

            <div className="max-w-6xl mx-auto py-10 space-y-8 pb-32">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.get(route('administrator.pre-audit-checklists.index'))}
                            className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-slate-100 text-slate-400 hover:text-slate-600 transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                    checklist.status === "Completed" 
                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                        : "bg-blue-50 text-blue-600 border-blue-100"
                                }`}>
                                    {checklist.status}
                                </span>
                                <span className="text-[12px] font-bold text-slate-400">•</span>
                                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-tighter">
                                    Created {new Date(checklist.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-[32px] font-black text-slate-800 tracking-tight leading-none">
                                {checklist.name}
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                         <button 
                            onClick={() => router.get(route('administrator.pre-audit-checklists.edit', checklist.id))}
                            className="bg-slate-900 text-white px-8 py-3 rounded-sm font-black text-[14px] shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95"
                        >
                            Edit Checklist
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details & Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard</p>
                                <p className="text-[15px] font-bold text-slate-800">{checklist.iso_standard}</p>
                            </div>
                            <div className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Audit Type</p>
                                <p className="text-[15px] font-bold text-slate-800">{checklist.audit_type}</p>
                            </div>
                            <div className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Scheduled</p>
                                <p className="text-[15px] font-bold text-slate-800">{checklist.scheduled_date}</p>
                            </div>
                            <div className="bg-white p-5 rounded-sm border border-slate-100 shadow-sm">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Priority</p>
                                <p className="text-[15px] font-bold text-slate-800">{checklist.priority}</p>
                            </div>
                        </div>

                        {/* Objectives */}
                        {checklist.objectives && (
                            <div className="bg-white p-8 rounded-sm border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <AlertCircle size={18} className="text-[#2185d5]" />
                                    <h3 className="text-[16px] font-black text-slate-800">Audit Objectives</h3>
                                </div>
                                <p className="text-[14px] text-slate-600 leading-relaxed">
                                    {checklist.objectives}
                                </p>
                            </div>
                        )}

                        {/* Checklist Content */}
                        <div className="space-y-6">
                            <h3 className="text-[18px] font-black text-slate-800 flex items-center gap-2">
                                <ClipboardList size={22} className="text-[#2185d5]" />
                                Audit Areas & Compliance Items
                            </h3>

                            {checklist.areas?.map((area, i) => (
                                <div key={i} className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden">
                                    <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                                        <h4 className="text-[15px] font-bold text-slate-800">{area.name}</h4>
                                        <span className="text-[11px] font-bold text-slate-400 uppercase">{area.items?.length || 0} Items</span>
                                    </div>
                                    <div className="divide-y divide-slate-50">
                                        {area.items?.map((item, j) => (
                                            <div key={j} className="px-6 py-4 flex items-start gap-4 hover:bg-slate-50/30 transition-colors">
                                                <div className="mt-1 w-5 h-5 rounded border border-slate-200 bg-white flex items-center justify-center shrink-0">
                                                    {item.is_completed && <CheckCircle2 size={14} className="text-emerald-500" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-[14px] font-medium ${item.is_completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                        {item.text}
                                                    </p>
                                                    {item.tags && item.tags.length > 0 && (
                                                        <div className="flex gap-2 mt-2">
                                                            {item.tags.map(tag => (
                                                                <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-tighter">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Status & Team */}
                    <div className="space-y-8">
                        {/* Overall Completion */}
                        <div className="bg-white p-8 rounded-sm border border-slate-100 shadow-sm">
                            <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-widest mb-6">Current Progress</h3>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[32px] font-black text-[#2185d5]">{completionStatus}%</span>
                                <span className="text-[12px] font-bold text-slate-400">COMPLETED</span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                                <div 
                                    className="h-full bg-[#2185d5] transition-all duration-1000 ease-out"
                                    style={{ width: `${completionStatus}%` }}
                                />
                            </div>
                        </div>

                        {/* Audit Team */}
                        <div className="bg-white p-8 rounded-sm border border-slate-100 shadow-sm">
                            <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Users size={18} className="text-slate-400" />
                                Audit Team
                            </h3>
                            <div className="space-y-4">
                                {checklist.team?.map((member, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50/50 rounded-sm border border-slate-100 hover:border-[#2185d5]/20 transition-all">
                                        <div className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#2185d5] font-black uppercase text-[15px]">
                                            {member.user?.first_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-bold text-slate-800 leading-none">
                                                {member.user?.first_name} {member.user?.last_name}
                                            </p>
                                            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-slate-900 p-8 rounded-sm text-white shadow-xl">
                            <h3 className="text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-400">
                                <Tag size={18} />
                                Metadata
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Creator</p>
                                    <p className="text-[14px] font-bold text-white">{checklist.creator?.first_name} {checklist.creator?.last_name}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Department</p>
                                    <p className="text-[14px] font-bold text-white">{checklist.department || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Last Updated</p>
                                    <p className="text-[14px] font-bold text-white">{new Date(checklist.updated_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
