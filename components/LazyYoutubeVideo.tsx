'use client';

import { useState } from 'react';

export default function LazyYoutubeVideo({ url, title }: { url: string, title: string }) {
    const [isLoaded, setIsLoaded] = useState(false);

    const videoId = url.split('embed/')[1]?.split('?')[0];

    if (!isLoaded) {
        return (
            <div
                className="w-full h-full relative cursor-pointer group/youtube overflow-hidden"
                onClick={() => setIsLoaded(true)}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    alt={title}
                    className="w-full h-full object-cover grayscale-40 group-hover/youtube:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/30 mix-blend-color pointer-events-none z-10 group-hover/youtube:opacity-0 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="w-14 h-10 bg-red-600/90 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center shadow-lg group-hover/youtube:scale-110 group-hover/youtube:bg-red-500 transition-all duration-300">
                        <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <iframe
            className="w-full h-full"
            src={`${url}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}
