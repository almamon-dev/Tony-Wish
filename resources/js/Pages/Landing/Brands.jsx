import React from 'react';

export default function Brands() {
    return (
        <section className="py-16">
            <div className="max-w-[1240px] mx-auto px-6 text-center">
                <p className="text-[15px] font-bold text-[#b0b3c0] uppercase tracking-[0.2em] mb-12 italic">
                    Trusted by growing company worldwide
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-70">
                    {[
                        { name: "PayNova", color: "#7c3aed" },
                        { name: "Credify", color: "#2563eb" },
                        { name: "Moneyly", color: "#f59e0b" },
                        { name: "VaultX", color: "#0f172a" },
                        { name: "Finora", color: "#10b981" },
                        { name: "Moneyly", color: "#f59e0b" },
                    ].map((brand, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 group cursor-pointer transition-transform hover:scale-110 grayscale hover:grayscale-0 duration-300"
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
    );
}
