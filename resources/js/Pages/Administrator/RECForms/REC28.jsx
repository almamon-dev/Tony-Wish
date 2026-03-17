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

export default function REC28({ initialSurv = null }) {
    const { data, setData, post, processing } = useForm({
        surv: {
            id: null,
            lastReviewDate: "",
            defaultRenewalPeriod: 1,
            unit: "Years",
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
        const days = calculateDaysRemaining(item.nextDue);
        return days !== null && days < 0;
    });

    useEffect(() => {
        let expired = 0, soon = 0, valid = 0;
        data.items.forEach(item => {
            const days = calculateDaysRemaining(item.nextDue);
            if (days !== null) {
                if (days < 0) expired++;
                else if (days <= 30) soon++;
                else valid++;
            }
        });
        setAlerts({ expired, expiringSoon: soon, valid });
    }, [data.items]);

    useEffect(() => {
        if (initialSurv) {
            setData({
                surv: {
                    id: initialSurv.id,
                    lastReviewDate: initialSurv.last_review_date ? initialSurv.last_review_date.split('T')[0] : "",
                    defaultRenewalPeriod: initialSurv.default_renewal_period || 1,
                    unit: initialSurv.unit || "Years",
                    verifiedBy: initialSurv.verified_by || "",
                    withDate: initialSurv.with_date ? initialSurv.with_date.split('T')[0] : "",
                    status: initialSurv.status || "Draft",
                },
                items: initialSurv.items ? initialSurv.items.map(item => ({
                    id: item.id,
                    employeeName: item.employee_name || '',
                    staffNo: item.staff_no || '',
                    jobRole: item.job_role || '',
                    exposureType: item.exposure_type || '',
                    assessor: item.assessor || '',
                    findings: item.findings || '',
                    followUpRequired: item.follow_up_required || 'No',
                    notes: item.notes || '',
                    dateOfAssessment: item.date_of_assessment ? item.date_of_assessment.split('T')[0] : '',
                    nextDue: item.next_due ? item.next_due.split('T')[0] : '',
                })) : [],
            });
        }
    }, [initialSurv]);

    const updateAllReviewDates = () => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        
        let period = parseInt(data.surv.defaultRenewalPeriod) || 0;
        let nextDate = new Date(today);
        
        if (data.surv.unit === 'Years') {
            nextDate.setFullYear(nextDate.getFullYear() + period);
        } else if (data.surv.unit === 'Months') {
            nextDate.setMonth(nextDate.getMonth() + period);
        } else {
            nextDate.setDate(nextDate.getDate() + period);
        }
        
        const nextDateStr = nextDate.toISOString().split('T')[0];

        const newList = data.items.map(item => ({
            ...item,
            dateOfAssessment: todayStr,
            nextDue: nextDateStr
        }));
        
        setData({
            ...data,
            items: newList
        });
        toast.success("All assessment dates updated!");
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-28.store"), {
            onSuccess: () => {
                toast.success("Occupational Health Surveillance Log saved successfully!");
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
                employeeName: '',
                staffNo: '',
                jobRole: '',
                exposureType: '',
                assessor: '',
                findings: '',
                followUpRequired: 'No',
                notes: '',
                dateOfAssessment: '',
                nextDue: '',
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
            <Head title="REC-28 - Occup Health Surv Log" />

            <div className="max-w-[1500px] mx-auto space-y-6 pb-12 font-sans text-[#1e293b]">
                <div className="bg-white border-[1px] border-[#e2e8f0] rounded-[8px] p-4 shadow-sm">
                    <h1 className="text-[24px] font-bold text-[#1e2b3c]">
                        REC-28 - Occup Health Surv Log
                    </h1>
                </div>

                {overdueItems.length > 0 && (
                    <div className="bg-white border-[1px] border-[#0ea5e9] rounded-[10px] p-4 flex gap-4 items-start shadow-sm">
                        <div className="text-[#0ea5e9] mt-0.5">
                            <Info size={32} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[#0ea5e9] font-bold text-[16px] leading-tight flex items-center gap-1">
                                Surveillance Due Soon! <span className="font-normal text-[15px] ml-1">{overdueItems.length} assessment(s) due or overdue:</span>
                            </h3>
                            <ul className="mt-1 ml-6 list-disc text-[#0ea5e9] text-[15px] font-medium">
                                {overdueItems.map((item, idx) => (
                                    <li key={idx}>{item.employeeName || 'New Employee'} - <span className="font-bold uppercase">OVERDUE by {Math.abs(calculateDaysRemaining(item.nextDue))} days ({item.nextDue})</span></li>
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
                                value={data.surv.defaultRenewalPeriod}
                                onChange={(e) => setData("surv", { ...data.surv, defaultRenewalPeriod: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-[14px] font-bold text-[#1e2b3c] mb-2">Unit</label>
                            <select
                                value={data.surv.unit}
                                onChange={(e) => setData("surv", { ...data.surv, unit: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            >
                                <option value="Years">Years</option>
                                <option value="Months">Months</option>
                                <option value="Days">Days</option>
                            </select>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-[14px] font-bold text-[#1e2b3c] mb-2">Last Review Date</label>
                            <input
                                type="date"
                                value={data.surv.lastReviewDate}
                                onChange={(e) => setData("surv", { ...data.surv, lastReviewDate: e.target.value })}
                                className="w-full h-[45px] bg-[#f8fafc] border-[1px] border-[#cbd5e1] rounded-[6px] px-3 focus:outline-none focus:border-[#0ea5e9]"
                            />
                        </div>
                        <div className="flex-1 min-w-[350px] flex items-center gap-3 h-[45px]">
                            <button
                                onClick={updateAllReviewDates}
                                className="h-full px-6 bg-[#1d90f3] text-white font-bold text-[14px] rounded-[6px] flex items-center justify-center gap-2 hover:bg-[#157ad1] transition-colors whitespace-nowrap shadow-sm"
                            >
                                Update All Assessment Dates <Calendar size={18} />
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
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Employee Name</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Staff No</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Job Role</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Exposure Type</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Assessor</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Findings</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Follow-up Required?</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Notes</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Date of Assessment</th>
                                    <th className="px-3 py-4 text-left text-[14px] font-bold text-[#475569] border-r-[1px] border-[#94a3b8]/40">Next Due</th>
                                    <th className="px-3 py-4 text-center text-[14px] font-bold text-[#475569] w-[100px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-[1px] divide-[#cbd5e1]/50">
                                {data.items.map((item, index) => (
                                    <tr key={index} className="hover:bg-[#f8fafc] transition-colors h-[50px]">
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.employeeName} 
                                                onChange={(e) => updateItem(index, 'employeeName', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.staffNo} 
                                                onChange={(e) => updateItem(index, 'staffNo', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.jobRole} 
                                                onChange={(e) => updateItem(index, 'jobRole', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <select
                                                value={item.exposureType}
                                                onChange={(e) => updateItem(index, 'exposureType', e.target.value)}
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] bg-white px-2 focus:outline-none focus:border-[#0ea5e9] text-[14px]"
                                            >
                                                <option value="">Select</option>
                                                <option value="Noise">Noise</option>
                                                <option value="Fumes">Fumes</option>
                                                <option value="Dust">Dust</option>
                                                <option value="Vibration">Vibration</option>
                                            </select>
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.assessor} 
                                                onChange={(e) => updateItem(index, 'assessor', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <input 
                                                type="text" 
                                                value={item.findings} 
                                                onChange={(e) => updateItem(index, 'findings', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className="px-3 border-r-[1px] border-[#cbd5e1]/50">
                                            <select
                                                value={item.followUpRequired}
                                                onChange={(e) => updateItem(index, 'followUpRequired', e.target.value)}
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] bg-white px-2 focus:outline-none focus:border-[#0ea5e9] text-[14px]"
                                            >
                                                <option value="No">No</option>
                                                <option value="Yes">Yes</option>
                                            </select>
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
                                                value={item.dateOfAssessment} 
                                                onChange={(e) => updateItem(index, 'dateOfAssessment', e.target.value)} 
                                                className="w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] bg-white" 
                                            />
                                        </td>
                                        <td className={`px-3 border-r-[1px] border-[#cbd5e1]/50 ${item.nextDue ? 'bg-[#dcfce7]' : ''}`}>
                                            <input 
                                                type="date" 
                                                value={item.nextDue} 
                                                onChange={(e) => updateItem(index, 'nextDue', e.target.value)} 
                                                className={`w-full h-[40px] border-[1px] border-[#cbd5e1] rounded-[4px] px-2 text-[14px] focus:outline-none focus:border-[#0ea5e9] font-bold bg-white ${item.nextDue ? 'text-[#14532d] !bg-transparent' : ''}`} 
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
                        <h3 className="text-[#1e2b3c] font-bold text-[20px]">Occup Health Surv Log Due Alerts</h3>
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
                        Save REC-28
                    </button>
                </div>
            </div>
        </AdministratorLayout>
    );
}
