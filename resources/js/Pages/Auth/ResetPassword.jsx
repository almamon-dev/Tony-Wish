import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Head title="Reset Password" />

            <div className="bg-white overflow-hidden flex w-full max-w-6xl mx-4">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 p-8 pt-0 items-start justify-center">
                    <div className="w-full">
                        <img
                            src="/img/reg.png"
                            alt="Reset Password Preview"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-8 sm:px-12 bg-white">
                    <div className="mb-6">
                        <div className="mb-4">
                            <img
                                src="/img/logo.png"
                                alt="Logo"
                                className="h-[60px] w-auto object-contain"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-1">
                            Set your password?
                        </h1>
                        <p className="text-sm text-slate-500">
                            Please enter your new password and confirm it below
                            to reset your password.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Hidden Email Field (Required by Breeze) */}
                        <input type="hidden" name="email" value={data.email} />

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="New Password"
                                className="!text-xs !font-bold !text-slate-700 mb-1"
                            />
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={16}
                                />
                                <TextInput
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    className="block w-full pl-10 pr-10 text-sm h-10 border-slate-200 rounded-lg focus:border-[#2185d5] focus:ring-[#2185d5]"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="!text-xs !font-bold !text-slate-700 mb-1"
                            />
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={16}
                                />
                                <TextInput
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full pl-10 pr-10 text-sm h-10 border-slate-200 rounded-lg focus:border-[#2185d5] focus:ring-[#2185d5]"
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value,
                                        )
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1"
                            />
                        </div>

                        <PrimaryButton
                            className="w-full justify-center py-2.5 bg-[#2185d5] hover:bg-blue-600 text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20"
                            disabled={processing}
                        >
                            Confirm
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
