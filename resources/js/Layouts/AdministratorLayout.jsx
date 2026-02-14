import React, { useState } from "react";
import Header from "../Components/Navigation/Administrator/Header";
import Sidebar from "../Components/Navigation/Administrator/Sidebar";

export default function AdministratorLayout({ children }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const expandedWidth = "260px";
    const collapsedWidth = "90px";

    return (
        <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 z-[155] lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                style={{ width: isCollapsed ? collapsedWidth : expandedWidth }}
                className={`fixed inset-y-0 left-0 z-[160] bg-white transition-all duration-300 ease-in-out border-r border-slate-200/60
                    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <Sidebar
                    isCollapsed={isCollapsed}
                    toggleCollapse={() => setIsCollapsed(!isCollapsed)}
                />
            </aside>

            <div
                className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out"
                style={{
                    marginLeft: isCollapsed ? collapsedWidth : expandedWidth,
                }}
            >
                <Header onMenuClick={() => setIsMobileOpen(true)} />

                <main className="flex-1 overflow-y-auto">
                    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
