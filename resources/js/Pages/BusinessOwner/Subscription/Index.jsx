import React, { useState } from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Check,
    X,
    ArrowLeft,
    ChevronDown,
    Zap,
    Shield,
    Globe,
} from "lucide-react";

const PlanCard = ({ plan, isCurrent, isAnnual }) => {
    return (
        <div
            className={`relative bg-white rounded-[24px] border ${isCurrent ? "border-blue-500 ring-1 ring-blue-500" : "border-slate-100"} p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-all`}
        >
            {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 rounded-full text-white text-[12px] font-bold">
                    Current Plan
                </div>
            )}

            <div className="mb-8">
                <div
                    className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${plan.bg}`}
                >
                    <plan.icon size={20} className={plan.color} />
                </div>
                <h3 className="text-[20px] font-bold text-slate-800 mb-1">
                    {plan.name}
                </h3>
                <p className="text-[13px] text-slate-400 font-medium">
                    {plan.description}
                </p>
            </div>

            <div className="mb-8">
                <div className="flex items-baseline gap-1">
                    <span className="text-[36px] font-bold text-slate-800">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-slate-400 font-medium">/month</span>
                </div>
                {isAnnual && (
                    <p className="text-[12px] text-emerald-500 font-bold mt-1">
                        Save ${plan.savings} (20% off)
                    </p>
                )}
            </div>

            <div className="space-y-4 mb-8 border-t border-b border-slate-50 py-6">
                <div className="flex justify-between text-[13px]">
                    <span className="text-slate-400">Base price</span>
                    <span className="text-slate-700 font-bold">
                        $
                        {isAnnual
                            ? (plan.annualPrice * 1).toFixed(2)
                            : plan.monthlyPrice.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-[13px]">
                    <span className="text-slate-400">VAT (20%)</span>
                    <span className="text-slate-700 font-bold">
                        $
                        {isAnnual
                            ? (plan.annualPrice * 0.2).toFixed(2)
                            : (plan.monthlyPrice * 0.2).toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-[15px] pt-2">
                    <span className="text-slate-800 font-bold">Total</span>
                    <span className="text-slate-800 font-bold">
                        $
                        {isAnnual
                            ? (plan.annualPrice * 1.2).toFixed(2)
                            : (plan.monthlyPrice * 1.2).toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <Check
                                size={12}
                                className="text-emerald-500"
                                strokeWidth={3}
                            />
                        </div>
                        <span className="text-[13px] text-slate-600 font-medium">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            <button
                disabled={isCurrent}
                className={`w-full py-3.5 rounded-xl text-[14px] font-bold transition-all ${
                    isCurrent
                        ? "bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
                {isCurrent ? "Current Plan" : plan.cta}
            </button>
        </div>
    );
};

