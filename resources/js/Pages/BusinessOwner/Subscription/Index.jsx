import React from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { 
    CheckCircle2, 
    Zap, 
    ShieldCheck, 
    CreditCard, 
    RefreshCcw, 
    XCircle, 
    Download, 
    Users, 
    ClipboardList,
    Clock
} from "lucide-react";

export default function Index({ plans = [], user = {}, usage = {}, invoices = [] }) {
    const { auth } = usePage().props;
    const { post, processing } = useForm();
    
    // Check if user has an active subscription based on shared auth or passed user
    const activePlan = plans.find(p => p.id === user.plan_id);
    const hasActiveSubscription = user.plan_id && user.subscription_status === 'active';

    const formattedInvoices = invoices.map(inv => ({
        id: inv.invoice_number,
        date: new Date(inv.paid_at || inv.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }),
        description: 'Monthly Subscription',
        amount: `$${Number(inv.amount).toFixed(2)}`,
        vat: `$${Number(inv.vat).toFixed(2)}`,
        total: `$${Number(inv.total).toFixed(2)}`,
        status: inv.status.charAt(0).toUpperCase() + inv.status.slice(1)
    }));

    // Local state to toggle plan selection view even if user has a plan
    const [showSelection, setShowSelection] = React.useState(!hasActiveSubscription);

    const userPercent = usage?.users ? (usage.users.used / usage.users.limit) * 100 : 0;
    const procedurePercent = usage?.procedures ? (usage.procedures.used / usage.procedures.limit) * 100 : 0;

    const [processingId, setProcessingId] = React.useState(null);

    const handleSubscription = (plan) => {
        setProcessingId(plan.id);
        post(route("business-owner.subscription.checkout", plan.id), {
            onFinish: () => setProcessingId(null)
        });
    };

    if (showSelection) {
        return (
            <BusinessOwnerLayout user={user}>
                <Head title="Choose Your Plan" />
                <div className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
                    <div className="flex justify-between items-center">
                        <div className="space-y-4">
                            <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                                Choose the Perfect Plan for Your Business
                            </h1>
                            <p className="text-sm text-slate-500 max-w-2xl font-medium">
                                Flexible pricing options to match your needs. Start free, scale as you grow.
                            </p>
                        </div>
                        {hasActiveSubscription && (
                            <button 
                                onClick={() => setShowSelection(false)}
                                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-all"
                            >
                                Back to Dashboard
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 pb-20">
                        {plans.length > 0 ? (
                            plans.map((plan) => (
                                <div key={plan.id} className={`relative bg-white rounded-xl shadow-sm border p-10 flex flex-col transition-all ${user.plan_id === plan.id ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-100'}`}>
                                    {user.plan_id === plan.id && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-[12px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/20">
                                            Current Plan
                                        </div>
                                    )}
                                    <div className="space-y-6 flex-1 mb-10">
                                        <div className="space-y-1">
                                            <h3 className="text-[15px] font-bold text-slate-400 uppercase tracking-widest">{plan.name}</h3>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[48px] font-black text-slate-900 leading-none">
                                                    ${Math.floor(plan.price)}
                                                </span>
                                                <span className="text-slate-400 font-bold text-lg">/{plan.duration}</span>
                                            </div>
                                        </div>
                                        <div className="pt-6 space-y-4">
                                            {plan.features?.map((f, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                                                        <CheckCircle2 size={13} strokeWidth={3} />
                                                    </div>
                                                    <span className="text-slate-600 font-medium text-[15px]">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleSubscription(plan)} 
                                        disabled={processing || user.plan_id === plan.id} 
                                        className={`w-full py-4 rounded-md font-bold flex items-center justify-center gap-2 transition-all ${user.plan_id === plan.id ? 'bg-emerald-500 text-white cursor-default' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                                    >
                                        {processingId === plan.id ? (
                                            <>Processing...</>
                                        ) : user.plan_id === plan.id ? (
                                            <>Active Plan <CheckCircle2 size={18} /></>
                                        ) : (
                                            <>Select Plan <Zap size={18} /></>
                                        )}
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-slate-100 shadow-sm border-dashed">
                                <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Zap size={30} />
                                </div>
                                <h3 className="text-md font-black text-slate-900 mb-2">No Plans Available</h3>
                                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                                    Our subscription plans are currently being updated. Please check back shortly or contact support.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </BusinessOwnerLayout>
        );
    }

    return (
        <BusinessOwnerLayout user={user}>
            <Head title="Subscription & Billing" />

            <div className="max-w-8xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 pb-20">
                <div className="space-y-1">
                    <h1 className="text-md font-black text-[#0f172a] tracking-tight">Subscription & Billing</h1>
                    <p className="text-slate-500 font-medium text-[14px]">Manage your subscription, payments, and billing information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-8">
                            <div className="space-y-1">
                                <h2 className="text-[10px] font-bold text-slate-900">Current Plan: <span className="text-blue-500">{activePlan?.name}</span></h2>
                                <p className="text-slate-400 text-sm font-medium">Manage your subscription plan and usage</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-6 space-y-1">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Pricing Plan</span>
                                    <div className="text-[18px] font-black text-slate-900">${Number(activePlan?.price || 0).toFixed(2)}</div>
                                </div>
                            </div>

                            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="text-[14px] font-bold text-slate-700">Monthly Total Payable</div>
                                    <div className="text-[12px] text-slate-500 font-medium">Next billing date: {auth.user.subscription?.expiry_date || 'N/A'}</div>
                                </div>
                                <div className="text-[32px] font-black text-slate-900">${Number(activePlan?.price || 0).toFixed(2)}</div>
                            </div>

                            <div className="space-y-6 pt-2">
                                <h3 className="font-bold text-slate-800 text-[16px]">Usage Summary</h3>
                                <div className="space-y-6">
                                    <div className="space-y-2 text-sm font-bold text-slate-500">
                                        <div className="flex justify-between items-center text-[13px]">
                                            <span className="text-slate-800">Active Users</span>
                                            <span className="text-slate-400 font-bold">{usage?.users?.used} / {usage?.users?.limit}</span>
                                        </div>
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/20" style={{ width: `${Math.min(userPercent, 100)}%` }}></div>
                                        </div>
                                        <p className="text-[11px] text-slate-400">{(usage?.users?.limit || 0) - (usage?.users?.used || 0)} users remaining</p>
                                    </div>

                                    <div className="space-y-2 text-sm font-bold text-slate-500">
                                        <div className="flex justify-between items-center text-[13px]">
                                            <span className="text-slate-800">Active Procedures</span>
                                            <span className="text-slate-400 font-bold">{usage?.procedures?.used} / {usage?.procedures?.limit}</span>
                                        </div>
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/20" style={{ width: `${Math.min(procedurePercent, 100)}%` }}></div>
                                        </div>
                                        <p className="text-[11px] text-slate-400">{(usage?.procedures?.limit || 0) - (usage?.procedures?.used || 0)} procedures remaining</p>
                                    </div>
                                </div>
                            </div>

                           
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-8 sticky top-24">
                            <h3 className="font-bold text-slate-900 text-[16px]">Subscription Status</h3>
                            
                            <div className={`${auth.user.subscription?.is_active ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'} rounded-xl p-4 space-y-2 border`}>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 ${auth.user.subscription?.is_active ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full animate-pulse`}></div>
                                    <span className={`text-[12px] font-bold ${auth.user.subscription?.is_active ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {auth.user.subscription?.is_active ? 'Active' : (auth.user.subscription?.has_plan ? 'Expired' : 'Inactive')}
                                    </span>
                                </div>
                                <p className={`text-[11px] ${auth.user.subscription?.is_active ? 'text-emerald-600/70' : 'text-rose-600/70'} font-medium`}>
                                    {auth.user.subscription?.is_active 
                                        ? 'Your subscription is active and in good standing' 
                                        : (auth.user.subscription?.has_plan ? 'Your subscription has expired. Please renew.' : 'You have no active subscription.')}
                                </p>
                            </div>

                            <div className="space-y-5">
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-slate-400">Status:</span>
                                    <span className={`px-3 py-1 ${auth.user.subscription?.is_active ? 'bg-emerald-500' : 'bg-rose-500'} text-white text-[11px] font-black rounded-md uppercase tracking-tight`}>
                                        {auth.user.subscription?.is_active ? 'Active' : (auth.user.subscription?.has_plan ? 'Expired' : 'Inactive')}
                                    </span>
                                </div>
                               
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-slate-400">Billing Cycle:</span>
                                    <span className="text-slate-800 font-bold">{activePlan ? (activePlan.duration === 'month' ? 'Monthly' : 'Yearly') : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-slate-400">Next Billing:</span>
                                    <span className="text-slate-800 font-bold">{auth.user.subscription?.expiry_date || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-slate-400">Started On:</span>
                                    <span className="text-slate-800 font-bold">{auth.user.subscription?.started_at || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-slate-50">
                                <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Quick Actions</h4>
                                <div className="space-y-2">
                                    <button 
                                        onClick={() => setShowSelection(true)}
                                        className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-all"
                                    >
                                        <RefreshCcw size={14} /> Change Plan
                                    </button>
                                    <button 
                                        onClick={() => handleSubscription(activePlan)}
                                        className="w-full py-2.5 bg-white border border-blue-200 text-blue-500 rounded-lg text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all shadow-sm shadow-blue-500/10"
                                    >
                                        <RefreshCcw size={14} /> Renew Now
                                    </button>
                                    <button className="w-full py-2.5 bg-white border border-rose-100 text-rose-500 rounded-lg text-[12px] font-bold flex items-center justify-center gap-2 hover:bg-rose-50 transition-all">
                                        <XCircle size={14} /> Cancel Subscription
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50">
                        <h3 className="font-bold text-slate-900 text-[18px]">Payment History</h3>
                        <p className="text-slate-500 text-[13px] font-medium mt-1">All your invoices and payment records</p>
                    </div>
                    <div className="overflow-x-auto p-4 pt-0">
                        <table className="w-full text-left border-separate border-spacing-y-2 text-[14px]">
                            <thead>
                                <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                    <th className="px-6 py-4">Invoice Number</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">VAT</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-center">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formattedInvoices.length > 0 ? (
                                    formattedInvoices.map((inv, i) => (
                                        <tr key={i} className="group transition-colors bg-white hover:bg-slate-50/50">
                                            <td className="px-6 py-5 rounded-l-2xl font-bold text-slate-800">{inv.id}</td>
                                            <td className="px-6 py-5 text-slate-500 font-medium">{inv.date}</td>
                                            <td className="px-6 py-5 text-slate-500 font-medium">{inv.description}</td>
                                            <td className="px-6 py-5 font-bold text-slate-800">{inv.amount}</td>
                                            <td className="px-6 py-5 text-slate-800 font-bold">{inv.vat}</td>
                                            <td className="px-6 py-5 font-black text-slate-800">{inv.total}</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="px-3 py-1 bg-blue-50 text-blue-500 text-[10px] font-black rounded-lg border border-blue-100 uppercase tracking-tighter">{inv.status}</span>
                                            </td>
                                            <td className="px-6 py-5 rounded-r-2xl text-center">
                                                <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-100 text-slate-400 hover:text-blue-500 transition-all bg-white shadow-sm mx-auto">
                                                    <Download size={15} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                                            No payment records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
}
