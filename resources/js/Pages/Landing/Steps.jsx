import React from 'react';
import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Steps() {
    return (
        <section className="py-28 bg-[#fafbfc]">
            <div className="max-w-[1240px] mx-auto px-6">
                <SectionHeading
                    title="Get Started in 5 Simple Steps"
                    subtitle="From setup to success, our platform makes it easy to get your team up and running"
                />

                <div className="relative mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                        {/* Connecting Line - Desktop Only */}
                        <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-[2px] bg-[#e5e7eb] -z-10"></div>

                        {[
                            {
                                step: "01",
                                title: "Sign Up",
                                desc: "Create your account and set up your company profile",
                                bg: "bg-blue-50",
                                text: "text-blue-600",
                            },
                            {
                                step: "02",
                                title: "Customize Procedures",
                                desc: "Upload and manage procedures for your teams",
                                bg: "bg-green-50",
                                text: "text-green-600",
                            },
                            {
                                step: "03",
                                title: "Assign Tasks",
                                desc: "Assign tasks and audits to your team members",
                                bg: "bg-purple-50",
                                text: "text-purple-600",
                            },
                            {
                                step: "04",
                                title: "Track Progress",
                                desc: "Monitor completion in real time with live updates",
                                bg: "bg-orange-50",
                                text: "text-orange-600",
                            },
                            {
                                step: "05",
                                title: "Generate Reports",
                                desc: "Review and download detailed performance reports",
                                bg: "bg-sky-50",
                                text: "text-sky-600",
                            },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className={`w-[60px] h-[60px] rounded-[16px] ${item.bg} ${item.text} flex items-center justify-center text-[20px] font-bold mb-6 shadow-sm transition-transform duration-300 group-hover:-translate-y-1`}>
                                    {item.step}
                                </div>
                                <h4 className="text-[18px] font-bold text-[#2f3344] mb-3 leading-tight">
                                    {item.title}
                                </h4>
                                <p className="text-[14px] text-[#727586] leading-relaxed px-2 font-medium">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
