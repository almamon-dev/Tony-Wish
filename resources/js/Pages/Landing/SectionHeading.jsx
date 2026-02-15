import React from 'react';

const SectionHeading = ({ title, subtitle, centered = true, className = "" }) => (
    <div className={`space-y-4 mb-16 ${centered ? "text-center" : "text-left"} ${className}`}>
        <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#2f3344] leading-tight tracking-tight">
            {title}
        </h2>
        {subtitle && (
            <p className={`text-[17px] text-[#727586] leading-relaxed ${centered ? "max-w-[750px] mx-auto" : "max-w-2xl"}`}>
                {subtitle}
            </p>
        )}
    </div>
);

export default SectionHeading;
