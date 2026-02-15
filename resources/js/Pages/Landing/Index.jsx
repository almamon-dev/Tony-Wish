import React from "react";
import { Head } from "@inertiajs/react";
import Hero from "./Hero";
import Brands from "./Brands";
import Features from "./Features";
import Showcase from "./Showcase";
import Steps from "./Steps";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingIndex({ auth }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 font-['DM_Sans'] selection:bg-[#2c8af8] selection:text-white overflow-x-hidden relative">
            <Head title="Welcome - Streamline Your Business" />

            {/* Global Background Elements */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/50 to-transparent rounded-bl-[100px] hidden lg:block opacity-50"></div>
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/40 to-cyan-100/40 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-gradient-to-l from-purple-100/40 to-blue-100/40 rounded-full blur-[100px] opacity-60"></div>
            </div>

            <Hero auth={auth} />
            
            <Brands />
            
            <Features />
            
            <Showcase />
            
            <Steps />
            
            <Pricing />
            
            <Testimonials />
            
            <CTA />
            
            <Footer />

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
            `,
                }}
            />
        </div>
    );
}
