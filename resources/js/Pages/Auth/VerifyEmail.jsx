import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useRef } from "react";

export default function VerifyEmail({ status, targetRoute, resendRoute }) {
    const { data, setData, post, processing, errors } = useForm({
        otp: ["", "", "", "", "", ""],
    });
    const inputRefs = useRef([]);

    const submit = (e) => {
        e.preventDefault();
        post(route(targetRoute));
    };

    const handleResend = (e) => {
        e.preventDefault();
        router.post(route(resendRoute));
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newOtp = [...data.otp];
        newOtp[index] = element.value;
        setData("otp", newOtp);

        // Focus next input
        if (element.value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !data.otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Head title="Email Verification" />

            <div className="bg-white overflow-hidden flex w-full max-w-6xl mx-4">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 p-8 pt-0 items-start justify-center">
                    <div className="w-full">
                        <img
                            src="/img/reg.png"
                            alt="Verification Preview"
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
                            Please check your email!
                        </h1>
                        <p className="text-sm text-slate-500">
                            We've emailed a 6-digit confirmation code to your
                            email, please enter the code in below box to verify
                            your email.
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    {errors.otp && (
                        <div className="mb-4 text-sm font-medium text-red-600">
                            {errors.otp}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="flex justify-between gap-2 mb-6">
                            {data.otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    ref={(el) =>
                                        (inputRefs.current[index] = el)
                                    }
                                    value={digit}
                                    onChange={(e) =>
                                        handleChange(e.target, index)
                                    }
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center text-xl font-bold border border-slate-300 rounded-lg focus:border-[#2185d5] focus:ring-[#2185d5]"
                                />
                            ))}
                        </div>

                        <PrimaryButton
                            className="w-full justify-center py-2.5 bg-[#2185d5] hover:bg-blue-600 text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20"
                            disabled={processing}
                        >
                            Verify Now
                        </PrimaryButton>

                        <div className="mt-4 text-center">
                            <button
                                onClick={handleResend}
                                type="button"
                                className="text-sm text-[#2185d5] font-bold hover:underline bg-transparent border-none cursor-pointer"
                                disabled={processing}
                            >
                                Resend
                            </button>
                            <span className="text-xs text-slate-500 ml-1">
                                (59sec)
                            </span>
                        </div>

                        <div className="mt-4 text-center">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm text-slate-600 underline hover:text-slate-900"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
