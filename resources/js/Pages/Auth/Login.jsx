import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Head title="Log in" />
            {/* Card Container */}
            <div className="bg-white overflow-hidden flex w-full max-w-6xl mx-4">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 p-8 pt-0 items-start justify-center">
                    <div className="w-full">
                        <img
                            src="/img/reg.png"
                            alt="Login Preview"
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
                            Log In
                        </h1>
                        <p className="text-sm text-slate-500">
                            Welcome back, please enter your details
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email address"
                                className="!text-xs !font-bold !text-slate-700 mb-1"
                            />
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={16}
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full pl-10 text-sm h-10 border-slate-200 rounded-lg focus:border-[#2185d5] focus:ring-[#2185d5]"
                                    placeholder="johndoe@gmail.com"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password"
                                value="Password"
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
                                    placeholder="********"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    required
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-slate-300 text-[#2185d5] shadow-sm focus:ring-[#2185d5]"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="text-xs text-slate-500 font-medium">
                                    Remember me
                                </span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-xs text-[#2185d5] font-bold hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>

                        <PrimaryButton
                            className="w-full justify-center py-2.5 bg-[#2185d5] hover:bg-blue-600 text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20"
                            disabled={processing}
                        >
                            Log In
                        </PrimaryButton>

                        <div className="text-center text-xs text-slate-500 font-medium">
                            Don't have an account?{" "}
                            <Link
                                href={route("register")}
                                className="text-[#2185d5] font-bold hover:underline"
                            >
                                Sign Up
                            </Link>
                        </div>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-2 text-slate-400 font-medium">
                                    Or
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex justify-center items-center h-10 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors bg-white shadow-sm"
                            >
                                <svg className="h-4 w-4" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="flex justify-center items-center h-10 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors bg-white shadow-sm"
                            >
                                <svg
                                    className="h-4 w-4 text-black"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.1 1.88-2.6 5.8 1.29 7.18-.33.89-.78 1.83-1.48 2.89-.9 1.34-1.84 2.65-1.86 1.14zM12.98 3.5c-.3 1.96-1.91 3.58-3.8 3.52-.46-1.92 1.34-3.87 3.8-3.52z" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
