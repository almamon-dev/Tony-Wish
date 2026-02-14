import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import {
    HelpCircle,
    BookOpen,
    PlayCircle,
    Sparkles,
    Headphones,
    ChevronRight,
    MessageCircleQuestion,
    CheckCircle2,
    FileCheck2,
} from "lucide-react";

export default function HelpIndex() {
    const quickLinks = [
        { title: "Admin Guide", icon: <BookOpen size={18} /> },
        { title: "Video Tutorials", icon: <PlayCircle size={18} /> },
        { title: "Best Practices", icon: <Sparkles size={18} /> },
        { title: "Contact Support", icon: <Headphones size={18} /> },
    ];

    const commonTasks = [
        {
            title: "How to assign tasks to users?",
            description: "Go to Users Management and click 'Assign Task'",
            icon: <MessageCircleQuestion size={20} className="text-blue-500" />,
        },
        {
            title: "How to approve procedures?",
            description: "Check Action Center for pending approvals",
            icon: <CheckCircle2 size={20} className="text-emerald-500" />,
        },
        {
            title: "How to issue certificates?",
            description: "Visit Certificates tab after procedure completion",
            icon: <FileCheck2 size={20} className="text-purple-500" />,
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="Help & Support" />

            <div className="space-y-8 pb-10 max-w-5xl">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none">
                        Help & Support
                    </h1>
                    <p className="text-[14px] text-slate-500 font-medium mt-1">
                        Get assistance and find resources
                    </p>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <h3 className="text-[16px] font-bold text-slate-700">
                                Quick Links
                            </h3>
                        </div>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {quickLinks.map((link, i) => (
                            <button
                                key={i}
                                className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                                        {link.icon}
                                    </div>
                                    <span className="text-[14px] font-bold text-slate-700">
                                        {link.title}
                                    </span>
                                </div>
                                <ChevronRight
                                    size={18}
                                    className="text-slate-300 group-hover:text-slate-400 transition-colors"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Common Tasks */}
                <div className="space-y-6">
                    <h3 className="text-[16px] font-bold text-slate-700 px-1">
                        Common Tasks
                    </h3>

                    <div className="grid grid-cols-1 gap-4">
                        {commonTasks.map((task, i) => (
                            <div
                                key={i}
                                className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-start gap-5 hover:border-blue-100 hover:shadow-md transition-all group"
                            >
                                <div className="mt-1">{task.icon}</div>
                                <div className="space-y-1">
                                    <h4 className="text-[15px] font-bold text-slate-800">
                                        {task.title}
                                    </h4>
                                    <p className="text-[13px] text-slate-500">
                                        {task.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
