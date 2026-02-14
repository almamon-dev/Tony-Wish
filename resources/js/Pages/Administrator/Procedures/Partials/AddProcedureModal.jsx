import React, { useState } from "react";
import {
    X,
    Edit2,
    ClipboardList,
    Users,
    FileText,
    ChevronDown,
    Calendar,
    Plus,
    UploadCloud,
    CheckCircle2,
} from "lucide-react";

export default function AddProcedureModal({
    isOpen,
    onClose,
    currentStep,
    setCurrentStep,
}) {
    if (!isOpen) return null;

    const [milestones, setMilestones] = useState([
        { id: 1, label: "Initial Assessment", date: "" },
        { id: 2, label: "Documentation Phase", date: "" },
        { id: 3, label: "Review & Approval", date: "" },
    ]);
    const [files, setFiles] = useState([]);

    const addMilestone = () => {
        setMilestones([
            ...milestones,
            { id: Date.now(), label: "New Milestone", date: "" },
        ]);
    };

    const modalTabs = [
        { name: "Details", icon: <Edit2 size={16} /> },
        { name: "Checklist", icon: <ClipboardList size={16} /> },
        { name: "Team", icon: <Users size={16} /> },
        { name: "Files", icon: <FileText size={16} /> },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-[15px] shadow-xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-8 pb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-[22px] font-bold text-slate-800">
                            Add New Procedure
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <p className="text-[13px] text-slate-500 font-medium">
                        Create a new ISO compliance procedure with tasks,
                        assignments, and documentation
                    </p>
                </div>

                {/* Modal Tabs */}
                <div className="px-8 flex items-center gap-2 mb-6">
                    {modalTabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setCurrentStep(tab.name)}
                            className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-[13px] font-bold transition-all border ${
                                currentStep === tab.name
                                    ? "bg-[#2185d5] text-white border-transparent"
                                    : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                            }`}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">
                    {currentStep === "Details" && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Procedure Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g Quality Management System implementation"
                                    className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        ISO Standard{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all">
                                            <option>Select ISO standard</option>
                                            <option>ISO 9001</option>
                                            <option>ISO 14001</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Category{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all">
                                            <option>Select category</option>
                                            <option>Planning</option>
                                            <option>Support</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Priority Level
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all">
                                            <option>Medium Priority</option>
                                            <option>High Priority</option>
                                            <option>Low Priority</option>
                                        </select>
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-400" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Due Date{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="mm/dd/yyyy"
                                            className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                        <Calendar
                                            size={16}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Provide a detailed description of this procedure.."
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Objectives
                                </label>
                                <textarea
                                    placeholder="What are the main objectives of this procedure?"
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Scope
                                </label>
                                <textarea
                                    placeholder="Define the scope and boundaries of this procedure...."
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-4 pt-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Milestones
                                </label>
                                <div className="space-y-3">
                                    {milestones.map((m, index) => (
                                        <div key={m.id} className="flex gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 text-[13px] font-bold">
                                                {index + 1}
                                            </div>
                                            <input
                                                type="text"
                                                value={m.label}
                                                onChange={(e) => {
                                                    const newMilestones = [
                                                        ...milestones,
                                                    ];
                                                    newMilestones[index].label =
                                                        e.target.value;
                                                    setMilestones(
                                                        newMilestones,
                                                    );
                                                }}
                                                className="flex-1 h-10 bg-slate-50 border-none rounded-lg px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                                placeholder="Milestone name"
                                            />
                                            <div className="relative w-40">
                                                <input
                                                    type="text"
                                                    placeholder="mm/dd/yyyy"
                                                    value={m.date}
                                                    onChange={(e) => {
                                                        const newMilestones = [
                                                            ...milestones,
                                                        ];
                                                        newMilestones[
                                                            index
                                                        ].date = e.target.value;
                                                        setMilestones(
                                                            newMilestones,
                                                        );
                                                    }}
                                                    className="w-full h-10 bg-slate-50 border-none rounded-lg px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                                />
                                                <Calendar
                                                    size={14}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                                />
                                            </div>
                                            {milestones.length > 1 && (
                                                <button
                                                    onClick={() =>
                                                        setMilestones(
                                                            milestones.filter(
                                                                (_, i) =>
                                                                    i !== index,
                                                            ),
                                                        )
                                                    }
                                                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={addMilestone}
                                        className="flex items-center gap-2 text-[#2185d5] font-bold text-[13px] hover:underline px-1"
                                    >
                                        <Plus size={14} />
                                        Add Milestone
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === "Checklist" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add new checklist item..."
                                    className="flex-1 h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                />
                                <button className="bg-[#2185d5] text-white px-5 rounded-xl font-bold text-[14px] flex items-center gap-2">
                                    <Plus size={18} />
                                    Add
                                </button>
                            </div>
                            <div className="space-y-3">
                                {[
                                    "Analyze current processes",
                                    "Identify compliance requirements",
                                    "Conduct gap analysis",
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-md border border-slate-200 flex items-center justify-center">
                                                <div className="w-2.5 h-2.5 rounded-sm bg-blue-500 opacity-0 group-hover:opacity-20 translate-y-px" />
                                            </div>
                                            <span className="text-[14px] font-medium text-slate-700">
                                                {item}
                                            </span>
                                        </div>
                                        <button className="text-slate-300 hover:text-red-500 p-1">
                                            <FileText size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === "Team" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Assign Team Members{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 pr-10 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all">
                                            <option>Select team member</option>
                                            <option>Tom Wilson</option>
                                            <option>Sarah Johnson</option>
                                        </select>
                                    </div>
                                    <button className="bg-slate-800 text-white px-6 rounded-xl font-bold text-[13px] flex items-center gap-2">
                                        <Plus size={16} />
                                        Add
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50/50 rounded-[24px] border border-dashed border-slate-200">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-4">
                                    <Users size={28} />
                                </div>
                                <h4 className="text-[15px] font-bold text-slate-700 mb-1">
                                    No team members assigned
                                </h4>
                                <p className="text-[13px] text-slate-400 max-w-[240px]">
                                    Assign members who will be responsible for
                                    this procedure
                                </p>
                            </div>
                        </div>
                    )}

                    {currentStep === "Files" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div
                                onClick={() =>
                                    document
                                        .getElementById("file-upload")
                                        .click()
                                }
                                className="border-2 border-dashed border-slate-100 rounded-[24px] p-12 flex flex-col items-center justify-center text-center bg-slate-50/30 group hover:border-blue-100 transition-all cursor-pointer"
                            >
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            const newFiles = Array.from(
                                                e.target.files,
                                            );
                                            setFiles((prev) => [
                                                ...prev,
                                                ...newFiles,
                                            ]);
                                        }
                                    }}
                                />
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 transition-transform">
                                    <UploadCloud size={32} />
                                </div>
                                <h4 className="text-[16px] font-bold text-slate-700 mb-2">
                                    Drag and drop file here, or click to browse
                                </h4>
                                <button className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-2.5 rounded-xl font-bold text-[14px] shadow-sm hover:bg-slate-50 transition-all mb-4">
                                    <Plus size={18} className="text-blue-500" />
                                    Upload Files
                                </button>
                                <p className="text-[12px] text-slate-400">
                                    Supported formats: PDF, DOC, CSV, XLS (PDF,
                                    DOCS, JPEG)
                                </p>
                            </div>

                            {files.length > 0 && (
                                <div className="space-y-3">
                                    <h4 className="text-[14px] font-bold text-slate-700">
                                        Uploaded Files
                                    </h4>
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-slate-700">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400">
                                                        {(
                                                            file.size / 1024
                                                        ).toFixed(2)}{" "}
                                                        KB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setFiles(
                                                        files.filter(
                                                            (_, i) =>
                                                                i !== index,
                                                        ),
                                                    )
                                                }
                                                className="text-slate-300 hover:text-red-500 transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-8 border-t border-slate-50 flex items-center justify-end gap-3 bg-white">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-[14px] text-slate-500 hover:bg-slate-50 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="bg-[#2185d5] text-white px-8 py-3 rounded-xl font-bold text-[14px] flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
                        <CheckCircle2 size={18} />
                        Create Procedure
                    </button>
                </div>
            </div>
        </div>
    );
}
