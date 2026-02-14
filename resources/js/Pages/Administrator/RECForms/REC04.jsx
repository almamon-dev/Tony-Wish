import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    AlertTriangle,
    Upload,
    Calendar,
    Users,
    Trash2,
    MoreHorizontal,
    Plus,
} from "lucide-react";

export default function REC04() {
    const alerts = {
        expired: 2,
        expiringSoon: 1,
        valid: 14,
    };

    const meetings = [
        {
            id: 1,
            date: "8/10/2025",
            type: "Toolbox Talk",
            topic: "PPE Compliance",
            facilitator: "John Walsh",
            attendees: 12,
            actionsRaised: 2,
            notes: "Gloves non-compliance noted",
            nextReview: "N/A",
        },
        {
            id: 2,
            date: "8/10/2025",
            type: "Safety Meeting",
            topic: "See Attached",
            facilitator: "Trevor Wilson",
            attendees: 6,
            actionsRaised: 1,
            notes: "Review previous actions",
            nextReview: "9/12/2025",
        },
        {
            id: 3,
            date: "8/10/2025",
            type: "Safety Meeting",
            topic: "See Attached",
            facilitator: "Trevor Wilson",
            attendees: 6,
            actionsRaised: 1,
            notes: "Review previous actions",
            nextReview: "9/12/2025",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-04 - Toolbox Talks & Meetings" />

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
                            REC-04: Toolbox Talks & Meetings
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

                {/* Alerts Section */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h3 className="text-slate-800 font-bold text-sm mb-1">
                                Training Expiry Alerts
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.expired} Expired
                                </span>
                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.expiringSoon} Expiry soon
                                </span>
                                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {alerts.valid} Valid
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-200 text-amber-700 rounded-lg text-xs font-bold hover:bg-amber-100/50 transition-colors">
                            <Upload size={14} />
                            Upload Toolbox Talk Template
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-200 text-amber-700 rounded-lg text-xs font-bold hover:bg-amber-100/50 transition-colors">
                            <Upload size={14} />
                            Upload Safety Meeting Template
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Topic
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Facilitator
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Attendees
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Actions Raised
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Notes
                                    </th>
                                    <th className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Next Review Due
                                    </th>
                                    <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {meetings.map((meeting) => (
                                    <tr
                                        key={meeting.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-3">
                                            <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-1 rounded">
                                                {meeting.date}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <select
                                                className="bg-transparent border-none text-[13px] font-medium text-slate-700 p-0 focus:ring-0 cursor-pointer"
                                                defaultValue={meeting.type}
                                            >
                                                <option>Toolbox Talk</option>
                                                <option>Safety Meeting</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-slate-700">
                                            {meeting.topic}
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-slate-700">
                                            {meeting.facilitator}
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-slate-700">
                                            {meeting.attendees}
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-slate-700">
                                            {meeting.actionsRaised}
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-slate-700">
                                            {meeting.notes}
                                        </td>
                                        <td className="px-6 py-3 text-[13px] font-medium text-slate-500">
                                            {meeting.nextReview}
                                        </td>
                                        <td className="px-6 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#2185d5] hover:bg-blue-50 transition-all">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Add New Button */}
                    <div className="p-4 border-t border-slate-100">
                        <button className="w-full py-3 rounded-xl border border-slate-200 border-dashed text-slate-500 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                            <Plus size={18} />
                            Add New Meeting/Talk
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
