import React, { useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head } from "@inertiajs/react";
import { Settings, Bell, Zap, Save } from "lucide-react";

export default function SettingsIndex() {
    const [notifications, setNotifications] = useState({
        taskAssignment: true,
        uploadNotifications: true,
        approvalRequests: true,
    });

    const [workflow, setWorkflow] = useState({
        defaultDuration: "21",
        autoApproveThreshold: "90",
    });

    return (
        <AdministratorLayout>
            <Head title="Settings" />

            <div className="space-y-8 pb-10 max-w-5xl">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-[28px] font-bold text-slate-800 tracking-tight leading-none">
                        Settings
                    </h1>
                    <p className="text-[14px] text-slate-500 font-medium mt-1">
                        Admin Configurations for company operations
                    </p>
                </div>

                {/* Notifications Settings */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                <Bell size={20} />
                            </div>
                            <h3 className="text-[16px] font-bold text-slate-700">
                                Notifications Settings
                            </h3>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Task Assignment */}
                        <div className="flex items-center justify-between group">
                            <div className="space-y-1">
                                <h4 className="text-[14px] font-bold text-slate-700">
                                    Task Assignment Notifications
                                </h4>
                                <p className="text-[13px] text-slate-500">
                                    Get notified when tasks are assigned
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.taskAssignment}
                                    onChange={(e) =>
                                        setNotifications({
                                            ...notifications,
                                            taskAssignment: e.target.checked,
                                        })
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2185d5]"></div>
                            </label>
                        </div>

                        <div className="h-px bg-slate-50" />

                        {/* Upload Notifications */}
                        <div className="flex items-center justify-between group">
                            <div className="space-y-1">
                                <h4 className="text-[14px] font-bold text-slate-700">
                                    Upload Notifications
                                </h4>
                                <p className="text-[13px] text-slate-500">
                                    Alert when users upload documents
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.uploadNotifications}
                                    onChange={(e) =>
                                        setNotifications({
                                            ...notifications,
                                            uploadNotifications:
                                                e.target.checked,
                                        })
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2185d5]"></div>
                            </label>
                        </div>

                        <div className="h-px bg-slate-50" />

                        {/* Approval Requests */}
                        <div className="flex items-center justify-between group">
                            <div className="space-y-1">
                                <h4 className="text-[14px] font-bold text-slate-700">
                                    Approval Requests
                                </h4>
                                <p className="text-[13px] text-slate-500">
                                    Notify when approvals are needed
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications.approvalRequests}
                                    onChange={(e) =>
                                        setNotifications({
                                            ...notifications,
                                            approvalRequests: e.target.checked,
                                        })
                                    }
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2185d5]"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Workflow Settings */}
                <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="bg-slate-50/50 p-6 border-b border-slate-50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                                <Zap size={20} />
                            </div>
                            <h3 className="text-[16px] font-bold text-slate-700">
                                Workflow Settings
                            </h3>
                        </div>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="space-y-4">
                            <label className="text-[14px] font-bold text-slate-600 block">
                                Default Task Duration (days)
                            </label>
                            <input
                                type="number"
                                value={workflow.defaultDuration}
                                onChange={(e) =>
                                    setWorkflow({
                                        ...workflow,
                                        defaultDuration: e.target.value,
                                    })
                                }
                                className="w-full bg-slate-50 border-none rounded-xl p-4 text-[15px] font-medium text-slate-700 focus:ring-2 focus:ring-blue-100 transition-all"
                                placeholder="Enter days..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[14px] font-bold text-slate-600 block">
                                Auto-approve Threshold (%)
                            </label>
                            <input
                                type="number"
                                value={workflow.autoApproveThreshold}
                                onChange={(e) =>
                                    setWorkflow({
                                        ...workflow,
                                        autoApproveThreshold: e.target.value,
                                    })
                                }
                                className="w-full bg-slate-50 border-none rounded-xl p-4 text-[15px] font-medium text-slate-700 focus:ring-2 focus:ring-blue-100 transition-all"
                                placeholder="Enter percentage..."
                            />
                        </div>

                        <button className="flex items-center gap-2 bg-[#2185d5] text-white px-8 py-4 rounded-xl font-bold text-[14px] shadow-sm hover:bg-blue-600 transition-all active:scale-[0.98]">
                            <Save size={18} />
                            Save Workflow Settings
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
