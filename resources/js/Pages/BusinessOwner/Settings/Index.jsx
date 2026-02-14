import React, { useState } from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head } from "@inertiajs/react";
import { Eye, EyeOff, Upload, Trash2 } from "lucide-react";

export default function Settings() {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const togglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <BusinessOwnerLayout>
            <Head title="Settings" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div>
                    <h1 className="text-[26px] font-bold text-slate-800">
                        Settings
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Business profile, notification and preferences
                    </p>
                </div>

                {/* Main Settings Card */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-8">
                    {/* Business Profile Section */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="font-bold text-slate-800 text-[18px]">
                                Business Profile
                            </h2>
                        </div>

                        {/* Avatar Upload */}
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <img
                                    src="https://ui-avatars.com/api/?name=Acme+Corp&background=10b981&color=fff&size=128"
                                    alt="Business Logo"
                                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50"
                                />
                                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <Upload className="text-white" size={20} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <button className="px-4 py-2 border border-blue-200 text-blue-600 rounded-lg text-[13px] font-bold hover:bg-blue-50 transition-all">
                                        Upload photo
                                    </button>
                                    <button className="px-4 py-2 text-slate-400 rounded-lg text-[13px] font-bold hover:text-rose-500 transition-all">
                                        Delete
                                    </button>
                                </div>
                                <p className="text-[12px] text-slate-400 font-medium">
                                    JPG, PNG or GIF. Max size 2MB
                                </p>
                            </div>
                        </div>

                        {/* Profile Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Acme Corporation"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Business Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Contact@acme.com"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    defaultValue="+ 1 234 567 8900"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    defaultValue="United kingdom"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Changes Section */}
                        <div className="pt-8 space-y-6 border-t border-slate-50">
                            <h2 className="font-bold text-slate-800 text-[18px]">
                                Password Changes
                            </h2>

                            <div className="max-w-[500px] space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Current Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword.current
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="***************************"
                                        className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <button
                                        onClick={() =>
                                            togglePassword("current")
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword.current ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-slate-600">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showPassword.new
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="***************************"
                                            className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <button
                                            onClick={() =>
                                                togglePassword("new")
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword.new ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-slate-600">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showPassword.confirm
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="***************************"
                                            className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <button
                                            onClick={() =>
                                                togglePassword("confirm")
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword.confirm ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Changes Button */}
                        <div className="pt-6">
                            <button className="bg-[#2c8af8] hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-[14px] font-bold transition-all shadow-lg shadow-blue-500/20">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
}
