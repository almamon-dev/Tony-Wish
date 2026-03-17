import React, { useEffect, useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Trash2,
    Plus,
    Save,
    Upload,
    Calendar,
    ChevronDown,
    Info,
    AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC29({ initialChecklist = null }) {
    const { data, setData, post, processing } = useForm({
        checklist: {
            id: null,
            lastReviewDate: "",
            defaultRenewalPeriod: 0,
            unit: "Months",
            verifiedBy: "",
            withDate: "",
            status: "Draft",
        },
        items: [],
    });

    const [alerts, setAlerts] = useState({
        expired: 0,
        expiringSoon: 0,
        valid: 0,
    });

    const calculateDaysRemaining = (dateString) => {
        if (!dateString) return null;
        const current = new Date();
        current.setHours(0, 0, 0, 0);
        const target = new Date(dateString);
        target.setHours(0, 0, 0, 0);
        const diffTime = target - current;
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    const overdueEquipment = data.items.filter(item => {
        const days = calculateDaysRemaining(item.nextReviewDue);
        return days !== null && days < 0;
    });

    useEffect(() => {
        let expired = 0, soon = 0, valid = 0;
        data.items.forEach(item => {
            const days = calculateDaysRemaining(item.nextReviewDue);
            if (days !== null) {
                if (days < 0) expired++;
                else if (days <= 30) soon++;
                else valid++;
            }
        });
        setAlerts({ expired, expiringSoon: soon, valid });
    }, [data.items]);

    useEffect(() => {
        if (initialChecklist) {
            setData({
                checklist: {
                    id: initialChecklist.id,
                    lastReviewDate: initialChecklist.last_review_date ? initialChecklist.last_review_date.split('T')[0] : "",
                    defaultRenewalPeriod: initialChecklist.default_renewal_period || 0,
                    unit: initialChecklist.unit || "Months",
                    verifiedBy: initialChecklist.verified_by || "",
                    withDate: initialChecklist.with_date ? initialChecklist.with_date.split('T')[0] : "",
                    status: initialChecklist.status || "Draft",
                },
                items: initialChecklist.items ? initialChecklist.items.map(item => ({
                    id: item.id,
                    equipmentType: item.equipment_type || '',
                    location: item.location || '',
                    checkedBy: item.checked_by || '',
                    condition: item.condition || '',
                    actionRequired: item.action_required || '',
                    notes: item.notes || '',
                    dateChecked: item.date_checked ? item.date_checked.split('T')[0] : '',
                    nextReviewDue: item.next_review_due ? item.next_review_due.split('T')[0] : '',
                })) : [],
            });
        } else {
            setData("items", []);
        }
    }, [initialChecklist]);

    const updateAllReviewDates = () => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        let period = parseInt(data.checklist.defaultRenewalPeriod) || 0;
        let nextDate = new Date(today);
        
        if (data.checklist.unit === 'Months') {
            nextDate.setMonth(nextDate.getMonth() + period);
        } else {
            nextDate.setDate(nextDate.getDate() + period);
        }
        
        const nextDateStr = nextDate.toISOString().split('T')[0];

        const newList = data.items.map(item => ({
            ...item,
            dateChecked: todayStr,
            nextReviewDue: nextDateStr
        }));
        
        setData({
            ...data,
            items: newList
        });
        toast.success("All review dates updated!");
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-29.store"), {
            onSuccess: () => {
                toast.success("Safety Equipment Checklist saved successfully!");
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data.");
            },
        });
    };

    const addItem = () => {
        setData("items", [
            ...data.items,
            {
                id: `new_${Date.now()}`,
                equipmentType: '',
                location: '',
                checkedBy: '',
                condition: '',
                actionRequired: '',
                notes: '',
                dateChecked: '',
                nextReviewDue: '',
            }
        ]);
    };

    const updateItem = (index, field, value) => {
        const newList = [...data.items];
        newList[index][field] = value;
        setData("items", newList);
    };

    const removeItem = (index) => {
        const newList = [...data.items];
        newList.splice(index, 1);
        setData("items", newList);
    };

    return (
        <AdministratorLayout>
            <Head title="REC-29 - Safety Equipment Checklist" />

            <div className="max-w-[1400px] mx-auto space-y-6 pb-12 font-sans text-[#1e293b]">
                {/* 1. Header Box */}
                <div className="bg-white border-[1px] border-[#e2e8f0] rounded-[8px] p-4 shadow-sm">
                    <h1 className="text-[24px] font-bold text-[#1e2b3c]">
                        REC-29: Safety Equipment Checklist
                    </h1>
                </div>

                {/* 2. Alert Box */}
                <div className="bg-white border-[1px] border-[#0ea5e9] rounded-[10px] p-4 flex gap-4 items-start shadow-sm">
                    <div className="text-[#0ea5e9] mt-0.5">
                        <Info size={32} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-[#0ea5e9] font-bold text-[16px] leading-tight flex items-center gap-1">
                            Safety Equipment Inspection Due Soon! <span className="font-normal text-[15px] ml-1">1 equipment check(s) due or overdue within 30 days:</span>
                        </h3>
                        <ul className="mt-1 ml-6 list-disc text-[#0ea5e9] text-[15px] font-medium">
                            {overdueEquipment.map((item, idx) => (
                                <li key={idx}>{item.equipmentType || 'New Equipment'} ({item.location || 'No Location'}) - <span className="font-bold uppercase">OVERDUE by {Math.abs(calculateDaysRemaining(item.nextReviewDue))} days ({item.nextReviewDue})</span></li>
                            ))}
                            {overdueEquipment.length === 0 && (
                                <li className="italic opacity-70">No equipment currently overdue.</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* 3. Renewal Period Settings Card */}
                <div className="border-[1px] border-[#0ea5e9] rounded-[10px] overflow-hidden bg-white shadow-sm">
                    <div className="bg-[#f8fafc] px-4 py-2.5 border-b-[1px] border-[#0ea5e9]">
                        <h2 className="text-[18px] font-bold text-[#1e2b3c]">Renewal Period Settings</h2>
                    </div>
                    <div className="p-4 flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-[14px] font-bold text-[#1e2b3c] mb-2">Default Renewal Period</label>
                            <input
                                type="text"
                                value={data.checklist.defaultRenewalPeriod}
                                onChange={(e) => setData("checklist", { ...data.checklist, defaultRenewalPeriod: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-[14px] font-bold text-[#1e2b3c] mb-2">Unit</label>
                            <input
                                type="text"
                                value={data.checklist.unit}
                                onChange={(e) => setData("checklist", { ...data.checklist, unit: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-[14px] font-bold text-[#1e2b3c] mb-2">Last Review Date</label>
                            <input
                                type="date"
                                value={data.checklist.lastReviewDate}
                                onChange={(e) => setData("checklist", { ...data.checklist, lastReviewDate: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            />
                        </div>
                        <div className="flex-1 min-w-[350px] flex items-center gap-3 h-[45px]">
                            <button
                                onClick={updateAllReviewDates}
                                className="h-full px-6 bg-[#1d90f3] text-white font-bold text-[14px] rounded-[6px] flex items-center justify-center gap-2 hover:bg-[#157ad1] transition-colors whitespace-nowrap shadow-sm"
                            >
                                Update All Review Dates <Calendar size={18} />
                            </button>

                        </div>
                    </div>
                </div>

                {/* 4. Associated Documents Card (The Table Section) */}
                <div className="border-[1px] border-[#0ea5e9] rounded-[10px] overflow-hidden bg-white shadow-sm">
                    <div className="bg-[#f8fafc] px-4 py-2.5 border-b-[1px] border-[#0ea5e9]">
                        <h2 className="text-[18px] font-bold text-[#1e2b3c]">Associated Documents</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1250px] border-collapse bg-white">
                            <thead>
                                <tr className="bg-[#cbd5e1]/40 border-b-[1px] border-[#94a3b8]/50">
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Equipment Type</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Location</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Checked By</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Condition</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Action Required</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Notes</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Date Checked</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Next Review Due</th>
                                    <th className="px-3 py-4 text-center text-[14px] font-bold text-[#475569] w-[120px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-[1px] divide-[#cbd5e1]/50">
                                {data.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-[#f8fafc] transition-colors h-[50px]">
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50 h-[60px]">
                                            <div className="relative h-[40px]">
                                                <select
                                                    value={item.equipmentType}
                                                    onChange={(e) => updateItem(index, 'equipmentType', e.target.value)}
                                                    className="w-full h-full border-[1px] border-[#cbd5e1] rounded-[4px] bg-white px-2 appearance-none focus:outline-none focus:border-[#0ea5e9] text-[14px]"
                                                >
                                                    <option value="" disabled selected className="text-[#94a3b8]">Select</option>
                                                    <option value="Fire Evacuation">Fire Evacuation</option>
                                                    <option value="Fire Extinguisher">Fire Extinguisher</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.location} 
                                                onChange={(e) => updateItem(index, 'location', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                                placeholder="Location" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.checkedBy} 
                                                onChange={(e) => updateItem(index, 'checkedBy', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                                placeholder="Checked By" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.condition} 
                                                onChange={(e) => updateItem(index, 'condition', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                                placeholder="Condition" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.actionRequired} 
                                                onChange={(e) => updateItem(index, 'actionRequired', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                                placeholder="Action" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.notes} 
                                                onChange={(e) => updateItem(index, 'notes', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                                placeholder="Notes" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="date" 
                                                value={item.dateChecked} 
                                                onChange={(e) => updateItem(index, 'dateChecked', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className={`px-3 border-r-[1px] border-[#cbd5e1]/50 ${item.nextReviewDue ? 'bg-[#dcfce7]' : ''}`}>
                                            <input 
                                                type="date" 
                                                value={item.nextReviewDue} 
                                                onChange={(e) => updateItem(index, 'nextReviewDue', e.target.value)} 
                                                className={`w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] font-bold bg-white ${item.nextReviewDue ? 'text-[#14532d] !bg-transparent' : ''}`} 
                                            />
                                        </td>
                                        <td className="px-3 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => removeItem(index)} className="text-[#ef4444]"><Trash2 size={20} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 5. Add New Row Button */}
                <div>
                   <button
                        onClick={addItem}
                        className="h-[40px] px-4 bg-white border-[1px] border-[#cbd5e1] rounded-[6px] text-[15px] font-bold text-[#475569] flex items-center gap-2 hover:bg-[#f8fafc] transition-colors"
                    >
                        <Plus size={20} className="text-[#1d90f3] font-bold" /> Add New Row
                    </button>
                </div>

                {/* 6. Alerts Footer Section */}
                <div className="bg-[#fef9c3]/50 border-[1px] border-[#fde68a] rounded-[10px] p-6 flex gap-6 items-center shadow-sm">
                    <div className="text-[#d97706] mt-[-10px]">
                        <AlertTriangle size={60} strokeWidth={1} />
                    </div>
                    <div className="flex-1 space-y-3">
                        <h3 className="text-[#1e2b3c] font-bold text-[20px]">Safety Equipment Checklist Due Alerts</h3>
                        <div className="flex gap-2">
                             <div className="px-5 py-1.5 bg-[#ef4444] text-white text-[14px] font-bold rounded-full">{alerts.expired} Expired</div>
                             <div className="px-5 py-1.5 bg-[#f59e0b] text-white text-[14px] font-bold rounded-full">{alerts.expiringSoon} Expiring Soon</div>
                             <div className="px-5 py-1.5 bg-[#22c55e] text-white text-[14px] font-bold rounded-full">{alerts.valid} Valid</div>
                        </div>
                    </div>
                </div>

                {/* 7. Bottom Save Button */}
                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={processing}
                        className="h-[45px] px-6 bg-[#1d90f3] hover:bg-[#157ad1] text-white font-bold text-[14px] rounded-[6px] flex items-center gap-2 transition-all shadow-md"
                    >
                        <Save size={20} />
                        Save REC-30
                    </button>
                </div>
            </div>
        </AdministratorLayout>
    );
}
