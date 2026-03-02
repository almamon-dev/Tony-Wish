import React, { useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Download, Save, Plus, Trash2, Link as LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function REC01({ initialDocuments = [] }) {
    const { data, setData, post, processing } = useForm({
        documents: [],
        deletedIds: [],
    });

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
            })));
        } else {
            setData("documents", [{
                id: `new_${Date.now()}`,
                documentNumber: 'REC-01',
                documentTitle: 'Controlled Document Register',
                currentRevision: '01',
                revisionDate: '',
                location: 'Portal',
                processOwner: 'MD',
                nextReviewDate: '',
                documentLink: '',
            }]);
        }
    }, [initialDocuments]);

    const handleSave = () => {
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
            }
        ]);
    };

    const updateDocument = (index, field, value) => {
        const newList = [...data.documents];
        newList[index][field] = value;
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
            <Head title="REC-01 - Controlled Document Register" />

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
                            REC-01 - Controlled Document Register
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-sm hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Download size={18} />
                            Export Excel
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

                {/* Main Content */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1200px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Document No.
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-64">
                                        Document Title
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Current Rev
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Revision Date
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Location
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Process Owner
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-40">
                                        Next Review Date
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        File Link
                                    </th>
                                    <th className="px-3 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.documents.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-2 py-2">
                                            <input 
                                                type="text" 
                                                value={item.documentNumber} 
                                                onChange={(e) => updateDocument(index, 'documentNumber', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-bold text-slate-700 border border-transparent focus:border-blue-500 outline-none" 
                                                placeholder="Doc No."
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input 
                                                type="text" 
                                                value={item.documentTitle} 
                                                onChange={(e) => updateDocument(index, 'documentTitle', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none" 
                                                placeholder="Title"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input 
                                                type="text" 
                                                value={item.currentRevision} 
                                                onChange={(e) => updateDocument(index, 'currentRevision', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none text-center" 
                                                placeholder="Rev"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input 
                                                type="date" 
                                                value={item.revisionDate} 
                                                onChange={(e) => updateDocument(index, 'revisionDate', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none" 
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input 
                                                type="text" 
                                                value={item.location} 
                                                onChange={(e) => updateDocument(index, 'location', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none" 
                                                placeholder="Location"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input 
                                                type="text" 
                                                value={item.processOwner} 
                                                onChange={(e) => updateDocument(index, 'processOwner', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none" 
                                                placeholder="Owner"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input 
                                                type="date" 
                                                value={item.nextReviewDate} 
                                                onChange={(e) => updateDocument(index, 'nextReviewDate', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-bold text-[#2185d5] border border-transparent focus:border-blue-500 outline-none" 
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <div className="flex bg-slate-50 rounded-sm">
                                                <input 
                                                    type="text" 
                                                    value={item.documentLink} 
                                                    onChange={(e) => updateDocument(index, 'documentLink', e.target.value)}
                                                    className="w-full bg-transparent px-2 py-2 rounded-l-sm text-[12px] text-blue-500 font-medium border-transparent focus:border-blue-500 outline-none" 
                                                    placeholder="Link"
                                                />
                                                <div className="px-2 py-2 flex items-center text-slate-400">
                                                    <LinkIcon size={14} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => removeDocument(index)}
                                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors"
                                                    title="Delete row"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6">
                        <button 
                            onClick={addDocument}
                            className="w-full py-3 border border-slate-200 rounded-sm text-[#2185d5] font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm shadow-sm bg-white"
                        >
                            <Plus size={18} />
                            Add New Document
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
