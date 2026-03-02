import React, { useEffect, useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Download,
    Trash2,
    Plus,
    ChevronLeft,
    ChevronRight,
    Save,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC09({ initialSuppliers = [] }) {
    const { data, setData, post, processing } = useForm({
        suppliers: [],
        deletedIds: [],
    });

    const [alerts, setAlerts] = useState({
        expired: 0,
        expiringSoon: 0,
        valid: 0,
    });

    useEffect(() => {
        const formattedSuppliers = initialSuppliers.map(sup => ({
            ...sup,
            expiry_date: sup.expiry_date ? sup.expiry_date.split('T')[0] : ''
        }));
        
        setData("suppliers", formattedSuppliers.length > 0 ? formattedSuppliers : [
            {
                id: `new_${Date.now()}`,
                company: "",
                service: "",
                en1090: "No",
                iso9001: false,
                iso14001: false,
                iso45001: false,
                expiry_date: "",
                comments: "",
            }
        ]);
        
        // Calculate alerts
        let expired = 0, soon = 0, valid = 0;
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        
        formattedSuppliers.forEach(s => {
            if (s.expiry_date) {
                const expDate = new Date(s.expiry_date);
                if (expDate < now) {
                    expired++;
                } else if (expDate <= thirtyDaysFromNow) {
                    soon++;
                } else {
                    valid++;
                }
            }
        });
        
        setAlerts({ expired, expiringSoon: soon, valid });
    }, [initialSuppliers]);

    const addSupplier = () => {
        setData("suppliers", [
            ...data.suppliers,
            {
                id: `new_${Date.now()}`,
                company: "",
                service: "",
                en1090: "No",
                iso9001: false,
                iso14001: false,
                iso45001: false,
                expiry_date: "",
                comments: "",
            },
        ]);
    };

    const updateSupplier = (index, field, value) => {
        const newSuppliers = [...data.suppliers];
        newSuppliers[index][field] = value;
        setData("suppliers", newSuppliers);
    };

    const removeSupplier = (index) => {
        const supplierToRemove = data.suppliers[index];
        const newSuppliers = [...data.suppliers];
        newSuppliers.splice(index, 1);

        if (typeof supplierToRemove.id === "number") {
            setData((prevData) => ({
                ...prevData,
                suppliers: newSuppliers,
                deletedIds: [...prevData.deletedIds, supplierToRemove.id],
            }));
        } else {
            setData("suppliers", newSuppliers);
        }
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-09.store"), {
            onSuccess: () => {
                toast.success("Approved Suppliers saved successfully!");
                setData("deletedIds", []); // Clear deleted IDs on success
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data. Please check the form.");
            },
        });
    };

    const StatusBadge = ({ status, onClick }) => {
        return (
            <button 
                onClick={onClick}
                className="flex items-center gap-1 focus:outline-none"
            >
                {status ? (
                    <div className="flex items-center gap-1 text-emerald-500 font-medium">
                        <CheckCircle2 size={16} />
                        <span>Yes</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-slate-400 font-medium">
                        <XCircle size={16} />
                        <span>NO</span>
                    </div>
                )}
            </button>
        );
    };

    return (
        <AdministratorLayout>
            <Head title="REC-09 - Approved Supplier" />

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
                            REC-09 - Approved Supplier
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleSave}
                            disabled={processing}
                            className="flex items-center gap-2 bg-[#2185d5] text-white px-4 py-2 rounded-sm text-sm font-bold shadow-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
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

                {/* Alerts Section */}
                <div className="bg-amber-50 border border-amber-100 rounded-sm p-4">
                    <h3 className="text-slate-700 font-bold mb-3">
                        Supplier Approval Alerts
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            {alerts.expired} Expired
                        </span>
                        <span className="px-3 py-1 bg-amber-400 text-white text-xs font-bold rounded-full">
                            {alerts.expiringSoon} Expiring Soon
                        </span>
                        <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                            {alerts.valid} Valid
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Company
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Service Description
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        EN1090 EX Class
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        ISO9001
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        ISO14001
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        ISO45001
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Expiry Date
                                    </th>
                                    <th className="px-4 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Comments
                                    </th>
                                    <th className="px-4 py-4 text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.suppliers.map((supplier, index) => (
                                    <tr
                                        key={supplier.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                value={supplier.company}
                                                onChange={(e) => updateSupplier(index, 'company', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Company Name"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                value={supplier.service}
                                                onChange={(e) => updateSupplier(index, 'service', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Service"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] font-medium text-slate-600">
                                            <select 
                                                value={supplier.en1090}
                                                onChange={(e) => updateSupplier(index, 'en1090', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none min-w-[80px]"
                                            >
                                                <option value="No">No</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-[13px]">
                                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-sm min-w-[80px]">
                                                <StatusBadge
                                                    status={supplier.iso9001}
                                                    onClick={() => updateSupplier(index, 'iso9001', !supplier.iso9001)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[13px]">
                                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-sm min-w-[80px]">
                                                <StatusBadge
                                                    status={supplier.iso14001}
                                                    onClick={() => updateSupplier(index, 'iso14001', !supplier.iso14001)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-[13px]">
                                            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-sm min-w-[80px]">
                                                <StatusBadge
                                                    status={supplier.iso45001}
                                                    onClick={() => updateSupplier(index, 'iso45001', !supplier.iso45001)}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="date"
                                                value={supplier.expiry_date}
                                                onChange={(e) => updateSupplier(index, 'expiry_date', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-500 border border-transparent focus:border-blue-500 outline-none"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <input
                                                type="text"
                                                value={supplier.comments}
                                                onChange={(e) => updateSupplier(index, 'comments', e.target.value)}
                                                className="w-full bg-slate-50 px-3 py-2 rounded-sm text-[13px] font-medium text-slate-700 border border-transparent focus:border-blue-500 outline-none"
                                                placeholder="Comments"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => removeSupplier(index)}
                                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-sm transition-colors"
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
                            onClick={addSupplier}
                            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-sm text-slate-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 transition-colors"
                        >
                            <Plus size={20} />
                            Add New Supplier
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
