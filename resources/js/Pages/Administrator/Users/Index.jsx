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
} from "lucide-react";
import AddUserModal from "./Partials/AddUserModal";

export default function UsersIndex() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const stats = [
        {
            label: "Total Users",
            value: "24",
            icon: <Users size={20} />,
            color: "text-blue-500",
            bg: "bg-blue-50",
            iconBg: "bg-blue-100/50",
            sublabel: "Active members",
        },
        {
            label: "Active Today",
            value: "18",
            icon: <Activity size={20} />,
            color: "text-amber-500",
            bg: "bg-amber-50",
            iconBg: "bg-amber-100/50",
            sublabel: "Currently online",
        },
        {
            label: "Tasks Assigned",
            value: "56",
            icon: <CheckCircle2 size={20} />,
            color: "text-emerald-500",
            bg: "bg-emerald-50",
            iconBg: "bg-emerald-100/50",
            sublabel: "Pending tasks",
        },
        {
            label: "Avg. Completion",
            value: "78%",
            icon: <PieChart size={20} />,
            color: "text-purple-500",
            bg: "bg-purple-50",
            iconBg: "bg-purple-100/50",
            sublabel: "Team efficiency",
        },
    ];

    const users = [
        {
            id: 1,
            name: "Tom Wilson",
            email: "tom.w@company.com",
            tasks: 15,
            completed: 12,
            updated_at: "02 hours ago",
            status: "Active",
        },
        {
            id: 2,
            name: "Tom Wilson",
            email: "tom.w@company.com",
            tasks: 15,
            completed: 12,
            updated_at: "02 hours ago",
            status: "Active",
        },
        {
            id: 3,
            name: "Tom Wilson",
            email: "tom.w@company.com",
            tasks: 15,
            completed: 12,
            updated_at: "02 hours ago",
            status: "Active",
        },
        {
            id: 4,
            name: "Tom Wilson",
            email: "tom.w@company.com",
            tasks: 15,
            completed: 12,
            updated_at: "02 hours ago",
            status: "Active",
        },
    ];

    return (
        <AdministratorLayout>
            <Head title="Users Management" />

            <div className="space-y-8 pb-10">
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
                                        updated_at
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
                                {users.map((user) => (
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
                                            {user.tasks}
                                        </td>
                                        <td className="px-4 py-5 text-[14px] font-medium text-slate-500 text-center">
                                            {user.completed}
                                        </td>
                                        <td className="px-4 py-5 text-[14px] font-medium text-slate-500 text-center whitespace-nowrap">
                                            {user.updated_at}
                                        </td>
                                        <td className="px-4 py-5 text-center">
                                            <span className="px-4 py-1.5 rounded-full text-[12px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                {user.status}
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
                                ))}
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
