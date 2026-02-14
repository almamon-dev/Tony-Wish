import { Head, Link } from "@inertiajs/react";
import { Check } from "lucide-react";

export default function PasswordUpdated() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Head title="Password Updated" />

            <div className="bg-white overflow-hidden flex w-full max-w-6xl mx-4">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 p-8 pt-0 items-start justify-center">
                    <div className="w-full">
                        <img
                            src="/img/reg.png"
                            alt="Success Preview"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Right Side - content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 py-8 sm:px-12 bg-white text-center">
                    <div className="mb-6 flex flex-col items-center">
                        <div className="bg-green-500 rounded-full p-4 mb-4 flex items-center justify-center w-16 h-16 shadow-lg shadow-green-500/30">
                            <Check
                                className="text-white w-8 h-8"
                                strokeWidth={3}
                            />
                        </div>
                        <h1 className="text-xl font-bold text-green-500 mb-2">
                            Password Updated Successfully
                        </h1>
                        <p className="text-sm text-slate-500 max-w-xs mx-auto">
                            Your Password has been successfully updated please
                            login first
                        </p>
                    </div>

                    <Link
                        href={route("login")}
                        className="w-full block text-center py-2.5 bg-[#2185d5] hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-colors"
                    >
                        Login Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
