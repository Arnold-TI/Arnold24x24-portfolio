'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { translations } from '@/lib/translations';
import { tipsDataByLang } from '@/lib/data/tips';
import type { Lang } from '@/lib/types';

interface TipsSectionProps {
    lang: Lang;
    openTips: number[];
    toggleTip: (idx: number) => void;
}

export default function TipsSection({ lang, openTips, toggleTip }: TipsSectionProps) {
    const t = translations[lang];
    const tipsData = tipsDataByLang[lang];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center grow w-full"
        >
            <div className="w-full flex flex-col items-center">

                <div className="w-full lg:w-[calc(100%+6rem)] lg:-mx-12 -mt-4 mb-2">
                    <div className="relative w-full h-56 lg:h-72 overflow-hidden flex items-center">
                        <div
                            className="absolute inset-0 z-0"
                            style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
                        >
                            <Image
                                src="/banner-tips.jpg"
                                alt="Banner Tips"
                                fill
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                className="object-cover object-[center_43%] opacity-90"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-[#050b14]/70 via-[#050b14]/10 to-transparent"></div>
                        </div>

                        <div className="relative z-10 w-full flex flex-col justify-center px-8 md:px-16 pb-8 pointer-events-none">
                            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,1)]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                <span className="text-white">TIPS &</span>
                                <span className="text-cyan-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] ml-2">{lang === 'es' ? 'CONSEJOS' : 'ADVICE'}</span>
                            </h2>
                            <p className="text-cyan-50/90 mt-2 font-medium text-xs md:text-base max-w-xl drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
                                {t.tipsSubtitle}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full px-4 md:px-8 lg:px-0">
                    <div className="w-full h-0.5 bg-slate-700/60 rounded-full shadow-inner mb-12"></div>

                    <div className="w-full max-w-5xl mx-auto">
                    <div className="flex flex-col gap-4">
                        {tipsData.map((tip, idx) => {
                            const isOpen = openTips.includes(idx);

                            return (
                                <div key={idx} className={`border border-slate-700/50 rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[#0f172a]/60 backdrop-blur-md shadow-lg' : 'bg-[#050b14]/40 hover:bg-white/5'}`}>
                                    <button
                                        onClick={() => toggleTip(idx)}
                                        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none cursor-pointer"
                                    >
                                        <span className="text-slate-200 font-bold text-sm md:text-lg">{tip.pregunta}</span>
                                        <svg className={`w-5 h-5 text-slate-400 transform transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <div className="px-6 pb-6 text-slate-400 font-medium text-xs md:text-base leading-relaxed border-t border-slate-700/30 pt-4 mt-2">
                                            {tip.respuesta}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
