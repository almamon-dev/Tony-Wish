import React from 'react';
import { X, Award, ShieldCheck, Download, Printer, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CertificatePreviewModal = ({ isOpen, onClose, certificate }) => {
    if (!isOpen || !certificate) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden print:shadow-none print:max-w-none print:rounded-none"
                    >
                        {/* Action Buttons (Hidden on print) */}
                        <div className="absolute top-6 right-6 flex items-center gap-2 z-20 print:hidden no-print">
                            <button
                                onClick={handlePrint}
                                className="p-2.5 bg-white/80 backdrop-blur shadow-sm hover:bg-slate-50 text-slate-600 rounded-xl transition-all border border-slate-100 no-print"
                                title="Print or Save as PDF"
                            >
                                <Printer size={18} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2.5 bg-white/80 backdrop-blur shadow-sm hover:bg-slate-50 text-slate-600 rounded-xl transition-all border border-slate-100 no-print"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Certificate Wrapper - This is what prints */}
                        <div id="certificate-to-print" className="p-6 sm:p-10 relative bg-white min-h-[500px] flex flex-col items-center justify-center print:p-0">
                            
                            {/* THE ACTUAL CERTIFICATE DESIGN (Matching Admin Side but smaller) */}
                            <div className="bg-white border-[8px] border-double border-[#2185d5]/20 rounded-[32px] p-8 sm:p-12 w-full text-center space-y-6 relative overflow-hidden shadow-sm print:border-[#2185d5]/30 print:shadow-none print:max-w-none print:rounded-none print:h-screen print:flex print:flex-col print:justify-center">
                                
                                {/* Decorative circles */}
                                <div className="absolute top-0 left-0 w-32 h-32 bg-[#2185d5]/5 rounded-br-full -translate-x-16 -translate-y-16" />
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#2185d5]/5 rounded-tl-full translate-x-16 translate-y-16" />

                                {/* Icon Section */}
                                <div className="relative">
                                    <div className="w-16 h-16 mx-auto bg-[#2185d5] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/30 rotate-3 transition-transform hover:rotate-0">
                                        <Award size={32} strokeWidth={1.5} />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-blue-50">
                                        <ShieldCheck size={14} className="text-blue-500" />
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="space-y-2">
                                    <h2 className="text-3xl sm:text-4xl font-black text-slate-800 uppercase tracking-[0.15em] leading-tight print:text-5xl">
                                        Certificate
                                    </h2>
                                    <div className="h-1 w-20 bg-[#2185d5] mx-auto rounded-full" />
                                    <p className="text-[10px] font-black text-blue-500/60 uppercase tracking-[0.4em] pt-1">
                                        Of Completion & Compliance
                                    </p>
                                </div>

                                {/* Body */}
                                <div className="space-y-4">
                                    <p className="text-[11px] text-slate-400 uppercase tracking-[0.2em] font-black italic">
                                        This is to officially certify that
                                    </p>
                                    <h1 className="text-3xl sm:text-4xl font-black text-[#2185d5] font-serif italic tracking-tight print:text-5xl">
                                        {certificate.recipient_name || 'Valued User'}
                                    </h1>
                                </div>

                                {/* Details */}
                                <div className="space-y-4">
                                    <p className="text-[12px] text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                                        has successfully met all regulatory requirements for:
                                    </p>
                                    <div className="space-y-1 pt-1">
                                        <p className="text-xl font-black text-slate-800 print:text-2xl">
                                            {certificate.subtitle}
                                        </p>
                                        <div className="flex items-center justify-center gap-3 opacity-60">
                                            <span className="w-8 h-px bg-slate-200" />
                                            <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">
                                                {certificate.title || 'ISO STANDARD'}
                                            </p>
                                            <span className="w-8 h-px bg-slate-200" />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Info */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 mt-2 border-t border-slate-50 relative z-10 print:pt-16">
                                    <div className="space-y-0.5 text-left">
                                        <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">
                                            Issue Date
                                        </p>
                                        <p className="text-[12px] font-black text-slate-700">
                                            {certificate.issued}
                                        </p>
                                    </div>
                                    
                                    <div className="hidden sm:flex flex-col items-center justify-center gap-1.5 opacity-50">
                                        <div className="w-9 h-9 bg-white border border-slate-100 rounded-lg p-1.5 shadow-sm">
                                            <QrCode size={window.innerWidth < 640 ? 20 : 24} className="text-slate-800" strokeWidth={1.5} />
                                        </div>
                                        <p className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-tighter">
                                            {certificate.certificate_id}
                                        </p>
                                    </div>

                                    <div className="space-y-0.5 text-right sm:text-right">
                                        <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">
                                            Valid Until
                                        </p>
                                        <p className="text-[12px] font-black text-slate-700">
                                            {certificate.expires}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions (Hidden on print) */}
                        <div className="bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 print:hidden relative z-30">
                            <div className="flex items-center gap-4 mb-5 sm:mb-0">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-600 rounded-lg mt-1 border border-green-100">
                                        <ShieldCheck size={12} />
                                        <span className="text-[10px] font-bold uppercase tracking-tight">Verified</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <button
                                    onClick={onClose}
                                    className="flex-1 sm:flex-none px-6 py-3 text-slate-500 font-black text-[13px] hover:bg-white hover:text-slate-700 rounded-xl transition-all border border-transparent hover:border-slate-200"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="flex-1 sm:flex-none px-6 py-3 bg-[#2c8af8] hover:bg-blue-600 text-white rounded-xl text-[13px] font-black transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                                >
                                    <Download size={16} />
                                    Download & Print
                                </button>
                            </div>
                        </div>

                        {/* Custom Print Styles */}
                        <style dangerouslySetInnerHTML={{ __html: `
                            @media print {
                                @page {
                                    size: portrait;
                                    margin: 0;
                                }
                                body * {
                                    visibility: hidden !important;
                                    -webkit-print-color-adjust: exact !important;
                                    print-color-adjust: exact !important;
                                }
                                #certificate-to-print, #certificate-to-print * {
                                    visibility: visible !important;
                                }
                                #certificate-to-print {
                                    position: fixed !important;
                                    left: 0 !important;
                                    top: 0 !important;
                                    width: 100vw !important;
                                    height: 100vh !important;
                                    margin: 0 !important;
                                    padding: 40px !important;
                                    background: white !important;
                                    display: flex !important;
                                    align-items: center !important;
                                    justify-content: center !important;
                                    z-index: 9999 !important;
                                }
                                #certificate-to-print > div {
                                    width: 100% !important;
                                    max-width: 800px !important;
                                    margin: auto !important;
                                    border: 8px double rgba(33, 133, 213, 0.3) !important;
                                    border-radius: 32px !important;
                                    padding: 60px !important;
                                    box-shadow: none !important;
                                    height: auto !important;
                                }
                                .no-print {
                                    display: none !important;
                                }
                            }
                        `}} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CertificatePreviewModal;
