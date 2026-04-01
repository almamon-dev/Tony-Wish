import React, { useState, useMemo } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import {
    Search,
    FileText,
    Eye,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Clock,
    ArrowRight,
    AlertCircle,
} from "lucide-react";
import { router } from "@inertiajs/react";
import ProcedureModal from "./Partials/ProcedureModal";


export default function ProceduresIndex({ procedures = [] }) {
    const [activeTab, setActiveTab] = useState("All Tasks");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [selectedTab, setSelectedTab] = useState("Overview");

    const openModal = (proc, tab = "Overview") => {
        setSelectedProcedure(proc);
        setSelectedTab(tab);
    };

    const tabs = ["All Tasks", "In Progress", "Completed", "Pending Review"];

    const handleStatusUpdate = (id, status, progress) => {
        router.patch(route('user.procedures.update', id), {
            status: status,
            progress: progress
        }, {
            preserveScroll: true,
            onSuccess: () => {
                // Flash message handled by backend
            }
        });
    };

    const stats = useMemo(() => {
        const total = procedures.length;
        const completed = procedures.filter(p => p.status === 'Completed').length;
        const inProgress = procedures.filter(p => p.status === 'In Progress').length;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return [
            { label: "Assigned Procedures", value: total, icon: FileText, color: "blue", subtext: `${rate}% completion rate` },
            { label: "Completed", value: completed, icon: CheckCircle, color: "emerald" },
            { label: "In Progress", value: inProgress, icon: Clock, color: "orange" },
        ];
    }, [procedures]);

    const filteredProcedures = procedures.filter((proc) => {
        const matchesSearch = proc.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesTab =
            activeTab === "All Tasks" ||
            (activeTab === "In Progress" && proc.status === "In Progress") ||
            (activeTab === "Completed" && proc.status === "Completed") ||
            (activeTab === "Pending Review" && proc.raw_status === 'pending_review');

        return matchesSearch && matchesTab;
    });

    return (
        <UserLayout>
            <Head title="My Procedures" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-[28px] font-black text-slate-800 tracking-tight leading-none">
                            My Procedures
                        </h1>
                        <p className="text-slate-500 font-medium mt-3">
                            Assigned procedures with deadlines and task details
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full max-w-sm">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search procedures..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-md text-[14px] font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/40 transition-all shadow-sm shadow-slate-200/50"
                        />
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col gap-4 group hover:border-blue-100/50 transition-all">
                            <div className="flex items-start justify-between">
                                <span className="text-[14px] font-bold text-slate-500 tracking-tight ">
                                    {stat.label}
                                </span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    stat.color === 'blue' ? 'bg-blue-50 text-blue-500' : 
                                    stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' : 
                                    'bg-orange-50 text-orange-500'
                                }`}>
                                    <stat.icon size={20} />
                                </div>
                            </div>
                            <div>
                                <h2 className={`text-3xl font-black ${
                                    stat.color === 'blue' ? 'text-blue-500' : 
                                    stat.color === 'emerald' ? 'text-emerald-500' : 
                                    'text-orange-500'
                                }`}>
                                    {stat.value}
                                </h2>
                                {stat.subtext && (
                                    <p className="text-[13px] font-bold text-slate-400 mt-1">
                                        {stat.subtext}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 border border-slate-200/50 rounded-md w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-md text-[13px] font-black transition-all ${
                                activeTab === tab
                                    ? "bg-white text-[#2c8af8] shadow-sm ring-1 ring-slate-200/50"
                                    : "text-slate-400 hover:text-slate-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredProcedures.length === 0 ? (
                        <div className="col-span-full bg-white rounded-xl border border-dashed border-slate-200 p-20 flex flex-col items-center justify-center gap-4 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300">
                                <AlertCircle size={40} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-700">No Procedures Found</h3>
                                <p className="text-slate-400 font-bold mt-1  tracking-widest text-[11px]">Matching your current filters</p>
                            </div>
                        </div>
                    ) : (
                        filteredProcedures.map((proc, i) => (
                            <div key={i} className="bg-white rounded-xl border border-slate-100 shadow-sm shadow-slate-200/40 p-8 flex flex-col gap-6 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border-b-4 border-b-transparent hover:border-b-[#2c8af8]/20">
                                
                                <div className="flex items-start justify-between">
                                    <span className={`px-4 py-1.5 rounded-lg text-[11px] font-black  tracking-widest border border-transparent shadow-sm ${
                                        proc.status === 'Completed' ? 'bg-blue-500 text-white shadow-blue-500/20' : 
                                        proc.status === 'In Progress' ? 'bg-white border-blue-500/20 text-blue-500 shadow-blue-500/5' : 
                                        'bg-slate-50 text-slate-400'
                                    }`}>
                                        {proc.raw_status === 'pending_review' ? 'Pending Review' : proc.status}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-[18px] font-black text-slate-800 group-hover:text-[#2c8af8] transition-colors  tracking-tight">
                                        {proc.name}
                                    </h3>
                                    <p className="text-slate-400 font-bold text-[13px] line-clamp-1 italic  tracking-wider opacity-60">
                                        {proc.desc || 'Quality Management System Standard'}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[12px] font-black text-slate-700  tracking-tighter">Progress</span>
                                        <span className={`text-[13px] font-black ${proc.progress === 100 ? 'text-emerald-500' : 'text-slate-800'}`}>
                                            {proc.progress}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-1000 ${proc.progress === 100 ? 'bg-emerald-500' : 'bg-emerald-500'}`} // In screenshot it's emerald-500 for progress
                                            style={{ width: `${proc.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black text-slate-400  tracking-widest">
                                            Tasks: {proc.checklist ? `${proc.checklist.filter(t => t.completed).length}/${proc.checklist.length}` : '0 Tasks'}
                                        </span>
                                        <div className="text-[11px] font-black text-slate-300">Total Steps</div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[11px] font-black text-slate-400  tracking-widest leading-none">Due Date</p>
                                        <p className="text-[11px] font-black text-slate-700 mt-1  tracking-widest">{proc.date || proc.due || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="pt-2 flex items-center gap-3">
                                    {/* pending → Accept */}
                                    {proc.raw_status === 'pending' && (
                                        <button 
                                            onClick={() => handleStatusUpdate(proc.id, 'in_progress', 0)}
                                            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all text-[13px] font-black"
                                        >
                                            <CheckCircle size={18} />
                                            Accept Procedure
                                        </button>
                                    )}
                                    {/* in_progress → Continue (Upload tab) */}
                                    {proc.raw_status === 'in_progress' && (
                                        <button 
                                            onClick={() => openModal(proc, 'Upload')}
                                            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-md bg-[#2c8af8] text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all text-[13px] font-black"
                                        >
                                            Continue
                                            <ArrowRight size={18} />
                                        </button>
                                    )}
                                    {/* pending_review → Awaiting */}
                                    {proc.raw_status === 'pending_review' && (
                                        <div className="flex-1 h-12 flex items-center justify-center gap-2 rounded-md bg-amber-50 text-amber-500 border border-amber-100 text-[13px] font-black">
                                            Awaiting Review
                                        </div>
                                    )}
                                    {/* completed → View Details */}
                                    {proc.raw_status === 'completed' && (
                                        <button 
                                            onClick={() => openModal(proc, 'Overview')}
                                            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-md bg-white border border-slate-200 text-slate-600 hover:border-[#2c8af8] hover:text-[#2c8af8] shadow-sm transition-all text-[13px] font-black"
                                        >
                                            View Details
                                        </button>
                                    )}
                                    {/* fallback for any unrecognised status */}
                                    {!['pending','in_progress','pending_review','completed'].includes(proc.raw_status) && (
                                        <button 
                                            onClick={() => handleStatusUpdate(proc.id, 'in_progress', 0)}
                                            className="flex-1 h-12 flex items-center justify-center gap-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all text-[13px] font-black"
                                        >
                                            <CheckCircle size={18} />
                                            Accept Procedure
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {filteredProcedures.length > 5 && (
                    <div className="flex items-center justify-center gap-3 pt-6">
                        <button className="w-12 h-12 flex items-center justify-center rounded-md border border-slate-100 bg-white text-slate-400 hover:text-[#2c8af8] hover:border-[#2c8af8]/30 transition-all shadow-sm active:scale-95 disabled:opacity-20">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="w-12 h-12 flex items-center justify-center rounded-md border border-slate-100 bg-white text-slate-400 hover:text-[#2c8af8] hover:border-[#2c8af8]/30 transition-all shadow-sm active:scale-95">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>

            {selectedProcedure && (
                <ProcedureModal 
                    procedure={selectedProcedure} 
                    onClose={() => {
                        setSelectedProcedure(null);
                        setSelectedTab('Overview');
                    }}
                    defaultTab={selectedTab}
                />
            )}
        </UserLayout>
    );
}
