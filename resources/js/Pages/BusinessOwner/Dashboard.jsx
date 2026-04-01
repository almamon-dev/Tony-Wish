import React from "react";
import BusinessOwnerLayout from "@/Layouts/BusinessOwnerLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Users,
    ClipboardList,
    Calendar,
    Zap,
    MoreHorizontal,
    ArrowUpRight,
    Search,
    ChevronRight,
    FileText,
} from "lucide-react";

export default function Dashboard({ auth, company, stats: propStats = {}, activities = [], subscription = {}, invoices = [] }) {
    // Provide default values for propStats to prevent crashes if undefined
    const stats = {
        total_users: propStats?.total_users || 0,
        active_procedures: propStats?.active_procedures || 0,
        billing_cycle: propStats?.billing_cycle || "Monthly",
        company_status: propStats?.company_status || "Active",
    };

    const safeSubscription = {
        plan_name: subscription?.plan_name || "No Plan",
        price: Number(subscription?.price) || 0,
        currency: subscription?.currency || "£",
        status: subscription?.status || "inactive",
        expiry_date: subscription?.expiry_date || "N/A",
        quota_used: subscription?.quota_used || 0,
        procedures_used: subscription?.procedures_used || 0,
    };

    const statsData = [
        {
            label: "Total Users",
            value: stats.total_users.toString(),
            sub: "Registered members",
            update: stats.total_users > 1 ? `${stats.total_users - 1} members added` : "No new members",
            color: "text-blue-500",
            bg: "bg-blue-50",
            icon: <Users size={20} />,
        },
        {
            label: "Active Procedures",
            value: stats.active_procedures.toString(),
            sub: "Company procedures",
            update: stats.active_procedures > 0 ? "System updated" : null,
            color: "text-amber-500",
            bg: "bg-amber-50",
            icon: <ClipboardList size={20} />,
        },
        {
            label: "Billing Cycle",
            value: stats.billing_cycle,
            sub: "Next: " + safeSubscription.expiry_date,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            icon: <Calendar size={20} />,
        },
        {
            label: "Company Status",
            value: stats.company_status,
            sub: "Subscription active",
            color: "text-purple-500",
            bg: "bg-purple-50",
            icon: <Zap size={20} />,
        },
    ];

    const quickActions = [
        { label: "Add Administrator", sub: "User Management", route: "business-owner.company.index", color: "bg-blue-500" },
        { label: "Create Procedure", sub: "Documentation", route: "business-owner.procedures.index", color: "bg-emerald-500" },
        { label: "Generate Report", sub: "Analytics", route: "business-owner.reports.index", color: "bg-purple-500" },
        { label: "View Company Info", sub: "Company Settings", route: "business-owner.company.index", color: "bg-amber-500" }
    ];

    return (
        <BusinessOwnerLayout>
            <Head title="Account Holder Dashboard" />

            <div className="space-y-8 pb-10">
                {/* Visual Banner */}
                <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-md p-8 md:p-12 text-white shadow-2xl shadow-slate-900/10">
                    <div className="relative z-10 space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-[12px] font-bold tracking-widest uppercase">
                            <Zap size={14} className="text-amber-400" fill="currentColor" /> Welcome Back
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1]">
                            {company?.company_name || auth.user.first_name + "'s Business"} Dashboard
                        </h1>
                        <p className="text-white/60 text-lg font-medium leading-relaxed max-w-xl">
                           Everything you need to manage your company compliance, procedures, and team is right here at your fingertips.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href={route('business-owner.procedures.index')} className="px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-slate-50 transition-all">
                                Manage Procedures
                            </Link>
                            <Link href={route('business-owner.company.index')} className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-xl font-black text-sm transition-all border border-white/10">
                                Company Settings
                            </Link>
                        </div>
                    </div>
                    {/* Abstract Shapes */}
                    <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
                        <div className="absolute right-[-10%] top-[-10%] w-80 h-80 bg-blue-500/20 rounded-full blur-[100px]"></div>
                        <div className="absolute right-1/4 bottom-0 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px]"></div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsData.map((stat, i) => (
                        <div
                            key={i}
                            className="group bg-white p-6 rounded-md border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                                    {stat.icon}
                                </div>
                                {stat.update && (
                                    <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${stat.bg} ${stat.color}`}>
                                        Latest
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</h3>
                                <p className={`text-[32px] font-black ${stat.color} leading-none tracking-tight`}>
                                    {stat.value}
                                </p>
                                <p className="text-[13px] font-medium text-slate-400 mt-1">
                                    {stat.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions & Subscription Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Subscription Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-md border border-slate-100 shadow-sm p-8 space-y-8 h-auto">
                            <div>
                                <h3 className="text-[18px] font-black text-slate-900 leading-tight">My Subscription</h3>
                                <p className="text-[14px] text-slate-400 font-medium">{safeSubscription.plan_name} Dashboard</p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[12px] font-black text-slate-400 uppercase">Monthly Price</span>
                                        <span className="text-xl font-black text-slate-900">{safeSubscription.currency} {safeSubscription.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Plan Name</span>
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[12px] font-black uppercase">{safeSubscription.plan_name}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[12px] font-black text-slate-400 uppercase tracking-widest">Expiry Date</span>
                                        <span className="text-[13px] font-bold text-slate-700">{safeSubscription.expiry_date}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase">
                                            <span>User Quota</span>
                                            <span className={safeSubscription.quota_used > 8 ? 'text-rose-500' : 'text-slate-900'}>
                                                {safeSubscription.quota_used} / 10
                                            </span>
                                        </div>
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                                            <div
                                                className="h-full bg-blue-500 rounded-full shadow-sm"
                                                style={{ width: `${Math.min((safeSubscription.quota_used / 10) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[11px] font-black text-slate-400 uppercase">
                                            <span>Procedures Used</span>
                                            <span className={safeSubscription.procedures_used > 40 ? 'text-rose-500' : 'text-slate-900'}>
                                                {safeSubscription.procedures_used} / 50
                                            </span>
                                        </div>
                                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full shadow-sm"
                                                style={{ width: `${Math.min((safeSubscription.procedures_used / 50) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <Link 
                                    href={route('business-owner.subscription.index')}
                                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#2c8af8] hover:bg-blue-600 text-white rounded-md font-black text-sm shadow-xl shadow-blue-500/20 transition-all group"
                                >
                                    <Zap size={16} fill="white" className="group-hover:scale-125 transition-transform" /> Upgrade Your Plan
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions & Recent Activity */}
                    <div className="lg:col-span-8 flex flex-col gap-8">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-md border border-slate-100 shadow-sm p-8 space-y-6">
                            <h3 className="text-[18px] font-black text-slate-900">Quick Actions</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {quickActions.map((action, i) => (
                                    <Link 
                                        key={i} 
                                        href={route(action.route)}
                                        className="group p-5 rounded-2xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50/10 transition-all flex items-center gap-4"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${action.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <ArrowUpRight size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-black text-slate-800">{action.label}</p>
                                            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">{action.sub}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-md border border-slate-100 shadow-sm p-8 space-y-6 flex-1">
                            <div className="flex items-center justify-between">
                                <h3 className="text-[18px] font-black text-slate-900">Recent Activity</h3>
                                <div className="text-[11px] font-black text-blue-500 uppercase tracking-widest cursor-pointer hover:underline">View All</div>
                            </div>
                            <div className="space-y-6">
                                {activities.map((activity, i) => (
                                    <div key={i} className="flex items-center gap-5 group">
                                        <div className="relative">
                                            <img
                                                src={activity.img}
                                                alt=""
                                                className="w-12 h-12 rounded-full object-cover ring-4 ring-slate-50 group-hover:ring-blue-100 transition-all"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-slate-50 shadow-sm">
                                                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[14px] font-black text-slate-800">{activity.name}</h4>
                                            <p className="text-[13px] text-slate-500 font-medium">
                                                {activity.action} <span className="mx-2 text-slate-300">.</span> <span className="text-[12px] text-slate-400">{activity.time}</span>
                                            </p>
                                        </div>
                                        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-slate-50 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                            <ChevronRight size={18} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Invoices */}
                <div className="bg-white rounded-md border border-slate-100 shadow-sm overflow-hidden p-2">
                    <div className="p-8 pb-4">
                        <h3 className="text-[20px] font-black text-slate-900">Payment History</h3>
                        <p className="text-slate-400 font-medium text-[14px]">Latest company subscriptions and billing records</p>
                    </div>
                    <div className="p-4">
                        <div className="overflow-x-auto rounded-3xl border border-slate-50">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Invoice ID</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {invoices.map((inv, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-5 font-black text-slate-800 text-[14px]">{inv.id}</td>
                                            <td className="px-6 py-5 font-medium text-slate-500 text-[14px]">{inv.date}</td>
                                            <td className="px-6 py-5 font-black text-slate-900 text-[14px]">{inv.amount}</td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[11px] font-black rounded-lg border border-emerald-100 uppercase">
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <button className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-100 text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-all bg-white shadow-sm mx-auto">
                                                    <FileText size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
}
