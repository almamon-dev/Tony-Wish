import React from 'react';
import { ArrowRight, Check } from "lucide-react";
import Button from "./Button";

export default function Showcase() {
    return (
        <section className="py-28 overflow-hidden">
            <div className="max-w-[1240px] mx-auto px-6">
                {/* Pricing Header */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-top duration-700">
                    <h2 className="text-[40px] md:text-[48px] font-black text-[#2f3344] mb-4 tracking-tight">
                        Choose the Perfect Plan for Your Business
                    </h2>
                    <p className="text-[18px] text-[#727586] max-w-[600px] mx-auto font-medium">
                        Flexible pricing options to match your needs. Start free, scale as you grow.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    {/* Left Column - Task Overview */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        {/* Stats Cards */}
                        <img src="/img/perfect.png" alt="" />
                      
                    </div>

                    {/* Right Column - Benefits */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-right duration-700">
                        <p className="text-[18px] md:text-[20px] font-bold text-[#2f3344] leading-relaxed">
                            Transform your quality management processes with intelligent automation and real-time insights that help you stay compliant and efficient.
                        </p>

                        <ul className="space-y-5">
                            {[
                                "Reduce manual processes by 80%",
                                "Improve compliance tracking accuracy",
                                "Streamline audit preparation",
                                "Centralize quality documentation",
                            ].map((item, i) => (
                                <li
                                    key={i}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="min-w-[24px] h-[24px] rounded-full border-[2px] border-[#10b981] flex items-center justify-center text-[#10b981]">
                                        <Check size={14} strokeWidth={4} />
                                    </div>
                                    <span className="text-[16px] font-bold text-[#4b5563]">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
