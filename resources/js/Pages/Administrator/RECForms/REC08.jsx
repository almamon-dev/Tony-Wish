import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    Trash2,
    Calendar,
    Users,
    MoreHorizontal,
    Plus,
    Printer,
    FileText,
} from "lucide-react";

export default function REC08() {
    const productionJobs = [
        {
            process: "Laser",
            name: "",
            signature: "",
            date: "",
        },
        {
            process: "Punch",
            name: "",
            signature: "",
            date: "",
        },
        {
            process: "Guillotine",
            name: "",
            signature: "",
            date: "",
        },
        {
            process: "Fabrication",
            name: "",
            signature: "",
            date: "",
        },
        {
            process: "Welding",
            name: "",
            signature: "",
            date: "",
        },
        {
            process: "Weld Size Bandsaw",
            name: "",
            signature: "",
            date: "",
        },
        {
            process: "Inspection",
            name: "",
            signature: "",
            date: "",
        },
        {
            process: "Paint",
            name: "",
            signature: "",
            date: "",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="REC-08 - Project Review & Job Card" />

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
                            REC-08 - Project Review & Job Card
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Printer size={18} />
                            Print
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-xl hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-blue-500/20">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Project Review Section */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-slate-700 mb-6 text-center bg-slate-50 py-3 rounded-xl border border-slate-100">
                        Project Review & Job Card
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Customer
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Drawings No
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Price
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    EN1090
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Material Grades
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Bolts
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Sub-Contract
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Galvanizing
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Paint
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Job No
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Order Date
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="date"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Est Completion
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="date"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Weld Types
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Weld Inspection
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Module/ITP
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    NCR Req'd
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Special Req'd
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Production Job Card Section */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-slate-700 mb-6 text-center bg-blue-50/50 py-3 rounded-xl border border-blue-100 text-[#2185d5]">
                        Production Job Card
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider w-[20%]">
                                        Process
                                    </th>
                                    <th className="text-left py-2 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider w-[40%]">
                                        Name
                                    </th>
                                    <th className="text-left py-2 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider w-[25%]">
                                        Signature
                                    </th>
                                    <th className="text-left py-2 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider w-[15%]">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="space-y-3">
                                {productionJobs.map((job, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4">
                                            <span className="text-[13px] font-bold text-slate-700">
                                                {job.process}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="date"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-400"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Audit Monitoring */}
                    <div className="mt-8 flex flex-col md:flex-row items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[13px] font-bold text-slate-700 w-32">
                            Audit Monitoring
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-slate-500">
                                MPI
                            </span>
                            <input
                                type="text"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[13px] w-24 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-slate-500">
                                DPI
                            </span>
                            <input
                                type="text"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[13px] w-24 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-slate-500">
                                Mag
                            </span>
                            <input
                                type="text"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[13px] w-24 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-slate-500">
                                Hardality
                            </span>
                            <input
                                type="text"
                                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[13px] w-24 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Workshop Shipping/Load */}
                    <div className="mt-4 flex flex-col md:flex-row items-center gap-4 px-4">
                        <span className="text-[13px] font-bold text-slate-700 w-32">
                            Workshop Shipping/Load
                        </span>
                        <input
                            type="text"
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] flex-1 outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] flex-1 outline-none focus:border-blue-500"
                        />
                        <input
                            type="date"
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] w-40 outline-none focus:border-blue-500 text-slate-400"
                        />
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
                    <div>
                        <h3 className="text-[14px] font-bold text-slate-700 mb-2">
                            Comments:
                        </h3>
                        <textarea
                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none placeholder:text-slate-400"
                            placeholder="Enter comments here..."
                        ></textarea>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="text-[13px] font-bold text-slate-700">
                            Office Sign-off
                        </span>
                        <input
                            type="text"
                            placeholder="Signature"
                            className="flex-1 bg-transparent border-b border-slate-300 px-3 py-2 text-[13px] outline-none focus:border-blue-500 placeholder:text-slate-300"
                        />
                        <div className="w-12 h-10 border border-slate-200 rounded bg-white"></div>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
