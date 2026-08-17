'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { translations } from '@/lib/translations';
import { setupItemsData } from '@/lib/data/setup';
import type { Lang } from '@/lib/types';

interface SetupSectionProps {
    lang: Lang;
    onOpenLightbox: (images: string[]) => void;
}

export default function SetupSection({ lang, onOpenLightbox }: SetupSectionProps) {
    const t = translations[lang];
    const setupItems = setupItemsData[lang];
    const [openDetails, setOpenDetails] = useState<number | null>(null);

    const toggleDetails = (idx: number) => {
        setOpenDetails(prev => prev === idx ? null : idx);
    };

    return (
        <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center grow w-full"
        >
            <div className="w-full flex flex-col items-center">

                <div className="w-full lg:w-[calc(100%+6rem)] lg:-mx-12 -mt-4 mb-2">
                    <div
                        className="relative w-full h-48 lg:h-60 overflow-hidden flex items-center"
                        style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
                    >
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="/banner-setup.jpg"
                                alt="Banner Setup"
                                fill
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                className="object-cover object-[center_28%] opacity-75 grayscale-10"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-[#050b14]/95 via-[#050b14]/70 to-[#050b14]/20"></div>
                        </div>
                        <div className="relative z-10 w-full flex flex-col justify-center px-6 md:px-16 pb-6 md:pb-8 pointer-events-none">
                            <h2 className="text-2xl lg:text-5xl font-black tracking-tighter uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,1)]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                <span className="text-white">Setup &</span> <span className="text-teal-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] ml-2">Gear</span>
                            </h2>
                            <p className="text-cyan-50/90 mt-1.5 md:mt-2 font-medium text-xs md:text-sm max-w-md md:max-w-xl drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] whitespace-pre-line">
                                {t.setupSubtitle}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-[calc(100%-3rem)] mx-6 md:mx-auto h-0.5 bg-slate-700/60 rounded-full shadow-inner mb-12"></div>

                <div className="w-[calc(100%-3rem)] max-w-5xl relative px-4 md:px-8 py-4 mx-6 md:mx-auto">
                    <div className="absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-slate-600/50 via-transparent to-slate-600/50"></div>
                    <div className="absolute top-0 bottom-0 right-0 w-px bg-linear-to-b from-slate-600/50 via-transparent to-slate-600/50"></div>

                    <div className="absolute top-0 left-0 w-6 h-px bg-slate-600/50"></div>
                    <div className="absolute top-0 right-0 w-6 h-px bg-slate-600/50"></div>

                    <div className="absolute bottom-0 left-0 w-6 h-px bg-slate-600/50"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-px bg-slate-600/50"></div>

                    <div className="flex flex-col gap-6 md:gap-8">
                        {setupItems.map((item, idx) => {
                            const isEven = idx % 2 === 0;

                            return (
                                <div key={idx} className="relative w-full h-auto min-h-44 lg:min-h-88 bg-[#050b14]/50 border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-slate-500/50 hover:bg-[#0a1324]/50 transition-all duration-500 flex items-center shadow-lg">
                                    <div
                                        className={`absolute top-0 bottom-0 w-full md:w-[65%] z-0 ${isEven ? 'left-0' : 'right-0'}`}
                                        style={{
                                            WebkitMaskImage: isEven
                                                ? 'linear-gradient(to right, black 40%, transparent 100%)'
                                                : 'linear-gradient(to left, black 40%, transparent 100%)',
                                            maskImage: isEven
                                                ? 'linear-gradient(to right, black 40%, transparent 100%)'
                                                : 'linear-gradient(to left, black 40%, transparent 100%)'
                                        }}
                                    >
                                        <Image
                                            src={item.img}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 65vw"
                                            className="object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-500 mix-blend-screen"
                                            style={{ objectPosition: item.objectPos || 'center' }}
                                        />
                                    </div>

                                    <div className={`relative z-10 w-full p-4 md:p-12 flex flex-col justify-center h-full ${isEven ? 'items-end text-right ml-auto' : 'items-start text-left mr-auto'} md:w-[60%]`}>

                                        <h3 className="text-xl md:text-3xl font-black text-white mb-2 md:mb-3 tracking-wide group-hover:text-sky-100 transition-colors" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                            {item.name}
                                        </h3>

                                        <div className={`flex items-center gap-1.5 md:gap-3 flex-wrap w-full mt-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-white/5 border border-slate-600 rounded-full text-[10px] md:text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 hover:border-slate-400 transition-all cursor-pointer">
                                                {t.viewOnAmazon}
                                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            </a>
                                            {item.aliexpress && (
                                                <a href={item.aliexpress} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-orange-500/10 border border-orange-500/40 rounded-full text-[10px] md:text-xs font-bold text-orange-300 hover:text-orange-100 hover:bg-orange-500/20 hover:border-orange-400/60 transition-all cursor-pointer">
                                                    {t.viewOnAliExpress}
                                                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                </a>
                                            )}
                                            <button
                                                onClick={() => toggleDetails(idx)}
                                                className="flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-[#102a54]/70 border border-slate-600/70 rounded-full text-[10px] md:text-xs font-bold text-slate-200 hover:text-white hover:bg-[#1a3a6a] hover:border-slate-500 transition-all cursor-pointer"
                                            >
                                                {t.viewDetails}
                                                <svg className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 transition-transform duration-300 ${openDetails === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                                            </button>
                                        </div>

                                        <AnimatePresence initial={false}>
                                            {openDetails === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                                                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                                    className="overflow-hidden max-w-[80%] md:max-w-md"
                                                >
                                                    <div className="relative bg-[#0a1324]/80 border border-slate-700/40 rounded-xl">
                                                        <p className="text-slate-300 text-xs md:text-base leading-relaxed font-medium drop-shadow-md p-2.5 md:p-4 pr-6 md:pr-10 text-left">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                    </div>
                                    {item.screenshots && item.screenshots.length > 0 && (
                                        <button
                                            onClick={() => onOpenLightbox(item.screenshots!)}
                                            className={`absolute bottom-2 md:bottom-6 ${isEven ? 'left-3 md:left-6' : 'right-3 md:right-6'} z-30 flex items-center justify-center w-7 h-7 md:w-10 md:h-10 bg-[#050b14]/60 text-slate-500 border border-slate-700/50 rounded-lg hover:bg-white/5 hover:border-slate-500/60 hover:text-slate-300 transition-all duration-300 shadow-md group/gear cursor-pointer`}
                                                        title={t.viewConfigTooltip}
                                        >
                                            <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover/gear:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
