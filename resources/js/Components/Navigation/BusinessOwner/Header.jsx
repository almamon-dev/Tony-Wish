import React, { useState, useRef, useEffect } from "react";
import { router, usePage, Link } from "@inertiajs/react";
import { Search, Bell, ChevronDown, User, LogOut } from "lucide-react";

const Header = ({ onMenuClick }) => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        router.post(route("logout"));
    };

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
        <header className="h-[80px] bg-white border-b border-slate-100 flex items-center px-8 z-40 sticky top-0 transition-all">
            {/* Search Bar */}
            <div className="flex-1 max-w-[400px]">
                <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full h-[40px] pl-10 pr-4 bg-slate-50 border border-slate-100 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all outline-none placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 ml-auto">
                <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>

                {/* Profile */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-50 transition-all"
                    >
                        <div className="text-right leading-none hidden sm:block">
                            <p className="text-[14px] font-bold text-slate-800">
                                {auth?.user?.name || "Business Owner"}
                            </p>
                            <p className="text-[11px] text-emerald-500 font-bold mt-0.5 capitalize">
                                Company Owner
                            </p>
                        </div>
                        <img
                            src={
                                auth?.user?.profile_photo_url ||
                                `https://ui-avatars.com/api/?name=${auth?.user?.name || "Owner"}&background=10b981&color=fff`
                            }
                            alt="Avatar"
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-50"
                        />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-all font-medium"
                            >
                                <User size={16} />
                                Profile Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-all text-left font-medium"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
