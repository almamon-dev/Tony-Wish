import React, { useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    Trash2,
    Plus,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC13({ initialNcrs = [] }) {
    const { data, setData, post, processing } = useForm({
        ncrs: [],
        deletedIds: [],
    });

    useEffect(() => {
        const formattedNcrs = initialNcrs.map(ncr => ({
            ...ncr,
            openedDate: ncr.opened_date ? ncr.opened_date.split('T')[0] : '',
            jobNo: ncr.job_no || '',
            nrpType: ncr.nrp_type || '',
            issueSummary: ncr.issue_summary || '',
            rootCause: ncr.root_cause || '',
            actionTaken: ncr.action_taken || '',
            actionPerson: ncr.action_person || '',
            status: ncr.status || '',
            closed: !!ncr.closed,
        }));
        
        setData("ncrs", formattedNcrs.length > 0 ? formattedNcrs : [
            {
                id: `new_${Date.now()}`,
                jobNo: "",
                openedDate: "",
                nrpType: "Supplier",
                issueSummary: "",
                rootCause: "",
                actionTaken: "",
                actionPerson: "",
                status: "Open",
                closed: false,
            }
        ]);
    }, [initialNcrs]);

    const addNcr = () => {
        setData("ncrs", [
            ...data.ncrs,
            {
                id: `new_${Date.now()}`,
                jobNo: "",
                openedDate: "",
                nrpType: "Supplier",
                issueSummary: "",
                rootCause: "",
                actionTaken: "",
                actionPerson: "",
                status: "Open",
                closed: false,
            },
        ]);
    };

    const updateNcr = (index, field, value) => {
        const newNcrs = [...data.ncrs];
        newNcrs[index][field] = value;
        
        // Auto update status if closed checkbox is toggled
        if (field === 'closed') {
            newNcrs[index].status = value ? "Closed" : "Open";
        }

        setData("ncrs", newNcrs);
    };

    const removeNcr = (index) => {
        const ncrToRemove = data.ncrs[index];
        const newNcrs = [...data.ncrs];
        newNcrs.splice(index, 1);

        if (typeof ncrToRemove.id === "number") {
            setData((prevData) => ({
                ...prevData,
                ncrs: newNcrs,
                deletedIds: [...prevData.deletedIds, ncrToRemove.id],
            }));
        } else {
            setData("ncrs", newNcrs);
        }
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-13.store"), {
            onSuccess: () => {
                toast.success("Non Conformance Register saved successfully!");
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
            <Head title="REC-13 - Non Conformance Register" />

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
                            REC-13 - Non Conformance Register
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

                {/* Main Content */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-6 w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1200px]">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-3 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-24">
                                        Job No
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-36">
                                        Opened Date
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        NRP Type
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Issue Summary
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Root Cause
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Action Taken
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-32">
                                        Action Person
                                    </th>
                                    <th className="px-3 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-28">
                                        Status
                                    </th>
                                    <th className="px-3 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider w-16">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.ncrs.map((ncr, index) => (
                                    <tr
                                        key={ncr.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-2 py-3">
                                            <input
                                                type="text"
                                                value={ncr.jobNo}
                                                onChange={(e) => updateNcr(index, 'jobNo', e.target.value)}
                                                className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none text-center"
                                                placeholder="Job No"
                                            />
                                        </td>
                                        <td className="px-2 py-3">
                                            <input
                                                type="date"
                                                value={ncr.openedDate}
                                                onChange={(e) => updateNcr(index, 'openedDate', e.target.value)}
                                                className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                            />
                                        </td>
                                        <td className="px-2 py-3">
                                            <select
                                                value={ncr.nrpType}
                                                onChange={(e) => updateNcr(index, 'nrpType', e.target.value)}
                                                className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                            >
                                                <option value="Supplier">Supplier</option>
                                                <option value="Internal">Internal</option>
                                                <option value="Customer">Customer</option>
                                            </select>
                                        </td>
                                        <td className="px-2 py-3">
                                            <textarea
                                                value={ncr.issueSummary}
                                                onChange={(e) => updateNcr(index, 'issueSummary', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] text-slate-700 border border-transparent focus:border-blue-500 outline-none resize-none"
                                                rows="2"
                                                placeholder="Issue Summary"
                                            ></textarea>
                                        </td>
                                        <td className="px-2 py-3">
                                            <textarea
                                                value={ncr.rootCause}
                                                onChange={(e) => updateNcr(index, 'rootCause', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] text-slate-700 border border-transparent focus:border-blue-500 outline-none resize-none"
                                                rows="2"
                                                placeholder="Root Cause"
                                            ></textarea>
                                        </td>
                                        <td className="px-2 py-3">
                                            <textarea
                                                value={ncr.actionTaken}
                                                onChange={(e) => updateNcr(index, 'actionTaken', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] text-slate-700 border border-transparent focus:border-blue-500 outline-none resize-none"
                                                rows="2"
                                                placeholder="Action Taken"
                                            ></textarea>
                                        </td>
                                        <td className="px-2 py-3">
                                            <input
                                                type="text"
                                                value={ncr.actionPerson}
                                                onChange={(e) => updateNcr(index, 'actionPerson', e.target.value)}
                                                className="w-full bg-slate-50 px-2 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Person"
                                            />
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="flex flex-col gap-2">
                                                <span className={`text-[13px] font-medium px-2 py-1 rounded w-fit ${ncr.status === 'Closed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {ncr.status}
                                                </span>
                                                <div className="flex items-center gap-1.5 ml-1">
                                                    <input
                                                        type="checkbox"
                                                        checked={ncr.closed}
                                                        onChange={(e) => updateNcr(index, 'closed', e.target.checked)}
                                                        className="rounded text-blue-600 focus:ring-blue-500 border-slate-300 h-3.5 w-3.5"
                                                    />
                                                    <span className="text-[11px] text-slate-500 font-medium">
                                                        Mark Closed
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => removeNcr(index)}
                                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors"
                                                    title="Delete NCR"
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

                    {/* Add Button */}
                    <div className="mt-8">
                        <button 
                            onClick={addNcr}
                            className="w-full py-3 border border-slate-200 rounded-sm text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm shadow-sm bg-white"
                        >
                            <Plus size={18} />
                            Add New NCR
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
