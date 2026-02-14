import React, { useState } from "react";
import {
    X,
    User,
    Award,
    Eye,
    ChevronDown,
    Calendar,
    CheckCircle2,
} from "lucide-react";

export default function IssueCertificateModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [currentStep, setCurrentStep] = useState("Certificate Details");

    const modalTabs = [
        { name: "Certificate Details", icon: <Award size={16} /> },
        { name: "Preview", icon: <Eye size={16} /> },
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
                    {currentStep === "Certificate Details" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                            {/* Recipient Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                    <User size={18} />
                                    <h3>Recipient Information</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Full Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Select ISO standard"
                                            className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Email Address{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="e.g. tom.wilson@company.com"
                                            className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Employee ID
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. EMP-2025-001"
                                            className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Certification Details */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                    <Award size={18} />
                                    <h3>Certification Details</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            ISO Standard{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-500">
                                                <option>
                                                    Select ISO Standard
                                                </option>
                                                <option>ISO 9001</option>
                                                <option>ISO 14001</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Procedure Name{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g Quality Management System Implementation"
                                            className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Certificate Type
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-700 font-medium">
                                                <option>
                                                    Completion Certificate
                                                </option>
                                                <option>
                                                    Achievement Certificate
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Compliance Level
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-700 font-medium">
                                                <option>Full Compliance</option>
                                                <option>
                                                    Partial Compliance
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date and Validity */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                    <Calendar size={18} />
                                    <h3>Date and Validity</h3>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Issue Date{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
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
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Validity Period (Months)
                                        </label>
                                        <div className="relative">
                                            <select className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] appearance-none focus:ring-2 focus:ring-blue-500/10 transition-all text-slate-700 font-medium">
                                                <option>12 Months</option>
                                                <option>24 Months</option>
                                                <option>36 Months</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Valid Until
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
                            </div>

                            {/* Additional Information */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2 text-[#2185d5] font-bold text-[14px]">
                                    <Award size={18} />
                                    <h3>Additional Information</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Audit Score (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g 95/100"
                                            className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Key Achievements
                                        </label>
                                        <textarea
                                            rows={2}
                                            placeholder="List key achievements or competencies demonstrated..."
                                            className="w-full bg-slate-50 border-none rounded-xl p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-700">
                                            Internal Notes
                                        </label>
                                        <textarea
                                            rows={2}
                                            placeholder="Add any internal notes or comments..."
                                            className="w-full bg-slate-50 border-none rounded-xl p-4 text-[14px] focus:ring-2 focus:ring-blue-500/10 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === "Preview" && (
                        <div className="flex items-center justify-center p-4 animate-in fade-in slide-in-from-right-8 duration-300">
                            <div className="bg-white border-[3px] border-[#2185d5]/20 rounded-xl p-8 w-full max-w-xl text-center space-y-6 relative overflow-hidden">
                                {/* Decorative Corner */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-[#2185d5] rounded-tl-xl" />
                                <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-[#2185d5] rounded-tr-xl" />
                                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[3px] border-l-[3px] border-[#2185d5] rounded-bl-xl" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-[#2185d5] rounded-br-xl" />

                                <div className="w-16 h-16 mx-auto bg-[#2185d5] rounded-lg flex items-center justify-center text-white mb-4">
                                    <Award size={32} />
                                </div>

                                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-wide">
                                    Certificate of completion
                                </h2>
                                <p className="text-slate-500 font-medium">
                                    ISO Compliance Management System
                                </p>

                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                                        This is to certify that
                                    </p>
                                    <p className="text-xl font-bold text-slate-800">
                                        [Recipient Name]
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                                        Has successfully completed
                                    </p>
                                    <p className="text-lg font-bold text-slate-800">
                                        [Procedure Name]
                                    </p>
                                </div>

                                <div className="space-y-1 pb-4">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                                        In accordance with
                                    </p>
                                    <p className="text-base font-bold text-slate-800">
                                        [ISO Standard]
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-left pt-6 border-t border-slate-100">
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                                            Certificate ID
                                        </p>
                                        <p className="text-xs font-bold text-slate-700">
                                            CERT-2025-985
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                                            Issue Date
                                        </p>
                                        <p className="text-xs font-bold text-slate-700">
                                            Nov 8, 2025
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                                            Valid Until
                                        </p>
                                        <p className="text-xs font-bold text-slate-700">
                                            [Date]
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                                        Full Compliance
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-8 border-t border-slate-50 flex items-center justify-between bg-white pt-6">
                    {/* Left Side Content */}
                    <div className="flex-1">
                        {currentStep === "Preview" && (
                            <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-blue-50 p-3 rounded-lg border border-blue-100 max-w-sm">
                                <Eye
                                    size={14}
                                    className="text-[#2185d5] shrink-0 mt-0.5"
                                />
                                <div>
                                    <span className="font-bold text-[#2185d5]">
                                        Preview Mode:
                                    </span>{" "}
                                    This is how the certificate will appear when
                                    issued. The recipient will receive this
                                    certificate via email at [email]
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl font-bold text-[13px] text-slate-500 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                        >
                            Cancel
                        </button>
                        <button className="bg-[#2185d5] text-white px-6 py-2.5 rounded-xl font-bold text-[13px] flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
                            <Award size={18} />
                            Issue Certificate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
