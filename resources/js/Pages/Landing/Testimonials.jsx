import React from 'react';
import { Star } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
    return (
        <section className="py-24 bg-[#fffcf5]">
            <div className="max-w-[1240px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#0f172a] mb-4 tracking-tight">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-[16px] text-[#64748b] font-medium">
                        See what our customers have to say about their experience
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Sarah Mitchell",
                            role: "CEO, TechCorp",
                            text: "QualityPro transformed how we manage our ISO 9001 compliance. The automated reminders alone saved us countless hours.",
                            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        },
                        {
                            name: "Sarah Mitchell",
                            role: "Operations Manager, InnovateCo",
                            text: "QualityPro transformed how we manage our ISO 9001 compliance. The automated reminders alone saved us countless hours.",
                            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        },
                        {
                            name: "Sarah Mitchell",
                            role: "Quality Manager at TechCorp",
                            text: "QualityPro transformed how we manage our ISO 9001 compliance. The automated reminders alone saved us countless hours.",
                            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-[16px] bg-white shadow-[0_2px_15px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300"
                        >
                            <div className="flex gap-1 text-[#fbbf24] mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star
                                        key={s}
                                        size={18}
                                        fill="currentColor"
                                        strokeWidth={0}
                                    />
                                ))}
                            </div>
                            <p className="text-[15px] text-[#334155] leading-relaxed mb-6">
                                {item.text}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                                    <img
                                        src={item.image}
                                        className="w-full h-full object-cover"
                                        alt={item.name}
                                    />
                                </div>
                                <div>
                                    <h5 className="text-[14px] font-bold text-[#0f172a]">
                                        {item.name}
                                    </h5>
                                    <p className="text-[13px] text-[#64748b]">
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
