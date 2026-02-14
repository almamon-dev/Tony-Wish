import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { Mail } from "lucide-react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <Head title="Forgot Password" />
            {/* Card Container */}
            <div className="bg-white overflow-hidden flex w-full max-w-6xl mx-4">
                {/* Left Side - Image */}
                <div className="hidden lg:flex lg:w-1/2 p-8 pt-0 items-start justify-center">
                    <div className="w-full">
                        <img
                            src="/img/reg.png"
                            alt="Forgot Password Preview"
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
                            Forgot Your Password?
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
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        <PrimaryButton
                            className="w-full justify-center py-2.5 bg-[#2185d5] hover:bg-blue-600 text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20"
                            disabled={processing}
                        >
                            Send OTP
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
