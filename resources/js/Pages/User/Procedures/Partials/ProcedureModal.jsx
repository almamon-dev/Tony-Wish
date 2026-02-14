import React, { useState } from "react";
import {
    FileText,
    Calendar,
    Users,
    Download,
    Upload,
    X,
    CheckCircle2,
    ClipboardList,
    ChevronRight,
} from "lucide-react";

export default function ProcedureModal({ procedure, onClose }) {
    const [activeTab, setActiveTab] = useState("Overview");

    if (!procedure) return null;

    const renderTabContent = () => {
        switch (activeTab) {
            case "Overview":
                return (
                    <div className="space-y-6 pt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
                                    <Calendar size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Due Date
                                    </p>
                                    <p className="text-[13px] font-bold text-slate-700">
                                        {procedure.due}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                                    <ClipboardList size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Tasks
                                    </p>
                                    <p className="text-[13px] font-bold text-slate-700">
                                        {procedure.tasks}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                                    <Users size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Assigned By
                                    </p>
                                    <p className="text-[13px] font-bold text-slate-700">
                                        {procedure.assignedBy}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                    <CheckCircle2 size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        Progress
                                    </p>
                                    <p className="text-[13px] font-bold text-slate-700">
                                        {procedure.progress}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[12px] font-bold text-slate-800">
                                    Overall Progress
                                </span>
                                <span className="text-[12px] font-bold text-slate-400">
                                    {procedure.progress}%
                                </span>
                            </div>
                            <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: `${procedure.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                );
            case "Task (2)":
                return (
                    <div className="space-y-4 pt-4">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 group cursor-pointer hover:bg-white transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-700">
                                            Task {i}: Review Quality Standards
                                        </p>
                                        <p className="text-[11px] font-medium text-slate-400">
                                            Assigned 2 days ago
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-amber-500">
                                        In Progress
                                    </span>
                                    <ChevronRight
                                        size={18}
                                        className="text-slate-300 group-hover:translate-x-1 transition-transform"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case "Requirements":
                return (
                    <div className="space-y-4 pt-4">
                        <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 mb-4">
                            <p className="text-[12px] text-slate-500 leading-relaxed">
                                {procedure.desc}
                            </p>
                        </div>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-700">
                                            PDF.file
                                        </p>
                                        <p className="text-[11px] font-medium text-slate-400 underline decoration-slate-200 underline-offset-4">
                                            Access complete procedure manuals,
                                            templates, and guidelines
                                        </p>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        ))}
                    </div>
                );
            case "Upload":
                return (
                    <div className="space-y-6 pt-4">
                        <div>
                            <p className="text-[13px] font-bold text-slate-800">
                                Upload New Document
                            </p>
                            <p className="text-[11px] font-medium text-slate-400 mt-1">
                                upload files related to your assigned procedures
                            </p>
                        </div>

                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/30">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
                                <Upload size={24} />
                            </div>
                            <p className="text-[13px] font-bold text-slate-700">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
                                PDF, DOC, DOCX, XLS, XLSX (max 10MB)
                            </p>
                            <button className="mt-6 px-6 py-2.5 bg-[#2c8af8] hover:bg-blue-600 text-white rounded-xl text-[13px] font-bold transition-all shadow-lg shadow-blue-500/20">
                                Choose File
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-blue-50/30 rounded-2xl border border-blue-50 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white border border-blue-100 text-[#2c8af8] flex items-center justify-center">
                                    <Download size={20} />
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-slate-800">
                                        Download ISO 9001 Documentation
                                    </p>
                                    <p className="text-[11px] font-medium text-[#2c8af8]">
                                        Access complete procedure manuals,
                                        templates, and guidelines
                                    </p>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all">
                                <Download size={14} /> Download
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            <div className="relative bg-white w-full max-w-3xl rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Modal Header */}
                <div className="p-6 pb-0">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2c8af8] flex items-center justify-center">
                                <FileText size={20} />
                            </div>
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-[20px] font-bold text-slate-800">
                                        {procedure.id} - {procedure.name}
                                    </h2>
                                    <span
                                        className={`px-3 py-0.5 text-white text-[10px] font-bold rounded-full uppercase ${
                                            procedure.status === "Completed"
                                                ? "bg-emerald-500"
                                                : "bg-blue-500"
                                        }`}
                                    >
                                        {procedure.status}
                                    </span>
                                </div>
                                <p className="text-[11px] font-medium text-slate-400 mt-1 max-w-xl line-clamp-1">
                                    {procedure.desc}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Modal Tabs */}
                    <div className="flex items-center gap-2 border-b border-slate-50">
                        {["Overview", "Task (2)", "Requirements", "Upload"].map(
                            (tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 text-[13px] font-bold transition-all relative ${
                                        activeTab === tab
                                            ? "text-[#2c8af8]"
                                            : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2c8af8]"></div>
                                    )}
                                </button>
                            ),
                        )}
                    </div>
                </div>

                {/* Modal Body */}
                <div className="p-8 overflow-y-auto flex-1">
                    {renderTabContent()}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-50 flex justify-end gap-3 bg-slate-50/10">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[13px] font-bold hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="px-8 py-2.5 bg-[#2c8af8] hover:bg-blue-600 text-white rounded-xl text-[13px] font-bold transition-all shadow-lg shadow-blue-500/20">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
