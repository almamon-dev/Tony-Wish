import { Head, Link } from "@inertiajs/react";
import { Check } from "lucide-react";

export default function PasswordUpdated() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Head title="Password Updated" />

            <div className="bg-white overflow-hidden flex w-full max-w-4xl mx-4 shadow-2xl rounded-3xl">
                {/* Left Side - Image */}
                <div className="hidden md:flex md:w-1/2 bg-gray-50 items-center justify-center p-12">
                     <img
                        src="/img/reg.png"
                        alt="Success Preview"
                        className="w-full h-auto object-contain drop-shadow-lg"
                    />
                </div>

                {/* Right Side - content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-10 py-16 bg-white text-center relative">
                    {/* Decorative Confetti (Simplified) */}
                    <div className="absolute top-10 right-10 w-2 h-2 bg-yellow-400 rounded-full opacity-50"></div>
                    <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full opacity-50"></div>
                    <div className="absolute bottom-20 right-20 w-3 h-3 bg-blue-400 rounded-full opacity-30"></div>

                    <div className="mb-8 flex flex-col items-center">
                        <div className="bg-[#22c55e] rounded-full p-0 flex items-center justify-center w-20 h-20 shadow-lg shadow-green-200 mb-6 animate-in zoom-in duration-300">
                            <Check
                                className="text-white w-10 h-10"
                                strokeWidth={4}
                            />
                        </div>
                        <h1 className="text-[22px] font-bold text-[#22c55e] mb-3 leading-tight">
                            Password Updated Successfully
                        </h1>
                        <p className="text-[14px] text-slate-500 max-w-[280px] mx-auto leading-relaxed">
                            Your Password has been successfully updated please
                            login first
                        </p>
                    </div>

                    <Link
                        href={route("login")}
                        className="w-full max-w-[280px] block text-center py-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-[15px] font-bold rounded-lg shadow-md shadow-blue-500/20 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        Login Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
