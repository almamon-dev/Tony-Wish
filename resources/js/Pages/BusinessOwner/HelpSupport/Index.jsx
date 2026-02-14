import React from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head } from "@inertiajs/react";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function HelpSupport() {
    const quickLinks = [
        "Documentation",
        "Video Tutorials",
        "FAQs",
        "Community Forum",
        "Feature Request",
    ];

    const faqs = [
        {
            question: "How do I update my plan?",
            answer: "Go to Users Management and click 'Assign Task'.",
        },
        {
            question: "Can I add more users?",
            answer: "Check Action Center for pending approvals",
        },
        {
            question: "How do I download invoices?",
            answer: "Visit Certificates tab after procedure completion",
        },
    ];

    return (
        <BusinessOwnerLayout>
            <Head title="Help & Support" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800">
                        Help & Support
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Get assistance and find resources
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Support Card */}
                    <div className="lg:col-span-2 bg-white rounded-[24px] border border-slate-100 shadow-sm p-8">
                        <div className="mb-8">
                            <h2 className="font-bold text-slate-800 text-[18px]">
                                Contact Support
                            </h2>
                            <p className="text-[13px] text-slate-400 font-medium">
                                Our Team is here to help
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Email Support
                                </label>
                                <div className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 font-medium flex items-center">
                                    support@justflow.com
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Phone Support
                                </label>
                                <div className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 font-medium flex items-center">
                                    + 1 234 567 8900
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Business Hours
                                </label>
                                <div className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 font-medium flex items-center">
                                    Mon-Fri, 9:00 AM-5:00 PM GMT
                                </div>
                            </div>

                            <div className="pt-4">
                                <button className="w-full bg-[#2c8af8] hover:bg-blue-600 text-white h-[52px] rounded-xl text-[15px] font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
                                    Start Live Chat
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Card */}
                    <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8 h-fit">
                        <div className="mb-6">
                            <h2 className="font-bold text-slate-800 text-[18px]">
                                Quick Links
                            </h2>
                            <p className="text-[13px] text-slate-400 font-medium">
                                Our Team is here to help
                            </p>
                        </div>

                        <div className="space-y-3">
                            {quickLinks.map((link, i) => (
                                <button
                                    key={i}
                                    className="w-full text-left h-12 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl text-slate-400 text-[14px] font-medium transition-all"
                                >
                                    {link}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8">
                    <div className="mb-8">
                        <h2 className="font-bold text-slate-800 text-[18px]">
                            Quick Links
                        </h2>
                        <p className="text-[13px] text-slate-400 font-medium">
                            Our Team is here to help
                        </p>
                    </div>

                    <div className="space-y-0 divide-y divide-slate-50">
                        {faqs.map((faq, i) => (
                            <div key={i} className="py-6 first:pt-0 last:pb-0">
                                <h3 className="text-[15px] font-bold text-slate-700 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-[14px] text-slate-400 font-medium">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
}
