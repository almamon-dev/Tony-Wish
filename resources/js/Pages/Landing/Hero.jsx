import React, { useState } from 'react';
import { Link } from "@inertiajs/react";
import { ArrowRight, Menu, X } from "lucide-react";
import Button from "./Button";

export default function Hero({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="absolute top-0 left-0 right-0 z-50 bg-transparent py-4">
                <div className="max-w-7xl mx-auto px-3 h-[80px] flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3">
                        <img src="/img/logo.png" alt="Logo" className="h-[45px] w-auto" />
                    </Link>

                    {/* Nav Desktop */}
                    <nav className="hidden lg:flex items-center gap-9">
                        {[
                            "Home",
                            "Features",
                            "Pricing",
                            "Support",
                            "T&Cs",
                            "Founder",
                        ].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className={`text-[14px] font-bold transition-colors ${item === "Home" ? "text-[#2c8af8]" : "text-[#2f3344] hover:text-[#2c8af8]"}`}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* CTAs */}
                    <div className="hidden lg:flex items-center gap-4">
                        {auth?.user ? (
                            <Button href={route("dashboard")}>Dashboard</Button>
                        ) : (
                            <Button
                                href={route("register")}
                                className="bg-[#2c8af8] hover:bg-[#1a7ae8] px-6 h-[42px] rounded-[8px] text-[14px]"
                            >
                                Get Started <ArrowRight size={16} />
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
                                "Support",
                                "T&Cs",
                                "Founder",
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
                            {!auth?.user && (
                                <Button href={route("register")}>
                                    Get Started
                                </Button>
                            )}
                            {auth?.user && (
                                <Button href={route("dashboard")}>
                                    Dashboard
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <section className="pt-[140px] pb-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-3 grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
                    <div className="lg:col-span-3 space-y-6 text-center lg:text-left animate-in fade-in slide-in-from-left duration-1000">
                        <h1 className="text-[30px] md:text-[42px] font-black text-[#2f3344] leading-[1.1] tracking-tight">
                            Streamline your business with powerful integrated
                            quality management procedures
                        </h1>
                        <p className="text-[14px] text-[#727586] leading-relaxed max-w-[600px] mx-auto lg:mx-0 font-medium">
                            Easily manage procedures, documents, audits, and compliance — all in one place. Streamline
                            your quality processes with our intuitive platform.
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

                    <div className="lg:col-span-2 relative animate-in fade-in slide-in-from-right duration-1000 delay-200">
                        <div className="relative z-10 w-full">
                            <img 
                                src="/img/hero.png" 
                                alt="Dashboard Preview" 
                                className="w-full h-auto hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                        {/* Background blobs */}
                        <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-green-100 rounded-full blur-3xl opacity-50 -z-10"></div>
                    </div>
                </div>
            </section>
        </>
    );
}
