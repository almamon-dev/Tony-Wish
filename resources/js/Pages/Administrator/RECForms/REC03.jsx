import React, { useState, useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Save,
    Trash2,
    Plus,
    AlertTriangle,
    Upload,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC03({ initialColumns = [], initialEmployees = [], jobTitles = [] }) {
    const [employees, setEmployees] = useState(initialEmployees);
    const [deletedRowIds, setDeletedRowIds] = useState([]);

    const { data, setData, post, processing } = useForm({
        employees: initialEmployees,
        deletedRowIds: []
    });

    useEffect(() => {
        setEmployees(initialEmployees);
        setData("employees", initialEmployees);
    }, [initialEmployees]);

    const handleInputChange = (id, field, value) => {
        const updated = employees.map(emp => 
            emp.id === id ? { ...emp, [field]: value } : emp
        );
        setEmployees(updated);
        setData("employees", updated);
    };

    const handleTrainingChange = (empId, colId, value) => {
        const updated = employees.map(emp => {
            if (emp.id === empId) {
                return {
                    ...emp,
                    training: { ...emp.training, [colId]: value }
                };
            }
            return emp;
        });
        setEmployees(updated);
        setData("employees", updated);
    };

    const addEmployee = () => {
        const newEmp = {
            id: 'new_' + Date.now(),
            name: "",
            position: "",
            competence: "Basic",
            training: {}
        };
        const updated = [...employees, newEmp];
        setEmployees(updated);
        setData("employees", updated);
    };

    const deleteEmployee = (id) => {
        if (typeof id === 'number') {
            const newDeleted = [...deletedRowIds, id];
            setDeletedRowIds(newDeleted);
            setData("deletedRowIds", newDeleted);
        }
        const updated = employees.filter(emp => emp.id !== id);
        setEmployees(updated);
        setData("employees", updated);
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-03.store"), {
            onSuccess: () => {
                toast.success("Training register saved successfully!");
            },
            onError: () => {
                toast.error("Failed to save changes.");
            }
        });
    };

    const getTrainingClass = (date) => {
        if (!date || date === "N/A" || date === "DD-MM-YY") {
            return "bg-[#f8fafb] text-[#94a3b8] font-semibold";
        }
        
        const today = new Date();
        const expiryDate = new Date(date);
        
        if (isNaN(expiryDate.getTime())) {
            return "bg-[#f8fafb] text-[#64748b] font-semibold";
        }

        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return "bg-[#fee2e2] text-[#ef4444] font-bold";
        }
        if (diffDays < 30) {
            return "bg-[#fef3c7] text-[#d97706] font-bold";
        }
        return "bg-[#eefcf4] text-[#1aa15f] font-bold";
    };

    const getCompetenceClass = (level) => {
        switch (level) {
            case "High":
                return "bg-[#eefcf4] text-[#1aa15f]";
            case "Average":
                return "bg-[#fff8eb] text-[#b45309]";
            case "Basic":
                return "bg-[#f0f9ff] text-[#0369a1]";
            default:
                return "bg-slate-50 text-slate-600";
        }
    };

    const getAlerts = () => {
        let expired = 0, soon = 0, valid = 0;
        employees.forEach(emp => {
            Object.values(emp.training).forEach(val => {
                if (!val || val === 'N/A') return;
                const cls = getTrainingClass(val);
                if (cls.includes('bg-[#fee2e2]')) expired++;
                else if (cls.includes('bg-[#fef3c7]')) soon++;
                else if (cls.includes('bg-[#eefcf4]')) valid++;
            });
        });
        return { expired, soon, valid };
    };

    const stats = getAlerts();

    return (
        <AdministratorLayout>
            <Head title="REC-03 - Training & Competence Register" />

            <div className="space-y-4 pb-10">
                {/* Header Section */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm p-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <h1 className="text-[14px] font-bold text-slate-800 tracking-tight">
                                REC-03 Training & Competence Register
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

                {/* Alerts Dashboard */}
                <div className="bg-[#fff9ef] border border-amber-100/50 rounded-sm p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-200/30">
                        <AlertTriangle size={20} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-[14px] font-bold text-slate-700 tracking-tight leading-none">
                            Training expiry alerts
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="bg-[#ef4444] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                {stats.expired} Expired
                            </span>
                            <span className="bg-[#f59e0b] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                {stats.soon} Expiry soon
                            </span>
                            <span className="bg-[#10b981] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                {stats.valid} Valid
                            </span>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden p-6">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-100/50 text-slate-600">
                                    <th className="px-4 py-4 text-[13px] font-semibold min-w-[140px]">Staff Name</th>
                                    <th className="px-4 py-4 text-[13px] font-semibold min-w-[140px]">Position</th>
                                    <th className="px-4 py-4 text-[13px] font-semibold min-w-[140px]">Overall Competence</th>
                                    {initialColumns.map((col) => (
                                        <th key={col.id} className="px-4 py-4 text-[13px] font-semibold min-w-[120px] text-center">{col.title}</th>
                                    ))}
                                    <th className="px-4 py-4 text-[13px] font-semibold text-right pr-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50/50">
                                {employees.map((emp) => (
                                    <tr key={emp.id} className="group">
                                        <td className="px-2 py-3">
                                            <input 
                                                type="text"
                                                value={emp.name}
                                                onChange={(e) => handleInputChange(emp.id, "name", e.target.value)}
                                                className="w-full bg-[#f8fafb] border-0 rounded-md text-[13px] font-medium text-slate-700 px-3 py-1.5 focus:ring-1 focus:ring-blue-100"
                                                placeholder="Name"
                                            />
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="relative">
                                                <select
                                                    value={emp.position}
                                                    onChange={(e) => handleInputChange(emp.id, "position", e.target.value)}
                                                    className="w-full bg-[#f8fafb] border-0 rounded-md text-[12px] font-medium text-slate-600 px-3 py-1.5 appearance-none cursor-pointer focus:ring-1 focus:ring-blue-100"
                                                >
                                                    <option value="">Select Position</option>
                                                    {jobTitles.map((title, i) => (
                                                        <option key={i} value={title}>{title}</option>
                                                    ))}
                                                </select>
                                                {/* <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" size={12} /> */}
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="relative">
                                                <select
                                                    value={emp.competence}
                                                    onChange={(e) => handleInputChange(emp.id, "competence", e.target.value)}
                                                    className={`w-full border-0 rounded-md text-[12px] font-bold px-3 py-1.5 appearance-none cursor-pointer focus:ring-1 focus:ring-blue-100 transition-colors ${getCompetenceClass(emp.competence)}`}
                                                >
                                                    <option value="High">High</option>
                                                    <option value="Average">Average</option>
                                                    <option value="Basic">Basic</option>
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                        {initialColumns.map((col) => (
                                            <td key={col.id} className="px-2 py-3 text-center">
                                                <input 
                                                    type="text"
                                                    value={emp.training[col.id] || "N/A"}
                                                    onChange={(e) => handleTrainingChange(emp.id, col.id, e.target.value)}
                                                    className={`w-full border-0 rounded-md text-[11px] px-3 py-1.5 text-center focus:ring-1 focus:ring-blue-100 transition-all ${getTrainingClass(emp.training[col.id])}`}
                                                    placeholder="DD-MM-YY"
                                                    onFocus={(e) => e.target.type = 'date'}
                                                    onBlur={(e) => { if(!e.target.value) e.target.type = 'text'; }}
                                                />
                                            </td>
                                        ))}
                                        <td className="px-2 py-3 text-right pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button 
                                                    onClick={() => deleteEmployee(emp.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-md transition-all">
                                                    <Upload size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button 
                            onClick={addEmployee}
                            className="bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-[13px] px-10 py-3 rounded-md flex items-center justify-center gap-2 transition-all shadow-sm"
                        >
                            <Plus size={16} strokeWidth={2.5} className="text-slate-400" />
                            Add New Training
                        </button>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="flex justify-end pt-4">
                    <button 
                        onClick={handleSave}
                        disabled={processing}
                        className="flex items-center gap-2 px-10 py-3 bg-[#2c8af8] text-white rounded-sm hover:bg-blue-600 transition-all text-[13px] font-bold tracking-tight shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50"
                    >
                        {processing ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save size={16} />
                        )}
                        {processing ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </div>
        </AdministratorLayout>
    );
}

 
