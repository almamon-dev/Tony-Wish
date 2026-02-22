import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import {
    Plus,
    Search,
    FileText,
    Edit2,
    Eye,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
} from "lucide-react";
import AddProcedureModal from "./Partials/AddProcedureModal";

export default function ProceduresIndex({ procedures = [] }) {
    const [activeTab, setActiveTab] = useState("All Procedures");
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState("Details");

    const tabs = ["All Procedures", "Active", "Completed", "Pending Review"];

    const filteredProcedures = procedures.filter((proc) => {
        const matchesSearch =
            proc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proc.assigned.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab =
            activeTab === "All Procedures" ||
            (activeTab === "Active" && proc.status === "In Progress") ||
            (activeTab === "Completed" && proc.status === "Completed") ||
            (activeTab === "Pending Review" && proc.status === "Pending");

        return matchesSearch && matchesTab;
    });

    return (
        <AdministratorLayout>
            <Head title="Procedures Management" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none">
                            Procedures Management
                        </h1>
                        <p className="text-[14px] text-slate-500 font-medium mt-3">
                            Add edit, and manage ISO procedures
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setIsAddModalOpen(true);
                            setModalStep("Details");
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-[#2185d5] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-[14px] transition-all shadow-lg shadow-blue-500/10 active:scale-95 whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Add Procedure
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    {/* Tabs and Search Section */}
                    <div className="p-8 space-y-8">
                        {/* Tabs */}
                        <div className="flex flex-wrap items-center gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all ${
                                        activeTab === tab
                                            ? "bg-[#2185d5] text-white shadow-lg shadow-blue-500/10"
                                            : "bg-slate-50 text-slate-500 hover:bg-slate-100 uppercase text-[12px] tracking-tight"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-sm">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-11 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto flex-1 px-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8fafc] border-b border-slate-50">
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                                        Procedure Name
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                                        Assigned To
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredProcedures.map((proc, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/30 transition-colors group"
                                    >
                                        <td className="px-6 py-5 font-semibold text-slate-600 text-[14px]">
                                            {proc.name}
                                        </td>
                                        <td className="px-6 py-5 font-semibold text-slate-600 text-[14px]">
                                            {proc.assigned}
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <span
                                                className={`px-4 py-1.5 rounded-full text-[12px] font-bold border ${
                                                    proc.status === "Completed"
                                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 px-5"
                                                        : proc.status ===
                                                            "Pending"
                                                          ? "bg-blue-50 text-blue-600 border-blue-100 px-5"
                                                          : "bg-amber-50 text-amber-600 border-amber-100"
                                                }`}
                                            >
                                                {proc.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 font-semibold text-slate-600 text-[14px]">
                                            {proc.date}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-md">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="h-9 px-4 flex items-center justify-center gap-2 rounded-xl border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-md text-[13px] font-bold">
                                                    <Eye size={16} />
                                                    view
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex items-center justify-end gap-8 px-8 py-6 border-t border-slate-50 mt-auto">
                        <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                                Items per page:
                            </span>
                            <div className="relative group">
                                <select className="h-10 pl-4 pr-10 bg-slate-50 border border-slate-100 rounded-xl text-[13px] text-slate-600 font-bold appearance-none cursor-pointer focus:border-blue-300 outline-none transition-all">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <span className="text-[13px] font-bold text-slate-700 tracking-tight">
                                1 - 10 of 42
                            </span>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-not-allowed shadow-sm active:scale-95">
                                    <ChevronLeft size={20} />
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100 text-blue-500 hover:bg-blue-50 transition-all shadow-sm active:scale-95">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Procedure Modal */}
            <AddProcedureModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                currentStep={modalStep}
                setCurrentStep={setModalStep}
            />
        </AdministratorLayout>
    );
}
