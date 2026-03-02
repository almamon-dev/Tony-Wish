import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    X,
    Edit2,
    ClipboardList,
    Users,
    Trash2,
    Plus,
    CheckCircle2,
    ChevronDown,
    Calendar,
    AlertCircle,
    Check,
    FileText,
    Tag,
    Settings2,
} from "lucide-react";

export default function CreateChecklistModal({ isOpen, onClose, auditors = [] }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState("Details");
    const [newAreaName, setNewAreaName] = useState("");
    const [selectedAuditor, setSelectedAuditor] = useState("");
    const [auditorRole, setAuditorRole] = useState("Auditor");
    const [activeAddingArea, setActiveAddingArea] = useState(null);
    const [newItemData, setNewItemData] = useState({ text: "", priority: "Major", isRequired: true });

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        iso_standard: "",
        audit_type: "",
        department: "",
        priority: "Medium",
        scheduled_date: "",
        description: "",
        objectives: "",
        audit_areas: [],
        audit_team: [],
    });

    const modalTabs = [
        { name: "Details", icon: <Edit2 size={16} /> },
        { name: "Checklist Items", icon: <ClipboardList size={16} /> },
        { name: "Audit Team", icon: <Users size={16} /> },
    ];

    const addAuditArea = () => {
        if (!newAreaName.trim()) return;
        setData("audit_areas", [
            ...data.audit_areas,
            { name: newAreaName, items: [] },
        ]);
        setNewAreaName("");
    };

    const removeAuditArea = (index) => {
        const updatedAreas = [...data.audit_areas];
        updatedAreas.splice(index, 1);
        setData("audit_areas", updatedAreas);
    };

    const addItemToArea = (areaIndex) => {
        setActiveAddingArea(areaIndex);
        setNewItemData({ text: "", priority: "Major", isRequired: true });
    };

    const confirmAddItem = (areaIndex) => {
        if (!newItemData.text.trim()) return;
        const updatedAreas = [...data.audit_areas];
        const tags = [];
        if (newItemData.priority !== "None") tags.push(newItemData.priority);
        if (newItemData.isRequired) tags.push("Required");
        
        updatedAreas[areaIndex].items.push({
            text: newItemData.text,
            tags: tags,
        });
        setData("audit_areas", updatedAreas);
        setActiveAddingArea(null);
    };

    const removeItemFromArea = (areaIndex, itemIndex) => {
        const updatedAreas = [...data.audit_areas];
        updatedAreas[areaIndex].items.splice(itemIndex, 1);
        setData("audit_areas", updatedAreas);
    };

    const updateItemText = (areaIndex, itemIndex, text) => {
        const updatedAreas = [...data.audit_areas];
        updatedAreas[areaIndex].items[itemIndex].text = text;
        setData("audit_areas", updatedAreas);
    };

    const toggleTag = (areaIndex, itemIndex, tag) => {
        const updatedAreas = [...data.audit_areas];
        const item = updatedAreas[areaIndex].items[itemIndex];
        const currentTags = item.tags || [];
        if (currentTags.includes(tag)) {
            item.tags = [];
        } else {
            item.tags = [tag];
        }
        setData("audit_areas", updatedAreas);
    };

    const addTeamMember = () => {
        if (!selectedAuditor) return;
        const auditor = auditors.find(a => a.id === parseInt(selectedAuditor));
        if (!auditor) return;
        
        if (data.audit_team.find(m => m.user_id === auditor.id)) return;

        setData("audit_team", [
            ...data.audit_team,
            { user_id: auditor.id, name: `${auditor.first_name} ${auditor.last_name}`, role: auditorRole },
        ]);
        setSelectedAuditor("");
    };

    const removeTeamMember = (userId) => {
        setData("audit_team", data.audit_team.filter((member) => member.user_id !== userId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("administrator.pre-audit-checklists.store"), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-[15px] shadow-xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 pb-2">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-[20px] font-bold text-slate-800">
                            Create Pre-Audit Checklist
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-slate-50 text-slate-400 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <p className="text-[13px] text-slate-500 font-medium">
                        Create a comprehensive checklist for pre-audit
                        assessment and compliance verification
                    </p>
                </div>

                {/* Modal Tabs */}
                <div className="px-6 flex items-center gap-2 mb-4">
                    {modalTabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setCurrentStep(tab.name)}
                            className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-sm text-[13px] font-bold transition-all border ${
                                currentStep === tab.name
                                    ? "bg-[#2185d5] text-white border-transparent"
                                    : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                            }`}
                        >
                            {tab.icon}
                            {tab.name}
                            {tab.name === "Checklist Items" && (
                                <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                                    {data.audit_areas.reduce((acc, area) => acc + area.items.length, 0)}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                    {currentStep === "Details" && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-1">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Checklist Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData("name", e.target.value)}
                                    placeholder="e.g ISO 9001 Pre-Audit checklist Q4 2025"
                                    className={`w-full h-10 bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-sm px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all`}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-0.5">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        ISO Standard{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={data.iso_standard}
                                            onChange={e => setData("iso_standard", e.target.value)}
                                            className={`w-full h-10 bg-slate-50 border ${errors.iso_standard ? 'border-red-500' : 'border-slate-200'} rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500`}
                                        >
                                            <option value="">Select ISO standard</option>
                                            <option>ISO 9001</option>
                                            <option>ISO 14001</option>
                                            <option>ISO 45001</option>
                                            <option>ISO 27001</option>
                                        </select>
                                    </div>
                                    {errors.iso_standard && <p className="text-red-500 text-xs mt-0.5">{errors.iso_standard}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Audit Type{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={data.audit_type}
                                            onChange={e => setData("audit_type", e.target.value)}
                                            className={`w-full h-10 bg-slate-50 border ${errors.audit_type ? 'border-red-500' : 'border-slate-200'} rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500`}
                                        >
                                            <option value="">Select audit type</option>
                                            <option>Internal Audit</option>
                                            <option>External Audit</option>
                                            <option>Surveillance Audit</option>
                                            <option>Certification Audit</option>
                                            <option>Pre-Assessment</option>
                                        </select>
                                    </div>
                                    {errors.audit_type && <p className="text-red-500 text-xs mt-0.5">{errors.audit_type}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={data.department}
                                            onChange={e => setData("department", e.target.value)}
                                            className="w-full h-10 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500"
                                        >
                                            <option value="">Select department</option>
                                            <option>All Departments</option>
                                            <option>Operations</option>
                                            <option>Quality Assurance</option>
                                            <option>Human Resources</option>
                                            <option>Information Technology</option>
                                            <option>Finance</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Priority Level
                                    </label>
                                    <div className="relative">
                                        <select 
                                            value={data.priority}
                                            onChange={e => setData("priority", e.target.value)}
                                            className="w-full h-10 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        >
                                            <option>Low Priority</option>
                                            <option>Medium Priority</option>
                                            <option>High Priority</option>
                                            <option>Urgent</option>
                                        </select>
                                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${
                                            data.priority === 'Urgent' ? 'bg-red-600' : 
                                            data.priority === 'High Priority' ? 'bg-orange-500' : 
                                            data.priority === 'Medium Priority' ? 'bg-amber-400' : 
                                            'bg-blue-400'
                                        }`} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Scheduled Date{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={data.scheduled_date}
                                        onChange={e => setData("scheduled_date", e.target.value)}
                                        className={`w-full h-10 bg-slate-50 border ${errors.scheduled_date ? 'border-red-500' : 'border-slate-200'} rounded-sm px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all`}
                                    />
                                </div>
                                {errors.scheduled_date && <p className="text-red-500 text-xs mt-0.5">{errors.scheduled_date}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={e => setData("description", e.target.value)}
                                    placeholder="Provide details about this audit checklist"
                                    rows={2}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Audit Objectives
                                </label>
                                <textarea
                                    value={data.objectives}
                                    onChange={e => setData("objectives", e.target.value)}
                                    placeholder="What are the main objectives of this audit?"
                                    rows={2}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-sm p-3 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {currentStep === "Checklist Items" && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Audit Areas
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newAreaName}
                                        onChange={e => setNewAreaName(e.target.value)}
                                        placeholder="Add new audit area (e.g., Risk Management)"
                                        className="flex-1 h-10 bg-slate-50 border border-slate-200 rounded-lg px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    />
                                    <button
                                        onClick={addAuditArea}
                                        className="bg-[#2185d5] text-white px-4 rounded-lg font-bold text-[12px] flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Add Area
                                    </button>
                                </div>
                                {errors.audit_areas && <p className="text-red-500 text-xs mt-1">{errors.audit_areas}</p>}
                            </div>

                            <div className="space-y-4">
                                {data.audit_areas.map((area, areaIndex) => (
                                    <div
                                        key={areaIndex}
                                        className="bg-white border border-slate-100 rounded-sm overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between p-4 bg-slate-50/50 border-b border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <FileText
                                                    size={16}
                                                    className="text-slate-400"
                                                />
                                                <input 
                                                    type="text"
                                                    value={area.name}
                                                    onChange={e => {
                                                        const updated = [...data.audit_areas];
                                                        updated[areaIndex].name = e.target.value;
                                                        setData("audit_areas", updated);
                                                    }}
                                                    className="bg-transparent border-none text-[14px] font-bold text-slate-700 p-0 focus:ring-0"
                                                />
                                                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px] font-bold text-slate-500">
                                                    {area.items.length} Items
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => removeAuditArea(areaIndex)}
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            {area.items.map((item, itemIndex) => (
                                                <div
                                                    key={itemIndex}
                                                    className="flex items-center gap-3 group bg-white hover:bg-slate-50/50 p-2 rounded-lg transition-all"
                                                >
                                                    <div className="w-5 h-5 rounded border border-slate-200 bg-slate-50 shrink-0" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[13px] text-slate-700 font-medium">
                                                                {item.text}
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                <div className="flex items-center gap-1">
                                                                    {item.tags.map((tag) => (
                                                                        <span
                                                                            key={tag}
                                                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                                                                                tag === "Critical"
                                                                                    ? "bg-[#e11d48] text-white" 
                                                                                    : tag === "Major"
                                                                                      ? "bg-slate-900 text-white" 
                                                                                      : "bg-white text-slate-600 border border-slate-200"
                                                                            }`}
                                                                        >
                                                                            {tag}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                                <button
                                                                    onClick={() => removeItemFromArea(areaIndex, itemIndex)}
                                                                    className="text-slate-400 hover:text-red-500 transition-all p-1"
                                                                >
                                                                    <X size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {activeAddingArea === areaIndex ? (
                                                <div className="mt-4 p-4 bg-blue-50/30 border border-blue-100 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <input 
                                                        type="text"
                                                        value={newItemData.text}
                                                        onChange={e => setNewItemData({...newItemData, text: e.target.value})}
                                                        placeholder="Enter check item..."
                                                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-[14px] focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                                                        autoFocus
                                                    />
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="relative">
                                                                <select 
                                                                    value={newItemData.priority}
                                                                    onChange={e => setNewItemData({...newItemData, priority: e.target.value})}
                                                                    className="h-9 bg-white border border-slate-200 rounded-lg pl-3 pr-8 text-[13px] font-medium appearance-none focus:ring-2 focus:ring-blue-500/10 outline-none"
                                                                >
                                                                    <option value="None">No Priority</option>
                                                                    <option value="Critical">Critical</option>
                                                                    <option value="Major">Major</option>
                                                                </select>
                                                                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                            </div>
                                                            <label className="flex items-center gap-2 cursor-pointer group">
                                                                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${newItemData.isRequired ? 'bg-slate-900 border-slate-900' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                                                                    <input 
                                                                        type="checkbox"
                                                                        className="hidden"
                                                                        checked={newItemData.isRequired}
                                                                        onChange={e => setNewItemData({...newItemData, isRequired: e.target.checked})}
                                                                    />
                                                                    {newItemData.isRequired && <Check size={14} className="text-white" />}
                                                                </div>
                                                                <span className="text-[13px] font-bold text-slate-700">Required</span>
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <button 
                                                                onClick={() => setActiveAddingArea(null)}
                                                                className="text-[13px] font-bold text-slate-600 hover:text-slate-900 transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button 
                                                                onClick={() => confirmAddItem(areaIndex)}
                                                                className="bg-slate-900 text-white px-5 py-2 rounded-lg font-bold text-[13px] hover:bg-slate-800 transition-all shadow-sm"
                                                            >
                                                                Add Item
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => addItemToArea(areaIndex)}
                                                    className="mt-2 flex items-center gap-2 text-[#2185d5] font-bold text-[13px] hover:underline px-2 py-1"
                                                >
                                                    <Plus size={16} />
                                                    Add Item
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === "Audit Team" && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-1">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Assign Audit Team{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <select 
                                            value={selectedAuditor}
                                            onChange={e => setSelectedAuditor(e.target.value)}
                                            className="w-full h-10 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[13px] appearance-none focus:ring-2 focus:ring-[#2185d5]/20 transition-all text-slate-600 font-medium"
                                        >
                                            <option value="">Select Auditor</option>
                                            {auditors.map(auditor => (
                                                <option key={auditor.id} value={auditor.id}>
                                                    {auditor.first_name} {auditor.last_name}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <div className="w-40 relative">
                                        <select 
                                            value={auditorRole}
                                            onChange={e => setAuditorRole(e.target.value)}
                                            className="w-full h-10 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[13px] appearance-none focus:ring-2 focus:ring-[#2185d5]/20 transition-all text-slate-600 font-medium"
                                        >
                                            <option>Auditor</option>
                                            <option>Lead Auditor</option>
                                            <option>Observer</option>
                                        </select>
                                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                    <button
                                        onClick={addTeamMember}
                                        type="button"
                                        className="bg-[#2185d5] text-white px-5 rounded-sm font-bold text-[13px] flex items-center gap-2 hover:bg-blue-600 transition-all shadow-md shadow-blue-500/10 active:scale-95"
                                    >
                                        <Plus size={16} />
                                        Add Member
                                    </button>
                                </div>
                            </div>

                            {data.audit_team.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <div className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center text-slate-300 mb-4">
                                        <AlertCircle size={28} />
                                    </div>
                                    <h4 className="text-[15px] font-bold text-slate-300 mb-1">
                                        No audit team members assigned
                                    </h4>
                                    <p className="text-[12px] text-slate-300 max-w-[200px]">
                                        Assign at least one auditor to continue
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {data.audit_team.map((member) => (
                                        <div
                                            key={member.user_id}
                                            className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-sm hover:border-[#2185d5]/30 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-sm bg-blue-50 flex items-center justify-center text-[#2185d5] font-bold text-[14px] border border-blue-100">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-slate-800 leading-none">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                                                        {member.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeTeamMember(member.user_id)}
                                                type="button"
                                                className="w-7 h-7 flex items-center justify-center rounded-sm text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-50 flex items-center justify-between bg-white pt-4">
                    <div className="flex items-center gap-2 text-[#2185d5] text-[13px] font-bold">
                        <CheckCircle2 size={16} />
                        Total: {data.audit_areas.length} audit areas with{" "}
                        {data.audit_areas.reduce(
                            (acc, area) => acc + area.items.length,
                            0,
                        )}{" "}
                        check items
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-sm font-bold text-[13px] text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={processing}
                            className="bg-[#2185d5] text-white px-6 py-2.5 rounded-sm font-bold text-[13px] flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all disabled:opacity-50"
                        >
                            {processing ? "Creating..." : <><CheckCircle2 size={18} /> Create Checklist</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
