import React from 'react';
import { Link } from "@inertiajs/react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-white pt-24 pb-12">
            <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
                <div className="lg:col-span-2 space-y-6">
                    <Link href="/" className="inline-block">
                        <img src="/img/logo.png" alt="Just Simple Quality" className="h-[55px] w-auto" />
                    </Link>
                    <p className="text-white/70 text-[14px] leading-relaxed max-w-[380px]">
                        Easily manage procedures, documents, audits, and compliance all in one place. Streamline your quality processes with our intuitive platform.
                    </p>
                    <div className="flex gap-4">
                        {[Facebook, Twitter, Instagram, Linkedin].map(
                            (Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-[#2c8af8] hover:bg-[#1a7ae8] flex items-center justify-center transition-all text-white"
                                >
                                    <Icon size={18} />
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
                            "Pricing",
                            "Integrations",
                        ],
                    },
                    {
                        title: "Support",
                        links: [
                            "24/7 Support",
                            "Customer stories",
                        ],
                    },
                    {
                        title: "Legal",
                        links: [
                            "Terms",
                            "Privacy",
                            "Cookies",
                        ],
                    },
                ].map((col, i) => (
                    <div key={i} className="space-y-6">
                        <h6 className="text-[15px] font-bold text-white">
                            {col.title}
                        </h6>
                        <ul className="space-y-3">
                            {col.links.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="text-white/60 text-[14px] hover:text-white transition-colors"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="max-w-[1240px] mx-auto px-6 pt-8 border-t border-white/10 text-center text-white/40 text-[13px]">
                    © Just Simple Quality {new Date().getFullYear()} . All rights reserved
            </div>
        </footer>
    );
}
