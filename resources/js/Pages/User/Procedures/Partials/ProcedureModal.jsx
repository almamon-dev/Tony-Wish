import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
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

export default function ProcedureModal({ procedure, onClose, defaultTab = "Overview" }) {
    const { data, setData, post, processing, progress: uploadProgress } = useForm({
        status: procedure.raw_status || 'in_progress',
        progress: procedure.progress || 0,
        file: null,
        _method: 'PATCH'
    });

    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
        }
    };

    const handleSave = () => {
        post(route('user.procedures.update', procedure.id), {
            onSuccess: () => {
                // Optionally handle success (e.g., notification)
            },
            forceFormData: true,
        });
    };

    const handleDownload = (fileName, isLocal = false) => {
        if (isLocal && data.file) {
            const url = URL.createObjectURL(data.file);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            return;
        }

        if (procedure.uploaded_file_path && fileName === procedure.uploaded_file_name) {
            window.open(`/storage/${procedure.uploaded_file_path}`, '_blank');
            return;
        }

        alert(`Downloading: ${fileName} (Official system documentation)`);
    };

    if (!procedure) return null;

    const renderTabContent = () => {
        if (activeTab.startsWith("Task")) {
            return (
                <div className="space-y-4 pt-4">
                    {procedure.checklist && procedure.checklist.length > 0 ? (
                        procedure.checklist.map((task, i) => (
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
                                            {task.title || task}
                                        </p>
                                        <p className="text-[11px] font-medium text-slate-400">
                                            Status: {task.completed ? 'Completed' : 'Pending'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold ${task.completed ? 'text-emerald-500' : 'text-amber-500'}`}>
                                        {task.completed ? 'Completed' : 'In Progress'}
                                    </span>
                                    <ChevronRight
                                        size={18}
                                        className="text-slate-300 group-hover:translate-x-1 transition-transform"
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-400 font-medium">
                            No tasks found in the checklist.
                        </div>
                    )}
                </div>
            );
        }
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
            case "Requirements":
                return (
                    <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                            <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                Description
                            </h3>
                            <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                                <p className="text-[12px] text-slate-600 leading-relaxed">
                                    {procedure.desc}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                    Objectives
                                </h3>
                                <div className="bg-slate-50/30 p-5 rounded-2xl border border-dashed border-slate-200 min-h-[120px]">
                                    <p className="text-[12px] text-slate-500 leading-relaxed italic">
                                        {procedure.objectives}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                                    Scope
                                </h3>
                                <div className="bg-slate-50/30 p-5 rounded-2xl border border-dashed border-slate-200 min-h-[120px]">
                                    <p className="text-[12px] text-slate-500 leading-relaxed italic">
                                        {procedure.scope}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "Upload":
                return (
                    <div className="space-y-6 pt-4">
                        <div>
                            <p className="text-[13px] font-bold text-slate-800">
                                Upload Proof of Completion
                            </p>
                            <p className="text-[11px] font-medium text-slate-400 mt-1">
                                Please upload the completed documentation or evidence for this procedure.
                            </p>
                        </div>

                        <div 
                            className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/30 hover:border-[#2c8af8]/40 transition-all cursor-pointer group"
                            onClick={() => document.getElementById('procedure-file-upload').click()}
                        >
                            <input 
                                type="file" 
                                id="procedure-file-upload" 
                                className="hidden" 
                                onChange={handleFileChange}
                            />
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:text-[#2c8af8] group-hover:scale-110 transition-all">
                                <Upload size={24} />
                            </div>
                            
                            {data.file ? (
                                <div className="text-center">
                                    <p className="text-[14px] font-bold text-[#2c8af8]">
                                        {data.file.name}
                                    </p>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        {(data.file.size / 1024 / 1024).toFixed(2)} MB • Ready to upload
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-[13px] font-bold text-slate-700">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">
                                        PDF, DOC, DOCX, ZIP (max 10MB)
                                    </p>
                                </>
                            )}
                            
                            <button className="mt-6 px-6 py-2.5 bg-[#2c8af8] hover:bg-blue-600 text-white rounded-xl text-[13px] font-bold transition-all shadow-lg shadow-blue-500/20">
                                {data.file ? 'Change File' : 'Choose File'}
                            </button>

                            {uploadProgress && (
                                <div className="w-full mt-4 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                        className="bg-[#2c8af8] h-full transition-all duration-300"
                                        style={{ width: `${uploadProgress.percentage}%` }}
                                    ></div>
                                </div>
                            )}
                        </div>

                        {/* Display existing file if any */}
                        {procedure.uploaded_file_path && !data.file && (
                            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white text-emerald-500 flex items-center justify-center">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-800">
                                            {procedure.uploaded_file_name}
                                        </p>
                                        <p className="text-[11px] font-medium text-emerald-600">
                                            Uploaded on {procedure.uploaded_at}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDownload(procedure.uploaded_file_name)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        )}

                        {/* Recent Upload (Current Selection) */}
                        {data.file && (
                            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white text-[#2c8af8] flex items-center justify-center">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-slate-800">
                                            {data.file.name}
                                        </p>
                                        <p className="text-[11px] font-medium text-[#2c8af8]">
                                            New file ready for submission
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleDownload(data.file.name, true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
                                >
                                    <Download size={14} /> Download
                                </button>
                            </div>
                        )}
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
                        {["Overview", `Task (${procedure.checklist ? procedure.checklist.length : 0})`, "Requirements", "Upload"].map(
                            (tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 text-[13px] font-bold transition-all relative ${
                                        activeTab.startsWith("Task") && tab.startsWith("Task") || activeTab === tab
                                            ? "text-[#2c8af8]"
                                            : "text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {tab}
                                    {(activeTab.startsWith("Task") && tab.startsWith("Task") || activeTab === tab) && (
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
                    <button
                        onClick={handleSave}
                        disabled={processing}
                        className={`px-8 py-2.5 bg-[#2c8af8] hover:bg-blue-600 text-white rounded-xl text-[13px] font-bold transition-all shadow-lg shadow-blue-500/20 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}
