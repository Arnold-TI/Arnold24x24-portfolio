'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import type { OsuSkin } from '@/lib/types';

interface SkinCardProps {
    skin: OsuSkin;
    previewActive: boolean;
    onCardClick: (skin: OsuSkin) => void;
}

export default function SkinCard({ skin, previewActive, onCardClick }: SkinCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover z-20 transition-opacity duration-500 grayscale-25 group-hover:grayscale-0 ${previewActive ? 'opacity-0' : 'group-hover:opacity-0'}`}
                />
                <video ref={videoRef} src={skin.video} loop muted playsInline preload="none" poster={skin.img} className="absolute inset-0 w-full h-full object-cover z-10 grayscale-25 group-hover:grayscale-0" />
            </div>

            <a href={skin.link} target="_blank" rel="noopener noreferrer" className="mt-4 text-slate-300 font-bold text-center underline decoration-1 decoration-transparent hover:decoration-slate-400 hover:text-white transition-all duration-300 px-2 text-sm md:text-base">
                {skin.title}
            </a>
        </div>
    );
}
