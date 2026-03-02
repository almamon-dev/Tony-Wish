import React, { useEffect } from "react";
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
    Check,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC18({ initialReview }) {
    const { data, setData, post, processing } = useForm({
        review: {
            id: null,
            lastReviewDate: "",
            renewalPeriod: "Yearly",
            link: "Meeting",
            nextReviewDate: "",
            verifiedBy: "",
            withDate: "",
            verifiedStatus: "Draft",
        },
        agendas: [],
        objectives: [],
        risks: [],
        deletedAgendaIds: [],
        deletedObjectiveIds: [],
        deletedRiskIds: [],
    });

    useEffect(() => {
        if (initialReview) {
            setData({
                review: {
                    id: initialReview.id,
                    lastReviewDate: initialReview.last_review_date ? initialReview.last_review_date.split('T')[0] : "",
                    renewalPeriod: initialReview.renewal_period || "Yearly",
                    link: initialReview.link || "Meeting",
                    nextReviewDate: initialReview.next_review_date ? initialReview.next_review_date.split('T')[0] : "",
                    verifiedBy: initialReview.verified_by || "",
                    withDate: initialReview.with_date ? initialReview.with_date.split('T')[0] : "",
                    verifiedStatus: initialReview.verified_status || "Draft",
                },
                agendas: initialReview.agendas ? initialReview.agendas.map(item => ({
                    id: item.id,
                    desc: item.desc || '',
                    link: item.link || '',
                    unique: item.unique || '',
                    evidence: item.evidence || '',
                    owner: item.owner || '',
                    status: item.status || 'Open',
                })) : [],
                objectives: initialReview.objectives ? initialReview.objectives.map(item => ({
                    id: item.id,
                    obj: item.obj || '',
                    ref: item.ref || '',
                    review: item.review || '',
                    evidence: item.evidence || '',
                    status: item.status || 'Open',
                })) : [],
                risks: initialReview.risks ? initialReview.risks.map(item => ({
                    id: item.id,
                    desc: item.desc || '',
                    link: item.link || '',
                    unique: item.unique || '',
                    riskOpp: item.risk_opp || 'Risk',
                    evidence: item.evidence || '',
                    owner: item.owner || '',
                    status: item.status || 'Open',
                })) : [],
                deletedAgendaIds: [],
                deletedObjectiveIds: [],
                deletedRiskIds: [],
            });
        }
    }, [initialReview]);

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-18.store"), {
            onSuccess: () => {
                toast.success("Management Review saved successfully!");
                setData({
                    ...data,
                    deletedAgendaIds: [],
                    deletedObjectiveIds: [],
                    deletedRiskIds: [],
                });
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data.");
            },
        });
    };

    // Generic list handlers
    const addListItem = (listName, defaultItem) => {
        setData(listName, [
            ...data[listName],
            { ...defaultItem, id: `new_${Date.now()}` }
        ]);
    };

    const updateListItem = (listName, index, field, value) => {
        const newList = [...data[listName]];
        newList[index][field] = value;
        setData(listName, newList);
    };

    const removeListItem = (listName, deletedIdsName, index) => {
        const itemToRemove = data[listName][index];
        const newList = [...data[listName]];
        newList.splice(index, 1);

        if (typeof itemToRemove.id === "number") {
            setData(prev => ({
                ...prev,
                [listName]: newList,
                [deletedIdsName]: [...prev[deletedIdsName], itemToRemove.id],
            }));
        } else {
            setData(listName, newList);
        }
    };

    return (
        <AdministratorLayout>
            <Head title="REC-18 - Management Review & Risk Objectives Record" />

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
                            REC-18 - Management Review & Risk Objectives Record
                        </h1>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-bold shadow-sm hover:bg-slate-50">
                                <Printer size={16} />
                                Print
                            </button>
                        </div>
                    </div>

                    <div className="mb-8 bg-slate-50/50 p-4 rounded-sm border border-slate-100">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Last Review Date
                                </label>
                                <input
                                    type="date"
                                    value={data.review.lastReviewDate}
                                    onChange={(e) => setData("review", { ...data.review, lastReviewDate: e.target.value })}
                                    className="w-full h-9 px-3 bg-white border border-slate-200 rounded-sm text-sm font-medium text-slate-700 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Renewal Period
                                </label>
                                <select
                                    value={data.review.renewalPeriod}
                                    onChange={(e) => setData("review", { ...data.review, renewalPeriod: e.target.value })}
                                    className="w-full h-9 px-3 bg-white border border-slate-200 rounded-sm text-sm font-medium text-slate-700 focus:border-blue-500 outline-none"
                                >
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Link
                                </label>
                                <input
                                    type="text"
                                    value={data.review.link}
                                    onChange={(e) => setData("review", { ...data.review, link: e.target.value })}
                                    className="w-full h-9 px-3 bg-white border border-slate-200 rounded-sm text-sm font-medium text-slate-700 focus:border-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                    Next Review Date
                                </label>
                                <input
                                    type="date"
                                    value={data.review.nextReviewDate}
                                    onChange={(e) => setData("review", { ...data.review, nextReviewDate: e.target.value })}
                                    className="w-full h-9 px-3 bg-[#2185d5]/10 text-[#2185d5] font-bold border border-[#2185d5]/30 rounded-sm text-sm focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <button className="w-full border-2 border-dashed border-slate-200 rounded-sm p-4 flex flex-col items-center gap-2 text-slate-400 hover:border-slate-300 hover:bg-slate-50 transition-all">
                            <Upload size={24} />
                            <span className="text-sm font-medium">
                                Upload Associated Documents
                            </span>
                        </button>
                    </div>

                    <div className="mb-8 overflow-hidden rounded-sm border border-slate-200">
                        <div className="bg-[#2185d5] text-white px-4 py-2 font-bold text-sm uppercase flex items-center gap-2">
                            MANAGEMENT REVIEW - AGENDA ITEMS
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[1000px]">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                            Description
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                            Link
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                            Unique?
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                            Evidence / Meeting Minutes
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-48">
                                            Owner
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32 text-center">
                                            Status
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-16 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {data.agendas.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="p-2">
                                                <input type="text" value={item.desc} onChange={(e) => updateListItem('agendas', index, 'desc', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.link} onChange={(e) => updateListItem('agendas', index, 'link', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <select value={item.unique} onChange={(e) => updateListItem('agendas', index, 'unique', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none">
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.evidence} onChange={(e) => updateListItem('agendas', index, 'evidence', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.owner} onChange={(e) => updateListItem('agendas', index, 'owner', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2 text-center">
                                                <select value={item.status} onChange={(e) => updateListItem('agendas', index, 'status', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[11px] font-bold uppercase border-transparent focus:border-blue-500 outline-none text-center">
                                                    <option value="Open">Open</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="p-2 text-center">
                                                <button onClick={() => removeListItem('agendas', 'deletedAgendaIds', index)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-2 bg-slate-50 border-t border-slate-200">
                            <button onClick={() => addListItem('agendas', { desc: '', link: '', unique: 'Yes', evidence: '', owner: 'MD / All', status: 'Open' })} className="text-[11px] font-bold text-[#2185d5] flex items-center gap-1 hover:underline px-2">
                                <Plus size={12} /> Add Agenda Item
                            </button>
                        </div>
                    </div>

                    <div className="mb-8 overflow-hidden rounded-sm border border-slate-200">
                        <div className="bg-emerald-500 text-white px-4 py-2 font-bold text-sm uppercase flex items-center gap-2">
                            OBJECTIVES
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[1000px]">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                            Objectives
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                            Ref
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                            Review?
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                            Action / Evidence
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32 text-center">
                                            Status
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-16 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {data.objectives.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="p-2">
                                                <input type="text" value={item.obj} onChange={(e) => updateListItem('objectives', index, 'obj', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.ref} onChange={(e) => updateListItem('objectives', index, 'ref', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <select value={item.review} onChange={(e) => updateListItem('objectives', index, 'review', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none">
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.evidence} onChange={(e) => updateListItem('objectives', index, 'evidence', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2 text-center">
                                                <select value={item.status} onChange={(e) => updateListItem('objectives', index, 'status', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[11px] font-bold uppercase border-transparent focus:border-blue-500 outline-none text-center">
                                                    <option value="Open">Open</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="p-2 text-center">
                                                <button onClick={() => removeListItem('objectives', 'deletedObjectiveIds', index)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-2 bg-slate-50 border-t border-slate-200">
                            <button onClick={() => addListItem('objectives', { obj: '', ref: '', review: 'Yes', evidence: '', status: 'Open' })} className="text-[11px] font-bold text-emerald-500 flex items-center gap-1 hover:underline px-2">
                                <Plus size={12} /> Add Objective
                            </button>
                        </div>
                    </div>

                    <div className="mb-8 overflow-hidden rounded-sm border border-slate-200">
                        <div className="bg-red-500 text-white px-4 py-2 font-bold text-sm uppercase flex items-center gap-2">
                            RISKS
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[1000px]">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                            Description
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                            Link
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                            Unique?
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32">
                                            Risk / Opportunity
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase">
                                            Evidence / Meeting Minutes
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-48">
                                            Owner
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-32 text-center">
                                            Status
                                        </th>
                                        <th className="p-3 text-[11px] font-bold text-slate-500 uppercase w-16 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {data.risks.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-slate-50">
                                            <td className="p-2">
                                                <input type="text" value={item.desc} onChange={(e) => updateListItem('risks', index, 'desc', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.link} onChange={(e) => updateListItem('risks', index, 'link', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <select value={item.unique} onChange={(e) => updateListItem('risks', index, 'unique', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none">
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <select value={item.riskOpp} onChange={(e) => updateListItem('risks', index, 'riskOpp', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none">
                                                    <option value="Risk">Risk</option>
                                                    <option value="Opportunity">Opportunity</option>
                                                </select>
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.evidence} onChange={(e) => updateListItem('risks', index, 'evidence', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2">
                                                <input type="text" value={item.owner} onChange={(e) => updateListItem('risks', index, 'owner', e.target.value)} className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] border-transparent focus:border-blue-500 outline-none" />
                                            </td>
                                            <td className="p-2 text-center">
                                                <select value={item.status} onChange={(e) => updateListItem('risks', index, 'status', e.target.value)} className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[11px] font-bold uppercase border-transparent focus:border-blue-500 outline-none text-center">
                                                    <option value="Open">Open</option>
                                                    <option value="Closed">Closed</option>
                                                </select>
                                            </td>
                                            <td className="p-2 text-center">
                                                <button onClick={() => removeListItem('risks', 'deletedRiskIds', index)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-2 bg-slate-50 border-t border-slate-200">
                            <button onClick={() => addListItem('risks', { desc: '', link: '', unique: 'Yes', riskOpp: 'Risk', evidence: '', owner: 'MD / All', status: 'Open' })} className="text-[11px] font-bold text-red-500 flex items-center gap-1 hover:underline px-2">
                                <Plus size={12} /> Add Risk
                            </button>
                        </div>
                    </div>

                    <div className="mb-8 bg-amber-50 p-4 rounded-sm border border-amber-100 text-xs text-amber-800">
                        <span className="font-bold">
                            Date fit Requirements:
                        </span>{" "}
                        This record is review date warning active.
                        https://softvence.com/review-protection/week-validation.
                        100% strict. No check or expired will turn your
                        compliance status to...
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
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
                                        value={data.review.verifiedBy}
                                        onChange={(e) => setData("review", { ...data.review, verifiedBy: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm focus:border-blue-500 outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        With Date
                                    </label>
                                    <input
                                        type="date"
                                        value={data.review.withDate}
                                        onChange={(e) => setData("review", { ...data.review, withDate: e.target.value })}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-sm text-sm focus:border-blue-500 outline-none"
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
                                    value={data.review.verifiedStatus}
                                    onChange={(e) => setData("review", { ...data.review, verifiedStatus: e.target.value })}
                                    className="w-full px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-sm text-sm text-emerald-800 font-medium focus:border-emerald-500 outline-none"
                                >
                                    <option value="Draft">Draft</option>
                                    <option value="Signed">Signed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-3">
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="px-5 py-2.5 bg-[#2185d5] text-white rounded-sm text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50"
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
