import React, { useEffect, useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    AlertTriangle,
    Download,
    Trash2,
    Plus,
    Save,
    Paperclip,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC16({ initialRegs = [] }) {
    const { data, setData, post, processing } = useForm({
        regs: [],
        deletedIds: [],
    });

    const [alerts, setAlerts] = useState({
        expired: 0,
        expiringSoon: 0,
        valid: 0,
    });

    useEffect(() => {
        const formattedRegs = initialRegs.map(reg => ({
            ...reg,
            nextReview: reg.next_review ? reg.next_review.split('T')[0] : '',
            regulation: reg.regulation || '',
            department: reg.department || '',
            status: reg.status || '',
            evidence: reg.evidence || '',
            responsiblePerson: reg.responsible_person || '',
            notes: reg.notes || '',
            frequency: reg.frequency || '',
            document: reg.document || '',
        }));

        setData("regs", formattedRegs.length > 0 ? formattedRegs : [
            {
                id: `new_${Date.now()}`,
                regulation: "",
                department: "",
                status: "Compliant",
                evidence: "",
                responsiblePerson: "",
                notes: "",
                frequency: "Yearly",
                nextReview: "",
                document: "",
            }
        ]);
    }, [initialRegs]);

    const calculateDaysRemaining = (dateString) => {
        if (!dateString) return null;
        const current = new Date();
        const target = new Date(dateString);
        const diffTime = target - current;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const getAlertColor = (days) => {
        if (days === null) return { color: "text-slate-500", icon: false };
        if (days < 0) return { color: "text-red-500", icon: true, message: "Immediate action required" };
        if (days <= 30) return { color: "text-amber-500", icon: true, message: "Warning - within 1 month" };
        if (days <= 90) return { color: "text-yellow-500", icon: true, message: "Caution - within 3 months" };
        return { color: "text-emerald-500", icon: true, message: "Good - > 3 months" };
    };

    useEffect(() => {
        let expired = 0, soon = 0, valid = 0;
        data.regs.forEach(reg => {
            const days = calculateDaysRemaining(reg.nextReview);
            if (days !== null) {
                if (days < 0) expired++;
                else if (days <= 90) soon++;
                else valid++;
            }
        });
        setAlerts({ expired, expiringSoon: soon, valid });
    }, [data.regs]);

    const addReg = () => {
        setData("regs", [
            ...data.regs,
            {
                id: `new_${Date.now()}`,
                regulation: "",
                department: "",
                status: "Compliant",
                evidence: "",
                responsiblePerson: "",
                notes: "",
                frequency: "Yearly",
                nextReview: "",
                document: "",
            },
        ]);
    };

    const updateReg = (index, field, value) => {
        const newRegs = [...data.regs];
        newRegs[index][field] = value;
        setData("regs", newRegs);
    };

    const removeReg = (index) => {
        const regToRemove = data.regs[index];
        const newRegs = [...data.regs];
        newRegs.splice(index, 1);

        if (typeof regToRemove.id === "number") {
            setData((prevData) => ({
                ...prevData,
                regs: newRegs,
                deletedIds: [...prevData.deletedIds, regToRemove.id],
            }));
        } else {
            setData("regs", newRegs);
        }
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-16.store"), {
            onSuccess: () => {
                toast.success("Legal Compliance Register saved successfully!");
                setData("deletedIds", []);
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data.");
            },
        });
    };

    return (
        <AdministratorLayout>
            <Head title="REC-16 - Legal Compliance Register" />

            <div className="space-y-6 max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link
                            href={route("administrator.rec-forms.index")}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#2185d5] transition-colors mb-2 text-sm font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to REC Forms
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800">
                            REC-16 - Legal Compliance Register
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-sm hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Download size={18} />
                            Export PDF
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {processing ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save size={18} />
                            )}
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Alerts Section */}
                <div className="bg-amber-50 border border-amber-100 rounded-sm p-4 mb-4 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                        <AlertTriangle size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-slate-800 font-bold text-sm mb-1">
                            Legal Compliance Register Due Alerts
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full border border-red-600">
                                {alerts.expired} Expired
                            </span>
                            <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full border border-amber-600">
                                {alerts.expiringSoon} Expiring Soon
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full border border-emerald-600">
                                {alerts.valid} Valid
                            </span>
                        </div>
                    </div>
                </div>

                {/* Warning Banner */}
                <div className="bg-white border-l-4 border-amber-400 p-4 shadow-sm rounded-r-sm flex items-start gap-3">
                    <AlertTriangle
                        size={18}
                        className="text-amber-500 shrink-0 mt-0.5"
                    />
                    <p className="text-sm text-slate-600">
                        <span className="font-bold text-amber-500">
                            Expiry Date Warning System:
                        </span>{" "}
                        This register includes automatic expiry date warnings.
                        Review dates are color-coded based on urgency. Upload
                        and save all associated compliance documents for audit
                        trail.
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-6 w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1500px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Legal Requirement / Regulation
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Applicable Department / Process
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Current Compliance Status
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-48">
                                        Evidence / Records Held
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Responsible Person
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-48">
                                        Notes / Actions
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Review Frequency
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Next Review (Color Coded)
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Documents
                                    </th>
                                    <th className="px-3 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.regs.map((item, index) => {
                                    const daysRemaining = calculateDaysRemaining(item.nextReview);
                                    const alertStatus = getAlertColor(daysRemaining);

                                    return (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="px-2 py-3">
                                                <input
                                                    type="text"
                                                    value={item.regulation}
                                                    onChange={(e) => updateReg(index, 'regulation', e.target.value)}
                                                    className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                    placeholder="Regulation"
                                                />
                                            </td>
                                            <td className="px-2 py-3">
                                                <input
                                                    type="text"
                                                    value={item.department}
                                                    onChange={(e) => updateReg(index, 'department', e.target.value)}
                                                    className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                    placeholder="Department"
                                                />
                                            </td>
                                            <td className="px-2 py-3">
                                                <select
                                                    value={item.status}
                                                    onChange={(e) => updateReg(index, 'status', e.target.value)}
                                                    className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                >
                                                    <option value="Compliant">Compliant</option>
                                                    <option value="Non-Compliant">Non-Compliant</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
                                            </td>
                                            <td className="px-2 py-3">
                                                <textarea
                                                    value={item.evidence}
                                                    onChange={(e) => updateReg(index, 'evidence', e.target.value)}
                                                    className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] text-slate-700 border border-transparent focus:border-blue-500 outline-none resize-none"
                                                    rows="2"
                                                    placeholder="Evidence"
                                                ></textarea>
                                            </td>
                                            <td className="px-2 py-3">
                                                <input
                                                    type="text"
                                                    value={item.responsiblePerson}
                                                    onChange={(e) => updateReg(index, 'responsiblePerson', e.target.value)}
                                                    className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                    placeholder="Person"
                                                />
                                            </td>
                                            <td className="px-2 py-3">
                                                <textarea
                                                    value={item.notes}
                                                    onChange={(e) => updateReg(index, 'notes', e.target.value)}
                                                    className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] text-slate-700 border border-transparent focus:border-blue-500 outline-none resize-none"
                                                    rows="2"
                                                    placeholder="Notes/Actions"
                                                ></textarea>
                                            </td>
                                            <td className="px-2 py-3">
                                                <input
                                                    type="text"
                                                    value={item.frequency}
                                                    onChange={(e) => updateReg(index, 'frequency', e.target.value)}
                                                    className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                    placeholder="Frequency"
                                                />
                                            </td>
                                            <td className="px-2 py-3">
                                                <div className="flex flex-col gap-1 w-full relative">
                                                    <div className="flex items-center">
                                                    <input
                                                        type="date"
                                                        value={item.nextReview}
                                                        onChange={(e) => updateReg(index, 'nextReview', e.target.value)}
                                                        className={`w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-bold border border-transparent focus:border-blue-500 outline-none ${alertStatus.color}`}
                                                    />
                                                    </div>
                                                    {alertStatus.icon && item.nextReview && (
                                                        <div className={`flex items-start gap-1 ${alertStatus.color} mt-1`}>
                                                            <AlertTriangle size={14} className="mt-[2px]" />
                                                            <span className="text-[10px] leading-tight font-medium">
                                                                {alertStatus.message} 
                                                                {daysRemaining < 0 ? ` (${Math.abs(daysRemaining)} days overdue)` : ` (${daysRemaining} days left)`}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-2 py-3">
                                                <div className="flex bg-slate-50 rounded-sm">
                                                    <input
                                                        type="text"
                                                        value={item.document}
                                                        onChange={(e) => updateReg(index, 'document', e.target.value)}
                                                        className="w-full bg-transparent px-2 py-2 rounded-l-sm text-[12px] text-blue-500 font-medium border-transparent focus:border-blue-500 outline-none"
                                                        placeholder="Document link/name"
                                                    />
                                                    <div className="px-2 py-2 flex items-center text-slate-400">
                                                        <Paperclip size={14} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-3 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button 
                                                        onClick={() => removeReg(index)}
                                                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors"
                                                        title="Delete row"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Button */}
                    <div className="mt-8">
                        <button 
                            onClick={addReg}
                            className="w-full py-3 border border-slate-200 rounded-sm text-[#2185d5] font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm shadow-sm bg-white"
                        >
                            <Plus size={18} />
                            Add New Requirement
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="bg-white rounded-sm border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 mb-4">
                        Expiry Date Warning System - Review Date Color Coding:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-red-500 shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Overdue- Immediate
                                </span>{" "}
                                <br /> action required
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-red-500 shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Critical Work
                                </span>
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-amber-500 shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Warning- within 1
                                </span>{" "}
                                <br /> month
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-yellow-500 shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Caution within 3
                                </span>{" "}
                                <br /> months
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <AlertTriangle
                                size={16}
                                className="text-emerald-500 shrink-0 mt-0.5"
                            />
                            <p className="text-xs text-slate-600">
                                <span className="font-bold text-slate-800">
                                    Good- More than
                                </span>{" "}
                                <br /> 3 months
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
