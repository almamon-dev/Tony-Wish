import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
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
    Trash2,
} from "lucide-react";

export default function AddProcedureModal({
    isOpen,
    onClose,
    currentStep,
    setCurrentStep,
    users = [],
    procedure = null, // Add this prop
}) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        name: "",
        iso_standard: "",
        category: "",
        priority: "Medium Priority",
        due_date: "",
        description: "",
        objectives: "",
        scope: "",
        checklist: [],
        team_members: [],
        assigned_to: "",
    });

    useEffect(() => {
        if (isOpen) {
            setCurrentStep("Details"); // Reset to Details tab when modal opens
            if (procedure) {
                reset({
                    name: procedure.name || "",
                    iso_standard: procedure.iso_standard || "",
                    category: procedure.category || "",
                    priority: procedure.priority || "Medium Priority",
                    due_date: procedure.raw_due_date || "",
                    description: procedure.description || "",
                    objectives: procedure.objectives || "",
                    scope: procedure.scope || "",
                    checklist: procedure.checklist || [],
                    team_members: procedure.team_members || [],
                    assigned_to: procedure.assigned_to || "",
                });
            } else {
                reset({
                    name: "",
                    iso_standard: "",
                    category: "",
                    priority: "Medium Priority",
                    due_date: "",
                    description: "",
                    objectives: "",
                    scope: "",
                    checklist: [],
                    team_members: [],
                    assigned_to: "",
                });
            }
        }
    }, [procedure, isOpen]);

    const [milestones, setMilestones] = useState([
        { id: 1, label: "Initial Assessment", date: "" },
    ]);
    const [newItem, setNewItem] = useState("");
    const [selectedMember, setSelectedMember] = useState("");
    const [files, setFiles] = useState([]);

    if (!isOpen) return null;

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

    const addChecklistItem = () => {
        if (!newItem.trim()) return;
        setData("checklist", [...data.checklist, newItem]);
        setNewItem("");
    };

    const removeChecklistItem = (index) => {
        setData("checklist", data.checklist.filter((_, i) => i !== index));
    };

    const addMember = () => {
        if (!selectedMember || selectedMember === "Select team member") return;
        const member = users.find(u => u.id === parseInt(selectedMember));
        if (!member) return;
        if (data.team_members.some((m) => m.id === member.id)) return;
        setData("team_members", [...data.team_members, member]);
        // Also set the primary assigned_to to the first member added
        if (!data.assigned_to) {
            setData({
                ...data,
                team_members: [...data.team_members, member],
                assigned_to: member.id
            });
        }
        setSelectedMember("");
    };

    const removeMember = (memberId) => {
        const newMembers = data.team_members.filter((m) => m.id !== memberId);
        setData({
            ...data,
            team_members: newMembers,
            assigned_to: newMembers.length > 0 ? newMembers[0].id : ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (procedure) {
            patch(route("administrator.procedures.update", procedure.id), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        } else {
            post(route("administrator.procedures.store"), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <form 
                onSubmit={handleSubmit}
                className="relative bg-white rounded-sm shadow-xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col"
            >
                {/* Modal Header */}
                <div className="p-8 pb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-[22px] font-bold text-slate-800">
                            {procedure ? "Edit Procedure" : "Add New Procedure"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-slate-50 text-slate-400 transition-all"
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
                            type="button"
                            onClick={() => setCurrentStep(tab.name)}
                            className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-sm text-[13px] font-bold transition-all border ${
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
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    placeholder="e.g Quality Management System implementation"
                                    className={`w-full h-12 bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-none'} rounded-sm px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all font-bold`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        ISO Standard{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={data.iso_standard}
                                            onChange={(e) => setData("iso_standard", e.target.value)}
                                            className={`w-full h-12 bg-slate-50 border ${errors.iso_standard ? 'border-red-500' : 'border-none'} rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-slate-600`}
                                        >
                                            <option value="">Select ISO standard</option>
                                            <option>ISO 9001</option>
                                            <option>ISO 14001</option>
                                        </select>
                                       
                                    </div>
                                    {errors.iso_standard && <p className="text-red-500 text-xs mt-1">{errors.iso_standard}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Category{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={data.category}
                                            onChange={(e) => setData("category", e.target.value)}
                                            className={`w-full h-12 bg-slate-50 border ${errors.category ? 'border-red-500' : 'border-none'} rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-slate-600`}
                                        >
                                            <option value="">Select category</option>
                                            <option>Planning</option>
                                            <option>Support</option>
                                        </select>
                                       
                                    </div>
                                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Priority Level
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={data.priority}
                                            onChange={(e) => setData("priority", e.target.value)}
                                            className="w-full h-12 bg-slate-50 border-none rounded-sm px-10 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-slate-600"
                                        >
                                            <option>Medium Priority</option>
                                            <option>High Priority</option>
                                            <option>Low Priority</option>
                                        </select>
                                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${data.priority === 'High Priority' ? 'bg-red-500' : data.priority === 'Medium Priority' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                                       
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Due Date{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            value={data.due_date}
                                            onChange={(e) => setData("due_date", e.target.value)}
                                            className={`w-full h-12 bg-slate-50 border ${errors.due_date ? 'border-red-500' : 'border-none'} rounded-sm px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-slate-600`}
                                        />
                                    </div>
                                    {errors.due_date && <p className="text-red-500 text-xs mt-1">{errors.due_date}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Provide a detailed description of this procedure.."
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-sm p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Objectives
                                </label>
                                <textarea
                                    value={data.objectives}
                                    onChange={(e) => setData("objectives", e.target.value)}
                                    placeholder="What are the main objectives of this procedure?"
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-sm p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-medium"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Scope
                                </label>
                                <textarea
                                    value={data.scope}
                                    onChange={(e) => setData("scope", e.target.value)}
                                    placeholder="Define the scope and boundaries of this procedure...."
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-sm p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-medium"
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
                                                    type="date"
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
                                               
                                            </div>
                                            {milestones.length > 1 && (
                                                <button
                                                    type="button"
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
                                        type="button"
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
                                    value={newItem}
                                    onChange={(e) => setNewItem(e.target.value)}
                                    placeholder="Add new checklist item..."
                                    className="flex-1 h-12 bg-slate-50 border-none rounded-sm px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all font-bold"
                                />
                                <button 
                                    type="button"
                                    onClick={addChecklistItem}
                                    className="bg-[#2185d5] text-white px-5 rounded-sm font-bold text-[14px] flex items-center gap-2 hover:bg-blue-600 transition-all active:scale-95"
                                >
                                    <Plus size={18} />
                                    Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {data.checklist.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-sm group hover:border-slate-200 transition-all shadow-sm"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-[14px] font-bold text-slate-600">
                                                {item}
                                            </span>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => removeChecklistItem(i)}
                                            className="text-slate-300 hover:text-red-500 p-1.5 hover:bg-red-50 rounded transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === "Team" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-1">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Assign Team Members{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <select 
                                            value={selectedMember}
                                            onChange={(e) => setSelectedMember(e.target.value)}
                                            className="w-full h-12 bg-slate-50 border-none rounded-sm px-4 pr-10 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold text-slate-600"
                                        >
                                            <option value="">Select team member</option>
                                            {users.map((u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u.name} ({u.user_type === 'administrator' ? 'Admin' : 'User'})
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={addMember}
                                        className="bg-slate-900 text-white px-8 rounded-sm font-bold text-[13px] flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
                                    >
                                        <Plus size={16} />
                                        Add
                                    </button>
                                </div>
                            </div>

                            {data.team_members.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50/50 rounded-[12px] border border-dashed border-slate-200">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
                                        <Users size={28} />
                                    </div>
                                    <h4 className="text-[15px] font-bold text-slate-700 mb-1">
                                        No team members assigned
                                    </h4>
                                    <p className="text-[13px] text-slate-400 max-w-[240px] font-medium">
                                        Assign members who will be responsible for
                                        this procedure
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {data.team_members.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-sm hover:border-blue-100 transition-all shadow-sm group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-sm bg-[#58c0ff] flex items-center justify-center text-white font-black text-[15px] uppercase">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-slate-700 leading-none">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-[11px] font-bold text-slate-400 mt-1.5 uppercase tracking-tighter">
                                                        Active Team Member
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeMember(member.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-sm text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                <button 
                                    type="button"
                                    className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-2.5 rounded-sm font-bold text-[14px] shadow-sm hover:bg-slate-50 transition-all mb-4">
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
                                            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-sm"
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
                                                type="button"
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
                <div className="p-8 border-t border-slate-50 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                        {currentStep !== "Details" && (
                            <button
                                type="button"
                                onClick={() => {
                                    const currentIndex = modalTabs.findIndex(t => t.name === currentStep);
                                    if (currentIndex > 0) setCurrentStep(modalTabs[currentIndex - 1].name);
                                }}
                                className="px-6 py-3 rounded-sm font-bold text-[14px] text-slate-500 hover:bg-slate-50 transition-all border border-slate-100"
                            >
                                Previous
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-sm font-bold text-[14px] text-slate-400 hover:text-slate-600 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {currentStep !== "Files" ? (
                            <button
                                type="button"
                                onClick={() => {
                                    const currentIndex = modalTabs.findIndex(t => t.name === currentStep);
                                    if (currentIndex < modalTabs.length - 1) setCurrentStep(modalTabs[currentIndex + 1].name);
                                }}
                                className="bg-slate-800 text-white px-8 py-3 rounded-sm font-bold text-[14px] flex items-center gap-2 hover:bg-slate-900 transition-all"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button 
                            type="submit"
                            disabled={processing}
                            className="bg-[#2185d5] text-white px-8 py-3 rounded-sm font-bold text-[14px] flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all disabled:opacity-50"
                        >
                            {processing ? (procedure ? "Saving..." : "Creating...") : (
                                <>
                                    <CheckCircle2 size={18} /> 
                                    {procedure ? "Save Changes" : "Create Procedure"}
                                </>
                            )}
                        </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
