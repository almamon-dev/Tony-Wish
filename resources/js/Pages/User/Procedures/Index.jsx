import React, { useState } from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";
import ProcedureModal from "./Partials/ProcedureModal";

export default function ProceduresIndex({ procedures = [] }) {
    const [selectedProcedure, setSelectedProcedure] = useState(null);

    const stats = [
        {
            label: "Assigned Procedures",
            value: procedures.length.toString(),
            sub: `${((procedures.filter((p) => p.status === "Completed").length / (procedures.length || 1)) * 100).toFixed(0)}% completion rate`,
            icon: <ClipboardList size={22} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
        },
        {
            label: "Completed",
            value: procedures
                .filter((p) => p.status === "Completed")
                .length.toString(),
            icon: <CheckCircle2 size={22} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
        },
        {
            label: "In Progress",
            value: procedures
                .filter((p) => p.status !== "Completed")
                .length.toString(),
            icon: <Clock size={22} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
        },
    ];



    return (
        <UserLayout>
            <Head title="My Procedures" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800 tracking-tight leading-none">
                        My Procedures
                    </h1>
                    <p className="text-slate-500 font-medium mt-3">
                        Assigned procedures with deadlines and task details
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-5 rounded-[20px] border border-slate-100 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-[14px] font-bold text-slate-500">
                                    {stat.label}
                                </h3>
                                <div
                                    className={`w-9 h-9 rounded-[10px] ${stat.bg} ${stat.color} flex items-center justify-center opacity-80`}
                                >
                                    {React.cloneElement(stat.icon, {
                                        size: 18,
                                    })}
                                </div>
                            </div>

                            <div className="space-y-0.5">
                                <p
                                    className={`text-[28px] font-bold text-slate-700 leading-none tracking-tight`}
                                >
                                    {stat.value}
                                </p>
                                {stat.sub && (
                                    <p className="text-[12px] font-medium text-slate-400 mt-1.5">
                                        {stat.sub}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Procedures Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {procedures.length === 0 ? (
                        <div className="md:col-span-2 bg-white rounded-[20px] border border-slate-100 shadow-sm p-12 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4">
                                <ClipboardList size={32} />
                            </div>
                            <h4 className="text-[18px] font-bold text-slate-700">
                                No procedures assigned
                            </h4>
                            <p className="text-[14px] text-slate-400 font-medium max-w-[300px] mt-1">
                                You don't have any procedures assigned to you
                                at the moment.
                            </p>
                        </div>
                    ) : (
                        procedures.map((proc, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-[20px] border border-slate-100 shadow-sm p-6 transition-all hover:shadow-md"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className={`px-4 py-1 rounded-lg text-[11px] font-bold border ${
                                            proc.status === "Completed"
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "bg-white text-blue-500 border-blue-100"
                                        }`}
                                    >
                                        {proc.status}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <p className="text-[13px] font-bold text-slate-400 mb-0.5">
                                        {proc.id}
                                    </p>
                                    <h3 className="text-[18px] font-bold text-slate-800">
                                        {proc.name}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                                            Progress
                                        </span>
                                        <span className="text-[12px] font-bold text-slate-400">
                                            {proc.progress}%
                                        </span>
                                    </div>
                                    <div className="flex-1 h-1.5 bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full bg-emerald-500`}
                                            style={{
                                                width: `${proc.progress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-50">
                                    <p className="text-[12px] font-bold text-slate-400">
                                        Tasks: {proc.tasks}
                                    </p>
                                    <p className="text-[12px] font-bold text-slate-400">
                                        Due: {proc.due}
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={() =>
                                            setSelectedProcedure(proc)
                                        }
                                        className={`px-6 py-2 rounded-lg text-[13px] font-bold transition-all shadow-lg ${
                                            proc.status === "Completed"
                                                ? "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-slate-100/50"
                                                : "bg-[#2c8af8] hover:bg-blue-600 text-white shadow-blue-500/20"
                                        }`}
                                    >
                                        {proc.status === "Completed"
                                            ? "View Details"
                                            : "Continue"}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <ProcedureModal
                procedure={selectedProcedure}
                onClose={() => setSelectedProcedure(null)}
            />
        </UserLayout>
    );
}
