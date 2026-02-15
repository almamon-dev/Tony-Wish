import React, { useState } from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Plus,
    Trash2,
    X,
    ChevronDown,
    Building2,
    Search,
    Pencil,
    CheckCircle2,
    Clock,
} from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CompanyManagement({ administrators = [] }) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { flash } = usePage().props;

    // Form handling with Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        department: "",
        access_level: "limited_access",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("business-owner.administrators.store"), {
            onSuccess: () => {
                setIsAddModalOpen(false);
                reset();
            },
        });
    };

    const departments = [
        "Operations",
        "Compliance",
        "IT",
        "Human Resources",
        "Finance",
    ];
    
    const accessLevels = [
        { value: "full_access", label: "Full Access - All permissions" },
        { value: "limited_access", label: "Limited Access - View and Edit" },
        { value: "view_only", label: "View Only - Read access" },
    ];

    return (
        <BusinessOwnerLayout>
            <Head title="Company Management" />

            <div className="space-y-8 pb-10">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl flex items-center gap-3">
                        <CheckCircle2 size={20} className="text-green-600" />
                        <p className="font-medium text-sm">{flash.success}</p>
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl flex items-center gap-3">
                        <X size={20} className="text-red-600" />
                        <p className="font-medium text-sm">{flash.error}</p>
                    </div>
                )}

                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800">
                        Company Management
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Manage administrators and company settings
                    </p>
                </div>

                {/* Administrators Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-slate-800 text-[18px]">
                                Administrators
                            </h2>
                            <p className="text-[13px] text-slate-400 font-medium">
                                Create and manage administrator accounts
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-[#2c8af8] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[14px] font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            <Plus size={18} />
                            Add Administrator
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500">
                                        Name
                                    </th>
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500">
                                        Department
                                    </th>
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500 text-center">
                                        Status
                                    </th>
                                    <th className="px-8 py-5 text-[14px] font-bold text-slate-500 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {administrators.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                                    <Plus size={24} className="text-slate-400" />
                                                </div>
                                                <div>
                                                    <p className="text-slate-600 font-medium">No administrators yet</p>
                                                    <p className="text-slate-400 text-sm">Add your first administrator to get started</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    administrators.map((admin) => (
                                        <tr
                                            key={admin.id}
                                            className="hover:bg-slate-50/30 transition-colors group"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="font-medium text-slate-600 text-[14px]">
                                                    {admin.name}
                                                </div>
                                                <div className="text-[12px] text-slate-400">
                                                    {admin.email}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className="text-[13px] text-slate-600 font-medium">
                                                    {admin.department || "—"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                {admin.verified ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 text-[12px] font-bold rounded-lg">
                                                        <CheckCircle2 size={14} />
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-[12px] font-bold rounded-lg">
                                                        <Clock size={14} />
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-8 py-5 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-blue-500 hover:border-blue-200 rounded-lg transition-all shadow-sm">
                                                        <Pencil size={16} />
                                                    </button>
                                                    <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 text-[13px] font-medium rounded-lg hover:bg-slate-50 transition-all">
                                                        Remove
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Company Information Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-8">
                    <div className="mb-8">
                        <h2 className="font-bold text-slate-800 text-[18px]">
                            Company Information
                        </h2>
                        <p className="text-[13px] text-slate-400 font-medium">
                            Update your company details
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Acme Corporation"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    defaultValue="12345678"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                                    Industry
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Manufacturing"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                                    VAT Number
                                </label>
                                <input
                                    type="text"
                                    defaultValue="GB123456789"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-10">
                        <button className="bg-[#2c8af8] hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-[14px] font-bold transition-all shadow-lg shadow-blue-500/20">
                            Edit Company Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Administrator Modal */}
            <Transition show={isAddModalOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[200]"
                    onClose={() => setIsAddModalOpen(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto z-[210]">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="inline-block w-full max-w-[700px] transform overflow-hidden rounded-[20px] bg-white p-7 shadow-2xl transition-all text-left align-middle">
                                    <div className="flex items-center justify-between mb-2">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-[20px] font-bold text-slate-800"
                                        >
                                            Add New Administrator
                                        </Dialog.Title>
                                        <button
                                            onClick={() =>
                                                setIsAddModalOpen(false)
                                            }
                                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 transition-all text-slate-400"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <p className="text-[13px] text-slate-400 font-medium mb-6">
                                        Create a new administrator account for
                                        your organization
                                    </p>

                                    <form onSubmit={submit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label className="text-[12px] font-bold text-slate-700">
                                                    First Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    placeholder="John"
                                                    className={`w-full h-10 px-4 bg-slate-50 border ${errors.first_name ? 'border-red-300' : 'border-slate-100'} rounded-xl focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-[13px]`}
                                                />
                                                {errors.first_name && (
                                                    <p className="text-red-500 text-xs">{errors.first_name}</p>
                                                )}
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[12px] font-bold text-slate-700">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    placeholder="Doe"
                                                    className={`w-full h-10 px-4 bg-slate-50 border ${errors.last_name ? 'border-red-300' : 'border-slate-100'} rounded-xl focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-[13px]`}
                                                />
                                                {errors.last_name && (
                                                    <p className="text-red-500 text-xs">{errors.last_name}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[12px] font-bold text-slate-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="john.doe@company.com"
                                                className={`w-full h-10 px-4 bg-slate-50 border ${errors.email ? 'border-red-300' : 'border-slate-100'} rounded-xl focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-[13px]`}
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs">{errors.email}</p>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[12px] font-bold text-slate-700">
                                                Department
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    value={data.department}
                                                    onChange={(e) => setData('department', e.target.value)}
                                                    className="w-full h-10 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-[13px] appearance-none cursor-pointer pr-10"
                                                >
                                                    <option value="">
                                                        Select department
                                                    </option>
                                                    {departments.map(
                                                        (dept, i) => (
                                                            <option
                                                                key={i}
                                                                value={dept}
                                                            >
                                                                {dept}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                                <ChevronDown
                                                    size={16}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[12px] font-bold text-slate-700">
                                                Access Level
                                            </label>
                                            <div className="relative">
                                                <select 
                                                    value={data.access_level}
                                                    onChange={(e) => setData('access_level', e.target.value)}
                                                    className="w-full h-10 px-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 outline-none font-medium text-[13px] appearance-none cursor-pointer pr-10"
                                                >
                                                    {accessLevels.map(
                                                        (level, i) => (
                                                            <option
                                                                key={i}
                                                                value={level.value}
                                                            >
                                                                {level.label}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                                <ChevronDown
                                                    size={16}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsAddModalOpen(false)
                                                }
                                                disabled={processing}
                                                className="px-5 py-2 text-[13px] font-bold text-slate-400 hover:text-slate-600 transition-all border border-slate-100 rounded-lg disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-[#2c8af8] hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-[13px] font-bold transition-all shadow-lg shadow-blue-500/20 disabled:opacity-75 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                {processing ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    'Send Invitation'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </BusinessOwnerLayout>
    );
}
