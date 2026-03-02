import React, { useEffect, useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, Download, Save, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function REC12({ initialDops = [] }) {
    const { data, setData, post, processing } = useForm({
        dops: [],
        deletedIds: [],
    });

    useEffect(() => {
        const formattedDops = initialDops.map(dop => ({
            ...dop,
            date_of_ukca_marking: dop.date_of_ukca_marking ? dop.date_of_ukca_marking.split('T')[0] : '',
        }));

        setData("dops", formattedDops.length > 0 ? formattedDops : [
            {
                id: `new_${Date.now()}`,
                ukca_mark: "[Affix UKCA logo as per marking regulations]",
                manufacturer: "Just Simple Quality Ltd\n[Insert works address]\nTel: [Insert]\n[Insert]",
                product_identification: "JSQ-SB-BEAM-UC203-133-25-5355J2",
                intended_use: "Structural steel members for load-bearing use in construction works — EN 1090-1, EN 1090-2 EXC 2",
                declared_performance: "• Tolerances: Class 1 to EN 1090-2\n• Steel Grade: S355J2 (fully weldable)\n• Fracture toughness: 27J at -20°C\n• Corrosion resistance: C3 (Medium)\n• Dimensional tolerances: Class 1",
                notified_body: "No. [XYXX] — [Name of UK Approved Body]\nFPC Certificate: [XXXX/XX]",
                dop_reference: "[Enter matching REC-12 DoP number]",
                date_of_ukca_marking: "",
            }
        ]);
    }, [initialDops]);

    const addDop = () => {
        setData("dops", [
            ...data.dops,
            {
                id: `new_${Date.now()}`,
                ukca_mark: "[Affix UKCA logo]",
                manufacturer: "Just Simple Quality Ltd\n[Insert works address]",
                product_identification: "JSQ-SB-BEAM-...",
                intended_use: "Structural steel members...",
                declared_performance: "• Tolerances: Class 1\n• Steel Grade: S355J2",
                notified_body: "No. [XYXX]...",
                dop_reference: "[Enter Reference]",
                date_of_ukca_marking: "",
            }
        ]);
    };

    const updateDop = (index, field, value) => {
        const newDops = [...data.dops];
        newDops[index][field] = value;
        setData("dops", newDops);
    };

    const removeDop = (index) => {
        const dopToRemove = data.dops[index];
        const newDops = [...data.dops];
        newDops.splice(index, 1);

        if (typeof dopToRemove.id === "number") {
            setData((prevData) => ({
                ...prevData,
                dops: newDops,
                deletedIds: [...prevData.deletedIds, dopToRemove.id],
            }));
        } else {
            setData("dops", newDops);
        }
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-12.store"), {
            onSuccess: () => {
                toast.success("Declarations of Performance saved successfully!");
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
            <Head title="REC-12 - Declaration of Performance (DoP)" />

            <div className="space-y-6 max-w-4xl mx-auto">
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
                            REC-12 - Declaration of Performance (DoP)
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

                {data.dops.map((dop, index) => (
                    <div key={dop.id} className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-8 mb-6 relative group">
                        
                        <div className="absolute top-4 right-4 flex space-x-2">
                             <button 
                                onClick={() => removeDop(index)}
                                className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title="Delete Document"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Top Inputs */}
                        <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 mb-4 text-center mt-4">
                            <span className="font-bold text-slate-700 block mb-2 text-sm">
                                UKCA Product Label Product
                            </span>
                            <div className="font-bold text-lg text-slate-800 uppercase tracking-wide">
                                UKCA Product Label Product
                            </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 rounded-sm p-3 mb-6 flex justify-center items-center gap-2">
                            <span className="font-bold text-slate-600 text-sm">
                                Standard:
                            </span>
                            <span className="font-bold text-slate-800 bg-slate-200 px-3 py-1 rounded-sm text-sm">
                                EN 1090-1:2009 + A1:2011 EXC 2
                            </span>
                        </div>

                        {/* DoP Table */}
                        <div className="border border-slate-300 rounded-sm overflow-hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-100 border-b border-slate-300">
                                        <th className="w-1/3 p-3 text-sm font-bold text-slate-700 border-r border-slate-300 text-center">
                                            Field
                                        </th>
                                        <th className="w-2/3 p-3 text-sm font-bold text-slate-700 text-center">
                                            Information
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-300">
                                    <tr className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            UKCA Mark
                                        </td>
                                        <td className="p-2 align-top">
                                            <input 
                                                type="text" 
                                                value={dop.ukca_mark} 
                                                onChange={(e) => updateDop(index, 'ukca_mark', e.target.value)}
                                                className="w-full border-none focus:ring-0 text-sm text-slate-600 p-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            Manufacturer
                                        </td>
                                        <td className="p-2 align-top">
                                            <textarea 
                                                value={dop.manufacturer} 
                                                onChange={(e) => updateDop(index, 'manufacturer', e.target.value)}
                                                className="w-full border-none focus:ring-0 text-sm text-slate-600 p-2 resize-none"
                                                rows="3"
                                            ></textarea>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            Product Identification
                                        </td>
                                        <td className="p-2 align-top">
                                            <input 
                                                type="text" 
                                                value={dop.product_identification} 
                                                onChange={(e) => updateDop(index, 'product_identification', e.target.value)}
                                                className="w-full border-none focus:ring-0 text-sm text-slate-600 p-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            Intended Use
                                        </td>
                                        <td className="p-2 align-top">
                                            <textarea 
                                                value={dop.intended_use} 
                                                onChange={(e) => updateDop(index, 'intended_use', e.target.value)}
                                                className="w-full border-none focus:ring-0 text-sm text-slate-600 p-2 resize-none"
                                                rows="2"
                                            ></textarea>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            Declared Performance
                                        </td>
                                        <td className="p-2 align-top">
                                            <textarea 
                                                value={dop.declared_performance} 
                                                onChange={(e) => updateDop(index, 'declared_performance', e.target.value)}
                                                className="w-full border-none focus:ring-0 text-sm text-slate-600 p-2 resize-none"
                                                rows="5"
                                            ></textarea>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            Notified Body
                                        </td>
                                        <td className="p-2 align-top">
                                            <textarea 
                                                value={dop.notified_body} 
                                                onChange={(e) => updateDop(index, 'notified_body', e.target.value)}
                                                className="w-full border-none focus:ring-0 text-sm text-slate-600 p-2 resize-none"
                                                rows="2"
                                            ></textarea>
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            DoP Reference
                                        </td>
                                        <td className="p-2 align-top">
                                            <input 
                                                type="text" 
                                                value={dop.dop_reference} 
                                                onChange={(e) => updateDop(index, 'dop_reference', e.target.value)}
                                                className="w-full border-none focus:ring-0 text-sm text-slate-600 p-2"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-4 text-sm font-medium text-slate-700 border-r border-slate-300 align-top bg-slate-50/50">
                                            Date of UKCA Marking
                                        </td>
                                        <td className="p-4 align-top">
                                            <div className="flex items-center gap-4">
                                                <input 
                                                    type="date" 
                                                    value={dop.date_of_ukca_marking} 
                                                    onChange={(e) => updateDop(index, 'date_of_ukca_marking', e.target.value)}
                                                    className="border-slate-300 rounded-sm focus:ring-0 text-sm text-slate-500 px-3 py-1.5"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

                {/* Add Button */}
                <div className="mt-8">
                    <button 
                        onClick={addDop}
                        className="w-full py-3 border border-slate-200 rounded-sm text-slate-600 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm shadow-sm bg-white"
                    >
                        <Plus size={18} />
                        Add New DoP Document
                    </button>
                </div>
            </div>
        </AdministratorLayout>
    );
}
