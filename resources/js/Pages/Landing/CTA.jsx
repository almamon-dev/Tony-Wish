import React from 'react';
import Button from "./Button";

export default function CTA() {
    return (
        <section className="w-full bg-gradient-to-r from-[#0ea5e9] to-[#10b981] py-24 px-6 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-white text-[32px] md:text-[42px] font-bold mb-6 tracking-tight leading-tight">
                    Ready to Transform Your Business?
                </h2>
                <p className="text-white/90 text-[16px] md:text-[18px] mb-10 leading-relaxed font-medium">
                    Join thousands of companies already using our platform to streamline<br className="hidden md:block" /> operations and boost productivity.
                </p>
                <div className="flex justify-center">
                    <Button
                        href={route("register")}
                        className="bg-white text-[#0f172a] hover:bg-white/90 px-8 h-[50px] rounded-lg font-bold text-[15px] shadow-lg transition-all transform hover:-translate-y-0.5"
                    >
                        Get Started
                    </Button>
                </div>
            </div>
        </section>
    );
}
