import React, { useEffect, useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    Trash2,
    Plus,
    Save,
    Calendar,
    Info,
    AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC26({ initialDrill = null }) {
    const { data, setData, post, processing } = useForm({
        drill: {
            id: null,
            lastReviewDate: "",
            defaultRenewalPeriod: 6,
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

    const overdueItems = data.items.filter(item => {
        const days = calculateDaysRemaining(item.nextDrillDue);
        return days !== null && days < 0;
    });

    useEffect(() => {
        let expired = 0, soon = 0, valid = 0;
        data.items.forEach(item => {
            const days = calculateDaysRemaining(item.nextDrillDue);
            if (days !== null) {
                if (days < 0) expired++;
                else if (days <= 30) soon++;
                else valid++;
            }
        });
        setAlerts({ expired, expiringSoon: soon, valid });
    }, [data.items]);

    useEffect(() => {
        if (initialDrill) {
            setData({
                drill: {
                    id: initialDrill.id,
                    lastReviewDate: initialDrill.last_review_date ? initialDrill.last_review_date.split('T')[0] : "",
                    defaultRenewalPeriod: initialDrill.default_renewal_period || 6,
                    unit: initialDrill.unit || "Months",
                    verifiedBy: initialDrill.verified_by || "",
                    withDate: initialDrill.with_date ? initialDrill.with_date.split('T')[0] : "",
                    status: initialDrill.status || "Draft",
                },
                items: initialDrill.items ? initialDrill.items.map(item => ({
                    id: item.id,
                    drillType: item.drill_type || '',
                    participants: item.participants || 0,
                    outcome: item.outcome || '',
                    issuesFound: item.issues_found || '',
                    followUpAction: item.follow_up_action || '',
                    notes: item.notes || '',
                    date: item.date ? item.date.split('T')[0] : '',
                    nextDrillDue: item.next_drill_due ? item.next_drill_due.split('T')[0] : '',
                })) : [],
            });
        }
    }, [initialDrill]);

    const updateAllReviewDates = () => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        let period = parseInt(data.drill.defaultRenewalPeriod) || 0;
        let nextDate = new Date(today);
        
        if (data.drill.unit === 'Months') {
            nextDate.setMonth(nextDate.getMonth() + period);
        } else if (data.drill.unit === 'Years') {
            nextDate.setFullYear(nextDate.getFullYear() + period);
        } else {
            nextDate.setDate(nextDate.getDate() + period);
        }
        
        const nextDateStr = nextDate.toISOString().split('T')[0];

        const newList = data.items.map(item => ({
            ...item,
            date: todayStr,
            nextDrillDue: nextDateStr
        }));
        
        setData({
            ...data,
            items: newList
        });
        toast.success("All drill dates updated!");
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-26.store"), {
            onSuccess: () => {
                toast.success("Emergency Drill record saved successfully!");
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
                drillType: '',
                participants: 0,
                outcome: '',
                issuesFound: '',
                followUpAction: '',
                notes: '',
                date: '',
                nextDrillDue: '',
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
            <Head title="REC-26 - Emergency Drill" />

            <div className="max-w-[1500px] mx-auto space-y-6 pb-12 font-sans text-[#1e293b]">
                <div className="bg-white border-[1px] border-[#e2e8f0] rounded-[8px] p-4 shadow-sm">
                    <h1 className="text-[24px] font-bold text-[#1e2b3c]">
                        REC-26 - Emergency Drill
                    </h1>
                    <p className="text-[14px] text-[#64748b]">Environmental performance objectives</p>
                </div>

                {overdueItems.length > 0 && (
                    <div className="bg-white border-[1px] border-[#0ea5e9] rounded-[10px] p-4 flex gap-4 items-start shadow-sm">
                        <div className="text-[#0ea5e9] mt-0.5">
                            <Info size={32} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[#0ea5e9] font-bold text-[16px] leading-tight flex items-center gap-1">
                                Drill Due Soon! <span className="font-normal text-[15px] ml-1">{overdueItems.length} drill(s) due or overdue:</span>
                            </h3>
                            <ul className="mt-1 ml-6 list-disc text-[#0ea5e9] text-[15px] font-medium">
                                {overdueItems.map((item, idx) => (
                                    <li key={idx}>{item.drillType || 'New Drill'} - <span className="font-bold uppercase">OVERDUE by {Math.abs(calculateDaysRemaining(item.nextDrillDue))} days ({item.nextDrillDue})</span></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="border-[1px] border-[#0ea5e9] rounded-[10px] overflow-hidden bg-white shadow-sm">
                    <div className="bg-[#f8fafc] px-4 py-2.5 border-b-[1px] border-[#0ea5e9]">
                        <h2 className="text-[18px] font-bold text-[#1e2b3c]">Renewal Period Settings</h2>
                    </div>
                    <div className="p-4 flex flex-col md:flex-row gap-6 items-end">
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-[14px] font-bold text-[#1e2b3c] mb-2">Default Renewal Period</label>
                            <input
                                type="number"
                                value={data.drill.defaultRenewalPeriod}
                                onChange={(e) => setData("drill", { ...data.drill, defaultRenewalPeriod: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-[14px] font-bold text-[#1e2b3c] mb-2">Unit</label>
                            <select
                                value={data.drill.unit}
                                onChange={(e) => setData("drill", { ...data.drill, unit: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            >
                                <option value="Months">Months</option>
                                <option value="Years">Years</option>
                                <option value="Days">Days</option>
                            </select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-[14px] font-bold text-[#1e2b3c] mb-2">Last Review Date</label>
                            <input
                                type="date"
                                value={data.drill.lastReviewDate}
                                onChange={(e) => setData("drill", { ...data.drill, lastReviewDate: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            />
                        </div>
                        <div className="flex-1 min-w-[350px] flex items-center gap-3 h-[45px]">
                            <button
                                onClick={updateAllReviewDates}
                                className="h-full px-6 bg-[#1d90f3] text-white font-bold text-[14px] rounded-[6px] flex items-center justify-center gap-2 hover:bg-[#157ad1] transition-colors whitespace-nowrap shadow-sm"
                            >
                                Update All Drill Dates <Calendar size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-[1px] border-[#0ea5e9] rounded-[10px] overflow-hidden bg-white shadow-sm">
                    <div className="bg-[#f8fafc] px-4 py-2.5 border-b-[1px] border-[#0ea5e9]">
                        <h2 className="text-[18px] font-bold text-[#1e2b3c]">Associated Documents</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1400px] border-collapse bg-white">
                            <thead>
                                <tr className="bg-[#cbd5e1]/40 border-b-[1px] border-[#94a3b8]/50">
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Drill Type</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Participants</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Outcome</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Issues Found</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Follow-up Action</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Notes</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Date</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Next Drill Due</th>
                                    <th className="px-3 py-4 text-center text-[14px] font-bold text-[#475569] w-[100px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-[1px] divide-[#cbd5e1]/50">
                                {data.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-[#f8fafc] transition-colors h-[50px]">
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <select
                                                value={item.drillType}
                                                onChange={(e) => updateItem(index, 'drillType', e.target.value)}
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] bg-white px-2 focus:outline-none focus:border-[#0ea5e9] text-[14px]"
                                            >
                                                <option value="">Select</option>
                                                <option value="Fire Evacuation">Fire Evacuation</option>
                                                <option value="Chemical Spill">Chemical Spill</option>
                                                <option value="First Aid">First Aid</option>
                                            </select>
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="number" 
                                                value={item.participants} 
                                                onChange={(e) => updateItem(index, 'participants', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <select
                                                value={item.outcome}
                                                onChange={(e) => updateItem(index, 'outcome', e.target.value)}
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] bg-white px-2 focus:outline-none focus:border-[#0ea5e9] text-[14px]"
                                            >
                                                <option value="">Select</option>
                                                <option value="Successful">Successful</option>
                                                <option value="Needs Improvement">Needs Improvement</option>
                                                <option value="Failed">Failed</option>
                                            </select>
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.issuesFound} 
                                                onChange={(e) => updateItem(index, 'issuesFound', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.followUpAction} 
                                                onChange={(e) => updateItem(index, 'followUpAction', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.notes} 
                                                onChange={(e) => updateItem(index, 'notes', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="date" 
                                                value={item.date} 
                                                onChange={(e) => updateItem(index, 'date', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className={`px-3 border-r-[1px] border-[#cbd5e1]/50 ${item.nextDrillDue ? 'bg-[#dcfce7]' : ''}`}>
                                            <input 
                                                type="date" 
                                                value={item.nextDrillDue} 
                                                onChange={(e) => updateItem(index, 'nextDrillDue', e.target.value)} 
                                                className={`w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] font-bold bg-white ${item.nextDrillDue ? 'text-[#14532d] !bg-transparent' : ''}`} 
                                            />
                                        </td>
                                        <td className="px-3 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => removeItem(index)} className="text-[#ef4444] hover:text-[#dc2626] transition-colors"><Trash2 size={20} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                   <button
                        onClick={addItem}
                        className="h-[40px] px-4 bg-white border-[1px] border-[#cbd5e1] rounded-[6px] text-[15px] font-bold text-[#475569] flex items-center gap-2 hover:bg-[#f8fafc] transition-colors"
                    >
                        <Plus size={20} className="text-[#1d90f3] font-bold" /> Add New Row
                    </button>
                </div>

                <div className="bg-[#fef9c3]/50 border-[1px] border-[#fde68a] rounded-[10px] p-6 flex gap-6 items-center shadow-sm">
                    <div className="text-[#d97706] mt-[-10px]">
                        <AlertTriangle size={60} strokeWidth={1} />
                    </div>
                    <div className="flex-1 space-y-3">
                        <h3 className="text-[#1e2b3c] font-bold text-[20px]">Emergency Drill Due Alerts</h3>
                        <div className="flex gap-2">
                             <div className="px-5 py-1.5 bg-[#ef4444] text-white text-[14px] font-bold rounded-full">{alerts.expired} Expired</div>
                             <div className="px-5 py-1.5 bg-[#f59e0b] text-white text-[14px] font-bold rounded-full">{alerts.expiringSoon} Expiring Soon</div>
                             <div className="px-5 py-1.5 bg-[#22c55e] text-white text-[14px] font-bold rounded-full">{alerts.valid} Valid</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={processing}
                        className="h-[45px] px-6 bg-[#1d90f3] hover:bg-[#157ad1] text-white font-bold text-[14px] rounded-[6px] flex items-center gap-2 transition-all shadow-md"
                    >
                        <Save size={20} />
                        Save REC-26
                    </button>
                </div>
            </div>
        </AdministratorLayout>
    );
}
