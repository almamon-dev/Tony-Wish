import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import {
    Plus,
    Users,
    Activity,
    CheckCircle2,
    PieChart,
    Edit2,
    Eye,
    ChevronRight,
    X,
} from "lucide-react";
import { usePage } from "@inertiajs/react";
import AddUserModal from "./Partials/AddUserModal";

export default function UsersIndex({ users = [] }) {
    const { flash } = usePage().props;
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const stats = [
        {
            label: "Total Users",
            value: users.length.toString(),
            icon: <Users size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
            iconBg: "bg-blue-100/50",
            sublabel: "Active members",
        },
        {
            label: "Active Today",
            value: users.filter(u => u.email_verified_at).length.toString(),
            icon: <Activity size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
            iconBg: "bg-amber-100/50",
            sublabel: "Verified members",
        },
        {
            label: "Tasks Assigned",
            value: "0",
            icon: <CheckCircle2 size={20} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            iconBg: "bg-emerald-100/50",
            sublabel: "Pending tasks",
        },
        {
            label: "Avg. Completion",
            value: "0%",
            icon: <PieChart size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
            sublabel: "Team efficiency",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="Users Management" />

            <div className="space-y-8 pb-10 text-left">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 px-6 py-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <CheckCircle2 size={20} />
                        <p className="font-bold text-[14px]">{flash.success}</p>
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <X size={20} />
                        <p className="font-bold text-[14px]">{flash.error}</p>
                    </div>
                )}
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none">
                            Users Management
                        </h1>
                        <p className="text-[14px] text-slate-500 font-medium mt-1">
                            add, remove users and monitor activity
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-[#2185d5] text-white px-6 py-3 rounded-xl font-bold text-[14px] shadow-sm hover:bg-blue-600 transition-all active:scale-[0.98]"
                    >
                        <Plus size={20} />
                        Add User
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-sm flex flex-col justify-between relative overflow-hidden"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-[14px] font-medium text-slate-400">
                                    {stat.label}
                                </h3>
                                <div
                                    className={`w-10 h-10 rounded-xl ${stat.iconBg} ${stat.color} flex items-center justify-center`}
                                >
                                    {stat.icon}
                                </div>
                            </div>
                            <div>
                                <p className="text-[32px] font-bold text-slate-700 leading-none mb-2">
                                    {stat.value}
                                </p>
                                <p className="text-[12px] font-medium text-slate-400">
                                    {stat.sublabel}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8fafc] border-b border-slate-50">
                                    <th className="px-6 py-5 text-[14px] font-bold text-slate-700">
                                        Name
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700">
                                        Email
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700 text-center">
                                        Tasks
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700 text-center">
                                        Completed
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700 text-center">
                                        Added By
                                    </th>
                                    <th className="px-4 py-5 text-[14px] font-bold text-slate-700 text-center">
                                        Status
                                    </th>
                                    <th className="px-6 py-5 text-[14px] font-bold text-slate-700 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                    <Users size={28} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[16px] font-bold text-slate-700">No users found</h4>
                                                    <p className="text-[13px] text-slate-400 font-medium">Add your first team member to start managing permissions</p>
                                                </div>
                                                <button 
                                                    onClick={() => setIsModalOpen(true)}
                                                    className="mt-2 text-[#2185d5] font-bold text-[13px] hover:underline flex items-center gap-1"
                                                >
                                                    <Plus size={14} />
                                                    Add new user
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-5">
                                                <span className="text-[14px] font-medium text-slate-700">
                                                    {user.name}
                                                </span>
                                            </td>
                                            <td className="px-4 py-5 text-[14px] font-medium text-slate-500">
                                                {user.email}
                                            </td>
                                            <td className="px-4 py-5 text-[14px] font-medium text-slate-500 text-center">
                                                {user.tasks || 0}
                                            </td>
                                            <td className="px-4 py-5 text-[14px] font-medium text-slate-500 text-center">
                                                {user.completed || 0}
                                            </td>
                                            <td className="px-4 py-5 text-[14px] font-medium text-slate-500 text-center whitespace-nowrap">
                                                {user.creator ? user.creator.name : 'System'}
                                            </td>
                                            <td className="px-4 py-5 text-center">
                                                <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${user.email_verified_at ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                                    {user.email_verified_at ? 'Active' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-2 text-slate-400">
                                                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-all bg-white">
                                                        <Edit2 size={16} />
                                                        edit
                                                    </button>
                                                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-bold text-[13px] hover:bg-slate-50 transition-all bg-white">
                                                        <Eye size={16} />
                                                        view
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </AdministratorLayout>
    );
}
