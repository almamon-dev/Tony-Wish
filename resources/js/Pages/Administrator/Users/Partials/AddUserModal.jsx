import React, { useState } from "react";
import {
    X,
    User,
    Shield,
    Users,
    FileText,
    Settings,
    ChevronDown,
    Calendar,
    Briefcase,
    MapPin,
    Clock,
    Languages,
    Key,
    Plus,
    CheckCircle2,
} from "lucide-react";

export default function AddUserModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState("Basic Info");
    const [permissions, setPermissions] = useState({
        viewReports: true,
        uploadDocuments: true,
        editProcedures: false,
        manageTasks: false,
    });

    const togglePermission = (key) => {
        setPermissions({ ...permissions, [key]: !permissions[key] });
    };

    const modalTabs = [
        { name: "Basic Info", icon: <User size={16} /> },
        { name: "Role & Access", icon: <Shield size={16} /> },
        { name: "Additional", icon: <Settings size={16} /> },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-[15px] shadow-xl w-full max-w-4xl h-[95vh] overflow-hidden flex flex-col">
                {/* Modal Header */}
                <div className="p-6 pb-2">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="text-[20px] font-bold text-slate-800">
                            Add New User
                        </h2>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <p className="text-[13px] text-slate-500 font-medium">
                        Add a new team member to the ISO compliance management
                        system
                    </p>
                </div>

                {/* Modal Tabs */}
                <div className="px-6 flex items-center gap-2 mb-4">
                    {modalTabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setCurrentStep(tab.name)}
                            className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-bold transition-all border ${
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
                <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
                    {currentStep === "Basic Info" && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                <User size={18} />
                                <h3>Personal Information</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        First Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Tom"
                                        className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Last Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Wilson"
                                        className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Email ID{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="e.g. tom.wilson@company.com"
                                        className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Employee ID
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. EMP-2025-001"
                                        className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Start Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="mm/dd/yyyy"
                                            className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                        <Calendar
                                            size={16}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === "Role & Access" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            {/* Role Assignment */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                    <Briefcase size={18} />
                                    <h3>Role Assignment</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            User Role{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                                <option>Standard User</option>
                                                <option>Administrator</option>
                                                <option>Auditor</option>
                                                <option>Manager</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Department{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                                <option>
                                                    Select Department
                                                </option>
                                                <option>Production</option>
                                                <option>
                                                    Quality Assurance
                                                </option>
                                                <option>Human Resources</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Position / Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Quality Analyst"
                                            className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Reporting To
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                                <option>Select Manager</option>
                                                <option>Sarah Johnson</option>
                                                <option>Mike Davis</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Access Permissions */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                    <Key size={18} />
                                    <h3>Access Permissions</h3>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        {
                                            key: "viewReports",
                                            label: "View Reports",
                                            desc: "Access to compliance reports and analytics",
                                        },
                                        {
                                            key: "uploadDocuments",
                                            label: "Upload Documents",
                                            desc: "Upload files to the document center",
                                        },
                                        {
                                            key: "editProcedures",
                                            label: "Edit Procedures",
                                            desc: "Create and modify compliance procedures",
                                        },
                                        {
                                            key: "manageTasks",
                                            label: "Manage Tasks",
                                            desc: "Assign and manage tasks for other users",
                                        },
                                    ].map((perm) => (
                                        <div
                                            key={perm.key}
                                            className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100"
                                        >
                                            <div>
                                                <h4 className="text-[13px] font-bold text-slate-700">
                                                    {perm.label}
                                                </h4>
                                                <p className="text-[11px] text-slate-400">
                                                    {perm.desc}
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        permissions[perm.key]
                                                    }
                                                    onChange={() =>
                                                        togglePermission(
                                                            perm.key,
                                                        )
                                                    }
                                                    className="sr-only peer"
                                                />
                                                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2185d5]"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === "Additional" && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                <MapPin size={18} />
                                <h3>Location & Preferences</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Office Location
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                            <option>Select Location</option>
                                            <option>New York HQ</option>
                                            <option>London Office</option>
                                            <option>Remote</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Time Zone
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                            <option>UTC (GMT+0)</option>
                                            <option>EST (GMT-5)</option>
                                            <option>PST (GMT-8)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1.5 col-span-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Preferred Language
                                    </label>
                                    <div className="relative">
                                        <select className="w-full h-10 bg-slate-50 border-none rounded-xl px-4 text-[13px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                            <option>English</option>
                                            <option>Spanish</option>
                                            <option>French</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 space-y-3">
                                <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                    <FileText size={18} />
                                    <h3>Additional Notes</h3>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Internal Notes
                                    </label>
                                    <textarea
                                        rows={3}
                                        placeholder="Add any additional Notes about this user.."
                                        className="w-full bg-slate-50 border-none rounded-xl p-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-50 flex items-center justify-end gap-3 bg-white pt-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-bold text-[13px] text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                    >
                        Cancel
                    </button>
                    <button className="bg-[#2185d5] text-white px-6 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
                        <User size={18} />
                        Add User
                    </button>
                </div>
            </div>
        </div>
    );
}
