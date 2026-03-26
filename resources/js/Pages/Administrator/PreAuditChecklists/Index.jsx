import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Plus,
    FileText,
    CheckCircle2,
    Clock,
    Edit2,
    Eye,
    Search,
    ChevronDown,
} from "lucide-react";
import CreateChecklistModal from "./Partials/CreateChecklistModal";

export default function PreAuditChecklists({ checklists = [], auditors = [] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("All Checklists");
    const [searchQuery, setSearchQuery] = useState("");

    const tabs = ["All Checklists", "Active", "Completed"];

    const filteredChecklists = checklists.filter((checklist) => {
        const matchesSearch = checklist.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesTab =
            activeTab === "All Checklists" ||
            (activeTab === "Active" && checklist.status !== "Completed") ||
            (activeTab === "Completed" && checklist.status === "Completed");

        return matchesSearch && matchesTab;
    });

    const calculateCompletion = (checklist) => {
        let totalItems = 0;
        let completedItems = 0;

        checklist.areas?.forEach((area) => {
            area.items?.forEach((item) => {
                totalItems++;
                if (item.is_completed) completedItems++;
            });
        });

        if (totalItems === 0) return 0;
        return Math.round((completedItems / totalItems) * 100);
    };

    return (
        <AdministratorLayout>
            <Head title="Pre-Audit Checklists" />

            <div className="space-y-8 pb-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none">
                            Pre-Audit Checklists
                        </h1>
                        <p className="text-[14px] text-slate-500 font-medium mt-3">
                            Create and track pre-audit reports
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 bg-[#2185d5] hover:bg-blue-600 text-white px-6 py-2.5 rounded-sm font-bold text-[14px] transition-all shadow-lg shadow-blue-500/10 active:scale-95 whitespace-nowrap"
                    >
                        <Plus size={18} />
                        Create Checklist
                    </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-sm border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    {/* Tabs and Search Section */}
                    <div className="p-8 space-y-8">
                        {/* Tabs */}
                        <div className="flex flex-wrap items-center gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-sm text-[14px] font-bold transition-all ${
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
                                className="w-full h-11 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-sm text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="overflow-x-auto flex-1 px-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8fafc] border-b border-slate-50">
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                                        Checklist Name
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                                        ISO Standard
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                                        Created By
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                                        Completion
                                    </th>
                                    <th className="px-6 py-4 text-[13px] font-bold text-slate-700 uppercase tracking-tight text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredChecklists.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                    <FileText size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-bold text-slate-700">
                                                        No checklists found
                                                    </h4>
                                                    <p className="text-[13px] text-slate-400 font-medium">
                                                        Try adjusting your
                                                        search or create a new
                                                        checklist
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        setIsCreateModalOpen(
                                                            true,
                                                        )
                                                    }
                                                    className="mt-2 text-[#2185d5] font-bold text-[13px] hover:underline flex items-center gap-1"
                                                >
                                                    <Plus size={14} />
                                                    Create new checklist
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredChecklists.map((audit, i) => (
                                        <tr
                                            key={i}
                                            className="hover:bg-slate-50/30 transition-colors group"
                                        >
                                            <td className="px-6 py-5 font-semibold text-slate-600 text-[14px]">
                                                {audit.name}
                                            </td>
                                            <td className="px-6 py-5 font-semibold text-slate-500 text-[14px]">
                                                {audit.iso_standard}
                                            </td>
                                            <td className="px-6 py-5 font-semibold text-slate-500 text-[14px]">
                                                {audit.creator
                                                    ? `${audit.creator.first_name} ${audit.creator.last_name}`
                                                    : "N/A"}
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span
                                                    className={`px-4 py-1.5 rounded-sm text-[12px] font-bold border ${
                                                        audit.status ===
                                                        "Completed"
                                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 px-5"
                                                            : "bg-amber-50 text-amber-600 border-amber-100"
                                                    }`}
                                                >
                                                    {audit.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4 min-w-[140px]">
                                                    <div className="flex-1 h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ${
                                                                calculateCompletion(
                                                                    audit,
                                                                ) === 100
                                                                    ? "bg-emerald-500"
                                                                    : "bg-emerald-400"
                                                            }`}
                                                            style={{
                                                                width: `${calculateCompletion(
                                                                    audit,
                                                                )}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-[13px] font-bold text-slate-400 whitespace-nowrap">
                                                        {calculateCompletion(
                                                            audit,
                                                        )}
                                                        %
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            router.get(
                                                                route(
                                                                    "administrator.pre-audit-checklists.edit",
                                                                    audit.id,
                                                                ),
                                                            )
                                                        }
                                                        className="w-9 h-9 flex items-center justify-center rounded-sm border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-md"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            router.get(
                                                                route(
                                                                    "administrator.pre-audit-checklists.show",
                                                                    audit.id,
                                                                ),
                                                            )
                                                        }
                                                        className="h-9 px-4 flex items-center justify-center gap-2 rounded-sm border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-200 transition-all bg-white hover:shadow-md text-[13px] font-bold"
                                                    >
                                                        <Eye size={16} />
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
                    {filteredChecklists.length > 0 && (
                        <div className="flex items-center justify-end gap-8 px-8 py-6 border-t border-slate-50 mt-auto">
                            <div className="flex items-center gap-3">
                                <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">
                                    Items per page:
                                </span>
                                <div className="relative group">
                                    <select className="h-10 pl-4 pr-10 bg-slate-50 border border-slate-100 rounded-sm text-[13px] text-slate-600 font-bold appearance-none cursor-pointer focus:border-blue-300 outline-none transition-all">
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
                                    1 -{" "}
                                    {Math.min(10, filteredChecklists.length)} of{" "}
                                    {filteredChecklists.length}
                                </span>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-slate-100 text-slate-300 hover:text-blue-500 hover:bg-blue-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm active:scale-95">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center rounded-sm border border-slate-100 text-blue-500 hover:bg-blue-50 transition-all shadow-sm active:scale-95">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CreateChecklistModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                auditors={auditors}
            />
        </AdministratorLayout>
    );
}
