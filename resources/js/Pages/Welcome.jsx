import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    Home,
    Check,
    Star,
    ArrowRight,
    Menu,
    X,
    Monitor,
    Shield,
    Zap,
    Database,
    BarChart3,
    Users,
    Briefcase,
    ChevronRight,
    Play,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    User,
    Plus,
    FolderTree,
    Search,
    Layout,
    Bell,
    ShieldCheck,
    Settings,
    FileText,
    PieChart,
    Activity,
} from "lucide-react";

// Common Components
const Button = ({
    children,
    variant = "primary",
    className = "",
    href,
    ...props
}) => {
    const baseStyle =
        "px-6 py-3 rounded-[8px] font-bold text-[15px] transition-all flex items-center justify-center gap-2 active:scale-[0.98]";
    const variants = {
        primary: "bg-[#2c8af8] text-white hover:bg-[#1a7ae8] shadow-md",
        outline:
            "border border-[#e3e4e8] text-[#2f3344] hover:border-[#673ab7] hover:text-[#673ab7] bg-white",
        dark: "bg-[#2f3344] text-white hover:bg-[#1e212c]",
        link: "text-[#673ab7] hover:underline px-0 py-0 font-bold",
        white: "bg-white text-[#00b090] hover:bg-slate-50 shadow-lg",
    };

    const combinedClassName = `${baseStyle} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
};

const SectionHeading = ({ title, subtitle, centered = true }) => (
    <div className={`space-y-4 mb-16 ${centered ? "text-center" : ""}`}>
        <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#2f3344] leading-tight tracking-tight">
            {title}
        </h2>
        {subtitle && (
            <p className="text-[17px] text-[#727586] max-w-[750px] mx-auto leading-relaxed">
                {subtitle}
            </p>
        )}
    </div>
);

export default function Welcome({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-['DM_Sans'] selection:bg-[#2c8af8] selection:text-white overflow-x-hidden">
            <Head title="Welcome - Streamline Your Business" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#f1f2f4]">
                <div className="max-w-[1240px] mx-auto px-6 h-[80px] flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-[42px] h-[42px] bg-gradient-to-br from-[#00b090] to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                            <span className="text-white font-black text-2xl italic">
                                Q
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[17px] font-bold text-[#2f3344] leading-none mb-1">
                                Just simple quality
                            </span>
                            <span className="text-[11px] text-[#727586] font-semibold tracking-[0.2em] uppercase leading-none">
                                management systems
                            </span>
                        </div>
                    </Link>

                    {/* Nav Desktop */}
                    <nav className="hidden lg:flex items-center gap-9">
                        {[
                            "Home",
                            "Features",
                            "Pricing",
                            "About",
                            "Team",
                            "Events",
                        ].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className={`text-[15px] font-bold transition-colors ${item === "Home" ? "text-[#2c8af8]" : "text-[#2f3344] hover:text-[#2c8af8]"}`}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* CTAs */}
                    <div className="hidden lg:flex items-center gap-4">
                        {auth.user ? (
                            <Button href={route("dashboard")}>Dashboard</Button>
                        ) : (
                            <Button
                                href={route("register")}
                                className="bg-[#2c8af8] hover:bg-[#1a7ae8] px-8 h-[48px] rounded-[10px]"
                            >
                                Get Started <ArrowRight size={18} />
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-[#2f3344]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden bg-white border-b border-[#f1f2f4] px-6 py-8 space-y-6 absolute top-[80px] left-0 right-0 shadow-2xl animate-in fade-in slide-in-from-top-4">
                        <div className="flex flex-col gap-5">
                            {[
                                "Home",
                                "Features",
                                "Pricing",
                                "About",
                                "Team",
                                "Events",
                            ].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-lg font-bold text-[#2f3344]"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                        <hr className="border-[#f1f2f4]" />
                        <div className="flex flex-col gap-4">
                            {!auth.user && (
                                <Button href={route("register")}>
                                    Get Started
                                </Button>
                            )}
                            {auth.user && (
                                <Button href={route("dashboard")}>
                                    Dashboard
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Hero Section */}
            <section className="pt-[140px] pb-24 bg-gradient-to-br from-[#f8faff] to-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#f4f7ff] rounded-bl-[100px] -z-10 hidden lg:block"></div>
                <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-left duration-1000">
                        <h1 className="text-[44px] md:text-[58px] font-black text-[#2f3344] leading-[1.05] tracking-tight">
                            Streamline your business with powerful integrated
                            quality management procedures
                        </h1>
                        <p className="text-[19px] text-[#727586] leading-relaxed max-w-[550px] mx-auto lg:mx-0">
                            Don't let legacy systems hold you back. Our modern
                            platform helps you deliver consistency and
                            compliance across every department.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
                            <Button
                                href={route("register")}
                                className="w-full sm:w-auto px-10 h-[58px] text-[18px] bg-[#2c8af8] hover:shadow-xl hover:shadow-[#2c8af8]/20 transition-all"
                            >
                                Get Started <ArrowRight size={20} />
                            </Button>
                        </div>
                    </div>

                    <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-200">
                        <div className="relative z-10 rounded-[24px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-white/40">
                            {/* In the image, this is a man at a desk with a monitor showing a dashboard. I will simulate this UI layout */}
                            <div className="aspect-[4/3] bg-white relative group overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
                                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                    alt="Management Dashboard"
                                />
                                <div className="absolute inset-0 bg-[#2f3344]/10"></div>
                                {/* Floating UI Elements to match the image precisely */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[75%] bg-white rounded-xl shadow-2xl border border-slate-100 p-4 space-y-4 animate-in zoom-in duration-500 delay-500">
                                    <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
                                        <div className="w-8 h-8 rounded bg-[#ef4444]/10 flex items-center justify-center text-[#ef4444] font-bold text-xs italic">
                                            Q
                                        </div>
                                        <div className="h-2 w-32 bg-slate-100 rounded-full"></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="p-3 bg-[#eef8ff] rounded-lg border border-[#2c8af8]/10 text-center">
                                            <div className="text-[20px] font-black text-[#2c8af8]">
                                                24
                                            </div>
                                            <div className="text-[9px] font-bold text-[#727586] uppercase tracking-wider">
                                                Logged In
                                            </div>
                                        </div>
                                        <div className="p-3 bg-[#fff7ed] rounded-lg border border-orange-500/10 text-center">
                                            <div className="text-[20px] font-black text-orange-500">
                                                12
                                            </div>
                                            <div className="text-[9px] font-bold text-[#727586] uppercase tracking-wider">
                                                Ongoing
                                            </div>
                                        </div>
                                        <div className="p-3 bg-[#f0fdf4] rounded-lg border border-green-500/10 text-center">
                                            <div className="text-[20px] font-black text-green-500">
                                                86%
                                            </div>
                                            <div className="text-[9px] font-bold text-[#727586] uppercase tracking-wider">
                                                Completed
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {[1, 2, 3].map((i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 p-2 bg-slate-50/50 rounded-lg"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-slate-200"></div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-1.5 w-1/2 bg-slate-300 rounded-full"></div>
                                                    <div className="h-1.5 w-1/4 bg-slate-200 rounded-full"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Background blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-100 rounded-full blur-3xl opacity-60 -z-10"></div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className="py-16 bg-white">
                <div className="max-w-[1240px] mx-auto px-6 text-center">
                    <p className="text-[15px] font-bold text-[#b0b3c0] uppercase tracking-[0.2em] mb-12 italic">
                        Trusted by growing companies worldwide
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
                        {[
                            { name: "PayNews", color: "#2c8af8" },
                            { name: "Credity", color: "#673ab7" },
                            { name: "Monaply", color: "#00b090" },
                            { name: "VaultX", color: "#1e293b" },
                            { name: "Filora", color: "#ec4899" },
                            { name: "Hibmouly", color: "#f59e0b" },
                        ].map((brand, i) => (
                            <div
                                key={brand.name}
                                className="flex items-center gap-3 group cursor-pointer transition-transform hover:scale-110"
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold italic text-sm"
                                    style={{ backgroundColor: brand.color }}
                                >
                                    {brand.name.charAt(0)}
                                </div>
                                <span className="text-[22px] font-black text-[#2f3344] tracking-tighter">
                                    {brand.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-28 bg-[#fafbfc]">
                <div className="max-w-[1240px] mx-auto px-6">
                    <SectionHeading
                        title="Everything You Need to Manage Your Business"
                        subtitle="A complete suite of governance and compliance tools designed to make enterprise quality management feel as simple as a local store."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Governance & SOP Management",
                                icon: ShieldCheck,
                                color: "#2c8af8",
                                desc: "Maintain strict adherence to Standard Operating Procedures with digital workflows.",
                            },
                            {
                                title: "Rule-Based Access Control",
                                icon: Users,
                                color: "#10b981",
                                desc: "Secure your data with granular permissions and automated audit logging for all actions.",
                            },
                            {
                                title: "Asset & Compliance Tracking",
                                icon: Database,
                                color: "#673ab7",
                                desc: "Keep track of physical and digital assets with built-in regulatory compliance checks.",
                            },
                            {
                                title: "Real-Time Visibility & Analytics",
                                icon: BarChart3,
                                color: "#ec4899",
                                desc: "Get deep insights into business performance with customizable dashboards and reports.",
                            },
                            {
                                title: "Customizable Alert Flow & Performance",
                                icon: Zap,
                                color: "#2c8af8",
                                desc: "Never miss a deadline with automated notifications and performance monitoring.",
                            },
                            {
                                title: "Terminal Status & Reports",
                                icon: Monitor,
                                color: "#10b981",
                                desc: "Monitor system health and generate professional reports with a single click.",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-10 rounded-[20px] bg-white border border-[#f1f2f4] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.06)] hover:border-[#2c8af8]/20 transition-all duration-300 group"
                            >
                                <div
                                    className="w-16 h-16 rounded-[14px] flex items-center justify-center mb-7 transition-transform group-hover:scale-110"
                                    style={{
                                        backgroundColor: `${feature.color}10`,
                                        color: feature.color,
                                    }}
                                >
                                    <feature.icon size={30} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-[21px] font-black text-[#2f3344] mb-4 group-hover:text-[#2c8af8] transition-colors leading-tight italic">
                                    {feature.title}
                                </h3>
                                <p className="text-[16px] text-[#727586] leading-relaxed font-medium italic">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Showcase */}
            <section className="py-28 bg-white overflow-hidden">
                <div className="max-w-[1240px] mx-auto px-6">
                    <SectionHeading
                        title="Choose the Perfect Plan for Your Business"
                        subtitle="Procedures are carefully designed precisely for your application with not a tiny bit that holds you back from business and platform."
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-10 bg-gradient-to-tr from-[#2c8af8]/10 to-transparent blur-3xl opacity-50 rounded-full"></div>
                            <div className="relative bg-white p-2 rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100 transform group-hover:-translate-y-2 transition-transform duration-500">
                                <div className="bg-white rounded-xl overflow-hidden border border-slate-100 h-[420px] flex flex-col">
                                    <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                        <div className="ml-4 h-2 w-32 bg-slate-200 rounded-full"></div>
                                    </div>
                                    <div className="flex flex-1">
                                        <div className="w-[180px] border-r border-slate-50 p-4 space-y-3">
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(
                                                (i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <div className="w-4 h-4 rounded bg-slate-100"></div>
                                                        <div className="h-2 bg-slate-100 rounded-full flex-1"></div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                        <div className="flex-1 p-6 space-y-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="h-6 w-24 bg-blue-100 rounded"></div>
                                                <div className="h-6 w-16 bg-slate-100 rounded"></div>
                                            </div>
                                            <div className="space-y-4">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="flex gap-4 items-center border-b border-slate-50 pb-4"
                                                    >
                                                        <div className="w-8 h-8 rounded bg-slate-50"></div>
                                                        <div className="flex-1 space-y-2">
                                                            <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                                                            <div className="h-2 w-1/2 bg-slate-50 rounded-full"></div>
                                                        </div>
                                                        <div className="w-12 h-6 bg-green-50 rounded"></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-[34px] md:text-[40px] font-black text-[#2f3344] leading-[1.2] tracking-tight italic">
                                Procedures are carefully designed precisely for
                                your application with not a tiny bit that holds
                                you back from business and platform.
                            </h2>
                            <ul className="space-y-5">
                                {[
                                    "Streamline workflow for high ROI.",
                                    "Compliance with all regulations.",
                                    "Scalable with your business.",
                                    "Build based on industry best practices.",
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-5 group"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-[#00b090]/10 flex items-center justify-center text-[#00b090] group-hover:bg-[#00b090] group-hover:text-white transition-all shadow-sm">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="text-[17px] font-black text-[#2f3344] italic">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-28 bg-[#fafbfc]">
                <div className="max-w-[1240px] mx-auto px-6">
                    <SectionHeading
                        title="Get Started in 5 Simple Steps"
                        subtitle="We've made the implementation process as smooth as possible. Join hundreds of enterprise leaders today."
                    />

                    <div className="relative mt-20">
                        {/* Connecting Line Desktop */}
                        <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-[1.5px] bg-[#e3e4e8]"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
                            {[
                                {
                                    step: "01",
                                    title: "Sign Up",
                                    desc: "Create your account and select your industry.",
                                    color: "#2c8af8",
                                    icon: User,
                                },
                                {
                                    step: "02",
                                    title: "Connect Assets",
                                    desc: "Sync your data and physical assets securely.",
                                    color: "#10b981",
                                    icon: Briefcase,
                                },
                                {
                                    step: "03",
                                    title: "Assign Users",
                                    desc: "Define roles and permissions for your team.",
                                    color: "#673ab7",
                                    icon: Users,
                                },
                                {
                                    step: "04",
                                    title: "Track Progress",
                                    desc: "Monitor ongoing projects and compliance.",
                                    color: "#ef4444",
                                    icon: Activity,
                                },
                                {
                                    step: "05",
                                    title: "Network Reports",
                                    desc: "Generate system-wide analytics and SOPs.",
                                    color: "#06b6d4",
                                    icon: PieChart,
                                },
                            ].map((item, i) => (
                                <div key={i} className="text-center group">
                                    <div className="relative inline-block mb-8">
                                        <div className="w-[100px] h-[100px] rounded-full bg-white border border-[#edf0f5] shadow-[0_10px_20px_rgba(0,0,0,0.03)] flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
                                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-white border border-[#edf0f5] rounded-full text-[12px] font-black text-[#2f3344] shadow-sm">
                                                {item.step}
                                            </span>
                                            <item.icon
                                                size={36}
                                                strokeWidth={2}
                                                style={{ color: item.color }}
                                            />
                                        </div>
                                        <div className="absolute -inset-4 bg-white rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform -z-10"></div>
                                    </div>
                                    <h4 className="text-[20px] font-black text-[#2f3344] mb-3 italic tracking-tight">
                                        {item.title}
                                    </h4>
                                    <p className="text-[15px] text-[#727586] leading-relaxed max-w-[200px] mx-auto font-medium italic">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-28 bg-white">
                <div className="max-w-[1240px] mx-auto px-6">
                    <SectionHeading
                        title="Choose the Perfect Plan for Your Business"
                        subtitle="Flexible pricing options designed to scale with your organization's growth and compliance needs."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                        {/* Free Test */}
                        <div className="bg-white rounded-[24px] p-10 border border-[#edf0f5] shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 group">
                            <div className="mb-8">
                                <span className="text-[13px] font-black text-[#727586] uppercase tracking-[0.2em] italic">
                                    Free Test
                                </span>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-[48px] font-black text-[#2f3344]">
                                        $0
                                    </span>
                                    <span className="text-[#a0a3af] font-bold italic">
                                        /m
                                    </span>
                                </div>
                            </div>
                            <ul className="space-y-5 mb-10 pb-10 border-b border-slate-50">
                                {[
                                    "1 User account",
                                    "Basic SOP Tools",
                                    "5 Asset Tracking",
                                    "Email Support",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-[15px] font-black text-[#2f3344] italic"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-[#00b090]/10 flex items-center justify-center text-[#00b090]">
                                            <Check size={12} strokeWidth={3} />
                                        </div>{" "}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                href={route("register")}
                                className="w-full h-[54px] bg-[#2c8af8] font-black italic uppercase tracking-widest text-[14px]"
                            >
                                Get Started <ArrowRight size={18} />
                            </Button>
                        </div>

                        {/* Professional */}
                        <div className="bg-white rounded-[24px] p-10 border-[2px] border-[#00b090] shadow-[0_40px_80px_rgba(0,0,0,0.1)] relative z-10 transform scale-105 group overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#00b090]"></div>
                            <div className="absolute top-[22px] right-[-32px] bg-[#00b090] text-white px-10 py-1 rotate-45 text-[10px] font-black uppercase tracking-wider">
                                Most Popular
                            </div>
                            <div className="mb-8">
                                <span className="text-[13px] font-black text-[#00b090] uppercase tracking-[0.2em] italic">
                                    Professional
                                </span>
                                <div className="mt-4 flex items-baseline gap-1">
                                    <span className="text-[48px] font-black text-[#2f3344]">
                                        $49
                                    </span>
                                    <span className="text-[#a0a3af] font-bold italic">
                                        /m
                                    </span>
                                </div>
                            </div>
                            <ul className="space-y-5 mb-10 pb-10 border-b border-slate-50">
                                {[
                                    "Up to 20 Users",
                                    "Advanced Compliance",
                                    "Unlimited Assets",
                                    "Real-time Analytics",
                                    "Phone Support",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-[15px] font-black text-[#2f3344] italic"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-[#00b090] flex items-center justify-center text-white">
                                            <Check size={12} strokeWidth={3} />
                                        </div>{" "}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                href={route("register")}
                                className="w-full h-[54px] bg-[#2c8af8] font-black italic uppercase tracking-widest text-[14px]"
                            >
                                Get Started <ArrowRight size={18} />
                            </Button>
                        </div>

                        {/* Enterprise */}
                        <div className="bg-[#2f3344] rounded-[24px] p-10 text-white shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2">
                            <div className="mb-8">
                                <span className="text-[13px] font-black text-white/50 uppercase tracking-[0.2em] italic">
                                    Enterprise
                                </span>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-[48px] font-black text-white italic">
                                        Custom
                                    </span>
                                </div>
                            </div>
                            <ul className="space-y-5 mb-10 pb-10 border-b border-white/5">
                                {[
                                    "Unlimited Users",
                                    "API Integration",
                                    "Full Compliance Suite",
                                    "Dedicated Manager",
                                    "Priority 24/7 Support",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3 text-[15px] font-black italic"
                                    >
                                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[#00b090]">
                                            <Check size={12} strokeWidth={3} />
                                        </div>{" "}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button
                                href={route("register")}
                                className="w-full h-[54px] bg-[#2c8af8] font-black italic uppercase tracking-widest text-[14px] border-none"
                            >
                                Get Started <ArrowRight size={18} />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-28 bg-[#fafbfc]">
                <div className="max-w-[1240px] mx-auto px-6">
                    <SectionHeading
                        title="Trusted by Industry Leaders"
                        subtitle="Hear from the operations managers and CEOs who have transformed their business using our platform."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Miller",
                                role: "COO at VaultX",
                                text: "The visibility we gained into our compliance procedures was a game-changer. We reduced downtime by 40% in just two months.",
                            },
                            {
                                name: "David Chen",
                                role: "Head of Quality at Filora",
                                text: "Finally a platform that feels like it was built for the modern enterprise. Smooth interface and powerful automation.",
                            },
                            {
                                name: "John Smith",
                                role: "CEO at Monaply",
                                text: "Implementation was surprisingly fast. The support team was with us every step of the way. Highly recommended for scaling teams.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-10 rounded-[24px] bg-white border border-[#f1f2f4] shadow-sm hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className="flex gap-1 text-[#f59e0b] mb-6">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            size={18}
                                            fill="currentColor"
                                            strokeWidth={0}
                                        />
                                    ))}
                                </div>
                                <p className="text-[18px] text-[#2f3344] leading-relaxed italic font-black mb-8">
                                    "{item.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#f8fafc] flex items-center justify-center group-hover:bg-[#2c8af8] transition-colors overflow-hidden">
                                        <img
                                            src={`https://i.pravatar.cc/100?u=${item.name}`}
                                            className="w-full h-full object-cover"
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <h5 className="text-[15px] font-black text-[#2f3344] uppercase tracking-wide tracking-tighter italic">
                                            {item.name}
                                        </h5>
                                        <p className="text-[13px] text-[#727586] font-bold italic">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-28">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-r from-[#00b090] to-[#56ab2f] px-8 py-24 text-center text-white shadow-[0_40px_80px_-20px_rgba(0,176,144,0.3)]">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full grid grid-cols-12 gap-0">
                                {[...Array(24)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="border-r border-white h-full last:border-0 opacity-20"
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div className="relative z-10 max-w-[850px] mx-auto space-y-10">
                            <h2 className="text-[42px] md:text-[56px] font-black leading-tight italic uppercase tracking-tighter">
                                Ready to Transform Your Business?
                            </h2>
                            <p className="text-[20px] md:text-[24px] text-white/90 font-medium max-w-[650px] mx-auto leading-relaxed italic">
                                Join our network of industry leaders today and
                                start streamlining your quality management
                                processes.
                            </p>
                            <div className="flex justify-center">
                                <Button
                                    variant="white"
                                    className="h-[64px] px-14 font-black text-[18px] hover:scale-105 transition-all shadow-xl uppercase tracking-widest italic group"
                                >
                                    Sign Up Now{" "}
                                    <ArrowRight
                                        strokeWidth={4}
                                        className="group-hover:translate-x-2 transition-transform"
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#0b0e1a] text-white pt-24 pb-12">
                <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-[38px] h-[38px] bg-white rounded-lg flex items-center justify-center shadow-lg">
                                <span className="text-[#0b0e1a] font-black text-xl italic mt-0.5">
                                    Q
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[18px] font-black text-white italic uppercase tracking-tighter">
                                    Just simple quality
                                </span>
                                <span className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase">
                                    management systems
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/50 text-[16px] leading-relaxed max-w-[380px] italic font-medium">
                            Redefining quality management systems for the modern
                            enterprise. We provide the tools you need to succeed
                            in a complex regulatory environment.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map(
                                (Icon, i) => (
                                    <Link
                                        key={i}
                                        href="#"
                                        className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#2c8af8] hover:border-[#2c8af8] hover:-translate-y-1 transition-all"
                                    >
                                        <Icon size={20} />
                                    </Link>
                                ),
                            )}
                        </div>
                    </div>

                    {[
                        {
                            title: "Product",
                            links: [
                                "Features",
                                "Integrations",
                                "Pricing",
                                "Documentation",
                            ],
                        },
                        {
                            title: "Support",
                            links: [
                                "Help Center",
                                "API Status",
                                "Contact Us",
                                "Live Chat",
                            ],
                        },
                        {
                            title: "Company",
                            links: [
                                "About Us",
                                "Careers",
                                "Privacy Policy",
                                "Terms of Service",
                            ],
                        },
                    ].map((col, i) => (
                        <div key={i} className="space-y-8">
                            <h6 className="text-[13px] font-black uppercase tracking-[0.2em] italic text-[#2c8af8] opacity-80">
                                {col.title}
                            </h6>
                            <ul className="space-y-4">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-white/60 text-[15px] font-bold hover:text-white transition-colors italic"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="max-w-[1240px] mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 text-white/30 text-[13px] font-bold uppercase tracking-widest italic">
                    <p>
                        © {new Date().getFullYear()} Just Simple Quality. All
                        rights reserved.
                    </p>
                    <div className="flex gap-10">
                        <Link
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Terms of Use
                        </Link>
                        <Link
                            href="#"
                            className="hover:text-white transition-colors"
                        >
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </footer>

            {/* Global Custom Styles */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
                
                body {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                
                .tracking-tighter { letter-spacing: -0.06em; }
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-up { animation: fade-in-up 0.8s ease-out forwards; }
                
                ::-webkit-scrollbar { width: 10px; }
                ::-webkit-scrollbar-track { bg: #f1f2f4; }
                ::-webkit-scrollbar-thumb { bg: #c3c4ca; border-radius: 10px; border: 3px solid #f1f2f4; }
                ::-webkit-scrollbar-thumb:hover { bg: #a0a3af; }
            `,
                }}
            />
        </div>
    );
}
