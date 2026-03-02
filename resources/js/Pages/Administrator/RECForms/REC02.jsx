import React, { useState, useEffect, useRef } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Save,
    Trash2,
    Plus,
    ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";

const AutoSizeTextarea = ({ value, onChange, placeholder, className }) => {
    const textareaRef = useRef(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            rows={1}
            style={{ overflow: "hidden" }}
        />
    );
};

export default function REC02({ jobTitles = [], initialRoles = [] }) {
    const [jobRoles, setJobRoles] = useState(initialRoles);

    const { data, setData, post, processing } = useForm({
        roles: initialRoles
    });

    useEffect(() => {
        setJobRoles(initialRoles);
        setData("roles", initialRoles);
    }, [initialRoles]);

    const handleInputChange = (id, field, value) => {
        const updatedRoles = jobRoles.map((role) =>
            role.id === id ? { ...role, [field]: value } : role,
        );
        setJobRoles(updatedRoles);
        setData("roles", updatedRoles);
    };

    const addJobRole = () => {
        const newRole = {
            id: Date.now(),
            title: "",
            responsibilities: "",
            qty: 1,
        };
        const updatedRoles = [...jobRoles, newRole];
        setJobRoles(updatedRoles);
        setData("roles", updatedRoles);
    };

    const deleteJobRole = (id) => {
        const updatedRoles = jobRoles.filter((role) => role.id !== id);
        setJobRoles(updatedRoles);
        setData("roles", updatedRoles);
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-02.store"), {
            onSuccess: () => {
                toast.success("Personnel structure saved successfully!");
            },
            onError: () => {
                toast.error("Failed to save changes.");
            }
        });
    };

    const availableTitles = jobTitles.length > 0 ? jobTitles : [
        "Managing Director (MD)",
        "Production Manager",
        "Admin",
        "Responsible Welding Coordinator (RWC)",
        "Inspection Technician",
        "Responsible Welding Coordinator",
        "Plater",
        "Welder (MIG/TIG/MMA)",
        "Quality Manager",
        "Site Supervisor",
        "Health & Safety Officer",
        "Project Coordinator"
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-02 - Personnel Structure & Responsibilities" />

            <div className="space-y-4 pb-10">
                {/* Header Cards */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm p-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <h1 className="text-[14px] font-bold text-slate-800 tracking-tight">
                                REC-02 Personnel Structure & Responsibilities
                            </h1>
                            <Link
                                href={route("administrator.rec-forms.index")}
                                className="text-slate-400 hover:text-blue-500 transition-colors"
                            >
                                <ArrowLeft size={18} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-sm border border-slate-100 shadow-sm p-4">
                    <h2 className="text-[16px] font-bold text-slate-700">
                        Company Structure & Responsibilities
                    </h2>
                </div>

                {/* Main Table */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm p-0">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-slate-100">
                                    <th className="px-6 py-4 text-[12px] font-black text-slate-400 uppercase tracking-widest w-[30%] border-r border-slate-50">
                                        Job Title
                                    </th>
                                    <th className="px-6 py-4 text-[12px] font-black text-slate-400 uppercase tracking-widest w-[55%] border-r border-slate-50">
                                        Responsibilities
                                    </th>
                                    <th className="px-6 py-4 text-[12px] font-black text-slate-400 uppercase tracking-widest w-[8%] text-center border-r border-slate-50">
                                        Qty
                                    </th>
                                    <th className="px-6 py-4 text-[12px] font-black text-slate-400 uppercase tracking-widest w-[7%] text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {jobRoles.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-32 text-center">
                                            <div className="max-w-[280px] mx-auto space-y-6">
                                                <div className="space-y-2">
                                                    <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-[0.3em]">System Empty</h3>
                                                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed tracking-wide">No personnel structure defined. Initialize to begin configuration.</p>
                                                </div>
                                                <button 
                                                    onClick={addJobRole}
                                                    className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-none hover:bg-black transition-all text-[10px] font-black uppercase tracking-[0.25em] shadow-xl shadow-slate-900/10 active:scale-95 border border-slate-800"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                    Initialize
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    jobRoles.map((role) => (
                                        <tr
                                            key={role.id}
                                            className="hover:bg-slate-50/30 transition-colors group"
                                        >
                                            <td className="px-6 py-6 align-top">
                                                <div className="relative">
                                                    <select
                                                        value={role.title}
                                                        onChange={(e) => handleInputChange(role.id, "title", e.target.value)}
                                                        className="w-full bg-transparent border-0 border-b border-transparent focus:border-blue-400 focus:ring-0 text-[13px] font-bold text-slate-700 p-0 hover:border-slate-200 transition-all cursor-pointer pr-6 appearance-none scrollbar-hide"
                                                    >
                                                        <option value="" disabled>Select Job Title</option>
                                                        {availableTitles.map((title, i) => (
                                                            <option key={i} value={title}>{title}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 align-top">
                                                <AutoSizeTextarea
                                                    value={role.responsibilities}
                                                    onChange={(e) => handleInputChange(role.id, "responsibilities", e.target.value)}
                                                    className="w-full bg-transparent border-0 border-b border-transparent focus:border-blue-400 focus:ring-0 text-[13px] font-medium text-slate-500 leading-relaxed p-0 hover:border-slate-200 transition-all cursor-text resize-none"
                                                    placeholder="Enter responsibilities..."
                                                />
                                            </td>
                                            <td className="px-6 py-6 align-top text-center border-l border-r border-slate-50">
                                                <input
                                                    type="number"
                                                    value={role.qty}
                                                    onChange={(e) => handleInputChange(role.id, "qty", parseInt(e.target.value) || 0)}
                                                    className="w-12 bg-transparent border-0 border-b border-transparent focus:border-blue-400 focus:ring-0 text-[13px] font-bold text-slate-700 p-0 hover:border-slate-200 transition-all cursor-text text-center focus:outline-none"
                                                />
                                            </td>
                                            <td className="px-6 py-6 align-top text-center">
                                                <button 
                                                    onClick={() => deleteJobRole(role.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-sm text-red-300 hover:text-red-500 hover:bg-red-50 transition-all mx-auto group-hover:scale-110 active:scale-95 shadow-sm border border-transparent hover:border-red-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Button */}
                    <button 
                        onClick={addJobRole}
                        disabled={processing}
                        className="w-full py-4 bg-[#2c8af8] hover:bg-blue-600 text-white font-black text-[12px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-[0.99] border-t border-blue-400/20 disabled:opacity-50"
                    >
                        <Plus size={18} strokeWidth={3} />
                        Add New Job Title
                    </button>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end items-center px-2 pt-4">
                    <button 
                        onClick={handleSave}
                        disabled={processing}
                        className="flex items-center gap-2 px-10 py-3 bg-[#2c8af8] text-white rounded-sm hover:bg-blue-600 transition-all text-[12px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {processing ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </AdministratorLayout>
    );
}
