import React, { useState } from "react";
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
} from "lucide-react";

const INITIAL_AUDIT_AREAS = [
    {
        id: 1,
        name: "Documentation Review",
        items: [
            {
                id: 1,
                text: "Quality manual is current and approved",
                tags: ["Critical", "Required"],
            },
            {
                id: 2,
                text: "All procedures are documented",
                tags: ["Major", "Required"],
            },
            {
                id: 3,
                text: "Records are properly maintained",
                tags: ["Major"],
            },
        ],
    },
    {
        id: 2,
        name: "Process Controls",
        items: [
            {
                id: 1,
                text: "Process parameters are defined",
                tags: ["Critical", "Required"],
            },
            {
                id: 2,
                text: "Control measures are in place",
                tags: ["Major", "Required"],
            },
        ],
    },
];

export default function CreateChecklistModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState("Details");
    const [auditAreas, setAuditAreas] = useState(INITIAL_AUDIT_AREAS);
    const [auditTeam, setAuditTeam] = useState([]);

    const modalTabs = [
        { name: "Details", icon: <Edit2 size={16} /> },
        { name: "Checklist Items", icon: <ClipboardList size={16} /> },
        { name: "Audit Team", icon: <Users size={16} /> },
    ];

    const addAuditArea = () => {
        const newId =
            auditAreas.length > 0
                ? Math.max(...auditAreas.map((a) => a.id)) + 1
                : 1;
        setAuditAreas([
            ...auditAreas,
            { id: newId, name: "New Audit Area", items: [] },
        ]);
    };

    const removeAuditArea = (id) => {
        setAuditAreas(auditAreas.filter((area) => area.id !== id));
    };

    const addItemToArea = (areaId) => {
        setAuditAreas(
            auditAreas.map((area) => {
                if (area.id === areaId) {
                    return {
                        ...area,
                        items: [
                            ...area.items,
                            {
                                id: Date.now(),
                                text: "New check item",
                                tags: ["Required"],
                            },
                        ],
                    };
                }
                return area;
            }),
        );
    };

    const removeItemFromArea = (areaId, itemId) => {
        setAuditAreas(
            auditAreas.map((area) => {
                if (area.id === areaId) {
                    return {
                        ...area,
                        items: area.items.filter((item) => item.id !== itemId),
                    };
                }
                return area;
            }),
        );
    };

    const addTeamMember = () => {
        // Placeholder logic
        setAuditTeam([
            ...auditTeam,
            { id: Date.now(), name: "John Doe", role: "Lead Auditor" },
        ]);
    };

    const removeTeamMember = (id) => {
        setAuditTeam(auditTeam.filter((member) => member.id !== id));
    };

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
                            Create Pre-Audit Checklist
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-all"
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
                            {tab.name === "Checklist Items" && (
                                <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-[10px]">
                                    5
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 pb-8 space-y-6">
                    {currentStep === "Details" && (
                        <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Checklist Name{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g ISO 9001 Pre-Audit checklist Q4 2025"
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
                                        <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                            <option>Select ISO standard</option>
                                            <option>ISO 9001</option>
                                            <option>ISO 14001</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Audit Type{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                            <option>Select Audit Type</option>
                                            <option>Internal</option>
                                            <option>External</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                            <option>Select Department</option>
                                            <option>Production</option>
                                            <option>Quality</option>
                                        </select>
                                    </div>
                                </div>
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
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Scheduled Date{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="mm/dd/yyyy"
                                        className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    />
                                    <Calendar
                                        size={18}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Provide details about this audit checklist"
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Audit Objectives
                                </label>
                                <textarea
                                    placeholder="What are the main objectives of this audit?"
                                    rows={3}
                                    className="w-full bg-slate-50 border-none rounded-xl p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
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
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Add new audit area (e.g., Risk Management)"
                                        className="flex-1 h-10 bg-slate-50 border-none rounded-lg px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    />
                                    <button
                                        onClick={addAuditArea}
                                        className="bg-[#2185d5] text-white px-4 rounded-lg font-bold text-[12px] flex items-center gap-2"
                                    >
                                        <Plus size={16} />
                                        Add Area
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {auditAreas.map((area) => (
                                    <div
                                        key={area.id}
                                        className="bg-white border border-slate-100 rounded-xl overflow-hidden"
                                    >
                                        <div className="flex items-center justify-between p-4 bg-slate-50/50 border-b border-slate-50">
                                            <div className="flex items-center gap-2">
                                                <FileText
                                                    size={16}
                                                    className="text-slate-400"
                                                />
                                                <h4 className="text-[14px] font-bold text-slate-700">
                                                    {area.name}
                                                </h4>
                                                <span className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[11px] font-bold text-slate-500">
                                                    {area.items.length} Items
                                                </span>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeAuditArea(area.id)
                                                }
                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            {area.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-start gap-3 group"
                                                >
                                                    <div className="w-5 h-5 rounded border border-slate-200 bg-slate-50 mt-2 shrink-0" />
                                                    <div className="flex-1 space-y-2">
                                                        <div className="flex items-center justify-between">
                                                            <p className="text-[13px] text-slate-600 font-medium pt-2">
                                                                {item.text}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                {item.tags.map(
                                                                    (tag) => (
                                                                        <span
                                                                            key={
                                                                                tag
                                                                            }
                                                                            className={`text-[10px] font-bold px-2 py-1 rounded text-white ${
                                                                                tag ===
                                                                                "Critical"
                                                                                    ? "bg-[#2185d5]"
                                                                                    : tag ===
                                                                                        "Major"
                                                                                      ? "bg-slate-800"
                                                                                      : "bg-emerald-500"
                                                                            }`}
                                                                        >
                                                                            {
                                                                                tag
                                                                            }
                                                                        </span>
                                                                    ),
                                                                )}
                                                                <button
                                                                    onClick={() =>
                                                                        removeItemFromArea(
                                                                            area.id,
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                                                                >
                                                                    <X
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() =>
                                                    addItemToArea(area.id)
                                                }
                                                className="mt-2 flex items-center gap-2 text-[#2185d5] font-bold text-[12px] hover:underline px-1"
                                            >
                                                <Plus size={14} />
                                                Add Item
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === "Audit Team" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-700">
                                    Assign Audit Team{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <select className="w-full h-11 bg-slate-50 border-none rounded-xl px-4 text-[13px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                            <option>Select Auditor</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={addTeamMember}
                                        className="bg-slate-400 text-white px-5 rounded-xl font-bold text-[12px] flex items-center gap-2 hover:bg-slate-500 transition-all"
                                    >
                                        <Plus size={16} />
                                        Add
                                    </button>
                                </div>
                            </div>

                            {auditTeam.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
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
                                <div className="space-y-2">
                                    {/* Render selected team members here */}
                                    {auditTeam.map((member) => (
                                        <div
                                            key={member.id}
                                            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-slate-700">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400">
                                                        {member.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeTeamMember(member.id)
                                                }
                                                className="text-slate-400 hover:text-red-500 transition-all"
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
                <div className="p-8 border-t border-slate-50 flex items-center justify-between bg-white pt-6">
                    {currentStep === "Checklist Items" && (
                        <div className="flex items-center gap-2 text-[#2185d5] text-[13px] font-bold">
                            <CheckCircle2 size={16} />
                            Total: {auditAreas.length} audit areas with{" "}
                            {auditAreas.reduce(
                                (acc, area) => acc + area.items.length,
                                0,
                            )}{" "}
                            check items
                        </div>
                    )}
                    <div className="flex items-center gap-3 ml-auto">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-bold text-[13px] text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                        >
                            Cancel
                        </button>
                        <button className="bg-[#2185d5] text-white px-6 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
                            <CheckCircle2 size={18} />
                            Create Checklist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
