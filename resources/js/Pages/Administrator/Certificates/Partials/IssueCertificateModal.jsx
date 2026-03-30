import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    X,
    User,
    Award,
    Eye,
    ChevronDown,
    Calendar,
    CheckCircle2,
    Upload,
} from "lucide-react";

export default function IssueCertificateModal({ isOpen, onClose, procedures = [], users = [], certificate = null, mode = "issue" }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState(mode === "view" ? "Preview" : "Certificate Details");

    const { data, setData, post, put, processing, errors, reset } = useForm({
        user_id: "",
        full_name: "",
        email: "",
        employee_id: "",
        procedure_id: "",
        iso_standard: "",
        certificate_type: "Completion Certificate",
        compliance_level: "Full Compliance",
        issued_date: new Date().toISOString().split('T')[0],
        validity_period: "12",
        valid_until: "",
        audit_score: "",
        achievements: "",
        internal_notes: "",
        status: "Active",
    });

    // Initialize form when certificate prop changes
    useEffect(() => {
        if (certificate) {
            setData({
                user_id: certificate.user_id || "",
                full_name: certificate.issuedTo || "",
                email: certificate.email || "",
                employee_id: certificate.employee_id || "",
                procedure_id: certificate.procedure_id || "",
                iso_standard: certificate.iso_standard || "",
                certificate_type: certificate.certificate_type || "Completion Certificate",
                compliance_level: certificate.compliance_level || "Full Compliance",
                issued_date: certificate.raw_issued_date ? certificate.raw_issued_date.split('T')[0] : new Date().toISOString().split('T')[0],
                validity_period: "12", // Default or calculated
                valid_until: certificate.raw_expiry_date ? certificate.raw_expiry_date.split('T')[0] : "",
                audit_score: certificate.audit_score || "",
                achievements: certificate.achievements || "",
                internal_notes: certificate.internal_notes || "",
                status: certificate.status || "Active",
            });
        } else {
            reset();
        }
        
        if (mode === "view") {
            setCurrentStep("Preview");
        } else {
            setCurrentStep("Certificate Details");
        }
    }, [certificate, mode, isOpen]);

    // Automatically calculate "Valid Until" when Issue Date or Validity Period changes (only in non-view mode)
    useEffect(() => {
        if (mode !== "view" && data.issued_date && data.validity_period) {
            const date = new Date(data.issued_date);
            date.setMonth(date.getMonth() + parseInt(data.validity_period));
            setData("valid_until", date.toISOString().split('T')[0]);
        }
    }, [data.issued_date, data.validity_period]);

    const handleUserChange = (e) => {
        if (mode === "view") return;
        const userId = e.target.value;
        const selectedUser = users.find(u => u.id == userId);
        
        if (selectedUser) {
            setData({
                ...data,
                user_id: userId,
                full_name: `${selectedUser.first_name} ${selectedUser.last_name}`,
                email: selectedUser.email,
                employee_id: selectedUser.employee_id || ""
            });
        } else {
            setData({
                ...data,
                user_id: userId,
                full_name: "",
                email: "",
                employee_id: ""
            });
        }
    };

    const handleProcedureChange = (e) => {
        if (mode === "view") return;
        const procId = e.target.value;
        const proc = procedures.find(p => p.id == procId);
        setData({
            ...data,
            procedure_id: procId,
            iso_standard: proc ? proc.iso_standard : ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (mode === "view") return;

        if (mode === "edit" && certificate) {
            put(route("administrator.certificates.update", certificate.id), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route("administrator.certificates.store"), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    const modalTabs = mode === "view" 
        ? [{ name: "Preview", icon: <Eye size={16} /> }]
        : [
            { name: "Certificate Details", icon: <Award size={16} /> },
            { name: "Preview", icon: <Eye size={16} /> },
        ];

    const getProcedureName = () => {
        const proc = procedures.find(p => p.id == data.procedure_id);
        return proc ? proc.name : "[Procedure Name]";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col transition-all">
                {/* Modal Header */}
                <div className="p-8 pb-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2185d5] flex items-center justify-center">
                                <Award size={22} />
                            </div>
                            <div>
                                <h2 className="text-[24px] font-black text-slate-800 tracking-tight">
                                    {mode === "view" ? "View Certificate" : mode === "edit" ? "Edit Certificate" : "Issue New Certificate"}
                                </h2>
                                <p className="text-[13px] text-slate-500 font-medium">
                                    {mode === "view" ? "Viewing official issued certificate details" : "Generate and issue official ISO compliance certificates to recipients"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-all border border-transparent hover:border-slate-100"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Modal Tabs */}
                <div className="px-8 flex items-center gap-2 mb-6">
                    {modalTabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setCurrentStep(tab.name)}
                            disabled={mode === "view"}
                            className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl text-[14px] font-bold transition-all border ${
                                currentStep === tab.name
                                    ? "bg-[#2185d5] text-white border-transparent shadow-lg shadow-blue-500/20"
                                    : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                            }`}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 pb-8">
                    <form id="certificate-form" onSubmit={handleSubmit} className="space-y-8">
                        {currentStep === "Certificate Details" && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-300">
                                {/* Recipient Information */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#2185d5] font-black text-[15px] uppercase tracking-wider">
                                        <User size={18} />
                                        <h3>Recipient Information</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Select User <span className="text-red-500">*</span>
                                            </label>
                                            <select 
                                                value={data.user_id}
                                                onChange={handleUserChange}
                                                disabled={mode === "view" || mode === "edit"}
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
                                                required
                                            >
                                                <option value="">Choose a user</option>
                                                {users.map(u => (
                                                    <option key={u.id} value={u.id}>
                                                        {u.first_name} {u.last_name} ({u.email})
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.user_id && <p className="text-red-500 text-xs mt-1">{errors.user_id}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={data.full_name}
                                                readOnly
                                                className="w-full h-12 bg-slate-100 border-none rounded-xl px-4 text-[14px] font-medium text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                readOnly
                                                className="w-full h-12 bg-slate-100 border-none rounded-xl px-4 text-[14px] font-medium text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Employee ID
                                            </label>
                                            <input
                                                type="text"
                                                value={data.employee_id}
                                                readOnly
                                                className="w-full h-12 bg-slate-100 border-none rounded-xl px-4 text-[14px] font-medium text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Certification Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#2185d5] font-black text-[15px] uppercase tracking-wider">
                                        <Award size={18} />
                                        <h3>Certification Details</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Select Procedure <span className="text-red-500">*</span>
                                            </label>
                                            <select 
                                                value={data.procedure_id}
                                                onChange={handleProcedureChange}
                                                disabled={mode === "view"}
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
                                                required
                                            >
                                                <option value="">Choose a procedure</option>
                                                {procedures.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                            </select>
                                            {errors.procedure_id && <p className="text-red-500 text-xs mt-1">{errors.procedure_id}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                ISO Standard
                                            </label>
                                            <input
                                                type="text"
                                                value={data.iso_standard}
                                                onChange={(e) => setData("iso_standard", e.target.value)}
                                                readOnly={mode === "view"}
                                                placeholder="e.g. ISO 9001"
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Certificate Type
                                            </label>
                                            <select 
                                                value={data.certificate_type}
                                                onChange={(e) => setData("certificate_type", e.target.value)}
                                                disabled={mode === "view"}
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all"
                                            >
                                                <option>Completion Certificate</option>
                                                <option>Achievement Certificate</option>
                                                <option>Compliance Certificate</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Compliance Level
                                            </label>
                                            <select 
                                                value={data.compliance_level}
                                                onChange={(e) => setData("compliance_level", e.target.value)}
                                                disabled={mode === "view"}
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all"
                                            >
                                                <option>Full Compliance</option>
                                                <option>Substantial Compliance</option>
                                                <option>Partial Compliance</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Date and Validity */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#2185d5] font-black text-[15px] uppercase tracking-wider">
                                        <Calendar size={18} />
                                        <h3>Date and Validity</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Issue Date <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="date"
                                                value={data.issued_date}
                                                onChange={(e) => setData("issued_date", e.target.value)}
                                                readOnly={mode === "view"}
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Validity (Months)
                                            </label>
                                            <select 
                                                value={data.validity_period}
                                                onChange={(e) => setData("validity_period", e.target.value)}
                                                disabled={mode === "view" || mode === "edit"} // Don't allow changing period in edit for simplicity now
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all"
                                            >
                                                <option value="6">6 Months</option>
                                                <option value="12">12 Months</option>
                                                <option value="24">24 Months</option>
                                                <option value="36">36 Months</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Valid Until
                                            </label>
                                            <input
                                                type="date"
                                                value={data.valid_until}
                                                readOnly
                                                className="w-full h-12 bg-slate-100 border-none rounded-xl px-4 text-[14px] font-medium text-slate-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-[#2185d5] font-black text-[15px] uppercase tracking-wider">
                                        <Award size={18} />
                                        <h3>Additional Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Audit Score (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.audit_score}
                                                onChange={(e) => setData("audit_score", e.target.value)}
                                                readOnly={mode === "view"}
                                                placeholder="e.g. 98/100"
                                                className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                Achievements
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={data.achievements}
                                                onChange={(e) => setData("achievements", e.target.value)}
                                                readOnly={mode === "view"}
                                                placeholder="List key achievements..."
                                                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                            />
                                        </div>
                                        {mode === "edit" && (
                                            <div className="space-y-2">
                                                <label className="text-[13px] font-black text-slate-700 uppercase tracking-tight">
                                                    Status
                                                </label>
                                                <select 
                                                    value={data.status}
                                                    onChange={(e) => setData("status", e.target.value)}
                                                    className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] font-medium focus:ring-2 focus:ring-blue-500/10 transition-all"
                                                >
                                                    <option>Active</option>
                                                    <option>Revoked</option>
                                                    <option>Expired</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>


                    {currentStep === "Preview" && (
                        <div className="flex items-center justify-center p-8 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="bg-white border-[8px] border-double border-[#2185d5]/20 rounded-[32px] p-12 w-full max-w-2xl text-center space-y-8 relative overflow-hidden shadow-2xl">
                                {/* Decorative elements */}
                                <div className="absolute top-0 left-0 w-32 h-32 bg-[#2185d5]/5 rounded-br-full -translate-x-16 -translate-y-16" />
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#2185d5]/5 rounded-tl-full translate-x-16 translate-y-16" />

                                <div className="w-20 h-20 mx-auto bg-[#2185d5] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                                    <Award size={40} />
                                </div>

                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-widest">
                                        {data.certificate_type || "Certificate"}
                                    </h2>
                                    <div className="h-1 w-24 bg-[#2185d5] mx-auto rounded-full" />
                                </div>

                                <div className="space-y-4">
                                    <p className="text-xs text-slate-400 uppercase tracking-[0.3em] font-black">
                                        This is to officially certify that
                                    </p>
                                    <p className="text-3xl font-black text-[#2185d5] font-serif italic">
                                        {data.full_name || "[Name]"}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-xs text-slate-400 uppercase tracking-[0.3em] font-black">
                                        Has successfully demonstrated excellence in
                                    </p>
                                    <p className="text-xl font-bold text-slate-800">
                                        {getProcedureName()}
                                    </p>
                                    <div className="flex items-center justify-center gap-3">
                                        <span className="w-12 h-px bg-slate-100" />
                                        <p className="text-sm font-black text-slate-500 uppercase tracking-widest">
                                            {data.iso_standard || "ISO STANDARD"}
                                        </p>
                                        <span className="w-12 h-px bg-slate-100" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-8 pt-10 border-t border-slate-50">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-slate-300 uppercase font-black tracking-widest">
                                            Issue Date
                                        </p>
                                        <p className="text-xs font-black text-slate-700">
                                            {data.issued_date ? new Date(data.issued_date).toLocaleDateString() : "Nov 8, 2025"}
                                        </p>
                                    </div>
                                    <div className="space-y-1 scale-125">
                                        <p className="text-[10px] text-slate-300 uppercase font-black tracking-widest">
                                            Compliance
                                        </p>
                                        <span className="bg-emerald-500 text-white text-[8px] uppercase font-black px-2 py-0.5 rounded-full">
                                            {data.compliance_level}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-slate-300 uppercase font-black tracking-widest">
                                            Valid Until
                                        </p>
                                        <p className="text-xs font-black text-slate-700">
                                            {data.valid_until ? new Date(data.valid_until).toLocaleDateString() : "Nov 8, 2026"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-8 border-t border-slate-50 flex items-center justify-between bg-slate-50/10">
                    <div className="flex-1">
                        {errors.procedure_id && (
                            <div className="flex items-center gap-2 text-red-500 text-[12px] font-bold animate-pulse">
                                <CheckCircle2 size={14} className="rotate-180" />
                                Please select a procedure before issuing
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-3 rounded-xl font-black text-[14px] text-slate-500 hover:bg-white border border-slate-200 hover:border-slate-300 transition-all active:scale-95"
                        >
                            {mode === "view" ? "Close" : "Cancel"}
                        </button>
                        {mode !== "view" && (
                            <button 
                                form="certificate-form"
                                type="submit"
                                disabled={processing}
                                className={`bg-[#2185d5] text-white px-8 py-3 rounded-xl font-black text-[14px] flex items-center gap-2 shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all active:scale-95 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Award size={20} />
                                {processing ? 'Processing...' : mode === "edit" ? "Update Certificate" : "Issue Certificate"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
