import React, { useState, useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Save,
    AlertTriangle,
    Upload,
    Trash2,
    Plus,
    Calendar,
    Download,
    Eye,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC07({ initialProcedures = [], initialWelders = [] }) {
    // Process initial data to match form structure
    const processedWelders = initialWelders.map(w => {
        const qualsObj = {};
        w.qualifications.forEach(q => {
            if (!qualsObj[q.procedure_id]) qualsObj[q.procedure_id] = {};
            qualsObj[q.procedure_id][q.qual_type] = q.expiry_date ? q.expiry_date.split('T')[0] : '';
        });
        return {
            id: w.id,
            name: w.name,
            qualifications: qualsObj
        };
    });

    const { data, setData, post, processing, transform, reset } = useForm({
        procedures: initialProcedures || [],
        welders: processedWelders || [],
        deletedProcedureIds: [],
        deletedWelderIds: [],
    });

    // Reset form when initial data changes from server (e.g., after save/redirect)
    useEffect(() => {
        setData(prev => ({
            ...prev,
            procedures: initialProcedures.length > 0 ? initialProcedures : [],
            welders: processedWelders.length > 0 ? processedWelders : [],
            deletedProcedureIds: [],
            deletedWelderIds: [],
        }));
    }, [initialProcedures, initialWelders]);

    const addProcedure = () => {
        const newProc = {
            id: 'new_p_' + Date.now(),
            type: 'Fillet Weld',
            reference: 'Ref ' + (data.procedures.length + 1).toString().padStart(3, '0'),
            process: 'MIG'
        };
        setData('procedures', [...data.procedures, newProc]);
    };

    const deleteProcedure = (id) => {
        if (typeof id === 'string' && id.startsWith('new_p_')) {
            setData('procedures', data.procedures.filter(p => p.id !== id));
        } else {
            setData(prev => ({
                ...prev,
                procedures: prev.procedures.filter(p => p.id !== id),
                deletedProcedureIds: [...prev.deletedProcedureIds, id]
            }));
        }
    };

    const addWelder = () => {
        const newWelder = {
            id: 'new_w_' + Date.now(),
            name: '',
            qualifications: {}
        };
        setData('welders', [...data.welders, newWelder]);
    };

    const deleteWelder = (id) => {
        if (typeof id === 'string' && id.startsWith('new_w_')) {
            setData('welders', data.welders.filter(w => w.id !== id));
        } else {
            setData(prev => ({
                ...prev,
                welders: prev.welders.filter(w => w.id !== id),
                deletedWelderIds: [...prev.deletedWelderIds, id]
            }));
        }
    };

    const handleWelderNameChange = (id, value) => {
        setData('welders', data.welders.map(w => w.id === id ? { ...w, name: value } : w));
    };

    const handleProcChange = (id, field, value) => {
        setData('procedures', data.procedures.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleQualChange = (welderId, procId, qualType, value) => {
        setData('welders', data.welders.map(w => {
            if (w.id === welderId) {
                const newQuals = { ...w.qualifications };
                if (!newQuals[procId]) newQuals[procId] = {};
                newQuals[procId][qualType] = value;
                return { ...w, qualifications: newQuals };
            }
            return w;
        }));
    };

    const handleSave = () => {
        transform((data) => ({
            ...data,
            welders: data.welders.map(w => ({
                ...w,
                qualifications: Object.entries(w.qualifications).flatMap(([procId, types]) => 
                    Object.entries(types).map(([qualType, expiryDate]) => ({
                        procedure_id: procId,
                        qual_type: qualType,
                        expiry_date: expiryDate
                    }))
                )
            }))
        }));

        post(route('administrator.rec-forms.rec-07.store'), {
            onSuccess: () => {
                toast.success("Welding qualifications saved successfully!");
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data. Please check the form.");
            }
        });
    };

    const getDateClass = (date) => {
        if (!date || date === 'N/A') return "bg-gray-50 text-slate-300";
        
        const today = new Date();
        const d = new Date(date);
        if (isNaN(d.getTime())) return "bg-gray-50 text-slate-300";

        const diffTime = d - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "bg-[#fee2e2] text-[#ef4444]";
        if (diffDays < 30) return "bg-[#fef3c7] text-[#d97706]";
        return "bg-[#eefcf4] text-[#1aa15f]";
    };

    const getStats = () => {
        let expired = 0, soon = 0, valid = 0;
        data.welders.forEach(w => {
            Object.values(w.qualifications).forEach(types => {
                if (typeof types === 'object') {
                    Object.values(types).forEach(date => {
                        const cls = getDateClass(date);
                        if (cls.includes('fee2e2')) expired++;
                        else if (cls.includes('fef3c7')) soon++;
                        else if (cls.includes('eefcf4')) valid++;
                    });
                }
            });
        });
        return { expired, soon, valid };
    };

    const stats = getStats();

    return (
        <AdministratorLayout>
            <Head title="REC-07 - Welding Specifications and Qualifications" />

            <div className="space-y-4 pb-10">
                {/* Header Section */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm p-4 text-[14px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold text-slate-800 tracking-tight">
                                REC-07: Welding Specifications and Qualifications
                            </h1>
                        </div>
                        <div className="flex items-center gap-3">
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
                <div className="bg-[#fff9ef] border border-amber-100/50 rounded-sm p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-amber-100/50 flex items-center justify-center text-amber-600 shrink-0 border border-amber-200/30">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-[14px] font-bold text-slate-700 tracking-tight leading-none">
                                Welder Qualification Alerts
                            </h3>
                            <div className="flex items-center gap-3 mt-2">
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
                </div>

                {/* Main Table Container */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[14px] font-bold text-slate-700 uppercase tracking-tight">Weld Procedure (WP) + Weld Procedure Qualification (WPQS)</h3>
                        <button 
                            onClick={addProcedure}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-all text-xs font-bold shadow-sm"
                        >
                            <Plus size={14} className="text-slate-400" />
                            Add New Weld Procedure
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto border border-slate-300 rounded-sm">
                        <table className="w-full text-[11px] border-collapse min-w-[1100px]">
                            <thead>
                                <tr className="bg-[#f8fafc]">
                                    <th rowSpan={4} className="border border-slate-300 px-4 py-3 text-left font-bold text-slate-700 bg-white w-[200px]">Name</th>
                                    {data.procedures.map(p => (
                                        <th key={p.id} colSpan={2} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-600 bg-white relative group">
                                            <input 
                                                value={p.type} 
                                                onChange={(e) => handleProcChange(p.id, 'type', e.target.value)}
                                                className="w-full bg-transparent border-0 text-[11px] font-bold text-center focus:ring-0 p-0 uppercase"
                                                placeholder="Weld Type"
                                            />
                                            <button 
                                                onClick={() => deleteProcedure(p.id)}
                                                className="absolute -top-1 -right-1 p-1 bg-white border border-slate-200 rounded-full text-red-400 hover:text-red-500 hover:border-red-200 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                                                title="Delete Procedure"
                                            >
                                                <Trash2 size={10} />
                                            </button>
                                        </th>
                                    ))}
                                    <th rowSpan={4} className="border border-slate-300 px-2 py-2 text-center font-bold text-slate-700 bg-[#f8fafc] w-[90px]">Actions</th>
                                </tr>
                                <tr className="bg-white">
                                    {data.procedures.map(p => (
                                        <th key={p.id} colSpan={2} className="border border-slate-300 px-2 py-1.5 text-center">
                                            <input 
                                                value={p.reference} 
                                                onChange={(e) => handleProcChange(p.id, 'reference', e.target.value)}
                                                className="w-full bg-transparent border-0 text-[10px] text-slate-500 text-center focus:ring-0 p-0"
                                                placeholder="Reference"
                                            />
                                        </th>
                                    ))}
                                </tr>
                                <tr className="bg-[#f8fafc]">
                                    {data.procedures.map(p => (
                                        <th key={p.id} colSpan={2} className="border border-slate-300 px-2 py-1.5 text-center lowercase text-slate-500 font-medium">
                                            <input 
                                                value={p.process} 
                                                onChange={(e) => handleProcChange(p.id, 'process', e.target.value)}
                                                className="w-full bg-transparent border-0 text-[11px] font-bold text-slate-700 text-center focus:ring-0 p-0 uppercase"
                                                placeholder="Process"
                                            />
                                        </th>
                                    ))}
                                </tr>
                                <tr className="bg-white font-bold text-slate-500">
                                    {data.procedures.map(p => (
                                        <React.Fragment key={p.id}>
                                            <th className="border border-slate-300 px-1 py-1.5 text-[9px] font-bold text-center uppercase tracking-tighter">Prolongation</th>
                                            <th className="border border-slate-300 px-1 py-1.5 text-[9px] font-bold text-center uppercase tracking-tighter">Re-Test</th>
                                        </React.Fragment>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.welders.map(w => (
                                    <tr key={w.id} className="hover:bg-slate-50/50">
                                        <td className="border border-slate-300 px-4 py-3 bg-white">
                                            <input 
                                                value={w.name}
                                                onChange={(e) => handleWelderNameChange(w.id, e.target.value)}
                                                placeholder="Employee Name"
                                                className="w-full border-0 p-0 text-[12px] font-bold text-slate-700 focus:ring-0 bg-transparent"
                                            />
                                        </td>
                                        {data.procedures.map(p => {
                                            const prolongationDate = w.qualifications[p.id]?.prolongation;
                                            const reTestDate = w.qualifications[p.id]?.re_test;
                                            
                                            const getBgColor = (date) => {
                                                if (!date) return "bg-white";
                                                const cls = getDateClass(date);
                                                if (cls.includes('fee2e2')) return "bg-[#fee2e2]"; // Overdue Red
                                                if (cls.includes('fef3c7')) return "bg-[#fef3c7]"; // Soon Amber
                                                if (cls.includes('eefcf4')) return "bg-[#eefcf4]"; // Valid Green
                                                return "bg-white";
                                            };

                                            return (
                                                <React.Fragment key={p.id} >
                                                    <td className={`border border-slate-300 p-0 transition-colors ${getBgColor(prolongationDate)}`}>
                                                        <input 
                                                            type="text"
                                                            value={prolongationDate || ''}
                                                            onChange={(e) => handleQualChange(w.id, p.id, 'prolongation', e.target.value)}
                                                            className="w-full bg-transparent border-0 text-[11px] font-bold text-center px-1 py-2.5 focus:ring-0"
                                                            placeholder="DD/MM/YY"
                                                        />
                                                    </td>
                                                    <td className={`border border-slate-300 p-0 transition-colors ${getBgColor(reTestDate)}`}>
                                                        <input 
                                                            type="text"
                                                            value={reTestDate || ''}
                                                            onChange={(e) => handleQualChange(w.id, p.id, 're_test', e.target.value)}
                                                            className="w-full bg-transparent border-0 text-[11px] font-bold text-center px-1 py-2.5 focus:ring-0"
                                                            placeholder="DD/MM/YY"
                                                        />
                                                    </td>
                                                </React.Fragment>
                                            );
                                        })}
                                        <td className="border border-slate-300 px-2 py-2 text-center bg-white">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="text-[#3b82f6] hover:scale-110 transition-transform">
                                                    <Upload size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => deleteWelder(w.id)}
                                                    className="text-[#ef4444] hover:scale-110 transition-transform"
                                                >
                                                    <Trash2 size={15} />
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
                            onClick={addWelder}
                            className="flex items-center gap-2 px-10 py-2.5 bg-white border border-slate-300 text-slate-500 font-bold text-[12px] hover:bg-slate-50 transition-all rounded-md shadow-sm"
                        >
                            <Plus size={16} strokeWidth={2.5} className="text-slate-400" />
                            Add New Employee
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
