import React from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    Trash2,
    Plus,
    AlertTriangle,
    Upload,
} from "lucide-react";

export default function REC03() {
    const alerts = {
        expired: 0,
        expiringSoon: 1,
        valid: 44,
    };

    const employees = [
        {
            id: 1,
            name: "Peter Merton",
            position: "Managing Director",
            competence: "High",
            training: {
                forkTruck: "N/A",
                grindingWheels: "N/A",
                manualHandling: "13-Feb-27",
                iosh: "31-Dec-99",
                firstAid: "N/A",
                workingAtHeights: "N/A",
                confinedSpaces: "N/A",
                platforms: "DD-MM-YY",
            },
        },
        {
            id: 2,
            name: "Neil Watson",
            position: "Plate Welder",
            competence: "High",
            training: {
                forkTruck: "1-Sep-25",
                grindingWheels: "1-Sep-25",
                manualHandling: "13-Feb-27",
                iosh: "N/A",
                firstAid: "31-Mar-26",
                workingAtHeights: "1-Sep-25",
                confinedSpaces: "DD-MM-YY",
                platforms: "N/A",
            },
        },
        {
            id: 3,
            name: "John Brown",
            position: "Welder",
            competence: "Average",
            training: {
                forkTruck: "13-Feb-27",
                grindingWheels: "13-Feb-27",
                manualHandling: "13-Feb-27",
                iosh: "N/A",
                firstAid: "31-Mar-26",
                workingAtHeights: "1-Sep-25",
                confinedSpaces: "31-Mar-26",
                platforms: "DD-MM-YY",
            },
        },
        {
            id: 4,
            name: "Lee Johnson",
            position: "Welder",
            competence: "High",
            training: {
                forkTruck: "13-Feb-27",
                grindingWheels: "13-Feb-27",
                manualHandling: "13-Feb-27",
                iosh: "N/A",
                firstAid: "1-Apr-26",
                workingAtHeights: "1-Sep-25",
                confinedSpaces: "31-Mar-26",
                platforms: "N/A",
            },
        },
        {
            id: 5,
            name: "Jack Wilson",
            position: "Labour",
            competence: "Basic",
            training: {
                forkTruck: "N/A",
                grindingWheels: "N/A",
                manualHandling: "02-Dec-09",
                iosh: "N/A",
                firstAid: "N/A",
                workingAtHeights: "N/A",
                confinedSpaces: "N/A",
                platforms: "N/A",
            },
        },
    ];

    const getTrainingClass = (date) => {
        if (date === "N/A" || date === "DD-MM-YY") {
            return "text-slate-400 font-medium";
        }
        // Simple logic for demonstration - in real app would parse dates
        if (date.includes("99") || date.includes("09")) {
            return "bg-red-100 text-red-600 font-bold rounded px-2 py-1 inline-block";
        }
        if (date.includes("25")) {
            return "bg-red-100 text-red-600 font-bold rounded px-2 py-1 inline-block"; // Assuming 2025 is soon/expired relative to current context or strict mock match
        }
        return "bg-emerald-50 text-emerald-600 font-bold rounded px-2 py-1 inline-block";
    };

    const getCompetenceClass = (level) => {
        switch (level) {
            case "High":
                return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "Average":
                return "bg-amber-50 text-amber-600 border-amber-100";
            case "Basic":
                return "bg-blue-50 text-blue-600 border-blue-100";
            default:
                return "bg-slate-50 text-slate-600 border-slate-100";
        }
    };

    return (
        <AdministratorLayout>
            <Head title="REC-03 - Training & Competence Register" />

            <div className="space-y-4">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link
                            href={route("administrator.rec-forms.index")}
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#2185d5] transition-colors mb-2 text-sm font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to REC Forms
                        </Link>
                        <h1 className="text-2xl font-bold text-slate-800">
                            REC-03 Training & Competence Register
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-xl hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-blue-500/20">
                            <Save size={18} />
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Alerts Section */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex flex-col md:flex-row items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <h3 className="text-slate-800 font-bold text-sm mb-1">
                            Training Expiry Alerts
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {alerts.expired} Expired
                            </span>
                            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {alerts.expiringSoon} Expiry soon
                            </span>
                            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {alerts.valid} Valid
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4">
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider sticky left-0 bg-slate-50 z-10">
                                        Name
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider sticky left-[100px] bg-slate-50 z-10">
                                        Position
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Overall Competence
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Fork Truck
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Grinding Wheels
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Manual Handling
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        IOSH Training
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        First Aid
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Working at Heights
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Confined Spaces
                                    </th>
                                    <th className="px-2 py-2 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Platforms
                                    </th>
                                    <th className="px-2 py-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {employees.map((emp) => (
                                    <tr
                                        key={emp.id}
                                        className="hover:bg-slate-50/50 transition-colors"
                                    >
                                        <td className="px-2 py-1 sticky left-0 bg-white group-hover:bg-slate-50">
                                            <span className="text-[12px] font-medium text-slate-700">
                                                {emp.name}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 sticky left-[100px] bg-white group-hover:bg-slate-50">
                                            <span className="text-[12px] font-medium text-slate-500">
                                                {emp.position}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1">
                                            <div
                                                className={`text-[11px] font-bold px-2 py-1 rounded-lg border flex items-center justify-between w-24 ${getCompetenceClass(emp.competence)}`}
                                            >
                                                {emp.competence}
                                                <svg
                                                    width="8"
                                                    height="5"
                                                    viewBox="0 0 10 6"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="opacity-50"
                                                >
                                                    <path
                                                        d="M1 1L5 5L9 1"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="px-2 py-1 text-[11px]">
                                            <span
                                                className={getTrainingClass(
                                                    emp.training.forkTruck,
                                                )}
                                            >
                                                {emp.training.forkTruck}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 text-[11px]">
                                            <span
                                                className={getTrainingClass(
                                                    emp.training.grindingWheels,
                                                )}
                                            >
                                                {emp.training.grindingWheels}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 text-[11px]">
                                            <span
                                                className={getTrainingClass(
                                                    emp.training.manualHandling,
                                                )}
                                            >
                                                {emp.training.manualHandling}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 text-[11px]">
                                            <span
                                                className={getTrainingClass(
                                                    emp.training.iosh,
                                                )}
                                            >
                                                {emp.training.iosh}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 text-[11px]">
                                            <span
                                                className={getTrainingClass(
                                                    emp.training.firstAid,
                                                )}
                                            >
                                                {emp.training.firstAid}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 text-[11px]">
                                            <span
                                                className={getTrainingClass(
                                                    emp.training
                                                        .workingAtHeights,
                                                )}
                                            >
                                                {emp.training.workingAtHeights}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 text-[11px]">
                                            <span
                                                className={getTrainingClass(
                                                    emp.training.confinedSpaces,
                                                )}
                                            >
                                                {emp.training.confinedSpaces}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1 text-[11px]">
                                            <span
                                                className={getTrainingClass(
                                                    emp.training.platforms,
                                                )}
                                            >
                                                {emp.training.platforms}
                                            </span>
                                        </td>
                                        <td className="px-2 py-1">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="text-red-400 hover:text-red-500 transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                                <button className="text-slate-400 hover:text-blue-500 transition-colors">
                                                    <Upload size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add New Button */}
                    <div className="mt-4 border-t border-slate-100 pt-4">
                        <button className="w-full py-3 text-slate-500 font-bold border border-dashed border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center justify-center gap-2 text-[14px]">
                            <Plus size={16} />
                            Add New Training
                        </button>
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
