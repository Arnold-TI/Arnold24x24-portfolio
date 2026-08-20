'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { translations } from '@/lib/translations';
import type { Lang, TwitchData } from '@/lib/types';

/**
 * Background video for the VOD card. Auto-plays once mounted (or as soon as the
 * element scrolls into view) and pauses when it leaves the viewport so it never
 * drains the page while off-screen. Only the metadata + first chunk download
 * until it becomes visible.
 */
function VodBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let io: IntersectionObserver | null = null;
        const onVisible = () => {
            video.play().catch(() => {});
        };
        const onHidden = () => {
            video.pause();
        };

        // Wait for enough data to be buffered before starting playback
        const handleCanPlay = () => {
            setReady(true);
            video.play().catch(() => {});
        };
        video.addEventListener('canplay', handleCanPlay);

        if ('IntersectionObserver' in window) {
            io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) onVisible();
                        else onHidden();
                    });
                },
                { rootMargin: '200px 0px' }
            );
            io.observe(video);
        } else {
            onVisible();
        }

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            io?.disconnect();
        };
    }, []);

    return (
        <video
            ref={videoRef}
            src="/vod-bg.mp4"
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${ready ? '' : 'opacity-0'}`}
        />
    );
}

export default function TwitchStatsCard({ lang }: { lang: Lang }) {
    const [twitchData, setTwitchData] = useState<TwitchData | null>(null);
    const t = translations[lang];

    useEffect(() => {
        const fetchTwitch = async () => {
            try {
                const res = await fetch('/api/twitch');
                const data: TwitchData = await res.json();
                setTwitchData(data);
            } catch (error) {
                console.error("Error cargando Twitch:", error);
            }
        };
        void fetchTwitch();
        const interval = setInterval(fetchTwitch, 60000);
        return () => clearInterval(interval);
    }, []);

    if (!twitchData) return <div className="w-full h-full p-4 md:p-5 animate-pulse flex items-center justify-center text-[#6366f1] font-bold uppercase tracking-widest text-sm z-10 relative">{t.twitchLoading}</div>;

    const { isLive, user, stream } = twitchData;

    if (isLive) {
        return (
            <div className="relative w-full h-full flex items-center p-4 md:p-5 gap-6 group/twitch overflow-hidden z-10">
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                    <Image
                        src={stream?.thumbnail || '/logo.png'}
                        alt="Stream Thumbnail"
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover opacity-20 blur-sm group-hover/twitch:blur-none transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-[#0f172a]/80 transition-colors duration-500"></div>
                </div>

                <div className="relative z-10 flex flex-row items-center gap-6 w-full h-full">
                    <div className="relative shrink-0">
                        <div className="absolute -inset-1.5 rounded-2xl blur-md opacity-70 bg-red-500 animate-pulse"></div>
                        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 border-slate-700 overflow-hidden bg-[#050b14] shadow-xl">
                            <Image
                                src={user.avatarUrl || '/logo.png'}
                                alt="Avatar Twitch"
                                fill
                                unoptimized
                                sizes="(max-width: 768px) 96px, 128px"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center text-left flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter truncate" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>{user.name || 'Arnold24x24'}</h3>
                            <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-lg shrink-0 bg-red-500/20 text-red-500 border-red-500/50">{t.liveBadge}</span>
                        </div>
                        <div className="mb-4">
                            <p className="text-[#6366f1] font-bold text-xs mb-1">{stream?.game}</p>
                            <p className="text-slate-300 text-xs line-clamp-2 font-medium">{stream?.title}</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="bg-[#050b14]/50 border border-slate-700/50 rounded-lg py-1.5 px-3 backdrop-blur-md">
                                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">{t.followers}</p>
                                <p className="text-sm font-black text-white">{user.followers?.toLocaleString() || '0'}</p>
                            </div>
                            <div className="bg-[#050b14]/50 border border-red-500/30 rounded-lg py-1.5 px-3 backdrop-blur-md">
                                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-0.5 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> {t.viewers}
                                </p>
                                <p className="text-sm font-black text-red-400">{stream?.viewers?.toLocaleString() || '0'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex flex-col p-4 md:p-5 z-10">
            <div className="relative z-10 flex flex-row gap-4 md:gap-6 mb-4 md:mb-5">
                <div className="flex flex-col items-center gap-3 shrink-0">
                    <div className="relative">
                        <div className="absolute -inset-1.5 rounded-2xl blur-md opacity-70 bg-[#a970ff]/20"></div>
                        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border-2 border-slate-700 overflow-hidden bg-[#050b14] shadow-xl">
                            <Image
                                src={user.avatarUrl || '/logo.png'}
                                alt="Avatar Twitch"
                                fill
                                sizes="112px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div className="bg-[#050b14]/50 border border-slate-700/50 rounded-lg py-1.5 px-3 w-full text-center">
                        <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider mb-0.5">{t.followers}</p>
                        <p className="text-sm font-black text-white">{user.followers?.toLocaleString() || '0'}</p>
                    </div>
                </div>

                <div className="flex flex-col justify-center flex-1 min-w-0 pb-2">
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter truncate mb-2" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                        {user.name || 'Arnold24x24'}
                    </h3>
                    <span className="w-max px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-lg bg-slate-800/50 text-slate-400 border-slate-700 mb-3">
                        {t.offlineBadge}
                    </span>
                    <p className="text-slate-300 text-xs md:text-sm font-medium line-clamp-3 leading-relaxed">
                        {user.description || t.offlineText}
                    </p>
                </div>
            </div>

            <a
                href={`https://twitch.tv/${user.name || 'arnold24x24'}/videos`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-full aspect-video max-w-[20rem] mx-auto mt-auto rounded-lg overflow-hidden border border-slate-700/50 group cursor-pointer flex items-center justify-center bg-[#050b14]/50 hover:border-[#a970ff]/50 transition-colors"
            >
                <VodBackground />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500"></div>

                <div className="relative z-10 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center gap-2 text-white">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-[#a970ff]" fill="currentColor" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>
                        <span className="font-black tracking-widest uppercase text-sm md:text-lg drop-shadow-md">{t.vods}</span>
                    </div>
                </div>
            </a>
        </div>
    );
}
