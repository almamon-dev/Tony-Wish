import React, { useEffect } from "react";
import AdministratorLayout from "@/Layouts/AdministratorLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    Download,
    Save,
    Trash2,
    Calendar,
    Users,
    MoreHorizontal,
    Plus,
    Printer,
    FileText,
} from "lucide-react";
import toast from "react-hot-toast";

export default function REC08({ initialReview = null }) {
    const defaultJobs = [
        { process: "Laser", name: "", signature: "", date: "" },
        { process: "Punch", name: "", signature: "", date: "" },
        { process: "Guillotine", name: "", signature: "", date: "" },
        { process: "Fabrication", name: "", signature: "", date: "" },
        { process: "Welding", name: "", signature: "", date: "" },
        { process: "Weld Size Bandsaw", name: "", signature: "", date: "" },
        { process: "Inspection", name: "", signature: "", date: "" },
        { process: "Paint", name: "", signature: "", date: "" },
    ];

    const getInitialJobs = () => {
        if (initialReview && initialReview.jobs && initialReview.jobs.length > 0) {
            return defaultJobs.map(dj => {
                const existing = initialReview.jobs.find(j => j.process === dj.process);
                if (existing) {
                    return {
                        ...existing,
                        date: existing.date ? existing.date.split('T')[0] : ''
                    };
                }
                return dj;
            });
        }
        return defaultJobs;
    };

    const { data, setData, post, processing } = useForm({
        customer: initialReview?.customer || "",
        drawings_no: initialReview?.drawings_no || "",
        price: initialReview?.price || "",
        en1090: initialReview?.en1090 || "",
        material_grades: initialReview?.material_grades || "",
        bolts: initialReview?.bolts || "",
        sub_contract: initialReview?.sub_contract || "",
        galvanizing: initialReview?.galvanizing || "",
        paint: initialReview?.paint || "",
        job_no: initialReview?.job_no || "",
        order_date: initialReview?.order_date ? initialReview.order_date.split('T')[0] : "",
        est_completion: initialReview?.est_completion ? initialReview.est_completion.split('T')[0] : "",
        weld_types: initialReview?.weld_types || "",
        weld_inspection: initialReview?.weld_inspection || "",
        module_itp: initialReview?.module_itp || "",
        ncr_reqd: initialReview?.ncr_reqd || "",
        special_reqd: initialReview?.special_reqd || "",
        audit_monitoring_mpi: initialReview?.audit_monitoring_mpi || "",
        audit_monitoring_dpi: initialReview?.audit_monitoring_dpi || "",
        audit_monitoring_mag: initialReview?.audit_monitoring_mag || "",
        audit_monitoring_hardality: initialReview?.audit_monitoring_hardality || "",
        workshop_shipping_v1: initialReview?.workshop_shipping_v1 || "",
        workshop_shipping_v2: initialReview?.workshop_shipping_v2 || "",
        workshop_shipping_date: initialReview?.workshop_shipping_date ? initialReview.workshop_shipping_date.split('T')[0] : "",
        comments: initialReview?.comments || "",
        office_sign_off: initialReview?.office_sign_off || "",
        jobs: getInitialJobs(),
    });

    useEffect(() => {
        if (initialReview) {
            setData(prev => ({
                ...prev,
                customer: initialReview.customer || "",
                drawings_no: initialReview.drawings_no || "",
                price: initialReview.price || "",
                en1090: initialReview.en1090 || "",
                material_grades: initialReview.material_grades || "",
                bolts: initialReview.bolts || "",
                sub_contract: initialReview.sub_contract || "",
                galvanizing: initialReview.galvanizing || "",
                paint: initialReview.paint || "",
                job_no: initialReview.job_no || "",
                order_date: initialReview.order_date ? initialReview.order_date.split('T')[0] : "",
                est_completion: initialReview.est_completion ? initialReview.est_completion.split('T')[0] : "",
                weld_types: initialReview.weld_types || "",
                weld_inspection: initialReview.weld_inspection || "",
                module_itp: initialReview.module_itp || "",
                ncr_reqd: initialReview.ncr_reqd || "",
                special_reqd: initialReview.special_reqd || "",
                audit_monitoring_mpi: initialReview.audit_monitoring_mpi || "",
                audit_monitoring_dpi: initialReview.audit_monitoring_dpi || "",
                audit_monitoring_mag: initialReview.audit_monitoring_mag || "",
                audit_monitoring_hardality: initialReview.audit_monitoring_hardality || "",
                workshop_shipping_v1: initialReview.workshop_shipping_v1 || "",
                workshop_shipping_v2: initialReview.workshop_shipping_v2 || "",
                workshop_shipping_date: initialReview.workshop_shipping_date ? initialReview.workshop_shipping_date.split('T')[0] : "",
                comments: initialReview.comments || "",
                office_sign_off: initialReview.office_sign_off || "",
                jobs: getInitialJobs(),
            }));
        }
    }, [initialReview]);

    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleJobChange = (index, field, value) => {
        const newJobs = [...data.jobs];
        newJobs[index][field] = value;
        setData('jobs', newJobs);
    };

    const handleSave = () => {
        post(route('administrator.rec-forms.rec-08.store'), {
            onSuccess: () => {
                toast.success("Project Review saved successfully!");
            },
            onError: (errors) => {
                console.error("Save Errors:", errors);
                toast.error("Failed to save data. Please check the form.");
            }
        });
    };

    return (
        <AdministratorLayout>
            <Head title="REC-08 - Project Review & Job Card" />

            <div className="space-y-6 max-w-7xl mx-auto">
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
                            REC-08 - Project Review & Job Card
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-sm hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Printer size={18} />
                            Print
                        </button>
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

                {/* Project Review Section */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-slate-700 mb-6 text-center bg-slate-50 py-3 rounded-sm border border-slate-100">
                        Project Review & Job Card
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Customer
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="customer"
                                        value={data.customer}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Drawings No
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="drawings_no"
                                        value={data.drawings_no}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Price
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="price"
                                        value={data.price}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    EN1090
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="en1090"
                                        value={data.en1090}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Material Grades
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="material_grades"
                                        value={data.material_grades}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Bolts
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="bolts"
                                        value={data.bolts}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Sub-Contract
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="sub_contract"
                                        value={data.sub_contract}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Galvanizing
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="galvanizing"
                                        value={data.galvanizing}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Paint
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="paint"
                                        value={data.paint}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Job No
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="job_no"
                                        value={data.job_no}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Order Date
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="date"
                                        name="order_date"
                                        value={data.order_date}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Est Completion
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="date"
                                        name="est_completion"
                                        value={data.est_completion}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Weld Types
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="weld_types"
                                        value={data.weld_types}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Weld Inspection
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="weld_inspection"
                                        value={data.weld_inspection}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Module/ITP
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="module_itp"
                                        value={data.module_itp}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    NCR Req'd
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="ncr_reqd"
                                        value={data.ncr_reqd}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-12 items-center gap-4">
                                <label className="col-span-4 text-[13px] font-bold text-slate-600">
                                    Special Req'd
                                </label>
                                <div className="col-span-8">
                                    <input
                                        type="text"
                                        name="special_reqd"
                                        value={data.special_reqd}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Production Job Card Section */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-slate-700 mb-6 text-center bg-blue-50/50 py-3 rounded-sm border border-blue-100 text-[#2185d5]">
                        Production Job Card
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left py-2 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider w-[20%]">
                                        Process
                                    </th>
                                    <th className="text-left py-2 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider w-[40%]">
                                        Name
                                    </th>
                                    <th className="text-left py-2 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider w-[25%]">
                                        Signature
                                    </th>
                                    <th className="text-left py-2 px-4 text-[12px] font-bold text-slate-500 uppercase tracking-wider w-[15%]">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="space-y-3">
                                {data.jobs.map((job, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4">
                                            <span className="text-[13px] font-bold text-slate-700">
                                                {job.process}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                value={job.name || ''}
                                                onChange={(e) => handleJobChange(index, 'name', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="text"
                                                value={job.signature || ''}
                                                onChange={(e) => handleJobChange(index, 'signature', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="date"
                                                value={job.date || ''}
                                                onChange={(e) => handleJobChange(index, 'date', e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-slate-400"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Audit Monitoring */}
                    <div className="mt-8 flex flex-col md:flex-row items-center gap-4 p-4 bg-slate-50 rounded-sm border border-slate-100">
                        <span className="text-[13px] font-bold text-slate-700 w-32">
                            Audit Monitoring
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-slate-500">
                                MPI
                            </span>
                            <input
                                type="text"
                                name="audit_monitoring_mpi"
                                value={data.audit_monitoring_mpi}
                                onChange={handleInputChange}
                                className="bg-white border border-slate-200 rounded-sm px-3 py-1.5 text-[13px] w-24 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-slate-500">
                                DPI
                            </span>
                            <input
                                type="text"
                                name="audit_monitoring_dpi"
                                value={data.audit_monitoring_dpi}
                                onChange={handleInputChange}
                                className="bg-white border border-slate-200 rounded-sm px-3 py-1.5 text-[13px] w-24 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-slate-500">
                                Mag
                            </span>
                            <input
                                type="text"
                                name="audit_monitoring_mag"
                                value={data.audit_monitoring_mag}
                                onChange={handleInputChange}
                                className="bg-white border border-slate-200 rounded-sm px-3 py-1.5 text-[13px] w-24 outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[12px] font-bold text-slate-500">
                                Hardality
                            </span>
                            <input
                                type="text"
                                name="audit_monitoring_hardality"
                                value={data.audit_monitoring_hardality}
                                onChange={handleInputChange}
                                className="bg-white border border-slate-200 rounded-sm px-3 py-1.5 text-[13px] w-24 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Workshop Shipping/Load */}
                    <div className="mt-4 flex flex-col md:flex-row items-center gap-4 px-4">
                        <span className="text-[13px] font-bold text-slate-700 w-32">
                            Workshop Shipping/Load
                        </span>
                        <input
                            type="text"
                            name="workshop_shipping_v1"
                            value={data.workshop_shipping_v1}
                            onChange={handleInputChange}
                            className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] flex-1 outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="workshop_shipping_v2"
                            value={data.workshop_shipping_v2}
                            onChange={handleInputChange}
                            className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] flex-1 outline-none focus:border-blue-500"
                        />
                        <input
                            type="date"
                            name="workshop_shipping_date"
                            value={data.workshop_shipping_date}
                            onChange={handleInputChange}
                            className="bg-slate-50 border border-slate-200 rounded-sm px-3 py-2 text-[13px] w-40 outline-none focus:border-blue-500 text-slate-400"
                        />
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-white rounded-sm border border-slate-200 shadow-sm p-8 space-y-6">
                    <div>
                        <h3 className="text-[14px] font-bold text-slate-700 mb-2">
                            Comments:
                        </h3>
                        <textarea
                            name="comments"
                            value={data.comments}
                            onChange={handleInputChange}
                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-sm p-4 text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none resize-none placeholder:text-slate-400"
                            placeholder="Enter comments here..."
                        ></textarea>
                    </div>

                    <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-sm border border-slate-100">
                        <span className="text-[13px] font-bold text-slate-700">
                            Office Sign-off
                        </span>
                        <input
                            type="text"
                            name="office_sign_off"
                            value={data.office_sign_off}
                            onChange={handleInputChange}
                            placeholder="Signature"
                            className="flex-1 bg-transparent border-b border-slate-300 px-3 py-2 text-[13px] outline-none focus:border-blue-500 placeholder:text-slate-300"
                        />
                    </div>
                </div>
            </div>
        </AdministratorLayout>
    );
}
