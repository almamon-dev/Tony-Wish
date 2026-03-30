import React, { useState, useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, useForm, router } from "@inertiajs/react";
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
    ArrowLeft,
} from "lucide-react";

export default function EditChecklist({ checklist, auditors = [] }) {
    const [currentStep, setCurrentStep] = useState("Details");
    const [newAreaName, setNewAreaName] = useState("");
    const [selectedAuditor, setSelectedAuditor] = useState("");
    const [auditorRole, setAuditorRole] = useState("Auditor");
    const [activeAddingArea, setActiveAddingArea] = useState(null);
    const [newItemData, setNewItemData] = useState({ text: "", priority: "Major", isRequired: true });

    const { data, setData, put, processing, errors } = useForm({
        name: checklist.name || "",
        iso_standard: checklist.iso_standard || "",
        audit_type: checklist.audit_type || "",
        department: checklist.department || "",
        priority: checklist.priority || "Medium",
        scheduled_date: checklist.scheduled_date || "",
        description: checklist.description || "",
        objectives: checklist.objectives || "",
        audit_areas: checklist.areas?.map(area => ({
            name: area.name,
            items: area.items?.map(item => ({
                text: item.text,
                tags: item.tags || []
            })) || []
        })) || [],
        audit_team: checklist.team?.map(member => ({
            user_id: member.user_id,
            name: member.user ? `${member.user.first_name} ${member.user.last_name}` : 'Unknown',
            role: member.role
        })) || [],
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
        put(route("administrator.pre-audit-checklists.update", checklist.id));
    };

    return (
        <AdministratorLayout>
            <Head title={`Edit - ${checklist.name}`} />

            <div className="max-w-5xl mx-auto py-4 space-y-4 pb-12">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => router.get(route('administrator.pre-audit-checklists.index'))}
                            className="w-10 h-10 flex items-center justify-center rounded-sm bg-white border border-slate-100 text-slate-400 hover:text-slate-600 transition-all shadow-sm"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-[24px] font-bold text-slate-800 tracking-tight leading-none">
                                Edit Pre-Audit Checklist
                            </h1>
                            <p className="text-[13px] text-slate-500 font-medium mt-1">
                                Modify checklist details, items, and assigned team
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden flex flex-col min-h-[70vh]">
                    {/* Tabs */}
                    <div className="px-6 py-3 flex items-center gap-2 border-b border-slate-50 bg-slate-50/30">
                        {modalTabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setCurrentStep(tab.name)}
                                className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-md text-[12px] font-bold transition-all border ${
                                    currentStep === tab.name
                                        ? "bg-[#2185d5] text-white border-transparent shadow-sm"
                                        : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50 uppercase tracking-tight"
                                }`}
                            >
                                {tab.icon}
                                {tab.name}
                                {tab.name === "Checklist Items" && (
                                    <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] ${currentStep === tab.name ? 'bg-white/20' : 'bg-slate-100 text-slate-400'}`}>
                                        {data.audit_areas.reduce((acc, area) => acc + area.items.length, 0)}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                        {currentStep === "Details" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300 max-w-3xl">
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Checklist Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData("name", e.target.value)}
                                        className={`w-full h-12 bg-slate-50 border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-sm px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            ISO Standard <span className="text-red-500">*</span>
                                        </label>
                                        <select 
                                            value={data.iso_standard}
                                            onChange={e => setData("iso_standard", e.target.value)}
                                            className={`w-full h-12 bg-slate-50 border ${errors.iso_standard ? 'border-red-500' : 'border-slate-200'} rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-600 font-medium`}
                                        >
                                            <option value="">Select ISO standard</option>
                                            <option>ISO 9001</option>
                                            <option>ISO 14001</option>
                                            <option>ISO 45001</option>
                                            <option>ISO 27001</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Audit Type <span className="text-red-500">*</span>
                                        </label>
                                        <select 
                                            value={data.audit_type}
                                            onChange={e => setData("audit_type", e.target.value)}
                                            className={`w-full h-12 bg-slate-50 border ${errors.audit_type ? 'border-red-500' : 'border-slate-200'} rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-600 font-medium`}
                                        >
                                            <option value="">Select audit type</option>
                                            <option>Internal Audit</option>
                                            <option>External Audit</option>
                                            <option>Surveillance Audit</option>
                                            <option>Certification Audit</option>
                                            <option>Pre-Assessment</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Department
                                        </label>
                                        <select 
                                            value={data.department}
                                            onChange={e => setData("department", e.target.value)}
                                            className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-600 font-medium"
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
                                    <div className="space-y-1">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Priority Level
                                        </label>
                                        <select 
                                            value={data.priority}
                                            onChange={e => setData("priority", e.target.value)}
                                            className="w-full h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-600 font-medium"
                                        >
                                            <option>Low Priority</option>
                                            <option>Medium Priority</option>
                                            <option>High Priority</option>
                                            <option>Urgent</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Scheduled Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.scheduled_date}
                                        onChange={e => setData("scheduled_date", e.target.value)}
                                        className={`w-full h-12 bg-slate-50 border ${errors.scheduled_date ? 'border-red-500' : 'border-slate-200'} rounded-sm px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all`}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Description
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData("description", e.target.value)}
                                        rows={4}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === "Checklist Items" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Audit Areas
                                    </label>
                                    <div className="flex gap-2 max-w-md">
                                        <input
                                            type="text"
                                            value={newAreaName}
                                            onChange={e => setNewAreaName(e.target.value)}
                                            placeholder="Add new audit area"
                                            className="flex-1 h-11 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                        <button
                                            onClick={addAuditArea}
                                            className="bg-[#2185d5] text-white px-5 rounded-sm font-bold text-[13px] flex items-center gap-2"
                                        >
                                            <Plus size={16} />
                                            Add Area
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6">
                                    {data.audit_areas.map((area, areaIndex) => (
                                        <div
                                            key={areaIndex}
                                            className="bg-white border border-slate-100 rounded-sm overflow-hidden"
                                        >
                                            <div className="flex items-center justify-between p-4 bg-slate-50/50 border-b border-slate-100">
                                                <div className="flex items-center gap-2">
                                                    <FileText size={16} className="text-slate-400" />
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
                                            <div className="p-5 space-y-4">
                                                {area.items.map((item, itemIndex) => (
                                                    <div
                                                        key={itemIndex}
                                                        className="flex items-center gap-3 bg-white hover:bg-slate-50/50 p-3 rounded-sm border border-transparent hover:border-slate-100 transition-all group"
                                                    >
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <input 
                                                                    type="text"
                                                                    value={item.text}
                                                                    onChange={e => {
                                                                        const updated = [...data.audit_areas];
                                                                        updated[areaIndex].items[itemIndex].text = e.target.value;
                                                                        setData("audit_areas", updated);
                                                                    }}
                                                                    className="bg-transparent border-none text-[13px] text-slate-700 font-medium p-0 focus:ring-0 flex-1"
                                                                />
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
                                                                        className="text-slate-300 hover:text-red-500 transition-all p-1"
                                                                    >
                                                                        <X size={16} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {activeAddingArea === areaIndex ? (
                                                    <div className="mt-4 p-5 bg-blue-50/30 border border-blue-100 rounded-sm space-y-4">
                                                        <input 
                                                            type="text"
                                                            value={newItemData.text}
                                                            onChange={e => setNewItemData({...newItemData, text: e.target.value})}
                                                            placeholder="Enter check item..."
                                                            className="w-full bg-white border border-slate-200 rounded-sm px-4 py-3 text-[14px] focus:ring-2 focus:ring-blue-500/10 outline-none"
                                                            autoFocus
                                                        />
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <select 
                                                                    value={newItemData.priority}
                                                                    onChange={e => setNewItemData({...newItemData, priority: e.target.value})}
                                                                    className="h-10 bg-white border border-slate-200 rounded-sm px-4 text-[13px] font-medium outline-none"
                                                                >
                                                                    <option value="None">No Priority</option>
                                                                    <option value="Critical">Critical</option>
                                                                    <option value="Major">Major</option>
                                                                </select>
                                                                <label className="flex items-center gap-2 cursor-pointer">
                                                                    <input 
                                                                        type="checkbox"
                                                                        checked={newItemData.isRequired}
                                                                        onChange={e => setNewItemData({...newItemData, isRequired: e.target.checked})}
                                                                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                                                                    />
                                                                    <span className="text-[13px] font-bold text-slate-700">Required</span>
                                                                </label>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <button onClick={() => setActiveAddingArea(null)} className="text-[13px] font-bold text-slate-600">Cancel</button>
                                                                <button onClick={() => confirmAddItem(areaIndex)} className="bg-slate-900 text-white px-5 py-2 rounded-sm font-bold text-[13px]">Add Item</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => addItemToArea(areaIndex)}
                                                        className="mt-2 flex items-center gap-2 text-[#2185d5] font-bold text-[13px] hover:underline"
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
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="space-y-4 max-w-2xl">
                                    <label className="text-[13px] font-bold text-slate-700">Assign Audit Team</label>
                                    <div className="flex gap-4">
                                        <select 
                                            value={selectedAuditor}
                                            onChange={e => setSelectedAuditor(e.target.value)}
                                            className="flex-1 h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[13px] text-slate-600 font-medium"
                                        >
                                            <option value="">Select Auditor</option>
                                            {auditors.map(auditor => (
                                                <option key={auditor.id} value={auditor.id}>
                                                    {auditor.first_name} {auditor.last_name}
                                                </option>
                                            ))}
                                        </select>
                                        <select 
                                            value={auditorRole}
                                            onChange={e => setAuditorRole(e.target.value)}
                                            className="w-48 h-12 bg-slate-50 border border-slate-200 rounded-sm px-4 text-[13px] text-slate-600 font-medium"
                                        >
                                            <option>Auditor</option>
                                            <option>Lead Auditor</option>
                                            <option>Observer</option>
                                        </select>
                                        <button
                                            onClick={addTeamMember}
                                            className="bg-[#2185d5] text-white px-6 rounded-sm font-bold text-[13px] flex items-center gap-2"
                                        >
                                            <Plus size={16} />
                                            Add
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 max-w-4xl">
                                    {data.audit_team.map((member) => (
                                        <div
                                            key={member.user_id}
                                            className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-sm hover:border-[#2185d5]/30 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-sm bg-blue-50 flex items-center justify-center text-[#2185d5] font-bold border border-blue-100 uppercase">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-slate-800 leading-none">{member.name}</p>
                                                    <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{member.role}</p>
                                                </div>
                                            </div>
                                            <button onClick={() => removeTeamMember(member.user_id)} className="w-8 h-8 flex items-center justify-center rounded-sm text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer / Submit */}
                    <div className="p-6 border-t border-slate-50 bg-white flex items-center justify-between">
                        <div className="text-[13px] text-slate-500 font-bold flex items-center gap-2">
                             <CheckCircle2 size={16} className="text-[#2185d5]" />
                            <span className="text-[#2185d5]">{data.audit_areas.length}</span> audit areas, <span className="text-[#2185d5]">{data.audit_areas.reduce((acc, a) => acc + a.items.length, 0)}</span> check items
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => router.get(route('administrator.pre-audit-checklists.index'))}
                                className="px-6 py-2.5 rounded-sm font-bold text-[13px] text-slate-500 hover:bg-slate-50 border border-slate-200 transition-all uppercase tracking-tight"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSubmit}
                                disabled={processing}
                                className="bg-[#2185d5] text-white px-8 py-2.5 rounded-sm font-bold text-[13px] shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center gap-2 uppercase tracking-tight"
                            >
                                <CheckCircle2 size={18} />
                                {processing ? "Saving..." : "Update Checklist"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
