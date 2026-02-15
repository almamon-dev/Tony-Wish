import React from 'react';
import { Link } from '@inertiajs/react';

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

export default Button;
