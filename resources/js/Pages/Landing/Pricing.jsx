import React from 'react';
import { Check, ArrowRight } from "lucide-react";
import Button from "./Button";
import SectionHeading from "./SectionHeading";

export default function Pricing({ plans = [] }) {
    return (
        <section className="py-28">
            <div className="max-w-[1240px] mx-auto px-6">
                <SectionHeading
                    title="Choose the Perfect Plan for Your Business"
                    subtitle="Flexible pricing options to match your needs. Start free, scale as you grow."
                    centered={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-16">
                    {plans.map((plan) => {
                        const isProfessional = plan.name.toLowerCase().includes('professional');
                        const isEnterprise = plan.name.toLowerCase().includes('enterprise');
                        const isFree = plan.price <= 0;

                        return (
                            <div 
                                key={plan.id}
                                className={`bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f1f2f4] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group relative
                                    ${isProfessional ? 'z-10 border-[#10b981]/30 ring-1 ring-[#10b981]/10' : 'hover:border-[#2c8af8]/30'}`}
                            >
                                {isProfessional && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#10b981] text-white px-6 py-1.5 rounded-[6px] text-[13px] font-bold uppercase tracking-wide shadow-lg shadow-[#10b981]/40">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <span className="text-[16px] font-bold text-[#2f3344] block mb-2">
                                        {plan.name}
                                    </span>
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-[48px] font-black text-[#2f3344] tracking-tight">
                                            {isFree ? 'Free' : `${plan.currency === 'GBP' ? '£' : '$'}${Math.floor(plan.price)}`}
                                        </span>
                                        {!isFree && (
                                            <span className="text-[#a0a3af] font-medium text-[15px]">
                                                /{plan.duration === 'year' ? 'year' : 'month'}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[14px] text-[#727586] font-medium">
                                        {isProfessional ? 'For growing businesses' : isEnterprise ? 'For large organizations' : 'Perfect for trying out the platform'}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-1">
                                    {plan.features?.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-center gap-3 text-[15px] font-bold text-[#2f3344]"
                                        >
                                            <div className="min-w-[22px] h-[22px] rounded-full border-[1.5px] border-[#10b981] flex items-center justify-center text-[#10b981] bg-white text-[10px]">
                                                <Check size={12} strokeWidth={4} />
                                            </div>{" "}
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    href={route("register")}
                                    className="w-full h-[52px] bg-[#2c8af8] border border-transparent hover:bg-[#1a7ae8] font-bold rounded-xl text-[15px] transition-all shadow-md shadow-blue-500/20"
                                >
                                    {isEnterprise ? 'Contact us' : isFree ? 'Start Free Trial' : 'Get Started'} 
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </div>
                        );
                    })}

                    {/* Fallback if no plans in DB */}
                    {plans.length === 0 && (
                         <div className="col-span-full py-20 text-center text-slate-400 font-medium italic animate-pulse">
                            Loading subscription plans...
                         </div>
                    )}
                </div>
            </div>
        </section>
    );
}
