import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import {
    BarChart3,
    PieChart,
    CheckCircle2,
    Users,
    Award,
    TrendingUp,
    RotateCcw,
} from "lucide-react";

export default function ReportsIndex() {
    const [activeTab, setActiveTab] = useState("Team Performance");

    const tabs = ["Team Performance", "Complain Scores", "Completion Rates"];

    const stats = [
        {
            label: "Average Completion Rate",
            value: "78%",
            icon: <Award size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
        },
        {
            label: "Tasks Completed",
            value: "156",
            icon: <CheckCircle2 size={20} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            iconBg: "bg-emerald-100/50",
        },
        {
            label: "Active Users",
            value: "24",
            icon: <Users size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
            iconBg: "bg-blue-100/50",
        },
    ];

    const complianceScores = [
        { standard: "ISO 9001", score: 85 },
        { standard: "ISO 9001", score: 82 },
        { standard: "ISO 9001", score: 75 },
        { standard: "ISO 9001", score: 80 },
    ];

    const monthlyRates = [
        { month: "Jan", rate: 25 },
        { month: "Feb", rate: 55 },
        { month: "Mar", rate: 75 },
        { month: "Apr", rate: 68 },
        { month: "May", rate: 48 },
        { month: "Jun", rate: 55 },
        { month: "Jul", rate: 75 },
        { month: "Aug", rate: 68 },
        { month: "Sep", rate: 95 },
    ];

    return (
        <AdministratorLayout>
            <Head title="Reports" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none">
                        Reports
                    </h1>
                    <p className="text-[14px] text-slate-500 font-medium mt-1">
                        Team performance, compliance scores, and completion
                        rates
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl text-[14px] font-bold transition-all ${
                                activeTab === tab
                                    ? "bg-[#2185d5] text-white shadow-sm"
                                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                            }`}
                        >
                            {tab === "Complain Scores"
                                ? "Compliance Scores"
                                : tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-[24px] border border-slate-100 p-6 h-auto shadow-sm">
                    {activeTab === "Team Performance" && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-[15px] font-bold text-slate-400">
                                Team Performance Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="bg-slate-50/50 p-5 rounded-[20px] border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all"
                                    >
                                        <div className="space-y-1">
                                            <h3 className="text-[13px] font-medium text-slate-400">
                                                {stat.label}
                                            </h3>
                                            <p
                                                className={`text-[28px] font-bold ${stat.color} leading-none`}
                                            >
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div
                                            className={`w-10 h-10 rounded-xl ${stat.iconBg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}
                                        >
                                            {stat.icon}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Complain Scores" && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-[15px] font-bold text-slate-400">
                                Compliance scores by standard
                            </h2>
                            <div className="space-y-8">
                                {complianceScores.map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                                                    <RotateCcw size={16} />
                                                </div>
                                                <span className="text-[14px] font-bold text-slate-700">
                                                    {item.standard}
                                                </span>
                                            </div>
                                            <span className="text-[14px] font-bold text-[#2185d5]">
                                                {item.score}%
                                            </span>
                                        </div>
                                        <div className="h-2.5 w-full bg-slate-100 rounded-full relative">
                                            <div
                                                className="absolute left-0 top-0 h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{
                                                    width: `${item.score}%`,
                                                }}
                                            />
                                            <div
                                                className="absolute h-4 w-4 bg-slate-800 rounded-full border-2 border-white top-1/2 -translate-y-1/2 shadow-lg z-10"
                                                style={{
                                                    left: `calc(${item.score}% - 8px)`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Completion Rates" && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-[15px] font-bold text-slate-400">
                                Monthly Completion Rates
                            </h2>
                            <div className="mt-2 ml-10">
                                <div className="h-[250px] flex items-end justify-between gap-6 px-4 border-b border-slate-100 relative">
                                    {/* Y-Axis labels */}
                                    <div className="absolute -left-12 h-full flex flex-col justify-between text-[11px] text-slate-300 font-bold py-1">
                                        <span>100</span>
                                        <span>80</span>
                                        <span>60</span>
                                        <span>40</span>
                                        <span>20</span>
                                        <span>0</span>
                                    </div>

                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between py-1 pointer-events-none">
                                        {[...Array(6)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-full border-t border-slate-50"
                                            />
                                        ))}
                                    </div>

                                    {monthlyRates.map((data, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 flex flex-col items-center gap-4 z-10"
                                        >
                                            <div className="flex flex-col items-center w-full gap-2">
                                                <span className="text-[11px] font-bold text-slate-400">
                                                    {data.rate}%
                                                </span>
                                                <div
                                                    className="w-full max-w-[42px] bg-[#2185d5] rounded-t-lg transition-all duration-1000 ease-out hover:brightness-110 group relative shadow-sm"
                                                    style={{
                                                        height: `${data.rate * 2}px`, // Scaled for 250px height
                                                    }}
                                                >
                                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20">
                                                        Rate: {data.rate}%
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[12px] font-bold text-slate-500">
                                                {data.month}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdministratorLayout>
    );
}
