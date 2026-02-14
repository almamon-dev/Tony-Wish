import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function Help() {
    const faqs = [
        {
            q: "How do I complete a task?",
            a: 'Go to Dashboard and click "Continue Task" on any active task',
        },
        {
            q: "How do I upload documents?",
            a: 'Visit Upload Center and click "Upload Document"',
        },
        {
            q: "Where can I see my certificates?",
            a: "Check the Certificates tab to view all your earned certificates",
        },
    ];

    const quickLinks = [
        "User Guide",
        "Video Tutorials",
        "FAQs",
        "Contact Support",
    ];

    const contactInfo = [
        {
            label: "Email Support",
            value: "support@isoflow.com",
            bg: "bg-rose-50/50",
            color: "text-rose-500",
        },
        {
            label: "Your Administrator",
            value: "Sarah Johnson",
            bg: "bg-emerald-50/50",
            color: "text-emerald-500",
        },
        {
            label: "Response Time",
            value: "Within 24 hours",
            bg: "bg-amber-50/50",
            color: "text-amber-500",
        },
    ];

    return (
        <UserLayout>
            <Head title="Help & Support" />

            <div className="space-y-6 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800 tracking-tight leading-none">
                        Help & Support
                    </h1>
                    <p className="text-slate-500 font-medium mt-3">
                        Get assistance and find answers
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* FAQs Section (Mockup says Recent Invoices but content is FAQ) */}
                    <div className="lg:col-span-8 bg-white rounded-[20px] border border-slate-100 shadow-sm p-6">
                        <h2 className="font-bold text-slate-800 text-[16px] mb-6">
                            Recent Invoices
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="bg-slate-50/50 p-5 rounded-xl border border-slate-100/50"
                                >
                                    <h3 className="font-bold text-slate-700 text-[14px] mb-1">
                                        {faq.q}
                                    </h3>
                                    <p className="text-slate-400 text-[13px] font-medium">
                                        {faq.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="lg:col-span-4 bg-white rounded-[20px] border border-slate-100 shadow-sm p-6">
                        <h2 className="font-bold text-slate-800 text-[16px] mb-6">
                            Quick Links
                        </h2>
                        <div className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <button
                                    key={i}
                                    className="w-full text-left bg-slate-50/50 hover:bg-slate-100/50 p-4 rounded-xl border border-slate-100/50 text-slate-500 text-[14px] font-bold transition-colors"
                                >
                                    {link}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-white rounded-[20px] border border-slate-100 shadow-sm p-5">
                    <h2 className="font-bold text-slate-800 text-[16px] mb-6">
                        Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {contactInfo.map((info, i) => (
                            <div
                                key={i}
                                className={`${info.bg} p-5 rounded-2xl border border-slate-100/30`}
                            >
                                <p className="text-[12px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
                                    {info.label}
                                </p>
                                <p
                                    className={`text-[16px] font-bold ${info.color}`}
                                >
                                    {info.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
