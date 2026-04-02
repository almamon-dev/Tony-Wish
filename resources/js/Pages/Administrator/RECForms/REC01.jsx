import React, { useState, useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Download, Save, Plus, Trash2, Link as LinkIcon, FileCheck, Check, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function REC01({ initialDocuments = [] }) {
    const { data, setData, post, processing } = useForm({
        documents: [],
        deletedIds: [],
    });

    const standards = [
        "EN 1090", "ISO 9001", "ISO 14401", "ISO 45001", "ISO 15085", "EN 20", "NHSS 20"
    ];

    useEffect(() => {
        if (initialDocuments.length > 0) {
            setData("documents", initialDocuments.map(item => ({
                id: item.id,
                documentNumber: item.document_number || '',
                documentTitle: item.document_title || '',
                currentRevision: item.current_revision || '',
                revisionDate: item.revision_date ? item.revision_date.split('T')[0] : '',
                location: item.location || '',
                processOwner: item.process_owner || '',
                nextReviewDate: item.next_review_date ? item.next_review_date.split('T')[0] : '',
                documentLink: item.document_link || '',
                compliance: item.compliance ? JSON.parse(item.compliance) : new Array(standards.length).fill(0),
            })));
        } else {
            setData("documents", [{
                id: `new_${Date.now()}`,
                documentNumber: 'REC-01',
                documentTitle: 'Controlled Document Register',
                currentRevision: '01',
                revisionDate: '2025-01-01',
                location: 'Portal',
                processOwner: 'MD',
                nextReviewDate: '',
                documentLink: '',
                compliance: [1, 1, 1, 1, 1, 1, 0],
            }]);
        }
    }, [initialDocuments]);

    const handleSave = () => {
        // We stringify the compliance array before sending to backend
        const preparedDocuments = data.documents.map(doc => ({
            ...doc,
            compliance: JSON.stringify(doc.compliance)
        }));

        post(route("administrator.rec-forms.rec-01.store"), {
            onSuccess: () => {
                toast.success("Controlled Document Register saved successfully!");
                setData("deletedIds", []);
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data.");
            },
        });
    };

    const addDocument = () => {
        setData("documents", [
            ...data.documents,
            {
                id: `new_${Date.now()}`,
                documentNumber: '',
                documentTitle: '',
                currentRevision: '01',
                revisionDate: '',
                location: 'Portal',
                processOwner: 'MD',
                nextReviewDate: '',
                documentLink: '',
                compliance: new Array(standards.length).fill(0),
            }
        ]);
    };

    const updateDocument = (index, field, value) => {
        const newList = [...data.documents];
        newList[index][field] = value;
        setData("documents", newList);
    };

    const toggleCompliance = (docIndex, stdIndex) => {
        const newList = [...data.documents];
        newList[docIndex].compliance[stdIndex] = newList[docIndex].compliance[stdIndex] === 1 ? 0 : 1;
        setData("documents", newList);
    };

    const removeDocument = (index) => {
        const itemToRemove = data.documents[index];
        const newList = [...data.documents];
        newList.splice(index, 1);

        if (typeof itemToRemove.id === "number") {
            setData((prevData) => ({
                ...prevData,
                documents: newList,
                deletedIds: [...prevData.deletedIds, itemToRemove.id],
            }));
        } else {
            setData("documents", newList);
        }
    };

    return (
        <AdministratorLayout>
            <Head title="REC-01 - Controlled Document Register Matrix" />

            <div className="space-y-6 max-w-[1600px] mx-auto pb-12 px-4">
                {/* Modern Header Section */}
                <div className="bg-white border border-slate-200 rounded-sm p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <Link
                            href={route("administrator.rec-forms.index")}
                            className="inline-flex items-center gap-2 text-[#2185d5] hover:underline transition-all text-[11px] font-black uppercase tracking-widest"
                        >
                            <ArrowLeft size={14} strokeWidth={3} />
                            BACK TO DASHBOARD
                        </Link>
                        <h1 className="text-[26px] font-black text-slate-800 tracking-tight leading-none uppercase flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-sm flex items-center justify-center text-[#2185d5]">
                                <FileCheck size={24} />
                            </div>
                            REC-01 Controlled Document Matrix
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="flex items-center gap-2 h-11 px-6 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 transition-all text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {processing ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save size={16} />
                            )}
                            Save Register
                        </button>
                    </div>
                </div>

                {/* Matrix Register Table */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1400px] border-collapse">
                            <thead>
                                <tr className="bg-[#DCE7F3] border-b border-blue-200">
                                    <th className="px-4 py-4 text-left text-[11px] font-black text-slate-700 uppercase tracking-widest w-[110px]">Doc No</th>
                                    <th className="px-4 py-4 text-left text-[11px] font-black text-slate-700 uppercase tracking-widest min-w-[280px]">Document Description</th>
                                    {standards.map((std, i) => (
                                        <th key={i} className="px-1 py-4 text-center text-[10px] font-black text-slate-700 uppercase tracking-tighter w-[75px]">
                                            {std.split(' ').map((part, pidx) => (
                                                <div key={pidx} className="leading-[1.1]">{part}</div>
                                            ))}
                                        </th>
                                    ))}
                                    <th className="px-4 py-4 text-right text-[11px] font-black text-slate-700 uppercase tracking-widest w-36">Revision Date</th>
                                    <th className="px-2 py-4 text-center text-[11px] font-black text-slate-700 uppercase tracking-widest w-12"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.documents.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                        {/* Doc No */}
                                        <td className="px-4 py-3">
                                            <input 
                                                type="text" 
                                                value={item.documentNumber} 
                                                onChange={(e) => updateDocument(index, 'documentNumber', e.target.value)}
                                                className="w-full bg-transparent p-0 text-[13px] font-black text-slate-400 group-hover:text-[#2185d5] border-none focus:ring-0" 
                                                placeholder="Doc ID"
                                            />
                                        </td>
                                        
                                        {/* Description */}
                                        <td className="px-4 py-3">
                                            <input 
                                                type="text" 
                                                value={item.documentTitle} 
                                                onChange={(e) => updateDocument(index, 'documentTitle', e.target.value)}
                                                className="w-full bg-transparent p-0 text-[14px] font-bold text-slate-700 border-none focus:ring-0" 
                                                placeholder="Document Title..."
                                            />
                                        </td>

                                        {/* Compliance Matrix Ticks */}
                                        {item.compliance.map((checked, sIdx) => (
                                            <td key={sIdx} className="px-1 py-3 text-center">
                                                <button 
                                                    onClick={() => toggleCompliance(index, sIdx)}
                                                    className="flex justify-center w-full focus:outline-none"
                                                >
                                                    {checked ? (
                                                        <div className="w-5 h-5 bg-[#27ae60] rounded-sm flex items-center justify-center text-white shadow-sm shadow-emerald-200">
                                                            <Check size={12} strokeWidth={4} />
                                                        </div>
                                                    ) : (
                                                        <div className="w-5 h-5 border-2 border-slate-100 rounded-sm bg-white hover:bg-slate-50 transition-colors"></div>
                                                    )}
                                                </button>
                                            </td>
                                        ))}

                                        {/* Revision Date */}
                                        <td className="px-4 py-3 text-right">
                                            <input 
                                                type="date" 
                                                value={item.revisionDate} 
                                                onChange={(e) => updateDocument(index, 'revisionDate', e.target.value)}
                                                className="w-full bg-transparent p-0 text-[13px] font-bold text-slate-400 text-right border-none focus:ring-0" 
                                            />
                                        </td>

                                        {/* Remove Action */}
                                        <td className="px-2 py-3 text-center">
                                            <button 
                                                onClick={() => removeDocument(index)}
                                                className="text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                                title="Remove document"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Row Button */}
                    <div className="p-6 bg-slate-50/50 border-t border-slate-100">
                        <button 
                            onClick={addDocument}
                            className="w-full h-14 bg-white border-2 border-dashed border-slate-200 rounded-sm text-slate-400 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:border-[#2185d5] hover:text-[#2185d5] hover:bg-white transition-all text-[11px]"
                        >
                            <Plus size={20} strokeWidth={3} />
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
