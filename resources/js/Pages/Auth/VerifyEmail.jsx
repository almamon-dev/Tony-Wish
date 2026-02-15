import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm, router } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";

export default function VerifyEmail({ 
    status, 
    targetRoute = "verification.verify", 
    resendRoute = "verification.send", 
    pageTitle = "Email Verification", 
    heading = "Please check your email!",
    subheading = "We've emailed a 6-digit confirmation code to your email, please enter the code in below box to verify your email."
}) {
    const { data, setData, post, processing, errors } = useForm({
        otp: ["", "", "", "", "", ""],
    });
    const inputRefs = useRef([]);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const submit = (e) => {
        e.preventDefault();
        // Ensure we handle cases where route names might not be generated yet or passed incorrectly
        try {
            post(route(targetRoute));
        } catch (error) {
            console.error("Route error:", error);
        }
    };

    const handleResend = (e) => {
        e.preventDefault();
        if (timeLeft > 0) return;
        
        try {
            router.post(route(resendRoute), {}, {
                onSuccess: () => setTimeLeft(60),
            });
        } catch (error) {
            console.error("Route error:", error);
        }
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

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        const digits = pastedData.replace(/\D/g, "").slice(0, 6).split("");

        if (digits.length > 0) {
            const newOtp = [...data.otp];
            digits.forEach((digit, index) => {
                if (index < 6) newOtp[index] = digit;
            });
            setData("otp", newOtp);
            
            // Focus the input after the last pasted digit
            const focusIndex = Math.min(digits.length, 5);
            inputRefs.current[focusIndex].focus();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Head title={pageTitle} />

            <div className="bg-white overflow-hidden flex w-full max-w-6xl mx-4">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 p-8 pt-0 items-center justify-center">
                    <div className="w-full">
                        <img
                            src="/img/reg.png"
                            alt="Verification Preview"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-12 bg-white">
                    <div className="flex flex-col items-center text-center mb-8 w-full max-w-[450px]">
                        <img
                            src="/img/logo.png"
                            alt="Just Simple Quality"
                            className="h-16 w-auto mb-6"
                        />
                        <h1 className="text-[26px] font-bold text-[#1e293b] mb-3">
                            {heading}
                        </h1>
                        <p className="text-[15px] text-[#64748b] leading-relaxed">
                            {subheading}
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 text-sm font-medium text-emerald-600 bg-emerald-50 p-3 rounded-lg text-center w-full max-w-[450px]">
                            {status}
                        </div>
                    )}

                    {errors.otp && (
                        <div className="mb-6 text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg text-center w-full max-w-[450px]">
                            {errors.otp}
                        </div>
                    )}

                    <form onSubmit={submit} className="flex flex-col items-center w-full max-w-[450px]">
                        <div className="flex gap-3 mb-8">
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
                                    onPaste={handlePaste}
                                    className="w-[52px] h-[58px] text-center text-xl font-semibold border-[1.5px] border-slate-300 rounded-[10px] focus:border-[#2c8af8] focus:ring-0 focus:outline-none transition-all text-[#1e293b] placeholder-slate-200"
                                    placeholder=""
                                />
                            ))}
                        </div>

                        <PrimaryButton
                            className="w-[200px] h-[48px] justify-center bg-[#2c8af8] hover:bg-[#1a7ae8] text-[15px] font-semibold rounded-[8px] shadow-lg shadow-blue-500/20 mb-6 transition-all"
                            disabled={processing}
                        >
                            Verify Now
                        </PrimaryButton>

                        <div className="flex items-center gap-1 text-[14px]">
                            <button
                                onClick={handleResend}
                                type="button"
                                className={`font-semibold transition-colors ${timeLeft > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-[#2c8af8] hover:text-[#1a7ae8]'}`}
                                disabled={processing || timeLeft > 0}
                            >
                                Resend
                            </button>
                            {timeLeft > 0 && (
                                <span className="text-[#64748b] font-medium">
                                    ({timeLeft}s)
                                </span>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
