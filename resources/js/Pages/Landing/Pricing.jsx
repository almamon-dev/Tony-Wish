import React from 'react';
import { Check, ArrowRight } from "lucide-react";
import Button from "./Button";
import SectionHeading from "./SectionHeading";

export default function Pricing() {
    return (
        <section className="py-28">
            <div className="max-w-[1240px] mx-auto px-6">
                <SectionHeading
                    title="Choose the Perfect Plan for Your Business"
                    subtitle="Flexible pricing options to match your needs. Start free, scale as you grow."
                    centered={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-16">
                    {/* Free Trial */}
                    <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f1f2f4] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[#2c8af8]/30 transition-all duration-300 flex flex-col h-full group relative">
                        <div className="mb-8">
                            <span className="text-[16px] font-bold text-[#2f3344] block mb-2">
                                Free Trial
                            </span>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-[48px] font-black text-[#2f3344] tracking-tight">
                                    £0
                                </span>
                                <span className="text-[#a0a3af] font-medium text-[15px]">
                                    /month
                                </span>
                            </div>
                            <p className="text-[14px] text-[#727586] font-medium">Perfect for trying out the platform</p>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            {[
                                "7-days free trial",
                                "1 company",
                                "Up to 2 users",
                                "Basic features",
                                "Email support",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-[15px] font-bold text-[#2f3344]"
                                >
                                    <div className="min-w-[22px] h-[22px] rounded-full border-[1.5px] border-[#10b981] flex items-center justify-center text-[#10b981] bg-white text-[10px]">
                                        <Check size={12} strokeWidth={4} />
                                    </div>{" "}
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button
                            href={route("register")}
                            className="w-full h-[52px] bg-[#2c8af8] border border-transparent hover:bg-[#1a7ae8] font-bold rounded-xl text-[15px] transition-all shadow-md shadow-blue-500/20"
                        >
                            Start Free Trial <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </div>

                    {/* Professional */}
                    <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f1f2f4] relative z-10 flex flex-col h-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[#10b981]/30 transition-all duration-300">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#10b981] text-white px-6 py-1.5 rounded-[6px] text-[13px] font-bold uppercase tracking-wide shadow-lg shadow-[#10b981]/40">
                            Most Popular
                        </div>
                        <div className="mb-8">
                            <span className="text-[16px] font-bold text-[#2f3344] block mb-2">
                                Professional
                            </span>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-[48px] font-black text-[#2f3344] tracking-tight">
                                    £49
                                </span>
                                <span className="text-[#a0a3af] font-medium text-[15px]">
                                    /month
                                </span>
                            </div>
                            <p className="text-[14px] text-[#727586] font-medium">For growing businesses</p>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            {[
                                "Everything in Free Trial",
                                "Up to 5 companies",
                                "Unlimited users",
                                "Full audit tracking",
                                "Advanced reporting",
                                "1GB storage",
                                "Priority support",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-[15px] font-bold text-[#2f3344]"
                                    >
                                    <div className="min-w-[22px] h-[22px] rounded-full border-[1.5px] border-[#10b981] flex items-center justify-center text-[#10b981] bg-white text-[10px]">
                                        <Check size={12} strokeWidth={4} />
                                    </div>{" "}
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button
                            href={route("register")}
                            className="w-full h-[52px] bg-[#2c8af8] border border-transparent hover:bg-[#1a7ae8] font-bold rounded-xl text-[15px] transition-all shadow-md shadow-blue-500/20"
                        >
                            Get Started <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </div>

                    {/* Enterprise */}
                    <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f1f2f4] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-[#2c8af8]/30 transition-all duration-300 flex flex-col h-full group relative">
                        <div className="mb-8">
                            <span className="text-[16px] font-bold text-[#2f3344] block mb-2">
                                Enterprise
                            </span>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-[48px] font-black text-[#2f3344] tracking-tight">
                                    Custom
                                </span>
                            </div>
                            <p className="text-[14px] text-[#727586] font-medium">For large organizations</p>
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                            {[
                                "Everything in Free Trial",
                                "Up to 5 companies",
                                "Unlimited users",
                                "Full audit tracking",
                                "Advanced reporting",
                                "1GB storage",
                                "Priority support",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-[15px] font-bold text-[#2f3344]"
                                >
                                    <div className="min-w-[22px] h-[22px] rounded-full border-[1.5px] border-[#10b981] flex items-center justify-center text-[#10b981] bg-white text-[10px]">
                                        <Check size={12} strokeWidth={4} />
                                    </div>{" "}
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button
                            href={route("register")}
                            className="w-full h-[52px] bg-[#2c8af8] border border-transparent hover:bg-[#1a7ae8] font-bold rounded-xl text-[15px] transition-all shadow-md shadow-blue-500/20"
                        >
                            Contact us <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
