import React, { useEffect, useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Trash2,
    Plus,
    Save,
    Upload,
    Printer,
    Share2,
    AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC19({ initialAspects = [] }) {
    const { data, setData, post, processing } = useForm({
        aspects: [],
        deletedIds: [],
    });

    const [alerts, setAlerts] = useState({
        expired: 0,
        expiringSoon: 0,
        valid: 0,
    });

    useEffect(() => {
        if (initialAspects.length > 0) {
            setData("aspects", initialAspects.map(item => ({
                id: item.id,
                aspect: item.aspect || '',
                hazard: item.hazard || '',
                impact: item.impact || '',
                riskRating: item.risk_rating || 'Medium',
                controlMeasures: item.control_measures || '',
                averageRisk: item.average_risk || 'Medium',
                date: item.date ? item.date.split('T')[0] : '',
                nextReview: item.next_review ? item.next_review.split('T')[0] : '',
            })));
        } else {
            setData("aspects", [{
                id: `new_${Date.now()}`,
                aspect: '',
                hazard: '',
                impact: '',
                riskRating: 'Medium',
                controlMeasures: '',
                averageRisk: 'Medium',
                date: '',
                nextReview: '',
            }]);
        }
    }, [initialAspects]);

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
        data.aspects.forEach(aspect => {
            const days = calculateDaysRemaining(aspect.nextReview);
            if (days !== null) {
                if (days < 0) expired++;
                else if (days <= 90) soon++;
                else valid++;
            }
        });
        setAlerts({ expired, expiringSoon: soon, valid });
    }, [data.aspects]);

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-19.store"), {
            onSuccess: () => {
                toast.success("Aspects & Hazards Register saved successfully!");
                setData("deletedIds", []);
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data.");
            },
        });
    };

    const addAspect = () => {
        setData("aspects", [
            ...data.aspects,
            {
                id: `new_${Date.now()}`,
                aspect: '',
                hazard: '',
                impact: '',
                riskRating: 'Medium',
                controlMeasures: '',
                averageRisk: 'Medium',
                date: '',
                nextReview: '',
            }
        ]);
    };

    const updateAspect = (index, field, value) => {
        const newList = [...data.aspects];
        newList[index][field] = value;
        setData("aspects", newList);
    };

    const removeAspect = (index) => {
        const itemToRemove = data.aspects[index];
        const newList = [...data.aspects];
        newList.splice(index, 1);

        if (typeof itemToRemove.id === "number") {
            setData((prevData) => ({
                ...prevData,
                aspects: newList,
                deletedIds: [...prevData.deletedIds, itemToRemove.id],
            }));
        } else {
            setData("aspects", newList);
        }
    };

    return (
        <AdministratorLayout>
            <Head title="REC-19 - Aspects, Hazards, and Impacts Register" />

            <div className="space-y-6 max-w-[1400px] mx-auto">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link
                            href={route("administrator.rec-forms.index")}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#2185d5] transition-colors mb-2 text-sm font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to REC Forms
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-6 w-full">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                        <h1 className="text-xl font-bold text-slate-800">
                            REC-19 - Aspects, Hazards, and Impacts Register
                        </h1>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-bold shadow-sm hover:bg-slate-50">
                                <Printer size={16} />
                                Print
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-bold shadow-sm hover:bg-slate-50">
                                <Share2 size={16} />
                                Share
                            </button>
                            <button 
                                onClick={addAspect}
                                className="flex items-center gap-2 px-3 py-1.5 bg-[#2185d5] text-white rounded-sm text-xs font-bold shadow-sm hover:bg-blue-600"
                            >
                                <Plus size={16} />
                                Add New
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between items-end mb-3 border-b border-slate-100 pb-1">
                            <h2 className="text-sm font-bold text-slate-700">
                                Associated Documents
                            </h2>
                            <button className="text-blue-500 text-xs font-bold flex items-center gap-1 hover:underline">
                                <Upload size={14} />
                                Upload Documents
                            </button>
                        </div>
                        <div className="bg-slate-50 rounded-sm p-4 border border-slate-100 text-center text-sm text-slate-400 flex flex-col items-center gap-2 border-dashed">
                            <Upload size={24} className="text-slate-300" />
                            <span>No documents associated yet</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto mb-6">
                        <table className="w-full min-w-[1000px] border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-y border-slate-200">
                                    <th className="px-3 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-40">
                                        Aspect
                                    </th>
                                    <th className="px-3 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-40">
                                        Hazard
                                    </th>
                                    <th className="px-3 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-40">
                                        Impact
                                    </th>
                                    <th className="px-3 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-24">
                                        Risk Rating <br /> H/M/L
                                    </th>
                                    <th className="px-3 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200">
                                        Control Measures
                                    </th>
                                    <th className="px-3 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-24">
                                        Average Risk <br /> H/M/L
                                    </th>
                                    <th className="px-3 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-32">
                                        Date
                                    </th>
                                    <th className="px-3 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 w-32">
                                        Next Review
                                    </th>
                                    <th className="px-3 py-3 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.aspects.map((item, index) => {
                                    const daysRemaining = calculateDaysRemaining(item.nextReview);
                                    const alertStatus = getAlertColor(daysRemaining);

                                    return (
                                        <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                            <td className="p-2 border-r border-slate-100">
                                                <input type="text" value={item.aspect} onChange={(e) => updateAspect(index, 'aspect', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[12px] font-medium text-slate-700 border-transparent focus:border-blue-500 outline-none" placeholder="Aspect" />
                                            </td>
                                            <td className="p-2 border-r border-slate-100">
                                                <input type="text" value={item.hazard} onChange={(e) => updateAspect(index, 'hazard', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[12px] text-slate-600 border-transparent focus:border-blue-500 outline-none" placeholder="Hazard" />
                                            </td>
                                            <td className="p-2 border-r border-slate-100">
                                                <input type="text" value={item.impact} onChange={(e) => updateAspect(index, 'impact', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[12px] text-slate-600 border-transparent focus:border-blue-500 outline-none" placeholder="Impact" />
                                            </td>
                                            <td className="p-2 border-r border-slate-100">
                                                <select value={item.riskRating} onChange={(e) => updateAspect(index, 'riskRating', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[12px] font-bold text-slate-700 border-transparent focus:border-blue-500 outline-none uppercase text-center">
                                                    <option value="High">H</option>
                                                    <option value="Medium">M</option>
                                                    <option value="Low">L</option>
                                                </select>
                                            </td>
                                            <td className="p-2 border-r border-slate-100">
                                                <input type="text" value={item.controlMeasures} onChange={(e) => updateAspect(index, 'controlMeasures', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[12px] text-slate-600 border-transparent focus:border-blue-500 outline-none" placeholder="Control Measures" />
                                            </td>
                                            <td className="p-2 border-r border-slate-100">
                                                <select value={item.averageRisk} onChange={(e) => updateAspect(index, 'averageRisk', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[12px] font-bold text-slate-700 border-transparent focus:border-blue-500 outline-none uppercase text-center">
                                                    <option value="High">H</option>
                                                    <option value="Medium">M</option>
                                                    <option value="Low">L</option>
                                                </select>
                                            </td>
                                            <td className="p-2 border-r border-slate-100">
                                                <input type="date" value={item.date} onChange={(e) => updateAspect(index, 'date', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[12px] text-slate-600 border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2 border-r border-slate-100 relative">
                                                <div className="flex flex-col gap-1 w-full">
                                                    <input type="date" value={item.nextReview} onChange={(e) => updateAspect(index, 'nextReview', e.target.value)} className={`w-full bg-slate-50 px-2 py-2 rounded-sm text-[12px] font-bold border-transparent focus:border-blue-500 outline-none ${alertStatus.color}`} />
                                                    {alertStatus.icon && item.nextReview && (
                                                        <div className={`flex items-start gap-1 ${alertStatus.color}`}>
                                                            <AlertTriangle size={12} className="mt-[2px]" />
                                                            <span className="text-[9px] leading-tight font-medium">
                                                                {daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days left`}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-2 text-center">
                                                <button onClick={() => removeAspect(index)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-amber-50 border border-amber-100 rounded-sm p-4 flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-slate-800 font-bold text-sm mb-1">
                                Aspects, Hazards and Impacts Register Due Alerts
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                                    {alerts.expired} Expired
                                </span>
                                <span className="px-2 py-0.5 bg-amber-400 text-white text-[10px] font-bold rounded-full">
                                    {alerts.expiringSoon} Expiring Soon
                                </span>
                                <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                                    {alerts.valid} Valid
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 bg-amber-50/50 rounded-sm p-3 text-[11px] text-amber-800 border-l-4 border-amber-400">
                        <strong>Warning System:</strong> This record checks
                        expiry data warning System. Review dates are color-coded
                        based on urgency. Upload and save all relevant documents
                        for audit trail.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8 mt-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 mb-4">
                                Signature / Verified
                            </h3>
                            <div className="flex gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        Verified By
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        With Date
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-end gap-2">
                            <div className="flex-1">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Status
                                </label>
                                <select
                                    className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-sm text-sm text-emerald-800 font-medium outline-none focus:border-emerald-500"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Signed">Signed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="px-4 py-2 bg-[#2185d5] text-white rounded-sm text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {processing ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save size={16} />
                            )}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
