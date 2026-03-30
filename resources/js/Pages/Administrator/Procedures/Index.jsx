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
import ViewProcedureModal from "./Partials/ViewProcedureModal";
import { router } from "@inertiajs/react";

export default function ProceduresIndex({ procedures = [], users = [] }) {
    const [activeTab, setActiveTab] = useState("All Procedures");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState("Details");
    const [selectedProcedure, setSelectedProcedure] = useState(null);

    const tabs = ["All Procedures", "Active", "Completed", "Pending Review"];

    const handleStatusUpdate = (id, status, progress) => {
        router.patch(route('administrator.procedures.update', id), {
            status: status,
            progress: progress
        }, {
            preserveScroll: true
        });
    };

    const filteredProcedures = procedures.filter((proc) => {
        const matchesSearch =
            proc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proc.assigned.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab =
            activeTab === "All Procedures" ||
            (activeTab === "Active" && proc.status === "In Progress") ||
            (activeTab === "Completed" && proc.status === "Completed") ||
            (activeTab === "Pending Review" && proc.status === "Pending Review");

        return matchesSearch && matchesTab;
    });

    return (
        <AdministratorLayout>
            <Head title="Procedures Management" />

            <div className="space-y-4 pb-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[24px] font-bold text-slate-800 tracking-tight leading-none">
                            Procedures Management
                        </h1>
                        <p className="text-[13px] text-slate-500 font-medium mt-1">
                            Add edit, and manage ISO procedures
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedProcedure(null);
                            setIsFormModalOpen(true);
                            setModalStep("Details");
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-[#2185d5] hover:bg-blue-600 text-white px-6 py-2.5 rounded-sm font-bold text-[14px] transition-all shadow-lg shadow-blue-500/10 active:scale-95 whitespace-nowrap"
                    >
                        <Plus size={16} />
                        Add Procedure
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    {/* Tabs and Search Section */}
                    <div className="px-5 py-3 flex items-center justify-between border-b border-slate-50">
                        {/* Tabs */}
                        <div className="flex items-center gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 rounded-md text-[12px] font-bold transition-all ${
                                        activeTab === tab
                                            ? "bg-[#2185d5] text-white shadow-sm"
                                            : "bg-slate-50 text-slate-500 hover:bg-slate-100 uppercase tracking-tight"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-[240px]">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <Search size={16} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-9 pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto flex-1 px-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8fafc] border-b border-slate-50">
                                    <th className="px-6 py-2.5 text-[12px] font-bold text-slate-700 uppercase tracking-tight">
                                        Procedure Name
                                    </th>
                                    <th className="px-6 py-2.5 text-[12px] font-bold text-slate-700 uppercase tracking-tight">
                                        Assigned To
                                    </th>
                                    <th className="px-6 py-2.5 text-[12px] font-bold text-slate-700 uppercase tracking-tight text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-2.5 text-[12px] font-bold text-slate-700 uppercase tracking-tight">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-2.5 text-[12px] font-bold text-slate-700 uppercase tracking-tight text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredProcedures.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                    <FileText size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-bold text-slate-700">
                                                        No procedures found
                                                    </h4>
                                                    <p className="text-[13px] text-slate-400 font-medium">
                                                        Try adjusting your
                                                        search or add a new
                                                        procedure
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setIsFormModalOpen(true);
                                                        setModalStep("Details");
                                                    }}
                                                    className="mt-2 text-[#2185d5] font-bold text-[13px] hover:underline flex items-center gap-1"
                                                >
                                                    <Plus size={14} />
                                                    Add new procedure
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProcedures.map((proc, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-50/30 transition-colors group"
                                        >
                                            <td className="px-6 py-3.5 font-semibold text-slate-600 text-[13.5px]">
                                                {proc.name}
                                            </td>
                                            <td className="px-6 py-3.5 font-semibold text-slate-600 text-[13.5px]">
                                                {proc.assigned}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span
                                                    className={`px-4 py-1.5 rounded-sm text-[12px] font-bold border ${
                                                        proc.status ===
                                                        "Completed"
                                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 px-5"
                                                            : proc.status === "Pending Review"
                                                              ? "bg-amber-50 text-amber-600 border-amber-100"
                                                              : proc.status === "Pending"
                                                                ? "bg-blue-50 text-blue-600 border-blue-100 px-5"
                                                                : "bg-slate-50 text-slate-500 border-slate-100"
                                                    }`}
                                                >
                                                    {proc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3.5 font-semibold text-slate-600 text-[13.5px]">
                                                {proc.date}
                                            </td>
                                            <td className="px-6 py-3.5">
                                                <div className="flex items-center justify-center gap-2">
                                                    {proc.status === 'Pending Review' && (
                                                        <button 
                                                            onClick={() => handleStatusUpdate(proc.id, 'completed', 100)}
                                                            className="h-8 px-3 flex items-center justify-center gap-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm transition-all text-[12px] font-bold"
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedProcedure(proc);
                                                            setIsViewModalOpen(true);
                                                        }}
                                                        className="h-8 px-3 flex items-center justify-center gap-2 rounded-md border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-sm text-[12px] font-bold"
                                                    >
                                                        <Eye size={14} />
                                                        view
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    {filteredProcedures.length > 0 && (
                        <div className="flex items-center justify-end gap-6 px-6 py-4 border-t border-slate-50 mt-auto">
                            <div className="flex items-center gap-3">
                                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                                    Items per page:
                                </span>
                                <div className="relative group">
                                    <select className="h-8 pl-3 pr-8 bg-slate-50 border border-slate-100 rounded-md text-[12px] text-slate-600 font-bold appearance-none cursor-pointer focus:border-blue-300 outline-none transition-all">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                    </select>
                                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <ChevronDown size={12} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <span className="text-[13px] font-bold text-slate-700 tracking-tight">
                                    1 - {Math.min(10, filteredProcedures.length)} of{" "}
                                    {filteredProcedures.length}
                                </span>
                                <div className="flex gap-1.5">
                                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95">
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-100 text-blue-500 hover:bg-blue-50 transition-all shadow-sm active:scale-95">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Procedure Modal */}
            <AddProcedureModal
                isOpen={isFormModalOpen}
                onClose={() => {
                    setIsFormModalOpen(false);
                    setSelectedProcedure(null);
                }}
                currentStep={modalStep}
                setCurrentStep={setModalStep}
                users={users}
                procedure={selectedProcedure}
            />

            <ViewProcedureModal 
                isOpen={isViewModalOpen}
                onClose={() => {
                    setIsViewModalOpen(false);
                    setSelectedProcedure(null);
                }}
                procedure={selectedProcedure}
            />
        </AdministratorLayout>
    );
}
