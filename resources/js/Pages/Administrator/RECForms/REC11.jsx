import React, { useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Trash2,
    Plus,
    Calendar,
    Save,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC11({ initialNotes = [] }) {
    const { data, setData, post, processing } = useForm({
        notes: [],
        deletedIds: [],
    });

    useEffect(() => {
        const formattedNotes = initialNotes.map(note => ({
            ...note,
            deliveryDate: note.delivery_date ? note.delivery_date.split('T')[0] : '',
            jobNumber: note.job_number || '',
            receivedBy: note.received_by || ''
        }));
        
        setData("notes", formattedNotes.length > 0 ? formattedNotes : [
            {
                id: `new_${Date.now()}`,
                jobNumber: "",
                supplier: "",
                customer: "",
                description: "",
                qty: "",
                deliveryDate: "",
                receivedBy: "",
                notes: "",
            }
        ]);
    }, [initialNotes]);

    const addNoteRow = () => {
        setData("notes", [
            ...data.notes,
            {
                id: `new_${Date.now()}`,
                jobNumber: "",
                supplier: "",
                customer: "",
                description: "",
                qty: "",
                deliveryDate: "",
                receivedBy: "",
                notes: "",
            },
        ]);
    };

    const updateNote = (index, field, value) => {
        const newNotes = [...data.notes];
        newNotes[index][field] = value;
        setData("notes", newNotes);
    };

    const removeNoteRow = (index) => {
        const noteToRemove = data.notes[index];
        const newNotes = [...data.notes];
        newNotes.splice(index, 1);

        if (typeof noteToRemove.id === "number") {
            setData((prevData) => ({
                ...prevData,
                notes: newNotes,
                deletedIds: [...prevData.deletedIds, noteToRemove.id],
            }));
        } else {
            setData("notes", newNotes);
        }
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-11.store"), {
            onSuccess: () => {
                toast.success("Delivery Notes saved successfully!");
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
            <Head title="REC-11 - Delivery Note" />

            <div className="space-y-6 max-w-7xl mx-auto">
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
                            REC-11 - Delivery Note
                        </h1>
                    </div>
                    <div className="flex gap-3">
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
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="text-center py-4 mb-6">
                        <h2 className="text-xl font-bold text-slate-700 uppercase tracking-wide">
                            DELIVERY NOTES OUT
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Job Number
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Supplier
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider w-1/4">
                                        Item Description
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Qty
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Delivery Date
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Received By
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Notes
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.notes.map((note, index) => (
                                    <tr
                                        key={note.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">
                                            <input
                                                type="text"
                                                value={note.jobNumber}
                                                onChange={(e) => updateNote(index, 'jobNumber', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Job No"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">
                                            <input
                                                type="text"
                                                value={note.supplier}
                                                onChange={(e) => updateNote(index, 'supplier', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Supplier"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">
                                            <input
                                                type="text"
                                                value={note.customer}
                                                onChange={(e) => updateNote(index, 'customer', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Customer"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-600">
                                            <input
                                                type="text"
                                                value={note.description}
                                                onChange={(e) => updateNote(index, 'description', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Description"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">
                                            <input
                                                type="text"
                                                value={note.qty}
                                                onChange={(e) => updateNote(index, 'qty', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none text-center"
                                                placeholder="Qty"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">
                                            <input
                                                type="date"
                                                value={note.deliveryDate}
                                                onChange={(e) => updateNote(index, 'deliveryDate', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-500 border border-transparent focus:border-blue-500 outline-none"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-700">
                                            <input
                                                type="text"
                                                value={note.receivedBy}
                                                onChange={(e) => updateNote(index, 'receivedBy', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Name"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] text-slate-500">
                                            <input
                                                type="text"
                                                value={note.notes}
                                                onChange={(e) => updateNote(index, 'notes', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Notes"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => removeNoteRow(index)}
                                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-sm transition-colors"
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
                            onClick={addNoteRow}
                            className="w-full py-3 border border-slate-200 rounded-sm text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm shadow-sm bg-white"
                        >
                            <Plus size={18} />
                            Add New Delivery Note
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
