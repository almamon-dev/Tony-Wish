import React, { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Success() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <Head title="Subscription Successful" />
            
            <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-blue-900/10 p-10 text-center animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={56} />
                </div>
                
                <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    Payment Successful!
                </h1>
                
                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                    Your subscription is now active! You and your team can now access all premium dashboard features.
                </p>
                
                <Link
                    href={route("dashboard")}
                    className="flex items-center justify-center gap-3 w-full bg-[#0a66c2] text-white py-4 rounded-2xl font-bold hover:bg-[#084d91] transition-all group"
                >
                    GO TO DASHBOARD
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
