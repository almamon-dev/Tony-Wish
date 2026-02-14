import React, { useState } from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head } from "@inertiajs/react";
import { Download, BarChart3 } from "lucide-react";

export default function Reports() {
    const [activeTab, setActiveTab] = useState("Billing Reports");

    const tabs = ["Billing Reports", "Usage Trends", "Audit Logs"];

    const billingStats = [
        {
            label: "Total Spent (2025)",
            value: "$2,150.40",
            bg: "bg-blue-50/50",
        },
        { label: "Average Monthly", value: "$238.80", bg: "bg-rose-50/50" },
        { label: "Next Payment", value: "Nov 15", bg: "bg-emerald-50/50" },
    ];

    return (
        <BusinessOwnerLayout>
            <Head title="Reports" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800">
                        Reports
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Billing reports, usage trends, and audit logs
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-xl text-[14px] font-bold transition-all border ${
                                activeTab === tab
                                    ? "bg-[#2c8af8] border-[#2c8af8] text-white shadow-lg shadow-blue-500/20"
                                    : "bg-white border-slate-100 text-slate-400 hover:text-slate-600"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Billing Summary Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-8">
                    <div className="mb-8">
                        <h2 className="font-bold text-slate-800 text-[18px]">
                            Billing Summary
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {billingStats.map((stat, i) => (
                            <div
                                key={i}
                                className={`${stat.bg} p-8 rounded-[20px] border border-slate-100/50`}
                            >
                                <p className="text-[14px] font-medium text-slate-400 mb-4">
                                    {stat.label}
                                </p>
                                <p className="text-[32px] font-bold text-slate-700 tracking-tight leading-none">
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-10">
                        <button className="bg-[#2c8af8] hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-[14px] font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
                            <Download size={18} />
                            Download Annual Report
                        </button>
                    </div>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
}
