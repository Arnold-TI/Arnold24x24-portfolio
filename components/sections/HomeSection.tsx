'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TwitchStatsCard from '@/components/TwitchStatsCard';
import { getGradeStyle } from '@/lib/grade';
import { manualTopPlays } from '@/lib/data/plays';
import { recommendedVideos, featuredTweets } from '@/lib/data/social';
import { translations } from '@/lib/translations';
import type { Lang, OsuStats, TopPlay } from '@/lib/types';

interface HomeSectionProps {
    lang: Lang;
    osuStats: OsuStats;
    topPlays: TopPlay[];
    showTopPlays: boolean;
    setShowTopPlays: (v: boolean) => void;
    handleCopy: (text: string) => void;
    copiedId: string | null;
}

export default function HomeSection({ lang, osuStats, topPlays, showTopPlays, setShowTopPlays, handleCopy, copiedId }: HomeSectionProps) {
    const t = translations[lang];

    return (
        <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="w-full relative z-10 mb-6 md:mb-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-[calc(100%+6rem)] lg:-mx-12 -mt-4"
                >
                    <div className="relative w-full aspect-[4.8/1] lg:aspect-5/1 overflow-hidden border-b border-slate-700/80 shadow-[0_15px_40px_rgba(5,11,20,0.4)]">
                        <Image
                            src="/Banner-Arnold24x24.png"
                            alt="Welcome to Arnold24x24"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover block"
                        />
                    </div>
                </motion.div>
            </div>

            <div className="w-full px-4 lg:px-0 flex flex-col items-center">
            <div className="w-full flex justify-center mb-6 md:mb-8">
                <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-2.5 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
                    <button
                        onClick={() => document.getElementById('osu-stats')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-3 py-1 md:px-4 md:py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 text-xs md:text-sm lg:text-base font-bold tracking-wide cursor-pointer"
                    >
                        osu! Stats
                    </button>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600/50 hidden md:block"></span>
                    <button
                        onClick={() => document.getElementById('socials')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-3 py-1 md:px-4 md:py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 text-xs md:text-sm lg:text-base font-bold tracking-wide cursor-pointer"
                    >
                        Social Media
                    </button>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600/50 hidden md:block"></span>
                    <button
                        onClick={() => document.getElementById('gaming')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-3 py-1 md:px-4 md:py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 text-xs md:text-sm lg:text-base font-bold tracking-wide cursor-pointer"
                    >
                        Gaming Profile
                    </button>
                </div>
            </div>

            <div className="w-full mb-8 md:mb-12 bg-[#1e293b]/40 border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg">
                <div className="p-4 md:p-8 flex flex-row items-center md:items-start gap-4 md:gap-6 relative">

                    <div className="relative z-10 shrink-0 bg-white overflow-hidden rounded-xl border border-slate-700/80 shadow-md w-20 h-20 md:w-36 md:h-36">
                        <Image
                            src="/mikugif.gif"
                            alt="Miku GIF"
                            fill
                            sizes="(max-width: 768px) 80px, 144px"
                            unoptimized
                            loading="eager"
                            className="object-cover"
                        />
                    </div>

                    <div className="relative z-10 flex-1 w-full">
                        <h3 className="text-xl md:text-3xl tracking-wide uppercase font-black text-center mb-2 md:mb-3" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                            <span className="text-white">{t.heroTitleQuestion}</span> <span className="text-cyan-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{t.heroTitleHighlight}</span>
                        </h3>
                        <div className="w-full h-0.5 bg-slate-700/60 mb-3 md:mb-4 rounded-full"></div>
                        <p className="text-slate-300 text-xs lg:text-base leading-relaxed font-medium text-center">
                            {t.heroDescription}
                        </p>
                    </div>
                </div>
            </div>

            <div id="osu-stats" className="scroll-mt-24 w-full flex flex-col mb-6">
                <div className="w-full flex justify-start mb-2 md:mb-3">
                    <h2 className="text-xl lg:text-3xl text-white drop-shadow-md flex items-center gap-3" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                        osu! Stats
                    </h2>
                </div>
                <div className="w-full h-0.5 bg-slate-700/60 rounded-full shadow-inner"></div>
            </div>

            <div
                className="relative w-full mb-10 bg-[#050b14]/90 border-2 border-slate-700/80 rounded-none shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:bg-[#0a1324]/90 hover:border-slate-500/80 backdrop-blur-md min-h-72 md:min-h-120"
            >
                <div className="absolute inset-0 z-0">
                    <Image
                        src={osuStats.bannerUrl}
                        alt="Banner"
                        fill
                        unoptimized
                        priority
                        loading="eager"
                        sizes="100vw"
                        className="object-cover opacity-100 transition-opacity duration-500 grayscale-10"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-[#050b14] via-[#050b14]/80 to-[#102a54]/40 transition-colors duration-500"></div>
                </div>
                <div className="absolute top-0 left-0 bottom-0 w-20 bg-[#0f172a]/95 border-r border-slate-700/50 hidden md:flex flex-col items-center justify-evenly py-4 z-30 shadow-[2px_0_15px_rgba(0,0,0,0.6)] backdrop-blur-md">
                    {[...Array(6)].map((_, i) => (
                        <div key={`left-leek-${i}`} className="relative w-16 h-12">
                            <Image
                                src="/Gear-Hachune_Miku_Leek_Render.png"
                                alt="Leek"
                                fill
                                loading="eager"
                                sizes="64px"
                                className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-80 hover:opacity-100 hover:scale-110 hover:-rotate-12 transition-all cursor-default"
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-[#0f172a]/95 border-l border-slate-700/50 hidden md:flex flex-col items-center justify-evenly py-4 z-30 shadow-[-2px_0_15px_rgba(0,0,0,0.6)] backdrop-blur-md">
                    {[...Array(6)].map((_, i) => (
                        <div key={`right-leek-${i}`} className="relative w-16 h-12">
                            <Image
                                src="/Gear-Hachune_Miku_Leek_Render.png"
                                alt="Leek"
                                fill
                                loading="eager"
                                sizes="64px"
                                className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-80 hover:opacity-100 hover:scale-110 hover:-rotate-12 transition-all cursor-default"
                            />
                        </div>
                    ))}
                </div>

                <div className={`relative z-10 py-5 px-5 md:py-8 md:px-32 flex flex-row md:flex-row items-start md:items-start gap-4 md:gap-8 transition-opacity duration-500 ${showTopPlays ? 'opacity-0' : 'opacity-100'}`}>

                    <div className="flex flex-col items-center gap-2 md:gap-3 shrink-0 w-16 md:w-44">
                        <a href="https://osu.ppy.sh/users/Arnold24x24" target="_blank" rel="noopener noreferrer" className="relative block group/avatar cursor-pointer w-full">
                            <div className="absolute -inset-1 bg-linear-to-r from-slate-600 to-slate-400 rounded-2xl"></div>

                            <div className="relative w-full aspect-square hover:border-slate-400 backdrop-blur-sm rounded-2xl border-2 border-slate-600 group-hover/avatar:border-slate-400 overflow-hidden bg-[#050b14] transition-colors">
                                <Image src={osuStats.avatarUrl} alt="Avatar" fill loading="eager" unoptimized className="object-cover" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 bg-[#050b14] border border-slate-700 rounded-md md:rounded-lg px-1 py-0.5 md:px-2 md:py-1 flex items-center gap-1 md:gap-2 shadow-lg">
                                <span className="text-[9px] md:text-xs font-bold text-slate-300">{osuStats.country}</span>
                                <div className="relative w-3 h-2 md:w-5 md:h-3.5">
                                    <Image src={`https://flagcdn.com/${osuStats.country.toLowerCase()}.svg`} alt="Flag" fill className="rounded-sm object-cover" />
                                </div>
                            </div>
                        </a>

                        <div className="md:hidden flex flex-col items-center gap-2 mt-3">
                            <a href="https://osu.ppy.sh/teams/38254" target="_blank" rel="noopener noreferrer" className="relative w-12 h-4 block">
                                <Image src="/button1.gif" alt="Hoshinomori Aero Clan" width={88} height={31} unoptimized sizes="88px" className="object-cover" style={{ imageRendering: 'pixelated' }} />
                            </a>
                            <a href="https://discord.gg/Cvv69NB" target="_blank" rel="noopener noreferrer" className="relative w-12 h-4 block">
                                <Image src="/button2.gif" alt="Discord Server" width={88} height={31} unoptimized sizes="88px" className="object-cover" style={{ imageRendering: 'pixelated' }} />
                            </a>
                            <a href="https://discord.gg/DF3NZFhW7U" target="_blank" rel="noopener noreferrer" className="relative w-12 h-4 block">
                                <Image src="/button3.gif" alt="Osu Peru" width={88} height={31} unoptimized sizes="88px" className="object-cover" style={{ imageRendering: 'pixelated' }} />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="relative w-12 h-4 block">
                                <Image src="/button4.gif" alt="Extra Button" width={88} height={31} unoptimized sizes="88px" className="object-cover" style={{ imageRendering: 'pixelated' }} />
                            </a>
                        </div>

                        <div className="w-full md:flex flex-col items-center gap-2 mt-1 md:mt-2 hidden">

                            <div className="grid grid-cols-2 gap-1.5 md:gap-2 w-max">
                                <a
                                    href="https://osu.ppy.sh/teams/38254"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-12 h-4 md:w-22 md:h-7.75 block"
                                >
                                    <Image
                                        src="/button1.gif"
                                        alt="Hoshinomori Aero Clan"
                                        width={88}
                                        height={31}
                                        unoptimized
                                        sizes="88px"
                                        className="object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                </a>

                                <a
                                    href="https://discord.gg/Cvv69NB"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-12 h-4 md:w-22 md:h-7.75 block"
                                >
                                    <Image
                                        src="/button2.gif"
                                        alt="Discord Server"
                                        width={88}
                                        height={31}
                                        unoptimized
                                        sizes="88px"
                                        className="object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                </a>

                                <a
                                    href="https://discord.gg/DF3NZFhW7U"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-12 h-4 md:w-22 md:h-7.75 block"
                                >
                                    <Image
                                        src="/button3.gif"
                                        alt="Osu Peru"
                                        width={88}
                                        height={31}
                                        unoptimized
                                        sizes="88px"
                                        className="object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                </a>

                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-12 h-4 md:w-22 md:h-7.75 block"
                                >
                                    <Image
                                        src="/button4.gif"
                                        alt="Extra Button"
                                        width={88}
                                        height={31}
                                        unoptimized
                                        sizes="88px"
                                        className="object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="flex-1 w-full text-left md:text-left mt-0 md:mt-0 flex flex-col min-w-0">
                        <h2 className="text-xl lg:text-5xl mb-1.5 lg:mb-2 tracking-wider font-black drop-shadow-[0_3px_10px_rgba(0,0,0,1)]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                            <span className="text-white">ARNOLD</span><span className="text-cyan-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">24X24</span>
                        </h2>

                        <div className="flex items-center justify-start gap-2 md:gap-3 mb-3 md:mb-6 flex-wrap">
                            <span className="px-2 py-0.5 md:px-3 md:py-1 bg-[#0f172a]/80 border border-slate-700/50 rounded-full text-slate-300 text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-inner">osu! Standard</span>
                            <span className="text-slate-300 text-[11px] md:text-sm font-bold bg-[#050b14]/60 border border-slate-700/50 px-2 py-0.5 md:px-3 md:py-1 rounded-full backdrop-blur-sm shadow-inner">lvl {osuStats.level}</span>
                        </div>

                        <div className="grid grid-cols-4 md:grid-cols-4 gap-1 md:gap-3">
                            <div className="border border-white/5 rounded-md md:rounded-xl p-1.5 md:p-3 flex flex-col justify-center">
                                <p className="text-slate-400 text-[7px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-0.5 md:mb-1 leading-tight truncate">{t.globalRank}</p>
                                <p className="text-xs lg:text-2xl font-black text-white drop-shadow-md leading-tight">#{osuStats.rank.toLocaleString()}</p>
                            </div>

                            <div
                                className="border border-[#0ea5e9]/30 rounded-md md:rounded-xl p-1.5 md:p-3 cursor-pointer hover:border-[#0ea5e9]/70 hover:bg-[#0ea5e9]/5 transition-all group/pp relative overflow-hidden flex flex-col justify-center"
                                onClick={() => setShowTopPlays(true)}
                            >
                                <div className="transition-all duration-300 group-hover/pp:opacity-0 group-hover/pp:-translate-y-4">
                                    <p className="text-slate-400 text-[7px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-0.5 md:mb-1 flex justify-between items-center leading-tight truncate">
                                        {t.totalPP}
                                        <svg className="w-2 h-2 md:w-3.5 md:h-3.5 text-cyan-400/80 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                    </p>
                                    <p className="text-xs lg:text-2xl font-black text-cyan-400/80 drop-shadow-md leading-tight">
                                        {osuStats.pp.toLocaleString()}
                                    </p>
                                </div>

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/pp:opacity-100 group-hover/pp:translate-y-0 translate-y-4 transition-all duration-300">
                                    <p className="text-cyan-400 font-bold uppercase text-[7px] md:text-xs tracking-widest text-center animate-pulse">
                                        {t.viewTopPlays}
                                    </p>
                                </div>
                            </div>

                            <div className="border border-white/5 rounded-md md:rounded-xl p-1.5 md:p-3 flex flex-col justify-center">
                                <p className="text-slate-400 text-[7px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-0.5 md:mb-1 leading-tight truncate">{t.accuracy}</p>
                                <p className="text-xs lg:text-2xl font-black text-white drop-shadow-md leading-tight">{osuStats.accuracy}%</p>
                            </div>

                            <div className="border border-white/5 rounded-md md:rounded-xl p-1.5 md:p-3 flex flex-col justify-center">
                                <p className="text-slate-400 text-[7px] md:text-[10px] lg:text-xs font-bold uppercase tracking-wider mb-0.5 md:mb-1 leading-tight truncate">{t.playcount}</p>
                                <p className="text-xs lg:text-2xl font-black text-white drop-shadow-md leading-tight">{osuStats.plays.toLocaleString()}</p>
                            </div>
                        </div>

                        {osuStats.badges && osuStats.badges.length > 0 && (
                            <div className="mt-2 md:mt-6 pt-2 md:pt-4 border-t border-white/5 w-full">
                                <div className="flex md:flex-wrap gap-1.5 md:gap-2 justify-start md:justify-center overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                                    {osuStats.badges.map((badge) => (
                                        <a
                                            key={badge.imageUrl}
                                            href={badge.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={badge.description}
                                            className="hover:-translate-y-1 transition-all duration-300 flex items-center justify-center shrink-0"
                                        >
                                            <Image
                                                src={badge.imageUrl}
                                                alt={badge.description}
                                                width={86}
                                                height={40}
                                                unoptimized
                                                className="h-6 md:h-10 w-auto object-contain rounded-sm"
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                <div className={`absolute inset-0 z-20 pt-10 md:pt-14 pb-4 px-5 md:pl-28 md:pr-28 flex flex-col transition-opacity duration-500 bg-[#050b14]/98 ${showTopPlays ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowTopPlays(false); }}
                        className="absolute top-2 left-5 md:left-28 flex items-center justify-center w-7 h-7 md:w-8 md:h-8 bg-[#050b14]/60 text-slate-400 border border-slate-700/60 rounded-lg hover:bg-white/5 hover:border-slate-600/60 hover:text-slate-200 transition-colors duration-300 cursor-pointer z-30"
                        title={t.backTooltip}
                        aria-label={t.backTooltip}
                    >
                        <svg className="w-4 h-4 md:w-4.5 md:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                    </button>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-4 w-full overflow-y-auto max-h-full">
                        <div className="flex flex-col gap-1.5 relative">
                            <div className="flex items-center justify-between border-b border-slate-700/80 pb-1 md:pb-2 mb-1 md:mb-2">
                                <h3 className="text-sm md:text-xl text-white tracking-wide uppercase drop-shadow-md" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    {t.top5PP}
                                </h3>
                                <span className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{t.farmLabel}</span>
                            </div>

                            {topPlays.map((play, index) => {
                                const { display: gradeText, color: gradeColor } = getGradeStyle(play.grade);

                                return (
                                    <a
                                        key={play.id}
                                        href={play.legacyScoreId
                                            ? `https://osu.ppy.sh/scores/osu/${play.legacyScoreId}`
                                            : `https://osu.ppy.sh/scores/${play.id}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative flex items-center justify-between border border-slate-700/50 rounded-lg p-2 overflow-hidden group/play hover:border-slate-500/70 hover:bg-[#131f37]/60 transition-all bg-[#0f172a]/60 cursor-pointer"
                                    >
                                        <div className="absolute inset-0 z-0">
                                            <Image src={play.coverUrl} alt={play.song} fill unoptimized sizes="100vw" className="object-cover opacity-90 group-hover/play:opacity-100 transition-opacity duration-300 transform-gpu backface-hidden will-change-opacity" />
                                            <div className="absolute inset-0 bg-linear-to-r from-[#050b14]/90 via-[#050b14]/40 to-transparent"></div>
                                        </div>

                                        <div className="relative z-10 flex items-center gap-2 md:gap-3 overflow-hidden w-full">
                                            <span className="text-cyan-400/80 font-black text-base md:text-lg w-4 md:w-5 drop-shadow-md group-hover/play:scale-110 transition-transform">#{index + 1}</span>
                                            <div className="truncate">
                                                <p className="text-slate-100 font-bold text-xs md:text-sm truncate drop-shadow-[0_1px_3px_rgba(0,0,0,1)] group-hover/play:text-white transition-colors">{play.song}</p>
                                                <p className="text-slate-300 text-[9px] md:text-[10px] flex gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,1)] mt-0.5">
                                                    <span>[{play.diff}]</span>
                                                    <span className="text-yellow-400 font-bold group-hover/play:text-yellow-300 transition-colors">+{play.mods}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative z-10 ml-2 shrink-0 flex flex-col items-end drop-shadow-[0_1px_3px_rgba(0,0,0,1)] bg-[#050b14]/40 rounded-md px-1.5 py-0.5 backdrop-blur-sm">
                                            <p className="text-slate-100 font-black text-sm md:text-base group-hover/play:text-cyan-400/80 transition-colors leading-none">
                                                {play.pp} <span className="text-[9px] text-slate-400 font-bold">PP</span>
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="text-[9px] md:text-[10px] text-slate-300 font-bold">{play.accuracy}%</span>
                                                <span className={`text-xs md:text-sm font-black ${gradeColor}`}>{gradeText}</span>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between border-b border-slate-700/80 pb-1 md:pb-2 mb-1 md:mb-2">
                                <h3 className="text-sm md:text-xl text-white tracking-wide uppercase drop-shadow-md" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    {t.top5Fav}
                                </h3>
                                <span className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">{t.absoluteCinema}</span>
                            </div>

                            {manualTopPlays.map((play, index) => {
                                const { display: displayRank, color: gradeColor } = getGradeStyle(play.rank);

                                return (
                                    <a
                                        key={play.id}
                                        href={`https://osu.ppy.sh/scores/${play.scoreId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative flex items-center justify-between border border-slate-700/50 rounded-lg p-2 overflow-hidden group/play hover:border-slate-500/70 hover:bg-[#131f37]/60 transition-all bg-[#0f172a]/60 cursor-pointer"
                                    >
                                        <div className="absolute inset-0 z-0">
                                            <Image src={`https://assets.ppy.sh/beatmaps/${play.beatmapsetId}/covers/cover.jpg`} alt={play.title} fill unoptimized sizes="100vw" className="object-cover opacity-90 group-hover/play:opacity-100 transition-opacity duration-300 transform-gpu backface-hidden will-change-opacity" />
                                            <div className="absolute inset-0 bg-linear-to-r from-[#050b14]/90 via-[#050b14]/40 to-transparent"></div>
                                        </div>

                                        <div className="relative z-10 flex items-center gap-2 md:gap-3 overflow-hidden w-full">
                                            <span className="text-cyan-400/80 font-black text-base md:text-lg w-4 md:w-5 drop-shadow-md group-hover/play:scale-110 transition-transform">#{index + 1}</span>
                                            <div className="truncate">
                                                <p className="text-slate-100 font-bold text-xs md:text-sm truncate drop-shadow-[0_1px_3px_rgba(0,0,0,1)] group-hover/play:text-white transition-colors">{play.title}</p>
                                                <p className="text-slate-300 text-[9px] md:text-[10px] flex gap-1.5 drop-shadow-[0_1px_3px_rgba(0,0,0,1)] mt-0.5">
                                                    <span>[{play.difficulty}]</span>
                                                    <span className="text-yellow-400 font-bold group-hover/play:text-yellow-300 transition-colors">{play.mods}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative z-10 ml-2 shrink-0 flex flex-col items-end drop-shadow-[0_1px_3px_rgba(0,0,0,1)] bg-[#050b14]/40 rounded-md px-1.5 py-0.5 backdrop-blur-sm">
                                            <p className="text-slate-100 font-black text-sm md:text-base group-hover/play:text-cyan-400/80 transition-colors leading-none">
                                                {play.pp} <span className="text-[9px] text-slate-400 font-bold">PP</span>
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <span className="text-[9px] md:text-[10px] text-slate-300 font-bold">{play.acc}</span>
                                                <span className={`text-xs md:text-sm font-black ${gradeColor}`}>{displayRank}</span>
                                            </div>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div id="socials" className="scroll-mt-24 mt-8 md:mt-12 relative z-10 w-full flex flex-col gap-4">

                <div className="w-full flex flex-col">
                    <div className="w-full flex justify-start mb-2 md:mb-3">
                        <h2 className="text-xl lg:text-3xl text-white drop-shadow-md flex items-center gap-3" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                            Social Media
                        </h2>
                    </div>
                    <div className="w-full h-0.5 bg-slate-700/60 rounded-full shadow-inner"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mt-2 max-w-md md:max-w-3xl mx-auto">

                    <div className="w-full flex flex-col">
                        <div className="border-b border-slate-700/50 pb-2 mb-4">
                            <a href="https://twitch.tv/arnold24x24" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 w-fit group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-[#6366f1] transition-all duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" /></svg>

                                <h3 className="text-xl lg:text-2xl text-white group-hover:text-[#6366f1] tracking-wide uppercase transition-colors duration-300 drop-shadow-md" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    TWITCH
                                </h3>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center h-full border border-slate-700/50 rounded-xl relative overflow-hidden bg-[#0f172a]/60 hover:border-slate-500/50 backdrop-blur-md transition-all duration-300">
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                                <svg className="w-48 h-48 md:w-64 md:h-64 text-[#6366f1]" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" /></svg>
                            </div>

                            <div className="relative z-10 w-full h-full">
                                <TwitchStatsCard lang={lang} />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col">
                        <div className="relative w-full h-64 md:h-full md:min-h-80 flex items-center justify-center">
                            <div className="relative w-[85%] h-[85%]">
                                <Image
                                    src="/silueta.png"
                                    alt="Imagen Decorativa"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col">
                        <div className="border-b border-slate-700/50 pb-2 mb-4">
                            <a href="https://youtube.com/@Arnold24x24" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 w-fit group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                                <svg className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-[#e11d48] transition-all duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                <h3 className="text-xl lg:text-2xl text-white group-hover:text-[#e11d48] tracking-wide uppercase transition-colors duration-300 drop-shadow-md" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    YOUTUBE
                                </h3>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center h-full border border-slate-700/50 rounded-xl p-4 md:p-5 relative overflow-hidden bg-[#0f172a]/60 hover:border-slate-500/50 backdrop-blur-md transition-all duration-300">
                            <div className="relative z-10 flex flex-col gap-3 w-full">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.recommendations}</h4>

                                {recommendedVideos.map((video, index) => (
                                    <a key={index} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#050b14]/50 border border-slate-700/50 rounded-lg p-2 hover:border-red-500/50 hover:bg-red-500/10 transition-colors group/vid">

                                        <div className="w-1/3 aspect-video relative rounded bg-slate-800 overflow-hidden shrink-0">
                                            <Image
                                                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                                alt="Miniatura"
                                                fill
                                                unoptimized
                                                sizes="(max-width: 768px) 33vw, 20vw"
                                                className="object-cover opacity-60 group-hover/vid:opacity-100 transition-opacity duration-300 transform-gpu backface-hidden will-change-opacity"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <span className="text-red-500 text-sm drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] group-hover/vid:scale-125 transition-transform duration-300">▶</span>
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] text-red-400 font-bold uppercase mb-0.5">
                                                {lang === 'es' ? video.etiquetaEs : video.etiquetaEn}
                                            </p>
                                            <p className="text-xs text-slate-200 font-medium truncate group-hover/vid:text-white" title={video.titulo}>
                                                {video.titulo}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                                <svg className="w-48 h-48 md:w-64 md:h-64 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col">
                        <div className="border-b border-slate-700/50 pb-2 mb-4">
                            <a href="https://x.com/Arnold24x24" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 w-fit group cursor-pointer transition-transform duration-300 hover:-translate-y-1">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-cyan-400/80 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                <h3 className="text-xl lg:text-2xl text-white group-hover:text-cyan-400/80 tracking-wide uppercase transition-colors duration-300 drop-shadow-md" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    TWITTER
                                </h3>
                            </a>
                        </div>

                        <div className="flex flex-col justify-center h-full border border-slate-700/50 rounded-xl p-4 md:p-5 relative overflow-hidden bg-[#0f172a]/60 hover:border-slate-500/50 backdrop-blur-md transition-all duration-300">
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                                <svg className="w-48 h-48 md:w-64 md:h-64 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </div>

                            <div className="relative z-10 flex flex-col gap-3 w-full">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{t.relevantTweets}</h4>

                                {featuredTweets.map((tweet, index) => (
                                    <a key={index} href={tweet.url} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-1.5 bg-[#050b14]/50 border border-slate-700/50 rounded-lg p-3 hover:border-slate-500/60 hover:bg-white/5 transition-colors group/twit">
                                        <div className="flex items-center gap-2 mb-1">
                                            <svg className="w-4 h-4 text-sky-400/60 group-hover/twit:text-sky-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                            <p className="text-[10px] text-sky-400/80 font-bold uppercase">
                                                {lang === 'es' ? tweet.etiquetaEs : tweet.etiquetaEn}
                                            </p>
                                        </div>
                                        <p className="text-xs text-slate-300 font-medium group-hover/twit:text-white transition-colors">
                                            {lang === 'es' ? tweet.tituloEs : tweet.tituloEn}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col mt-8 mb-6 md:mt-16 md:mb-8">
                <div id="gaming" className="scroll-mt-24 w-full flex justify-start mb-2 md:mb-3">
                    <h2 className="text-xl lg:text-3xl text-white drop-shadow-md flex items-center gap-3" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                        Gaming Profile
                    </h2>
                </div>
                <div className="w-full h-0.5 bg-slate-700/60 rounded-full shadow-inner mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-center">
                    <div className="bg-[#0f172a]/60 backdrop-blur-md border border-slate-700/40 rounded-2xl px-6 py-4 flex flex-col shadow-lg w-full h-full justify-center">
                        <div className="flex flex-row items-center justify-between w-full py-3 hover:bg-white/5 hover:backdrop-blur-sm rounded-lg px-2 transition-colors duration-300 gap-2">
                            <a href="https://psnprofiles.com/arnold24-24" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link w-fit cursor-pointer shrink-0">
                                <div className="relative w-6 h-6 md:w-8 md:h-8 transition-all duration-300 group-hover/link:scale-105">
                                    <Image src="/ps-logo.png" alt="PSN Logo" fill sizes="32px" className="object-contain opacity-70 group-hover/link:grayscale-0 group-hover/link:opacity-100 transition-all duration-300" />
                                </div>
                                <span className="text-white tracking-widest text-xs sm:text-xl group-hover/link:text-[#00439C] transition-colors" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    PLAYSTATION ID:
                                </span>
                            </a>
                            <button onClick={() => handleCopy('arnold24-24')} className="relative flex group/copy cursor-pointer shrink-0">
                                <span className="text-slate-300 tracking-wider text-xs sm:text-lg group-hover/copy:text-white transition-colors" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    arnold24-24
                                </span>
                                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-600/90 backdrop-blur-md border border-cyan-400/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg pointer-events-none transition-all duration-300 whitespace-nowrap ${copiedId === 'arnold24-24' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    {t.copiedIdAlert}
                                </span>
                            </button>
                        </div>
                        <div className="w-full h-px bg-slate-700/50 shadow-inner"></div>

                        <div className="flex flex-row items-center justify-between w-full py-3 hover:bg-white/5 hover:backdrop-blur-sm rounded-lg px-2 transition-colors duration-300 gap-2">
                            <a href="https://steamcommunity.com/profiles/76561199183028639" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link w-fit cursor-pointer shrink-0">
                                <div className="relative w-6 h-6 md:w-8 md:h-8 transition-all duration-300 group-hover/link:scale-105">
                                    <Image src="/steam-logo.png" alt="Steam Logo" fill sizes="32px" className="object-contain opacity-70 group-hover/link:grayscale-0 group-hover/link:opacity-100 transition-all duration-300" />
                                </div>
                                <span className="text-white tracking-widest text-xs sm:text-xl group-hover/link:text-[#66c0f4] transition-colors" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    STEAM ID:
                                </span>
                            </a>

                            <button onClick={() => handleCopy('76561199183028639')} className="relative flex group/copy cursor-pointer shrink-0">
                                <span className="text-slate-300 tracking-wider text-xs sm:text-base md:text-[15px] group-hover/copy:text-white transition-colors" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    76561199183028639
                                </span>
                                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-600/90 backdrop-blur-md border border-cyan-400/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg pointer-events-none transition-all duration-300 whitespace-nowrap ${copiedId === '76561199183028639' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    {t.copiedIdAlert}
                                </span>
                            </button>
                        </div>
                        <div className="w-full h-px bg-slate-700/50 shadow-inner"></div>

                        <div className="flex flex-row items-center justify-between w-full py-3 hover:bg-white/5 hover:backdrop-blur-sm rounded-lg px-2 transition-colors duration-300 gap-2">
                            <div className="flex items-center gap-2 group/link w-fit cursor-default shrink-0">
                                <div className="relative w-6 h-6 md:w-8 md:h-8 transition-all duration-300 group-hover/link:scale-105">
                                    <Image src="/switch-logo.png" alt="Switch Logo" fill sizes="32px" className="object-contain opacity-70 group-hover/link:grayscale-0 group-hover/link:opacity-100 transition-all duration-300" />
                                </div>
                                <span className="text-white tracking-widest text-xs sm:text-xl group-hover/link:text-rose-500/90 transition-colors" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    NINTENDO ID:
                                </span>
                            </div>

                            <button onClick={() => handleCopy('SW-4025-3154-4149')} className="relative flex group/copy cursor-pointer shrink-0">
                                <span className="text-slate-300 tracking-wider text-xs sm:text-base md:text-[15px] group-hover/copy:text-white transition-colors selection:bg-[#E60012]/50" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                    SW-4025-3154-4149
                                </span>
                                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 bg-cyan-600/90 backdrop-blur-md border border-cyan-400/30 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg pointer-events-none transition-all duration-300 whitespace-nowrap ${copiedId === 'SW-4025-3154-4149' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                    {t.copiedIdAlert}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center lg:justify-start lg:pl-14 w-full h-full items-center">
                        <a
                            href="https://exophase.com/user/Arnold24x24/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                        >
                            <Image
                                src="https://card.exophase.com/2/0/332687.png?1785964374"
                                alt="Exophase Multi-platform Gamer Card"
                                width={450}
                                height={160}
                                unoptimized
                                className="w-full max-w-112.5 h-auto rounded-lg shadow-[0_10px_30px_rgba(5,11,20,0.8)] border border-slate-700/50 block"
                            />
                        </a>
                    </div>

                </div>
            </div>
            </div>
        </motion.div>
    );
}
