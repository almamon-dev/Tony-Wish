import React, { useEffect, useState } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    AlertTriangle,
    Download,
    Save,
    CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC15({ initialPolicies = [], defaultCompanyName = "" }) {
    const [activeTab, setActiveTab] = useState("iso_9001");
    const [companyName, setCompanyName] = useState(defaultCompanyName);

    const { data, setData, post, processing } = useForm({
        policies: [],
    });

    const defaultPoliciesList = [
        {
            policy_type: "iso_9001",
            title: "ISO 9001 Quality",
            subtitle: "Quality Policy Statement",
            content: `[Your Company Name] is committed to providing products and services that consistently meet or exceed our customers' requirements and expectations, as well as applicable statutory and regulatory requirements. We strive for excellence in all aspects of our operations and are dedicated to the continuous improvement of our Quality Management System (QMS). Our Quality Policy is built upon the following principles:

1. Customer Focus: We are committed to understanding and fulfilling the needs and expectations of our customers and interested parties, aiming to enhance customer satisfaction.
2. Leadership: Our leadership demonstrates commitment to the QMS by promoting a strong quality culture, ensuring the availability of necessary resources, and actively engaging in the improvement of our processes.
3. Engagement of People: We foster an environment where all employees are competent, aware of their contributions to the QMS, and actively engaged in achieving quality objectives.
4. Process Approach: We manage our activities and resources as processes, understanding how they are interrelated and function as a coherent system to achieve consistent and predictable results.
5. Improvement: We are dedicated to the continual improvement of our QMS through monitoring, analysis, evaluation, and the implementation of corrective actions and opportunities for enhancement.
6. Evidence-based Decision Making: Decisions are based on the analysis and evaluation of data and information to ensure effectiveness and continuous improvement.
7. Relationship Management: We manage our relationships with external providers and other interested parties to ensure a robust supply chain and value delivery.

This Quality Policy provides a framework for setting and reviewing our quality objectives. It is communicated, understood, and applied throughout the organization and is reviewed periodically for its continuing suitability.`,
            approved_by: "",
            signature: "",
            position: "",
            date: "",
            color: "blue",
        },
        {
            policy_type: "iso_14001",
            title: "ISO 14001 Environmental",
            subtitle: "Environmental Policy Statement",
            content: `[Your Company Name] is committed to protecting the environment and preventing pollution in all our activities, products, and services. We recognize our responsibility to minimize our environmental footprint and are dedicated to the continual improvement of our Environmental Management System (EMS) to enhance environmental performance.

Our Environmental Policy is built upon the following principles:

1. Context and Interested Parties: We will understand the internal and external issues relevant to our purpose and context, including the needs and expectations of interested parties, to define the scope of our EMS and address our environmental responsibilities.
2. Leadership and Commitment: Our leadership demonstrates commitment to the EMS by promoting a strong environmental culture, ensuring the availability of necessary resources, and actively engaging in the improvement of our environmental performance.
3. Legal and Other Requirements: We are committed to fulfilling our compliance obligations, including applicable legal requirements and other requirements to which we subscribe, related to our environmental aspects.
4. Planning for Environmental Aspects, Risks, and Opportunities: We will identify and evaluate our environmental aspects and their associated impacts, as well as environmental risks and opportunities, to ensure these are addressed in our planning and decision-making. We will set environmental objectives to achieve positive environmental outcomes.
5. Support and Operation: We will ensure adequate resources, competence, awareness, and communication to support our EMS. We will implement operational controls to manage significant environmental aspects and establish emergency preparedness and response procedures.
6. Performance Evaluation: We will monitor, measure, analyze, and evaluate our environmental performance and compliance. This includes conducting internal audits and management reviews to ensure the effectiveness and suitability of our EMS.
7. Improvement: We are dedicated to the continual improvement of our environmental performance and EMS through addressing nonconformities, taking corrective actions, and exploring opportunities for enhancement.

This Environmental Policy provides a framework for setting and reviewing our environmental objectives. It is communicated, understood, and applied throughout the organization and is reviewed periodically for its continuing suitability.`,
            approved_by: "",
            signature: "",
            position: "",
            date: "",
            color: "emerald",
        },
        {
            policy_type: "iso_45001",
            title: "ISO 45001 OH&S",
            subtitle: "Occupational Health & Safety Policy Statement",
            content: `[Your Company Name] is committed to providing a safe and healthy workplace for all employees, contractors, and visitors. We recognize our responsibility to prevent work-related injury and ill health and are dedicated to the continual improvement of our Occupational Health and Safety (OH&S) Management System.

Our OH&S Policy is built upon the following principles:

1. Hazard Elimination and Risk Reduction: We are committed to eliminating hazards and reducing OH&S risks by implementing effective control measures and promoting a proactive safety culture.
2. Legal and Other Requirements: We are committed to fulfilling our legal requirements and other requirements to which we subscribe, related to our OH&S hazards and risks.
3. Consultation and Participation: We encourage the active consultation and participation of workers and their representatives in all aspects of our OH&S Management System.
4. Leadership and Commitment: Our leadership demonstrates commitment to OH&S by providing necessary resources, setting clear responsibilities, and promoting a culture of safety throughout the organization.
5. Continual Improvement: We are dedicated to the continual improvement of our OH&S performance through regular monitoring, evaluation of our processes, and learning from incidents.
6. Training and Competence: We ensure all employees are competent and receive appropriate training to perform their work safely.

This OH&S Policy provides a framework for setting and reviewing our OH&S objectives. It is communicated, understood, and applied throughout the organization and is reviewed periodically for its continuing suitability.`,
            approved_by: "",
            signature: "",
            position: "",
            date: "",
            color: "orange",
        },
    ];

    useEffect(() => {
        if (initialPolicies.length > 0) {
            const mergedPolicies = defaultPoliciesList.map((defaultPolicy) => {
                const existing = initialPolicies.find(
                    (p) => p.policy_type === defaultPolicy.policy_type
                );
                if (existing) {
                    if (!companyName && existing.company_name) {
                        setCompanyName(existing.company_name);
                    }
                    return {
                        ...defaultPolicy,
                        company_name: existing.company_name || "",
                        content: existing.content || defaultPolicy.content,
                        approved_by: existing.approved_by || "",
                        signature: existing.signature || "",
                        position: existing.position || "",
                        date: existing.date ? existing.date.split("T")[0] : "",
                    };
                }
                return { 
                    ...defaultPolicy, 
                    company_name: companyName,
                    content: defaultPolicy.content.replace(/\[Your Company Name\]/g, companyName)
                };
            });
            setData("policies", mergedPolicies);
        } else {
            setData("policies", defaultPoliciesList.map(p => ({
                ...p,
                company_name: defaultCompanyName,
                content: p.content.replace(/\[Your Company Name\]/g, defaultCompanyName)
            })));
        }
    }, [initialPolicies, defaultCompanyName]);

    const updatePolicy = (type, field, value) => {
        const newPolicies = data.policies.map((p) => {
            if (p.policy_type === type) {
                return { ...p, [field]: value };
            }
            return p;
        });
        setData("policies", newPolicies);
    };

    const handleCompanyNameChange = (value) => {
        setCompanyName(value);
        const newPolicies = data.policies.map((p) => ({
            ...p,
            company_name: value,
            content: p.content.replace(/\[Your Company Name\]/g, value),
        }));
        setData("policies", newPolicies);
    };

    const handleSave = () => {
        post(route("administrator.rec-forms.rec-15.store"), {
            onSuccess: () => {
                toast.success("Company Policies saved successfully!");
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data.");
            },
        });
    };

    const currentPolicy = data.policies.find((p) => p.policy_type === activeTab) || defaultPoliciesList[0];

    const alerts = {
        expired: 0,
        expiringSoon: 0,
        valid: 3,
    };

    const getThemeColor = (color) => {
        switch (color) {
            case "blue":
                return {
                    bg: "bg-blue-50",
                    border: "border-blue-200",
                    text: "text-blue-600",
                    accent: "bg-blue-600",
                    hover: "hover:bg-blue-50",
                    lightBorder: "border-blue-100",
                };
            case "emerald":
                return {
                    bg: "bg-emerald-50",
                    border: "border-emerald-200",
                    text: "text-emerald-600",
                    accent: "bg-emerald-600",
                    hover: "hover:bg-emerald-50",
                    lightBorder: "border-emerald-100",
                };
            case "orange":
                return {
                    bg: "bg-orange-50",
                    border: "border-orange-200",
                    text: "text-orange-600",
                    accent: "bg-orange-600",
                    hover: "hover:bg-orange-50",
                    lightBorder: "border-orange-100",
                };
            default:
                return {
                    bg: "bg-slate-50",
                    border: "border-slate-200",
                    text: "text-slate-600",
                    accent: "bg-slate-600",
                    hover: "hover:bg-slate-50",
                    lightBorder: "border-slate-100",
                };
        }
    };

    const theme = getThemeColor(currentPolicy.color);

    return (
        <AdministratorLayout>
            <Head title="REC-15 - Company Policies" />

            <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
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
                            REC-15 - Company Policies
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Quality, Environmental & OH&S Policy Statements - ISO 9001, ISO 14001, ISO 45001
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSave}
                            disabled={processing}
                            className="flex items-center gap-2 px-4 py-2 bg-[#2185d5] text-white rounded-sm hover:bg-blue-600 transition-all text-sm font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {processing ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save size={18} />
                            )}
                            Save Changes
                        </button>
                    </div>
                </div>

                {/* Alerts Section */}
                <div className="bg-amber-50 border border-amber-100 rounded-sm p-4 flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-600">
                        <AlertTriangle size={20} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-slate-800 font-bold text-sm mb-1">
                            Company Policies Due Alerts
                        </h3>
                        <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full border border-red-600">
                                {alerts.expired} Expired
                            </span>
                            <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full border border-amber-600">
                                {alerts.expiringSoon} Expiring Soon
                            </span>
                            <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full border border-emerald-600">
                                {alerts.valid} Valid
                            </span>
                        </div>
                    </div>
                </div>

                {/* Company Name Section */}
                <div className="bg-blue-50/50 border border-blue-200 rounded-sm p-6 shadow-sm">
                    <label className="block text-sm font-bold text-slate-700 mb-4">
                        Company Name (appears in all policies)
                    </label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => handleCompanyNameChange(e.target.value)}
                        className="w-full bg-white px-4 py-3 rounded-sm text-sm font-medium text-slate-700 border border-slate-200 focus:border-blue-500 outline-none shadow-sm"
                        placeholder="[Your Company Name]"
                    />
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-sm gap-1">
                    {data.policies.map((p) => (
                        <button
                            key={p.policy_type}
                            onClick={() => setActiveTab(p.policy_type)}
                            className={`flex-1 py-2 text-xs font-bold rounded-sm transition-all ${
                                activeTab === p.policy_type
                                    ? "bg-white text-slate-800 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                            {p.title}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className={`bg-white rounded-sm border-t-4 ${theme.border} border border-slate-200 shadow-md overflow-hidden transition-all duration-300`}>
                    <div className="p-8 space-y-8">
                        {/* Policy Title */}
                        <div className="text-center space-y-2">
                            <h2 className={`text-xl font-bold uppercase tracking-tight ${theme.text}`}>
                                REC-15 Company Policies ({currentPolicy.title.split(' ')[0]} {currentPolicy.title.split(' ')[1]})
                            </h2>
                            <h3 className={`text-sm font-semibold italic ${theme.text} opacity-80`}>
                                {currentPolicy.subtitle}
                            </h3>
                        </div>

                        <div className="border-t border-slate-100 pt-8">
                            <textarea
                                value={currentPolicy.content}
                                onChange={(e) => updatePolicy(currentPolicy.policy_type, "content", e.target.value)}
                                className="w-full min-h-[400px] text-slate-700 text-sm leading-relaxed border-none focus:ring-0 outline-none resize-none p-0 scrollbar-hide"
                                placeholder="Enter policy text here..."
                            />
                        </div>
                        {/* Signatures Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        Approved
                                    </label>
                                    <input
                                        type="text"
                                        value={currentPolicy.approved_by}
                                        onChange={(e) => updatePolicy(currentPolicy.policy_type, "approved_by", e.target.value)}
                                        className={`w-full ${theme.bg} px-3 py-2.5 rounded-sm text-sm font-medium border-transparent focus:border-blue-500 outline-none transition-all placeholder-slate-400`}
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        value={currentPolicy.position}
                                        onChange={(e) => updatePolicy(currentPolicy.policy_type, "position", e.target.value)}
                                        className={`w-full ${theme.bg} px-3 py-2.5 rounded-sm text-sm font-medium border-transparent focus:border-blue-500 outline-none transition-all placeholder-slate-400`}
                                        placeholder="Job Title"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        Signature
                                    </label>
                                    <input
                                        type="text"
                                        value={currentPolicy.signature}
                                        onChange={(e) => updatePolicy(currentPolicy.policy_type, "signature", e.target.value)}
                                        className={`w-full ${theme.bg} px-3 py-2.5 rounded-sm text-sm font-medium border-transparent focus:border-blue-500 outline-none transition-all placeholder-slate-400 font-cursive`}
                                        placeholder="Digital Signature or initials"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={currentPolicy.date}
                                        onChange={(e) => updatePolicy(currentPolicy.policy_type, "date", e.target.value)}
                                        className={`w-full ${theme.bg} px-3 py-2.5 rounded-sm text-sm font-bold border-transparent focus:border-blue-500 outline-none transition-all ${theme.text}`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Buttons */}
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                onClick={handleSave}
                                disabled={processing}
                                className={`flex items-center gap-2 px-6 py-2 ${theme.accent} text-white rounded-sm hover:opacity-90 transition-all text-xs font-bold shadow-sm disabled:opacity-50`}
                            >
                                <Save size={14} />
                                Save {currentPolicy.title} Policy
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.policies.map((p) => (
                        <button
                            key={p.policy_type}
                            onClick={() => setActiveTab(p.policy_type)}
                            className={`p-4 border rounded-sm text-left transition-all ${
                                activeTab === p.policy_type
                                    ? `bg-white ${getThemeColor(p.color).lightBorder} border-t-2 ${getThemeColor(p.color).accent} shadow-sm`
                                    : "bg-white border-slate-200 hover:border-blue-300"
                            }`}
                        >
                            <h4 className={`text-xs font-bold mb-1 ${getThemeColor(p.color).text}`}>
                                {p.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                                {p.content.split('\n')[0]}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
                .font-cursive {
                    font-family: 'Dancing Script', cursive;
                    font-size: 1.2rem;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </AdministratorLayout>
    );
}
