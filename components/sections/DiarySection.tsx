'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import LazyYoutubeVideo from '@/components/LazyYoutubeVideo';
import { translations } from '@/lib/translations';
import { diaryData } from '@/lib/data/diary';
import type { Lang } from '@/lib/types';

export default function DiarySection({ lang }: { lang: Lang }) {
    const t = translations[lang];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center grow w-full"
        >
            <div className="w-full flex flex-col items-center">
                <div className="w-full md:w-[calc(100%+6rem)] md:-mx-12 -mt-4 mb-2">
                    <div className="relative w-full h-56 md:h-72 overflow-hidden flex items-center">

                        <div
                            className="absolute inset-0 z-0"
                            style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
                        >
                            <Image
                                src="/diary.jpg"
                                alt="Banner Diary"
                                fill
                                sizes="(max-width: 1024px) 100vw, 1024px"
                                className="object-cover object-[center_90%] opacity-90"
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-[#050b14]/70 via-[#050b14]/10 to-transparent"></div>
                        </div>

                        <div className="relative z-10 w-full flex flex-col justify-center px-8 md:px-16 pb-8 pointer-events-none">
                            <h2 className="text-2xl md:text-5xl font-black tracking-tighter uppercase drop-shadow-[0_3px_10px_rgba(0,0,0,1)]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                <span className="text-white">DIA</span>
                                <span className="text-cyan-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">RY</span>
                            </h2>
                            <p className="text-cyan-50/90 mt-2 font-medium text-xs md:text-base max-w-xl drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
                                {t.diarySubtitle}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full px-4 md:px-0">
                    <div className="w-full h-0.5 bg-slate-700/60 rounded-full shadow-inner mb-12"></div>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full">
                        {diaryData.map((item) => (
                        item.tipo === 'dato' ? (
                            <div key={item.id} className="bg-[#050b14]/60 border border-slate-700/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
                                <h3 className="font-mono text-[10px] md:text-xs text-slate-400 mb-3 uppercase tracking-widest">
                                    {lang === 'es' ? item.titulo : (item.tituloEn || item.titulo)}
                                </h3>
                                <p className="text-slate-200 text-xs leading-relaxed font-medium">
                                    {lang === 'es' ? item.contenido : (item.contenidoEn || item.contenido)}
                                </p>
                            </div>
                        ) : (
                            <div key={item.id} className="break-inside-avoid bg-[#0a1324]/80 border border-slate-700/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm group flex flex-col justify-between">
                                <div>
                                    <h3 className="font-mono text-[10px] md:text-xs text-rose-500/80 mb-3 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                                        {lang === 'es' ? item.titulo : (item.tituloEn || item.titulo)}
                                    </h3>
                                    <p className="text-slate-300 text-xs leading-relaxed font-medium mb-5">
                                        {lang === 'es' ? item.contenido : (item.contenidoEn || item.contenido)}
                                    </p>
                                </div>
                                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden border border-slate-700 relative">
                                    <LazyYoutubeVideo
                                        url={item.videoUrl as string}
                                        title={item.titulo}
                                    />
                                </div>
                            </div>
                        )
                    ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
