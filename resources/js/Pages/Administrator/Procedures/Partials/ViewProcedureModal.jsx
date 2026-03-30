import React from "react";
import { 
    X, 
    Calendar, 
    User, 
    Clock, 
    Target, 
    Shield, 
    FileText,
    CheckCircle2,
    MessageSquare,
    AlertCircle,
    Paperclip
} from "lucide-react";

export default function ViewProcedureModal({ isOpen, onClose, procedure }) {
    if (!isOpen || !procedure) return null;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'In Progress': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Pending Review': return 'bg-amber-50 text-amber-600 border-amber-100';
            default: return 'bg-slate-50 text-slate-400 border-slate-200';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'text-rose-500 bg-rose-50 border-rose-100';
            case 'medium': return 'text-amber-500 bg-amber-50 border-amber-100';
            default: return 'text-blue-500 bg-blue-50 border-blue-100';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            
            <div className="relative bg-white w-full max-w-4xl rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex items-start justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-[#2185d5]">
                            <FileText size={28} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="text-[22px] font-bold text-slate-800 leading-none">
                                    {procedure.name}
                                </h2>
                                <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getStatusColor(procedure.status)}`}>
                                    {procedure.status}
                                </span>
                            </div>
                            <p className="text-[14px] text-slate-500 font-medium">
                                ISO Standard: <span className="text-slate-700 font-bold">{procedure.iso_standard || 'N/A'}</span>
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 transition-all active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Main Info */}
                        <div className="col-span-8 space-y-8">
                            {/* Stats Bar */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3 text-slate-500 mb-2 font-bold text-[11px] uppercase tracking-wider">
                                        <Clock size={14} className="text-blue-500" />
                                        Due Date
                                    </div>
                                    <div className="text-[15px] font-bold text-slate-700">
                                        {procedure.date}
                                    </div>
                                </div>
                                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3 text-slate-500 mb-2 font-bold text-[11px] uppercase tracking-wider">
                                        <Shield size={14} className="text-emerald-500" />
                                        Priority
                                    </div>
                                    <div className={`text-[12px] font-bold px-2 py-0.5 rounded-sm border w-fit ${getPriorityColor(procedure.priority)}`}>
                                        {procedure.priority || 'Medium'}
                                    </div>
                                </div>
                                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3 text-slate-500 mb-2 font-bold text-[11px] uppercase tracking-wider">
                                        <Target size={14} className="text-[#2185d5]" />
                                        Progress
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-1000 bg-[#2185d5]`}
                                                style={{ width: `${procedure.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-[14px] font-bold text-slate-700">
                                            {procedure.progress}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div>
                                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4">Description</h3>
                                <div className="text-[15px] text-slate-600 leading-relaxed bg-slate-50/30 p-5 rounded-2xl border border-dashed border-slate-200">
                                    {procedure.description || "No description provided."}
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4">Objectives</h3>
                                    <p className="text-[14px] text-slate-600 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                                        {procedure.objectives || "Not specified"}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4">Scope</h3>
                                    <p className="text-[14px] text-slate-600 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                                        {procedure.scope || "Not specified"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-span-4 space-y-8">
                            {/* Assigned To */}
                            <div>
                                <h3 className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-4">Assigned Team</h3>
                                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 overflow-hidden border border-slate-200">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-bold text-slate-700">
                                                {procedure.assigned}
                                            </div>
                                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                                                Primary Owner
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Summary Card */}
                            <div className="bg-slate-900 rounded-[32px] p-6 text-white overflow-hidden relative group">
                                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-700" />
                                <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-700" />
                                
                                <h4 className="text-[12px] font-bold text-blue-300 uppercase tracking-[0.2em] mb-4 relative">Current Metric</h4>
                                <div className="flex items-end gap-1 mb-6 relative">
                                    <span className="text-4xl font-bold">{procedure.progress}</span>
                                    <span className="text-xl font-bold opacity-40 mb-1">%</span>
                                </div>
                                
                                <div className="space-y-3 relative">
                                    <div className="flex items-center justify-between text-[11px] text-white/60 font-medium">
                                        <span>Status Level</span>
                                        <span className="text-white/90">{procedure.status === 'Completed' ? 'Optimized' : 'Operational'}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-400 rounded-full" style={{ width: `${procedure.progress}%` }} />
                                    </div>
                                </div>

                                <button 
                                    onClick={onClose}
                                    className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-2xl text-[13px] border border-white/10 transition-all flex items-center justify-center gap-2 group/btn"
                                >
                                    Close Details
                                    <X size={14} className="group-hover/btn:rotate-90 transition-all duration-300" />
                                </button>
                            </div>

                            {/* Documents/Links Placeholder */}
                            <div className="bg-blue-50/50 p-5 rounded-[24px] border border-blue-100/50">
                                <h4 className="flex items-center gap-2 text-[12px] font-extrabold text-blue-600 uppercase tracking-widest mb-3">
                                    <Paperclip size={14} />
                                    Linked Records
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-xl text-[12px] font-bold text-slate-700 hover:shadow-md transition-all cursor-not-allowed">
                                        <FileText size={16} className="text-blue-500" />
                                        Audit_Plan_v1.pdf
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white border border-blue-100 rounded-xl text-[12px] font-bold text-slate-700 hover:shadow-md transition-all cursor-not-allowed">
                                        <FileText size={16} className="text-blue-500" />
                                        Compliance_Evidence.zip
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