export default function SubscriptionIndex() {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Starter",
            description: "Perfect for small teams getting started",
            monthlyPrice: 99,
            annualPrice: 79,
            savings: 238,
            icon: Zap,
            bg: "bg-rose-50",
            color: "text-rose-500",
            features: [
                "Up to 10 users",
                "25 active procedures",
                "5 GB storage",
                "Basic reporting",
                "Email support",
            ],
            cta: "Downgrade to Starter",
        },
        {
            name: "Professional",
            description: "Most popular for growing businesses",
            monthlyPrice: 199,
            annualPrice: 159,
            savings: 478,
            icon: Shield,
            bg: "bg-emerald-50",
            color: "text-emerald-500",
            features: [
                "Up to 50 users",
                "100 active procedures",
                "50 GB storage",
                "Advanced reporting",
                "Priority email support",
            ],
            cta: "Current Plan",
        },
        {
            name: "Enterprise",
            description: "For large organizations with custom needs",
            monthlyPrice: 499,
            annualPrice: 399,
            savings: 1198,
            icon: Globe,
            bg: "bg-blue-50",
            color: "text-blue-500",
            features: [
                "Unlimited users",
                "Unlimited procedures",
                "Unlimited storage",
                "Custom reporting & dashboards",
                "24/7 phone & email support",
            ],
            cta: "Upgrade to Enterprise",
        },
    ];

    const comparisons = [
        {
            feature: "User Accounts",
            starter: "10",
            professional: "50",
            enterprise: "Unlimited",
        },
        {
            feature: "Active Procedures",
            starter: "25",
            professional: "100",
            enterprise: "Unlimited",
        },
        {
            feature: "Storage Space",
            starter: "5 GB",
            professional: "50 GB",
            enterprise: "Unlimited",
        },
        {
            feature: "Support Level",
            starter: "Email (48h)",
            professional: "Priority (12h)",
            enterprise: "24/7 Phone",
        },
        {
            feature: "API Access",
            starter: false,
            professional: true,
            enterprise: true,
        },
        {
            feature: "SSO & Advanced Security",
            starter: false,
            professional: false,
            enterprise: true,
        },
        {
            feature: "Custom Integrations",
            starter: false,
            professional: false,
            enterprise: true,
        },
        {
            feature: "Dedicated Account Manager",
            starter: false,
            professional: false,
            enterprise: true,
        },
        {
            feature: "Advanced Analytics",
            starter: false,
            professional: true,
            enterprise: true,
        },
        {
            feature: "Custom Reporting",
            starter: false,
            professional: false,
            enterprise: true,
        },
    ];

    return (
        <BusinessOwnerLayout>
            <Head title="Subscription & Billing" />

            <div className="space-y-10 pb-20">
                {/* Header Section */}
                <div className="flex items-center gap-6">
                    <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-[26px] font-bold text-slate-800">
                            Choose Your Plan
                        </h1>
                        <p className="text-slate-500 font-medium">
                            Select the perfect plan for your organization's
                            needs
                        </p>
                    </div>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4">
                    <span
                        className={`text-[14px] font-bold ${!isAnnual ? "text-slate-800" : "text-slate-400"}`}
                    >
                        Monthly
                    </span>
                    <button
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="w-12 h-6 bg-slate-200 rounded-full relative transition-all"
                    >
                        <div
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAnnual ? "left-7 bg-emerald-500" : "left-1"}`}
                        ></div>
                    </button>
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-[14px] font-bold ${isAnnual ? "text-slate-800" : "text-slate-400"}`}
                        >
                            Annual
                        </span>
                        <div className="px-2 py-0.5 bg-emerald-50 text-emerald-500 rounded text-[11px] font-bold uppercase tracking-wider">
                            Save up to 20%
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <PlanCard
                            key={i}
                            plan={plan}
                            isCurrent={plan.name === "Professional"}
                            isAnnual={isAnnual}
                        />
                    ))}
                </div>

                {/* Comparison Table Section */}
                <div className="space-y-6 pt-10">
                    <div className="mb-6">
                        <h2 className="text-[18px] font-bold text-slate-800">
                            Recent Invoices
                        </h2>
                        <p className="text-[13px] text-slate-400 font-medium tracking-tight mt-1">
                            Your payment history and invoices
                        </p>
                    </div>

                    <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-10 py-5 text-[14px] font-bold text-slate-500">
                                        Feature
                                    </th>
                                    <th className="px-10 py-5 text-[14px] font-bold text-slate-500 text-center">
                                        Starter
                                    </th>
                                    <th className="px-10 py-5 text-[14px] font-bold text-slate-500 text-center">
                                        Professional
                                    </th>
                                    <th className="px-10 py-5 text-[14px] font-bold text-slate-500 text-center">
                                        Enterprise
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {comparisons.map((row, i) => (
                                    <tr
                                        key={i}
                                        className="hover:bg-slate-50/30 transition-colors"
                                    >
                                        <td className="px-10 py-5 font-medium text-slate-600 text-[14px] flex items-center gap-3">
                                            {row.starter === false ? (
                                                <Shield
                                                    className="text-slate-400"
                                                    size={16}
                                                />
                                            ) : (
                                                <Zap
                                                    className="text-slate-400"
                                                    size={16}
                                                />
                                            )}
                                            {row.feature}
                                        </td>
                                        <td className="px-10 py-5 text-center text-[13px] font-bold text-slate-500">
                                            {typeof row.starter ===
                                            "boolean" ? (
                                                row.starter ? (
                                                    <Check
                                                        className="mx-auto text-emerald-500"
                                                        size={18}
                                                    />
                                                ) : (
                                                    <X
                                                        className="mx-auto text-slate-300"
                                                        size={18}
                                                    />
                                                )
                                            ) : (
                                                row.starter
                                            )}
                                        </td>
                                        <td className="px-10 py-5 text-center text-[13px] font-bold text-slate-800">
                                            {typeof row.professional ===
                                            "boolean" ? (
                                                row.professional ? (
                                                    <Check
                                                        className="mx-auto text-emerald-500"
                                                        size={18}
                                                    />
                                                ) : (
                                                    <X
                                                        className="mx-auto text-slate-300"
                                                        size={18}
                                                    />
                                                )
                                            ) : (
                                                row.professional
                                            )}
                                        </td>
                                        <td className="px-10 py-5 text-center text-[13px] font-bold text-slate-500">
                                            {typeof row.enterprise ===
                                            "boolean" ? (
                                                row.enterprise ? (
                                                    <Check
                                                        className="mx-auto text-emerald-500"
                                                        size={18}
                                                    />
                                                ) : (
                                                    <X
                                                        className="mx-auto text-slate-300"
                                                        size={18}
                                                    />
                                                )
                                            ) : (
                                                row.enterprise
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Info Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                    <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
                        <h3 className="text-[17px] font-bold text-slate-800 mb-6">
                            What happens when I upgrade?
                        </h3>
                        <div className="space-y-4">
                            {[
                                "Changes take effect immediately",
                                "You'll be charged a prorated amount for the current billing cycle",
                                "All new features and limits are activated instantly",
                                "Your data and settings remain unchanged",
                            ].map((text, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <Check
                                        className="text-emerald-500"
                                        size={16}
                                    />
                                    <span className="text-[13px] text-slate-600 font-medium">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-sm">
                        <h3 className="text-[17px] font-bold text-slate-800 mb-6">
                            Payment & Billing
                        </h3>
                        <div className="space-y-4">
                            {[
                                "All prices exclude VAT (20% will be added at checkout)",
                                "Annual billing offers approximately 20% savings",
                                "Cancel or downgrade anytime with no penalties",
                                "Secure payment processing with encryption",
                            ].map((text, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3"
                                >
                                    <Check
                                        className="text-emerald-500"
                                        size={16}
                                    />
                                    <span className="text-[13px] text-slate-600 font-medium">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-8">
                    <div className="mb-8">
                        <h2 className="text-[18px] font-bold text-slate-800">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-[13px] text-slate-400 font-medium tracking-tight mt-1">
                            Common questions about upgrading your plan
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            "Can I change my plan at any time?",
                            "What happens to my data if I downgrade?",
                            "Is VAT included in the displayed prices?",
                            "What payment methods do you accept?",
                            "Can I get a custom Enterprise plan?",
                        ].map((q, i) => (
                            <button
                                key={i}
                                className="w-full flex items-center justify-between px-6 py-4 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-slate-100 group transition-all"
                            >
                                <span className="text-[14px] font-bold text-slate-700">
                                    {q}
                                </span>
                                <ChevronDown
                                    size={18}
                                    className="text-slate-400 group-hover:text-slate-600 transition-colors"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer FAQ Box */}
                <div className="bg-emerald-50 p-8 rounded-[24px] flex items-center justify-between border border-emerald-100">
                    <div>
                        <h3 className="text-[17px] font-bold text-slate-800 mb-1">
                            Frequently Asked Questions
                        </h3>
                        <p className="text-[13px] text-slate-500 font-medium">
                            Common questions about upgrading your plan
                        </p>
                    </div>
                    <button className="bg-[#2c8af8] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all shadow-lg shadow-blue-500/20">
                        Contact Sales
                    </button>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
}
