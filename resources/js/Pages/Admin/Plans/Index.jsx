import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Plus, CreditCard, Edit, Trash2, CheckCircle2 } from "lucide-react";

export default function Index({ plans }) {
    const { flash = {} } = usePage().props;

    return (
        <AdminLayout>
            <Head title="Subscription Plans" />

            <div className="space-y-8 pb-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[26px] font-bold text-slate-800">
                            Subscription Plans
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Create and manage plans for your users
                        </p>
                    </div>
                    <Link
                        href={route("admin.plans.create")}
                        className="flex items-center gap-2 bg-[#0a66c2] text-white px-6 py-3 rounded-md font-bold hover:bg-[#084d91] transition-all shadow-lg shadow-blue-900/10"
                    >
                        <Plus size={20} />
                        New Plan
                    </Link>
                </div>

                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle2 size={20} />
                        <span className="font-bold">{flash.success}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="p-8 pb-6 border-b border-slate-50">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-blue-50 text-[#0a66c2] rounded-2xl flex items-center justify-center">
                                        <CreditCard size={24} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={route("admin.plans.edit", { id: plan.id })}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-[22px] font-bold text-slate-800 mb-1">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-[32px] font-bold text-slate-900 flex items-center">
                                        {plan.currency === "GBP" ? "£" : "$"}
                                        {plan.price}
                                    </span>
                                    <span className="text-slate-400 font-medium lowercase">
                                        /{plan.duration}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex-1 flex flex-col">
                                <p className="text-slate-500 font-bold text-[13px] uppercase tracking-wider mb-4">
                                    Key Features
                                </p>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features ? plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="mt-1 w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            <span className="text-slate-600 text-[14px]">
                                                {feature}
                                            </span>
                                        </li>
                                    )) : (
                                        <li className="text-slate-400 text-sm italic">
                                            No features added
                                        </li>
                                    )}
                                </ul>

                                <div className="pt-6 border-t border-slate-50">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 text-[13px] font-bold">
                                            PLATFORM STATUS
                                        </span>
                                        <span className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wide">
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {plans.length === 0 && (
                        <div className="col-span-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-20 text-center">
                            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CreditCard size={40} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800 mb-2">
                                No Plans Created Yet
                            </h2>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium">
                                Start offering services by creating your first subscription plan.
                            </p>
                            <Link
                                href={route("admin.plans.create")}
                                className="inline-flex items-center gap-2 bg-[#0a66c2] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#084d91] transition-all shadow-lg shadow-blue-900/10"
                            >
                                <Plus size={20} />
                                Create First Plan
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
