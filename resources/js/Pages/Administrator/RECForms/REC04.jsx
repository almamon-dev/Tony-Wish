import React, { useState, useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Save,
    AlertTriangle,
    Upload,
    Trash2,
    Plus,
    Calendar,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC04({ initialMeetings = [] }) {
    const { data, setData, post, processing } = useForm({
        meetings: initialMeetings.length > 0 ? initialMeetings.map(m => ({
            ...m,
            meeting_date: m.meeting_date ? m.meeting_date.split('T')[0] : '',
            next_review_due: m.next_review_due ? m.next_review_due.split('T')[0] : '',
        })) : [],
        deletedIds: [],
    });

    const addMeeting = () => {
        const newMeeting = {
            id: 'new_' + Date.now(),
            meeting_date: new Date().toISOString().split('T')[0],
            type: 'Toolbox Talk',
            topic: '',
            facilitator: '',
            attendees: 0,
            actions_raised: 0,
            notes: '',
            next_review_due: '',
        };
        setData('meetings', [...data.meetings, newMeeting]);
    };

    const deleteMeeting = (id) => {
        if (!is_numeric(id)) {
            setData('meetings', data.meetings.filter(m => m.id !== id));
        } else {
            setData({
                ...data,
                meetings: data.meetings.filter(m => m.id !== id),
                deletedIds: [...data.deletedIds, id]
            });
        }
    };

    const is_numeric = (str) => {
        return !isNaN(str) && !isNaN(parseFloat(str));
    };

    const handleInputChange = (id, field, value) => {
        const updatedMeetings = data.meetings.map(m => 
            m.id === id ? { ...m, [field]: value } : m
        );
        setData('meetings', updatedMeetings);
    };

    const handleSave = () => {
        post(route('administrator.rec-forms.rec-04.store'), {
            onSuccess: () => {
                toast.success("Toolbox talks and meetings saved successfully!");
            },
            onError: () => {
                toast.error("Failed to save data. Please check the form.");
            }
        });
    };

    const getDateClass = (date) => {
        if (!date) return "bg-[#f8fafb] text-[#94a3b8]";
        
        const today = new Date();
        const d = new Date(date);
        if (isNaN(d.getTime())) return "bg-[#f8fafb] text-[#94a3b8]";

        const diffTime = d - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "bg-[#fee2e2] text-[#ef4444]";
        if (diffDays < 30) return "bg-[#fef3c7] text-[#d97706]";
        return "bg-[#eefcf4] text-[#1aa15f]";
    };

    // Calculate stats based on next_review_due
    const getStats = () => {
        let expired = 0, soon = 0, valid = 0;
        data.meetings.forEach(m => {
            if (!m.next_review_due) return;
            const cls = getDateClass(m.next_review_due);
            if (cls.includes('fee2e2')) expired++;
            else if (cls.includes('fef3c7')) soon++;
            else if (cls.includes('eefcf4')) valid++;
        });
        return { expired, soon, valid };
    };

    const stats = getStats();

    return (
        <AdministratorLayout>
            <Head title="REC-04 - Toolbox Talks & Meetings" />

            <div className="space-y-4 pb-10">
                {/* Header Section */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm p-4 text-[14px]">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-slate-800 tracking-tight">
                            REC-04: Toolbox Talks & Meetings
                        </h1>
                        <Link
                            href={route("administrator.rec-forms.index")}
                            className="text-slate-400 hover:text-blue-500 transition-colors"
                        >
                            <ArrowLeft size={18} />
                        </Link>
                    </div>
                </div>

                {/* Alerts Dashboard matching screenshot */}
                <div className="bg-[#fff9ef] border border-amber-100/50 rounded-sm p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-200/30">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[14px] font-bold text-slate-700 tracking-tight leading-none">
                                Training Expiry Alerts
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="bg-[#ef4444] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                    {stats.expired} Expired
                                </span>
                                <span className="bg-[#f59e0b] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                    {stats.soon} Expiry soon
                                </span>
                                <span className="bg-[#10b981] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                    {stats.valid} Valid
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden p-6">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100/50 text-slate-600">
                                    <th className="px-3 py-4 text-[13px] font-semibold min-w-[120px]">Date</th>
                                    <th className="px-3 py-4 text-[13px] font-semibold min-w-[140px]">Type</th>
                                    <th className="px-3 py-4 text-[13px] font-semibold min-w-[160px]">Topic</th>
                                    <th className="px-3 py-4 text-[13px] font-semibold min-w-[140px]">Facilitator</th>
                                    <th className="px-3 py-4 text-[13px] font-semibold min-w-[100px] text-center">Attendees</th>
                                    <th className="px-3 py-4 text-[13px] font-semibold min-w-[130px] text-center">Actions Raised</th>
                                    <th className="px-3 py-4 text-[13px] font-semibold min-w-[180px]">Notes</th>
                                    <th className="px-3 py-4 text-[13px] font-semibold min-w-[140px] text-center">Next Review Due</th>
                                    <th className="px-3 py-4 text-[13px] font-semibold text-right pr-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {data.meetings.map((m) => (
                                    <tr key={m.id} className="group">
                                        <td className="px-2 py-3">
                                            <input 
                                                type="date"
                                                value={m.meeting_date}
                                                onChange={(e) => handleInputChange(m.id, "meeting_date", e.target.value)}
                                                className={`w-full border-0 rounded-md text-[11px] px-3 py-1.5 font-bold focus:ring-1 focus:ring-blue-100 transition-all ${getDateClass(m.meeting_date)}`}
                                            />
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="relative">
                                                <select
                                                    value={m.type}
                                                    onChange={(e) => handleInputChange(m.id, "type", e.target.value)}
                                                    className="w-full bg-[#f8fafb] border-0 rounded-md text-[12px] font-medium text-slate-600 px-3 py-1.5 appearance-none cursor-pointer focus:ring-1 focus:ring-blue-100"
                                                >
                                                    <option value="Toolbox Talk">Toolbox Talk</option>
                                                    <option value="Safety Meeting">Safety Meeting</option>
                                                    <option value="General Meeting">General Meeting</option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <input 
                                                type="text"
                                                value={m.topic}
                                                onChange={(e) => handleInputChange(m.id, "topic", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[13px] font-medium text-slate-700 px-3 py-1.5 focus:ring-1 focus:ring-blue-100"
                                                placeholder="Topic..."
                                            />
                                        </td>
                                        <td className="px-2 py-3">
                                            <input 
                                                type="text"
                                                value={m.facilitator}
                                                onChange={(e) => handleInputChange(m.id, "facilitator", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[13px] font-medium text-slate-700 px-3 py-1.5 focus:ring-1 focus:ring-blue-100"
                                                placeholder="Name"
                                            />
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            <input 
                                                type="number"
                                                value={m.attendees}
                                                onChange={(e) => handleInputChange(m.id, "attendees", e.target.value)}
                                                className="w-20 mx-auto bg-[#f8fafb] border-0 rounded-md text-[13px] font-medium text-slate-700 px-3 py-1.5 focus:ring-1 focus:ring-blue-100 text-center"
                                            />
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            <input 
                                                type="number"
                                                value={m.actions_raised}
                                                onChange={(e) => handleInputChange(m.id, "actions_raised", e.target.value)}
                                                className="w-20 mx-auto bg-[#f8fafb] border-0 rounded-md text-[13px] font-medium text-slate-700 px-3 py-1.5 focus:ring-1 focus:ring-blue-100 text-center"
                                            />
                                        </td>
                                        <td className="px-2 py-3">
                                            <input 
                                                type="text"
                                                value={m.notes}
                                                onChange={(e) => handleInputChange(m.id, "notes", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[13px] font-medium text-slate-700 px-3 py-1.5 focus:ring-1 focus:ring-blue-100"
                                                placeholder="Notes"
                                            />
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            <input 
                                                type="date"
                                                value={m.next_review_due}
                                                onChange={(e) => handleInputChange(m.id, "next_review_due", e.target.value)}
                                                className={`w-full border-0 rounded-md text-[11px] px-3 py-1.5 font-bold focus:ring-1 focus:ring-blue-100 transition-all ${getDateClass(m.next_review_due)}`}
                                            />
                                        </td>
                                        <td className="px-2 py-3 text-right pr-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => deleteMeeting(m.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-md transition-all">
                                                    <Upload size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {data.meetings.length === 0 && (
                                    <tr>
                                        <td colSpan="9" className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-300">
                                                <Calendar size={40} strokeWidth={1} />
                                                <p className="text-[14px]">No logs found. Click below to add one.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button 
                            onClick={addMeeting}
                            className="bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-[13px] px-10 py-3 rounded-md flex items-center justify-center gap-2 transition-all shadow-sm"
                        >
                            <Plus size={16} strokeWidth={2.5} className="text-slate-400" />
                            Add New Meeting/Talk
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
