'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import LazyYoutubeVideo from '@/components/LazyYoutubeVideo';
import { translations } from '@/lib/translations';
import { diaryData } from '@/lib/data/diary';
import type { Lang } from '@/lib/types';

const ICE_SHAPES = ['ice-shape-1', 'ice-shape-2', 'ice-shape-3', 'ice-shape-4'];
const ICE_FLOATS = ['ice-float-1', 'ice-float-2', 'ice-float-3', 'ice-float-4'];

export default function DiarySection({ lang }: { lang: Lang }) {
    const t = translations[lang];
    const timelineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start 0.9', 'end 0.4']
    });
    const depthOverlay = useTransform(scrollYProgress, [0, 1], [0, 0.85]);

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
                                src="/diary.webp"
                                alt="Banner Diary"
                                fill
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                className="object-cover object-[center_90%] opacity-90"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-[#050b14]/70 via-[#050b14]/10 to-transparent"></div>
                        </div>

                        <div className="relative z-10 w-full flex flex-col justify-center px-8 md:px-16 pb-8 pointer-events-none">
                            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,1)]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                <span className="text-white">DIA</span>
                                <span className="text-cyan-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">RY</span>
                            </h2>
                            <p className="text-cyan-50/90 mt-2 font-medium text-xs md:text-base max-w-xl drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
                                {t.diarySubtitle}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full px-4 md:px-8 lg:px-0">
                    <div className="w-full h-0.5 bg-slate-700/60 rounded-full shadow-inner mb-12"></div>

                    <div ref={timelineRef} className="relative w-full max-w-5xl mx-auto">
                        {/* Profundidad dinámica: oscurecimiento progresivo conforme se desciende */}
                        <motion.div
                            style={{ opacity: depthOverlay }}
                            className="pointer-events-none absolute -inset-x-4 -inset-y-8 bg-[#01030a] z-0"
                        />
                        <div className="pointer-events-none absolute -inset-x-4 -inset-y-8 bg-linear-to-b from-transparent via-[#02040a]/20 to-[#01030a]/70 z-0" />

                        {/* Sonda luminosa central */}
                        <div className="absolute left-5 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 z-[1]">
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-linear-to-b from-cyan-200/70 via-cyan-400/25 to-cyan-200/10"></div>
                            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] blur-[3px] bg-cyan-300/30"></div>
                        </div>

                        <div className="relative z-10">
                            {diaryData.map((item, i) => {
                                const isVideo = item.tipo === 'video';
                                const isLeft = i % 2 === 0;
                                const shape = ICE_SHAPES[i % ICE_SHAPES.length];
                                const float = ICE_FLOATS[i % ICE_FLOATS.length];
                                const title = lang === 'es' ? item.titulo : (item.tituloEn || item.titulo);
                                const content = lang === 'es' ? item.contenido : (item.contenidoEn || item.contenido);
                                const nodeLabel = isVideo ? title : title.split(':')[0];

                                return (
                                    <div key={item.id} className="relative lg:grid lg:grid-cols-2 lg:gap-x-24 lg:items-center mb-8 lg:mb-14">

                                        {/* Nodo: fecha/label sobre la línea + punto luminoso */}
                                        <div className="absolute left-5 lg:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                                            <span className="hidden lg:inline-block font-mono text-[10px] md:text-xs text-rose-400/90 uppercase tracking-widest whitespace-nowrap px-2 py-1 bg-[#050b14]/70 border border-rose-500/30 rounded-full backdrop-blur-sm mb-2 shadow-[0_0_14px_rgba(244,63,94,0.28)]">
                                                {nodeLabel}
                                            </span>
                                            <span className="w-3 h-3 rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.9)] ring-2 ring-cyan-300/30"></span>
                                        </div>

                                        {/* Cable de conexión hacia la tarjeta (desktop) */}
                                        <span className={`hidden lg:block absolute top-1/2 -translate-y-1/2 h-px w-14 ${isLeft ? 'right-1/2 bg-linear-to-l from-cyan-200/60 to-transparent' : 'left-1/2 bg-linear-to-r from-cyan-200/60 to-transparent'}`}></span>

                                        {/* Cable de conexión (mobile) */}
                                        <span className="lg:hidden absolute left-5 top-1/2 -translate-y-1/2 h-px w-4 bg-linear-to-r from-cyan-200/60 to-transparent"></span>

                                        <div className={`ml-12 lg:ml-0 ${isLeft ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-2 lg:row-start-1'}`}>
                                            <div className={float}>
                                                <div className={`${shape} relative bg-linear-to-br from-cyan-200/50 via-white/10 to-cyan-100/10 p-px`}>
                                                    <div className="relative bg-[#071120]/80 backdrop-blur-md px-6 py-8 lg:px-8 lg:py-10 overflow-hidden">
                                                        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/10 to-transparent"></div>

                                                        {isVideo ? (
                                                            <>
                                                                <p className="lg:hidden font-mono text-[10px] md:text-xs text-rose-400/90 uppercase tracking-widest mb-3">
                                                                    {title}
                                                                </p>
                                                                <p className="relative text-slate-200 text-xs md:text-sm leading-relaxed font-medium mb-5">
                                                                    {content}
                                                                </p>
                                                                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-slate-700">
                                                                    <LazyYoutubeVideo
                                                                        url={item.videoUrl as string}
                                                                        title={item.titulo}
                                                                    />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <h3 className="relative font-mono text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mb-3">
                                                                    {title}
                                                                </h3>
                                                                <p className="relative text-slate-200 text-xs md:text-sm leading-relaxed font-medium">
                                                                    {content}
                                                                </p>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
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
