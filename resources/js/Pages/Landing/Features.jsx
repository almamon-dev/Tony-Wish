import React from 'react';
import {
    Building2,
    ClipboardList,
    Smartphone,
    FileCheck,
    BarChart3,
    Users
} from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Features() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-3">
                <div className="mb-16">
                     <SectionHeading
                        title="Everything You Need to Manage Your Business"
                        subtitle="Create, assign, and track tasks with ease. Upload and manage your procedures and workflows all in one place."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Multi-Company & Multi-User Support",
                            icon: Building2,
                            color: "#2c8af8",
                            desc: "Effortlessly manage multiple companies and users within a single platform. Scale your operations without complexity.",
                        },
                        {
                            title: "Task & Procedure Management",
                            icon: ClipboardList,
                            color: "#10b981",
                            desc: "Create, assign, and track tasks with ease. Upload and manage your procedures and workflows all in one place.",
                        },
                        {
                            title: "Audit & Compliance Tracking",
                            icon: FileCheck,
                            color: "#8b5cf6",
                            desc: "Track audit progress and ensure compliance with detailed reporting and real-time notifications.",
                        },
                        {
                            title: "Real-Time Reporting & Analytics",
                            icon: BarChart3,
                            color: "#ec4899",
                            desc: "Get real-time insights and reports on company performance, audits, and more with powerful analytics tools.",
                        },
                        {
                            title: "Customizable User Roles & Permissions",
                            icon: Users,
                            color: "#2c8af8",
                            desc: "Customize user access and permissions based on your company's structure. Keep your data secure and organized.",
                        },
                        {
                            title: "Seamless Mobile Integration",
                            icon: Smartphone,
                            color: "#10b981",
                            desc: "Access the platform on-the-go with a responsive design optimized for mobile devices. Work from anywhere.",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-[24px] bg-white border border-[#f1f2f4] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] hover:border-[#2c8af8]/20 transition-all duration-300 group"
                        >
                            <div
                                className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                                style={{
                                    backgroundColor: `${feature.color}10`,
                                    color: feature.color,
                                }}
                            >
                                <feature.icon size={24} strokeWidth={2.5} />
                            </div>
                            <h3 className="text-[18px] font-black text-[#2f3344] mb-3 group-hover:text-[#2c8af8] transition-colors leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-[14px] text-[#727586] leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
