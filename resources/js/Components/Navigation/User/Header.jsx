import React, { useState, useRef, useEffect } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import {
    Search,
    Bell,
    Menu,
    Settings,
    Maximize,
    Mail,
    Globe,
    Monitor,
    Plus,
    LogOut,
    ChevronDown,
    CreditCard,
    Home,
} from "lucide-react";

const Header = ({ onMenuClick }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        router.post(route("logout"));
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-[75px] bg-white sticky top-0 z-[50] flex items-center px-8 border-b border-slate-100 shadow-sm transition-all duration-300">
            {/* LEFT: Toggle */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* CENTER: Search Bar */}
            <div className="flex-1 px-4 max-w-xl hidden md:block">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2c8af8] transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-slate-50/50 border border-slate-100 rounded-xl py-2 pl-11 pr-4 text-sm focus:ring-1 focus:ring-[#2c8af8]/20 focus:border-[#2c8af8] focus:bg-white transition-all placeholder:text-slate-400 font-medium"
                    />
                </div>
            </div>

            {/* RIGHT: Actions & Profile */}
            <div className="flex items-center gap-4 ml-auto">
                {/* Notification */}
                <button
                    className="w-10 h-10 flex items-center justify-center text-slate-500 bg-slate-50 border border-slate-100 rounded-xl relative hover:bg-slate-100 transition-colors"
                    title="Notifications"
                >
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                </button>

                {/* User Profile */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 p-1 rounded-xl transition-colors"
                    >
                        <img
                            src={
                                auth?.user?.profile_photo_url ||
                                `https://ui-avatars.com/api/?name=${auth?.user?.name || "User"}&background=2c8af8&color=fff&size=128`
                            }
                            alt="User"
                            className="w-9 h-9 rounded-lg object-cover shadow-sm ring-2 ring-slate-50"
                        />
                        <div className="hidden lg:block text-left leading-tight">
                            <p className="text-[14px] font-bold text-slate-700">
                                {auth?.user?.name || "Rifat Ahamed"}
                            </p>
                            <div className="px-2 py-0.5 bg-blue-50 text-[#2c8af8] rounded text-[10px] font-bold uppercase tracking-wider mt-0.5 inline-block">
                                Standard User
                            </div>
                        </div>
                        <ChevronDown
                            size={14}
                            className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Dropdown Menu */}
                    {open && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center gap-3">
                                <img
                                    src={
                                        auth?.user?.profile_photo_url ||
                                        `https://ui-avatars.com/api/?name=${auth?.user?.name || "Admin"}&background=673ab7&color=fff`
                                    }
                                    className="w-10 h-10 rounded-lg"
                                    alt="Avatar"
                                />
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-slate-900 truncate">
                                        {auth?.user?.name || "Admin"}
                                    </p>
                                    <Link
                                        href={route("profile.edit")}
                                        className="text-[11px] text-[#0a66c2] font-semibold hover:underline"
                                    >
                                        Manage Account
                                    </Link>
                                </div>
                            </div>

                            <div className="p-2">
                                <DropdownLink
                                    icon={Settings}
                                    label="System Settings"
                                    href={route(
                                        "admin.settings.website.system",
                                    )}
                                />
                                <DropdownLink
                                    icon={CreditCard}
                                    label="Billing Details"
                                    href="#"
                                />
                                <DropdownLink
                                    icon={Globe}
                                    label="Region & Language"
                                    href={route(
                                        "admin.settings.website.localization",
                                    )}
                                />
                            </div>

                            <div className="p-2 border-t border-slate-50 bg-slate-50/30">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2.5 text-[13px] text-red-500 hover:bg-red-50 font-bold flex items-center gap-3 rounded-xl transition-colors"
                                >
                                    <LogOut size={16} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const DropdownLink = ({ icon: Icon, label, href }) => (
    <Link
        href={href}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all font-semibold group"
    >
        <Icon
            size={17}
            className="text-slate-400 group-hover:text-[#0a66c2] transition-colors"
        />
        <span>{label}</span>
    </Link>
);

export default Header;
