import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    X,
    User,
    Shield,
    Settings,
    Calendar,
    Briefcase,
    MapPin,
    FileText,
    Key,
    Mail,
    Phone,
    Plus,
    CheckCircle2,
    ChevronDown,
} from "lucide-react";

export default function AddUserModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState("Basic Info");

    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        user_role: "Standard User",
        location: "",
        timezone: "UTC (GMT+0)",
        language: "English",
        notes: "",
        permissions: {
            view_reports: true,
            upload_documents: true,
            edit_procedures: false,
            manage_tasks: false,
        }
    });

    const togglePermission = (key) => {
        setData('permissions', {
            ...data.permissions,
            [key]: !data.permissions[key]
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("administrator.users.store"), {
            onSuccess: () => {
                onClose();
                reset();
            },
        });
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
            <div className="relative bg-white rounded-[15px] shadow-xl w-full max-w-4xl h-auto max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
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
                    <p className="text-[13px] text-slate-500 font-medium text-left">
                        Add a new team member to the ISO compliance management
                        system
                    </p>
                </div>

                {/* Modal Tabs */}
                <div className="px-6 flex items-center gap-2 mb-4 mt-2">
                    {modalTabs.map((tab) => (
                        <button
                            key={tab.name}
                            type="button"
                            onClick={() => setCurrentStep(tab.name)}
                            className={`flex-1 flex items-center justify-center gap-2 h-10 rounded-xl text-[13px] font-bold transition-all border ${
                                currentStep === tab.name
                                    ? "bg-[#2185d5] text-white border-transparent shadow-md shadow-blue-500/20"
                                    : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                            }`}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Modal Content - Scrollable */}
                <form onSubmit={submit} className="flex-1 overflow-y-auto flex flex-col text-left">
                    <div className="flex-1 px-6 pb-6 space-y-6">
                        {currentStep === "Basic Info" && (
                            <div className="space-y-4 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                    <User size={18} />
                                    <h3>Personal Information</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.first_name}
                                            onChange={e => setData("first_name", e.target.value)}
                                            placeholder="e.g. Tom"
                                            className={`w-full h-10 bg-slate-50 border ${errors.first_name ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700`}
                                        />
                                        {errors.first_name && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.first_name}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={e => setData("last_name", e.target.value)}
                                            placeholder="e.g. Wilson"
                                            className={`w-full h-10 bg-slate-50 border ${errors.last_name ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700`}
                                        />
                                        {errors.last_name && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.last_name}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Email ID <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={e => setData("email", e.target.value)}
                                                placeholder="e.g. tom.wilson@company.com"
                                                className={`w-full h-10 bg-slate-50 border ${errors.email ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700 pr-10`}
                                            />
                                            <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                        {errors.email && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData("password", e.target.value)}
                                            placeholder="Min 8 characters"
                                            className={`w-full h-10 bg-slate-50 border ${errors.password ? 'border-red-500' : 'border-slate-100'} rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700`}
                                        />
                                        {errors.password && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.password}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                value={data.phone}
                                                onChange={e => setData("phone", e.target.value)}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full h-10 bg-slate-50 border border-slate-100 rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700"
                                            />
                                            <Phone size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Start Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="mm/dd/yyyy"
                                                className="w-full h-10 bg-slate-50 border border-slate-100 rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700"
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
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                        <Briefcase size={18} />
                                        <h3>Role Assignment</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-bold text-slate-700">
                                                User Role <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    type="text"
                                                    value={data.user_role}
                                                    onChange={e => setData("user_role", e.target.value)}
                                                    placeholder="e.g. Standard User"
                                                    className="w-full h-11 bg-[#f8fafc] border border-slate-100 rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700"
                                                />
                                                <Settings size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[13px] font-bold text-slate-700">
                                                Department <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <input 
                                                    type="text"
                                                    value={data.department}
                                                    onChange={e => setData("department", e.target.value)}
                                                    placeholder="e.g. Production"
                                                    className="w-full h-11 bg-[#f8fafc] border border-slate-100 rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700"
                                                />
                                                <Briefcase size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                        <Key size={18} />
                                        <h3>Access Permissions</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            {
                                                title: "View Reports",
                                                desc: "Access to compliance reports and analytics",
                                                key: "view_reports"
                                            },
                                            {
                                                title: "Upload Documents",
                                                desc: "Upload files to the document center",
                                                key: "upload_documents"
                                            },
                                            {
                                                title: "Edit Procedures",
                                                desc: "Create and modify compliance procedures",
                                                key: "edit_procedures"
                                            },
                                            {
                                                title: "Manage Tasks",
                                                desc: "Assign and manage tasks for other users",
                                                key: "manage_tasks"
                                            }
                                        ].map((item) => (
                                            <div key={item.key} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                                <div className="text-left">
                                                    <p className="text-[14px] font-bold text-slate-700 leading-tight">{item.title}</p>
                                                    <p className="text-[12px] text-slate-400 mt-1 font-medium">{item.desc}</p>
                                                </div>
                                                <button 
                                                    type="button"
                                                    onClick={() => togglePermission(item.key)}
                                                    className={`w-11 h-6 rounded-full transition-all relative ${data.permissions[item.key] ? 'bg-[#1e293b]' : 'bg-slate-200'}`}
                                                >
                                                    <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${data.permissions[item.key] ? 'right-1' : 'left-1'}`}></div>
                                                </button>
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

                                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-[#334155]">
                                            Office Location
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="text"
                                                value={data.location}
                                                onChange={e => setData("location", e.target.value)}
                                                placeholder="e.g. New York HQ"
                                                className="w-full h-11 bg-[#f8fafc] border border-slate-100 rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700"
                                            />
                                            <MapPin size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-[#334155]">
                                            Time Zone
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="text"
                                                value={data.timezone}
                                                onChange={e => setData("timezone", e.target.value)}
                                                placeholder="e.g. UTC (GMT+0)"
                                                className="w-full h-11 bg-[#f8fafc] border border-slate-100 rounded-xl px-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700"
                                            />
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <label className="text-[13px] font-bold text-slate-700">
                                        Internal Notes
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={data.notes}
                                        onChange={e => setData("notes", e.target.value)}
                                        placeholder="Add any additional notes about this user.."
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 transition-all outline-none font-medium text-slate-700 resize-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-slate-50 flex items-center justify-end gap-3 bg-white pt-4 mt-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-bold text-[13px] text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={processing}
                            className="bg-[#2185d5] text-white px-6 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all disabled:opacity-50"
                        >
                            <Plus size={18} />
                            {processing ? 'Adding...' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
