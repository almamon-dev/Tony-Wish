import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import {
    Home,
    ChevronLeft,
    Check,
    Shield,
    User as UserIcon,
    Lock,
} from "lucide-react";

export default function Edit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        user_type: user.user_type || "userdashboard",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.users.update", user.id));
    };

    const userTypes = [
        { value: "admin", label: "Admin" },
        { value: "administrator", label: "Administrator" },
        { value: "business_owner", label: "Business Owner" },
        { value: "userdashboard", label: "Standard User" },
    ];

    return (
        <AdminLayout>
            <Head title="Edit User" />

            <div className="space-y-6 max-w-[1240px] mx-auto pb-20">
                {/* Header & Breadcrumb */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-[24px] font-bold text-[#2f3344] tracking-tight">
                            Users
                        </h1>
                        <div className="flex items-center gap-2 text-[13px] text-[#727586] mt-1">
                            <Home size={16} />
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Account</span>
                            <span className="text-[#c3c4ca]">-</span>
                            <span>Edit User</span>
                        </div>
                    </div>
                    <Link
                        href={route("admin.users.index")}
                        className="flex items-center gap-2 text-[#673ab7] hover:underline font-bold text-[14px]"
                    >
                        <ChevronLeft size={18} />
                        Back to list
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white rounded-[10px] border border-[#e3e4e8] shadow-sm overflow-hidden">
                        <div className="px-7 py-5 border-b border-[#e3e4e8]">
                            <h2 className="text-[18px] font-bold text-[#2f3344]">
                                User Settings
                            </h2>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                {/* First Name */}
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        First Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={(e) =>
                                            setData(
                                                "first_name",
                                                e.target.value,
                                            )
                                        }
                                        className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.first_name ? "border-red-500" : "border-[#e3e4e8]"} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                    />
                                    {errors.first_name && (
                                        <p className="text-red-500 text-xs mt-1 font-medium">
                                            {errors.first_name}
                                        </p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        Last Name{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={(e) =>
                                            setData("last_name", e.target.value)
                                        }
                                        className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.last_name ? "border-red-500" : "border-[#e3e4e8]"} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                    />
                                    {errors.last_name && (
                                        <p className="text-red-500 text-xs mt-1 font-medium">
                                            {errors.last_name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        Email Address{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.email ? "border-red-500" : "border-[#e3e4e8]"} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1 font-medium">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* User Type */}
                                <div className="space-y-2">
                                    <label className="text-[14px] font-bold text-[#2f3344]">
                                        User Type{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.user_type}
                                        onChange={(e) =>
                                            setData("user_type", e.target.value)
                                        }
                                        className={`w-full h-[45px] px-4 bg-[#f1f3f5] border ${errors.user_type ? "border-red-500" : "border-[#e3e4e8]"} rounded-[6px] text-[14px] text-[#2f3344] focus:outline-none focus:border-[#673ab7] transition-all`}
                                    >
                                        {userTypes.map((type) => (
                                            <option
                                                key={type.value}
                                                value={type.value}
                                            >
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_type && (
                                        <p className="text-red-500 text-xs mt-1 font-medium">
                                            {errors.user_type}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button - Bottom Right Blue */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#2c8af8] text-white px-[50px] py-[13px] rounded-[6px] font-bold text-[15px] hover:bg-[#1a7ae8] transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? "Saving..." : "Update User Account"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
