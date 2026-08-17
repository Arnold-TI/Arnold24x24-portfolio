'use client';

import { useState } from 'react';
import { translations } from '@/lib/translations';
import type { Lang } from '@/lib/types';

interface ContactCardProps {
    lang: Lang;
    handleCopy: (text: string) => void;
    copiedId: string | null;
}

type ContactKey = 'email' | 'discord' | 'whatsapp';

export default function ContactCard({ lang, handleCopy, copiedId }: ContactCardProps) {
    const t = translations[lang];
    const [active, setActive] = useState<Record<ContactKey, boolean>>({
        email: false,
        discord: false,
        whatsapp: false,
    });

    const handleTap = (key: ContactKey, text: string) => {
        handleCopy(text);
        const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
        if (isMobile) {
            setActive(prev => prev[key] ? prev : { ...prev, [key]: true });
            setTimeout(() => {
                setActive(prev => ({ ...prev, [key]: false }));
            }, 500);
        }
    };

    const isEmail = active.email;
    const isDiscord = active.discord;
    const isWhatsapp = active.whatsapp;

    return (
        <div className="w-full max-w-2xl bg-[#0a1324]/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(5,11,20,0.8)] flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
            <div className="relative z-10 w-full flex flex-col items-center">

                <h2 className="text-2xl lg:text-5xl font-black tracking-tighter uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,1)] mb-4 lg:mb-6" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                    <span className="text-white">{t.contactTitle}</span>
                </h2>

                <p className="text-slate-300 font-medium text-xs md:text-sm lg:text-lg mb-10 max-w-lg drop-shadow-md">
                    {t.contactDescription}
                </p>

                <div className="flex flex-col gap-4 w-full md:w-5/6 relative">

                    <button
                        onClick={() => handleTap('email', 'Arnold_Business@gmail.com')}
                        className={`relative flex items-center justify-between w-full p-3 md:p-5 bg-[#050b14]/60 border rounded-xl transition-colors duration-300 group cursor-pointer ${isEmail ? 'border-sky-400 bg-sky-500/10' : 'border-slate-600/60 hover:border-sky-400 hover:bg-sky-500/10'}`}
                    >
                        <div className={`flex items-center gap-2 md:gap-4 transition-colors ${isEmail ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                            <svg className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isEmail ? 'text-sky-400' : 'text-slate-400 group-hover:text-sky-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span className="font-mono text-xs md:text-base font-bold break-all">Arnold_Business@gmail.com</span>
                        </div>
                        <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-colors ${isEmail ? 'text-sky-300' : 'text-slate-500 group-hover:text-sky-300'}`}>{t.copy}</span>

                        {copiedId === 'Arnold_Business@gmail.com' && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-lg pointer-events-none">
                                {t.copiedEmailAlert}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => handleTap('discord', 'arnold24x24')}
                        className={`relative flex items-center justify-between w-full p-3 md:p-5 bg-[#050b14]/60 border rounded-xl transition-colors duration-300 group cursor-pointer ${isDiscord ? 'border-indigo-400 bg-indigo-500/10' : 'border-slate-600/60 hover:border-indigo-400 hover:bg-indigo-500/10'}`}
                    >
                        <div className={`flex items-center gap-2 md:gap-4 transition-colors ${isDiscord ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                            <svg className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isDiscord ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                            <span className="font-mono text-xs md:text-base font-bold">arnold24x24</span>
                        </div>
                        <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-colors ${isDiscord ? 'text-indigo-300' : 'text-slate-500 group-hover:text-indigo-300'}`}>{t.copyId}</span>

                        {copiedId === 'arnold24x24' && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-lg pointer-events-none">
                                {t.copiedIdAlert}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => handleTap('whatsapp', lang === 'es' ? 'dos siete dos siete' : 'two seven two seven')}
                        className={`relative flex items-center justify-between w-full p-3 md:p-5 bg-[#050b14]/60 border rounded-xl transition-colors duration-300 group cursor-pointer ${isWhatsapp ? 'border-emerald-400 bg-emerald-500/10' : 'border-slate-600/60 hover:border-emerald-400 hover:bg-emerald-500/10'}`}
                    >
                        <div className="flex items-center gap-2 md:gap-4 text-slate-300 group-hover:text-white transition-colors">
                            <svg className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${isWhatsapp ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-400'}`} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>

                            <span className={`font-bold text-xs md:text-base ${isWhatsapp ? 'hidden' : 'group-hover:hidden'}`}>WhatsApp</span>
                            <span className={`font-mono font-bold text-xs md:text-base text-emerald-400 animate-pulse ${isWhatsapp ? 'block' : 'hidden group-hover:block'}`}>ID: Arnold24x24</span>
                        </div>

                        <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${isWhatsapp ? 'hidden' : 'text-slate-500 group-hover:hidden'}`}>{t.personal}</span>
                        <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-emerald-400 ${isWhatsapp ? 'block' : 'hidden group-hover:block'}`}>{t.copySecretKey}</span>

                        {(copiedId === 'dos siete dos siete' || copiedId === 'two seven two seven') && (
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md shadow-lg pointer-events-none">
                                {t.copiedKeyAlert}
                            </span>
                        )}
                    </button>

                </div>
            </div>
        </div>
    );
}
