'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { OsuSkin } from '@/lib/types';

// How much of the video to pre-buffer per card so hover feels instant
// without downloading whole 3-8MB files for every skin.
const PREBUFFER_BYTES = 1.5 * 1024 * 1024; // 1.5 MB

interface SkinCardProps {
    skin: OsuSkin;
    previewActive: boolean;
    onCardClick: (skin: OsuSkin) => void;
}

export default function SkinCard({ skin, previewActive, onCardClick }: SkinCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [preloaded, setPreloaded] = useState(false);

    // Pre-fetch only the beginning of the video once the card is near the
    // viewport (range request), so the browser cache already holds ~1.5MB when
    // the user hovers. The <video> then starts instantly and keeps streaming.
    useEffect(() => {
        const video = videoRef.current;
        if (!video || preloaded) return;

        let cancelled = false;
        let io: IntersectionObserver | null = null;

        const preload = () => {
            if (cancelled) return;
            setPreloaded(true);

            try {
                const ctrl = new AbortController();
                const timeout = setTimeout(() => ctrl.abort(), 30000);
                fetch(skin.video, {
                    headers: { Range: `bytes=0-${PREBUFFER_BYTES - 1}` },
                    signal: ctrl.signal,
                })
                    .then((res) => res.arrayBuffer())
                    .catch(() => {})
                    .finally(() => clearTimeout(timeout));
            } catch {
                // Range fetch unsupported — the video element will handle it.
            }
        };

        if ('IntersectionObserver' in window) {
            io = new IntersectionObserver(
                (entries) => {
                    if (entries.some((e) => e.isIntersecting)) {
                        preload();
                        io?.disconnect();
                    }
                },
                { rootMargin: '400px 0px' }
            );
            io.observe(video);
        } else {
            preload();
        }

        return () => {
            cancelled = true;
            io?.disconnect();
        };
    }, [skin.video, preloaded]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (previewActive) {
            video.play().catch(() => {});
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [previewActive]);

    useEffect(() => {
        const video = videoRef.current;
        return () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        };
    }, []);

    return (
        <div className="flex flex-col items-center group">
            <div
                onClick={() => onCardClick(skin)}
                className="w-full cursor-pointer overflow-hidden border-2 border-slate-800/50 group-hover:border-slate-500 transition-colors duration-500 relative shadow-lg bg-[#050b14] aspect-21/9 rounded-lg"
                onMouseEnter={() => videoRef.current?.play()}
                onMouseLeave={() => {
                    if (videoRef.current && !previewActive) {
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                }}
            >
                <Image
                    src={skin.img}
                    alt={skin.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-cover z-20 transition-opacity duration-500 grayscale-25 group-hover:grayscale-0 ${previewActive ? 'opacity-0' : 'group-hover:opacity-0'}`}
                />
                <video
                    ref={videoRef}
                    src={skin.video}
                    loop
                    muted
                    playsInline
                    preload={preloaded ? 'auto' : 'none'}
                    poster={skin.img}
                    className="absolute inset-0 w-full h-full object-cover z-10 grayscale-25 group-hover:grayscale-0"
                />
            </div>

            <a href={skin.link} target="_blank" rel="noopener noreferrer" className="mt-4 text-slate-300 font-bold text-center underline decoration-1 decoration-transparent hover:decoration-slate-400 hover:text-white transition-all duration-300 px-2 text-sm md:text-base">
                {skin.title}
            </a>
        </div>
    );
}
