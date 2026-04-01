import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2, DollarSign, Package, CalendarDays } from "lucide-react";

export default function Edit({ plan }) {
    const { data, setData, post, processing, errors } = useForm({
        name: plan.name || "",
        price: plan.price || "",
        currency: plan.currency || "GBP",
        duration: plan.duration || "month",
        features: plan.features || ["", "", ""],
    });

    const addFeature = () => {
        setData("features", [...data.features, ""]);
    };

    const removeFeature = (index) => {
        setData("features", data.features.filter((_, i) => i !== index));
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData("features", newFeatures);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.plans.update", { id: plan.id }));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Plan: ${plan.name}`} />

            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                <div className="flex items-center gap-4">
                    <Link
                        href={route("admin.plans.index")}
                        className="w-10 h-10 bg-white border border-slate-100 rounded-md flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                            Edit Subscription Plan
                        </h1>
                        <p className="text-slate-500 font-medium">Update pricing, features, or integration details</p>
                    </div>
                </div>

                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-md border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/30 rounded-bl-full opacity-50 -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Package className="text-blue-500" size={20} /> CORE DETAILS
                            </h2>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                        PLAN NAME
                                    </label>
                                    <input
                                        type="text"
                                        className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 text-[15px] font-medium transition-all ${errors.name ? 'ring-2 ring-rose-500/20' : ''}`}
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="e.g. Professional Plan"
                                    />
                                    {errors.name && <p className="mt-2 text-rose-500 text-xs font-bold px-1">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                            PRICE (£)
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                step="0.01"
                                                className={`w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 text-[15px] font-medium transition-all ${errors.price ? 'ring-2 ring-rose-500/20' : ''}`}
                                                value={data.price}
                                                onChange={(e) => setData("price", e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <DollarSign size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                        {errors.price && <p className="mt-2 text-rose-500 text-xs font-bold px-1">{errors.price}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                                            DURATION
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-blue-500/20 text-[15px] font-medium transition-all appearance-none"
                                                value={data.duration}
                                                onChange={(e) => setData("duration", e.target.value)}
                                            >
                                                <option value="month">Monthly</option>
                                                <option value="year">Yearly</option>
                                            </select>
                                            <CalendarDays size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="bg-white p-8 rounded-md border border-slate-100 shadow-sm flex flex-col h-full group relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-50/30 rounded-br-full opacity-50 -ml-8 -mt-8 transition-transform group-hover:scale-110 pointer-events-none"></div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Plus className="text-emerald-500" size={20} /> EDIT FEATURES
                            </h2>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="text-[13px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors uppercase tracking-widest flex items-center gap-1.5"
                            >
                                <Plus size={16} /> ADD MORE
                            </button>
                        </div>

                        <div className="space-y-4 flex-1">
                            {data.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-slate-50 border-0 focus:ring-2 focus:ring-emerald-500/20 text-[14px] font-medium transition-all"
                                            value={feature}
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                            placeholder="Feature description"
                                        />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-[10px]">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all flex items-center justify-center"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 mt-8 border-t border-slate-50">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-3 bg-[#0a66c2] text-white py-4 rounded-md font-bold hover:bg-[#084d91] transition-all shadow-xl shadow-blue-900/10 disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <Save size={20} className="transition-transform group-hover:scale-110" />
                                        UPDATE PLAN
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
