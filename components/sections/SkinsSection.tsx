'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import SkinCard from '@/components/SkinCard';
import { translations } from '@/lib/translations';
import { currentSkins, oldSkins } from '@/lib/data/skins';
import type { Lang, OsuSkin } from '@/lib/types';

interface SkinsSectionProps {
    lang: Lang;
    selectedSkin: OsuSkin | null;
    onSelectSkin: (skin: OsuSkin) => void;
    onCloseSkin: () => void;
    onOpenLightbox: (index: number) => void;
}

export default function SkinsSection({ lang, selectedSkin, onSelectSkin, onCloseSkin, onOpenLightbox }: SkinsSectionProps) {
    const t = translations[lang];
    const [activePreviewKey, setActivePreviewKey] = useState<string | null>(null);

    const handleCardClick = (skin: OsuSkin) => {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (!isMobile) {
            onSelectSkin(skin);
            setActivePreviewKey(null);
            return;
        }
        const key = skin.title;
        if (activePreviewKey === key) {
            onSelectSkin(skin);
            setActivePreviewKey(null);
        } else {
            setActivePreviewKey(key);
        }
    };

    return (
        <motion.div
            key="skins"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center grow w-full"
        >
            {!selectedSkin ? (
                <motion.div
                    key="catalogo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full flex flex-col items-center"
                >
                    <div className="w-full flex flex-col items-center mb-20 relative">
                        <div className="w-full lg:w-[calc(100%+6rem)] lg:-mx-12 -mt-4 mb-3">
                            <div className="relative w-full h-40 lg:h-48 overflow-hidden flex items-center">
                                <div
                                    className="absolute top-0 left-0 h-full w-[90%] md:w-[70%] z-0"
                                    style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
                                >
                                    <div
                                        className="absolute inset-0 w-full h-full"
                                        style={{ maskImage: 'linear-gradient(to right, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)' }}
                                    >
                                        <Image src="/banner-miku-current.webp" alt="Banner Current" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover object-[center_10%] opacity-60 grayscale-25" />
                                    </div>
                                </div>

                                <div className="relative z-10 w-full flex justify-end px-6 md:px-12 pointer-events-none">
                                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter lowercase bg-clip-text text-transparent bg-linear-to-r from-slate-500 via-slate-300 to-white drop-shadow-lg" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                        {t.currentSkinsHeader}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="w-[calc(100%-3rem)] mx-6 md:mx-auto h-0.5 bg-slate-700/60 rounded-full shadow-inner mb-12"></div>

                        <div className="w-[calc(100%-3rem)] max-w-5xl relative px-4 md:px-8 py-2 mx-6 md:mx-auto">
                            <div className="absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-cyan-600/70 via-cyan-700/40 to-cyan-800/60"></div>
                            <div className="absolute top-0 bottom-0 right-0 w-px bg-linear-to-b from-cyan-600/70 via-cyan-700/40 to-cyan-800/60"></div>
                            <div className="absolute top-0 left-0 w-6 h-px bg-cyan-700/60"></div>
                            <div className="absolute top-0 right-0 w-6 h-px bg-cyan-700/60"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-px bg-cyan-700/60"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-px bg-cyan-700/60"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
                                {currentSkins.map((skin) => (
                                    <SkinCard key={skin.title} skin={skin} previewActive={activePreviewKey === skin.title} onCardClick={handleCardClick} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col items-center mb-10 relative">
                        <div className="w-full lg:w-[calc(100%+6rem)] lg:-mx-12 -mt-4 mb-3">
                            <div className="relative w-full h-40 lg:h-48 overflow-hidden flex items-center">
                                <div
                                    className="absolute top-0 left-0 h-full w-[90%] md:w-[70%] z-0"
                                    style={{
                                        maskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)'
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 w-full h-full"
                                        style={{ maskImage: 'linear-gradient(to right, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 30%, transparent 100%)' }}
                                    >
                                        <Image src="/banner-miku-oldd.webp" alt="Banner Old" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover object-[center_5%] opacity-50 grayscale-40" />
                                    </div>
                                </div>

                                <div className="relative z-10 w-full flex justify-end px-6 md:px-12 pointer-events-none">
                                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter lowercase bg-clip-text text-transparent bg-linear-to-r from-slate-600 via-slate-400 to-slate-200 drop-shadow-lg" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                        {t.oldSkinsHeader}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="w-[calc(100%-3rem)] max-w-5xl mx-6 md:mx-auto h-0.5 bg-slate-700/60 rounded-full shadow-inner mb-12"></div>

                        <div className="w-[calc(100%-3rem)] max-w-5xl relative px-4 md:px-8 py-2 mx-6 md:mx-auto">
                            <div className="absolute top-0 bottom-0 left-0 w-px bg-linear-to-b from-slate-600/60 via-slate-700/40 to-slate-800/60"></div>
                            <div className="absolute top-0 bottom-0 right-0 w-px bg-linear-to-b from-slate-600/60 via-slate-700/40 to-slate-800/60"></div>

                            <div className="absolute top-0 left-0 w-6 h-px bg-slate-600/50"></div>
                            <div className="absolute top-0 right-0 w-6 h-px bg-slate-600/50"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-px bg-slate-600/50"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-px bg-slate-600/50"></div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
                                {oldSkins.map((skin) => (
                                    <SkinCard key={skin.title} skin={skin} previewActive={activePreviewKey === skin.title} onCardClick={handleCardClick} />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : (

                <motion.div
                    key="detalle"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-[calc(100%-3rem)] max-w-5xl px-6 md:px-12 pt-8 mx-6 md:mx-auto"
                >
                    <div className="w-full flex flex-col">
                        <button
                            onClick={() => onCloseSkin()}
                            className="mb-6 flex items-center text-slate-400 hover:text-slate-200 transition-colors w-fit gap-2 font-bold uppercase tracking-wider text-sm cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            {t.backToCatalog}
                        </button>

                        <div className="w-full aspect-video md:aspect-21/9 md:h-112.5 relative rounded-2xl md:rounded-3xl overflow-hidden border border-slate-700/50 shadow-[0_0_30px_rgba(0,0,0,0.8)] mx-auto max-w-full">
                            <Image
                                src={selectedSkin.banner || selectedSkin.img}
                                alt={selectedSkin.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 1000px"
                                className="object-cover opacity-80 grayscale-10"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#050b14]/95 via-[#050b14]/40 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-3 md:p-10 flex flex-col items-start w-full z-10">
                                <h2 className="text-xl md:text-2xl lg:text-5xl font-black text-white tracking-tight drop-shadow-lg mb-2 lg:mb-4">
                                    {selectedSkin.title}
                                </h2>
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5 w-full">
                                    <a
                                        href={selectedSkin.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#102a54]/80 hover:bg-[#1a3a6a] border border-slate-600/50 text-slate-200 hover:text-white font-black uppercase tracking-wider py-1.5 md:py-2.5 lg:py-4 px-3.5 md:px-5 lg:px-8 rounded-lg md:rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(16,42,84,0.4)] hover:shadow-[0_0_20px_rgba(30,64,120,0.6)] hover:-translate-y-1 flex items-center justify-center gap-1.5 md:gap-2 cursor-pointer w-fit text-[11px] md:text-sm lg:text-base"
                                    >
                                        <svg className="w-3.5 h-3.5 md:w-6 md:h-6 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        {t.downloadSkin}
                                    </a>
                                    <p className="hidden md:block text-slate-300 text-base font-medium max-w-xl leading-relaxed">
                                        {lang === 'es' ? selectedSkin.desc : (selectedSkin.descEn || selectedSkin.desc)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 md:mt-6 bg-[#050b14]/50 border border-slate-700/40 rounded-2xl p-3 md:p-4 md:hidden">
                            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
                                {lang === 'es' ? selectedSkin.desc : (selectedSkin.descEn || selectedSkin.desc)}
                            </p>
                        </div>

                        {!oldSkins.includes(selectedSkin) && (
                            <div className="mt-3 md:mt-12 bg-[#050b14]/40 border border-slate-700/40 p-4 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-md">
                                <div className="flex items-center gap-3 border-b border-slate-700/50 pb-4 mb-6">
                                    <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                    <h3 className="text-xl font-bold text-slate-200 tracking-wide">{t.screenshots}</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {(selectedSkin.screenshots && selectedSkin.screenshots.length > 0) ? (
                                        selectedSkin.screenshots.map((ss, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => { onOpenLightbox(idx)}}
                                                className="relative overflow-hidden rounded-xl aspect-video border border-slate-700/50 hover:border-slate-400 cursor-pointer shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(100,116,139,0.3)] group bg-[#050b14]"
                                            >
                                                <Image
                                                    src={ss}
                                                    alt={`Screenshot ${idx + 1}`}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 grayscale-20 group-hover:grayscale-0"
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-700/50 rounded-2xl text-slate-500 bg-[#050b14]/30">
                                            <svg className="w-12 h-12 mb-3 opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                                            <span className="font-semibold uppercase tracking-widest text-sm text-slate-400">{t.screenshotsNotAvailable}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {selectedSkin.creators && selectedSkin.creators.length > 0 && (
                            <div className="mt-3 md:mt-8 bg-[#050b14]/40 border border-slate-700/40 p-4 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">

                                <div className="flex flex-col items-center md:items-start gap-1">
                                    <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">
                                        {selectedSkin.creators.length > 1 ? t.originalCreators : t.originalCreator}
                                    </h3>
                                    <p className="text-slate-500 text-xs font-medium text-center md:text-left">
                                        {selectedSkin.creators.length > 1 ? t.creditsDisclaimerPlural : t.creditsDisclaimerSingle}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-3 w-full md:w-auto">
                                    {selectedSkin.creators.map((creator, index) => (
                                        <div key={index} className="flex flex-row items-stretch bg-white/5 border border-slate-700/50 rounded-xl overflow-hidden shadow-md">
                                            <a
                                                href={`https://osu.ppy.sh/users/${creator.osuId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 group/creator hover:bg-white/10 p-2.5 transition-colors flex-1"
                                                title={t.viewOsuProfileTooltip}
                                            >
                                                <div className="relative w-10 h-10 rounded-md overflow-hidden border border-slate-600 group-hover/creator:border-slate-300 transition-colors bg-[#050b14] shrink-0">
                                                    <Image
                                                        src={`https://a.ppy.sh/${creator.osuId}`}
                                                        alt={creator.name}
                                                        fill
                                                        unoptimized
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <span className="text-slate-200 text-sm md:text-base font-bold group-hover/creator:text-white transition-colors pr-2 whitespace-nowrap">
                                                    {creator.name}
                                                </span>
                                            </a>

                                            {creator.postUrl && (
                                                <div className="w-px bg-slate-700/50 my-2"></div>
                                            )}
                                            {creator.postUrl && (
                                                <a
                                                    href={creator.postUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center gap-1.5 px-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-slate-300 hover:bg-white/10 transition-colors"
                                                    title={t.viewOriginalPostTooltip}
                                                >
                                                    {t.viewOriginalPost}
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
