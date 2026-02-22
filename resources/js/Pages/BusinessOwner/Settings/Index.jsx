import React, { useState } from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Eye, EyeOff, Upload, CheckCircle2 } from "lucide-react";

export default function Settings() {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const profileForm = useForm({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        company_name: user?.company?.company_name || "",
        registration_number: user?.company?.registration_number || "",
        industry: user?.company?.industry || "",
        vat_number: user?.company?.vat_number || "",
        email: user?.email || "",
        phone: user?.phone || "",
        country: user?.country || "",
        photo: null,
    });

    const [previewUrl, setPreviewUrl] = useState(
        user?.avatar ? `/${user.avatar}` : null
    );

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const togglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post(route("business-owner.settings.profile.update"), {
            forceFormData: true,
            onSuccess: () => {
                // optional success callback
            },
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData("photo", file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.patch(route("business-owner.settings.password.update"), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    return (
        <BusinessOwnerLayout>
            <Head title="Settings" />

            <div className="space-y-8 pb-10">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-[26px] font-bold text-slate-800">
                            Settings
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Business profile, notification and preferences
                        </p>
                    </div>
                    {flash.success && (
                        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-100 animate-in fade-in slide-in-from-top-4 duration-300">
                            <CheckCircle2 size={16} />
                            {flash.success}
                        </div>
                    )}
                </div>

                {/* Main Settings Card */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-8">
                    {/* Business Profile Section */}
                    <form onSubmit={submitProfile} className="space-y-8">
                        <div>
                            <h2 className="font-bold text-slate-800 text-[18px]">
                                Business Profile
                            </h2>
                        </div>

                        {/* Avatar Upload */}
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <img
                                    src={
                                        previewUrl ||
                                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            profileForm.data.company_name ||
                                                "Company"
                                        )}&background=10b981&color=fff&size=128`
                                    }
                                    alt="Business Logo"
                                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-50"
                                />
                                <div
                                    onClick={() =>
                                        document
                                            .getElementById("avatar-upload")
                                            .click()
                                    }
                                    className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                >
                                    <Upload className="text-white" size={20} />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <input
                                        id="avatar-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById("avatar-upload")
                                                .click()
                                        }
                                        className="px-4 py-2 border border-blue-200 text-blue-600 rounded-lg text-[13px] font-bold hover:bg-blue-50 transition-all"
                                    >
                                        Upload photo
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-slate-400 rounded-lg text-[13px] font-bold hover:text-rose-500 transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <p className="text-[12px] text-slate-400 font-medium">
                                    JPG, PNG or GIF. Max size 2MB
                                </p>
                                {profileForm.errors.photo && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.photo}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Profile Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.first_name}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "first_name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {profileForm.errors.first_name && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.first_name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.last_name}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "last_name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {profileForm.errors.last_name && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.last_name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.company_name}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "company_name",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {profileForm.errors.company_name && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.company_name}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.registration_number}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "registration_number",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {profileForm.errors.registration_number && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.registration_number}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Industry
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.industry}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "industry",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {profileForm.errors.industry && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.industry}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    VAT Number
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.vat_number}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "vat_number",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {profileForm.errors.vat_number && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.vat_number}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Business Email
                                </label>
                                <input
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "email",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none placeholder:text-slate-400"
                                />
                                {profileForm.errors.email && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.phone}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "phone",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {profileForm.errors.phone && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.phone}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[14px] font-bold text-slate-600">
                                    Company Location
                                </label>
                                <input
                                    type="text"
                                    value={profileForm.data.country}
                                    onChange={(e) =>
                                        profileForm.setData(
                                            "country",
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                {profileForm.errors.country && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {profileForm.errors.country}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <button
                                type="submit"
                                disabled={profileForm.processing}
                                className="bg-[#2c8af8] hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl text-[14px] font-bold transition-all shadow-lg shadow-blue-500/20"
                            >
                                {profileForm.processing
                                    ? "Saving..."
                                    : "Save Profile"}
                            </button>
                        </div>
                    </form>

                    {/* Password Changes Section */}
                    <form
                        onSubmit={submitPassword}
                        className="pt-8 space-y-6 border-t border-slate-100 mt-8"
                    >
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
                                    value={passwordForm.data.current_password}
                                    onChange={(e) =>
                                        passwordForm.setData(
                                            "current_password",
                                            e.target.value
                                        )
                                    }
                                    placeholder="***************************"
                                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePassword("current")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword.current ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            {passwordForm.errors.current_password && (
                                <p className="text-rose-500 text-xs font-bold px-1">
                                    {passwordForm.errors.current_password}
                                </p>
                            )}
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
                                        value={passwordForm.data.password}
                                        onChange={(e) =>
                                            passwordForm.setData(
                                                "password",
                                                e.target.value
                                            )
                                        }
                                        placeholder="***************************"
                                        className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePassword("new")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword.new ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                                {passwordForm.errors.password && (
                                    <p className="text-rose-500 text-xs font-bold px-1">
                                        {passwordForm.errors.password}
                                    </p>
                                )}
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
                                        value={
                                            passwordForm.data
                                                .password_confirmation
                                        }
                                        onChange={(e) =>
                                            passwordForm.setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        placeholder="***************************"
                                        className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 font-medium focus:ring-1 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <button
                                        type="button"
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

                        <div className="flex justify-start">
                            <button
                                type="submit"
                                disabled={passwordForm.processing}
                                className="bg-[#2c8af8] hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl text-[14px] font-bold transition-all shadow-lg shadow-blue-500/20"
                            >
                                {passwordForm.processing
                                    ? "Saving..."
                                    : "Update Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
}
