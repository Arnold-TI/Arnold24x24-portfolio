'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

const track = { title: "Yuuyu - Shinkaisyouzyo", src: "/cancion1.flac" };

const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isStopped, setIsStopped] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [volume, setVolume] = useState(0.15);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                        setIsStopped(false);
                    })
                    .catch(() => {
                        setIsPlaying(false);
                        setIsStopped(true);
                    });
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {});
                }
                setIsPlaying(true);
                setIsStopped(false);
            }
        }
    };

    const handleStop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setIsStopped(true);
            setCurrentTime(0);
        }
    };

    const skip = (amount: number) => {
        if (audioRef.current) {
            const safeDur = duration && !isNaN(duration) ? duration : 100;
            const newTime = Math.min(Math.max(audioRef.current.currentTime + amount, 0), safeDur);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
        setCurrentTime(newTime);
    };

    const safeDuration = duration && !isNaN(duration) && duration > 0 ? duration : 100;
    const progressPercent = Number(((currentTime / safeDuration) * 100).toFixed(2));
    const volumePercent = Number((volume * 100).toFixed(2));

    return (
        <div
            className={`fixed bottom-32 left-0 z-100 flex items-center transition-transform duration-500 ease-in-out ${
                isExpanded ? 'translate-x-0' : '-translate-x-[calc(100%-2rem)]'
            }`}
        >
            <div className="bg-[#0a1324]/90 backdrop-blur-md border-y border-r border-slate-700/60 p-2.5 md:p-3.5 rounded-br-2xl shadow-[5px_5px_20px_rgba(5,11,20,0.8)] flex flex-col gap-2 md:gap-3 w-60 md:w-72.5">

                <div className="flex items-center gap-4">
                    <div
                        className={`relative w-11 h-11 rounded-full bg-[#050b14] border-2 border-slate-700/80 overflow-hidden shrink-0 flex items-center justify-center ${isStopped ? '' : 'animate-[spin_4s_linear_infinite]'}`}
                        style={{
                            animationPlayState: isPlaying ? 'running' : 'paused'
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/deep-sea-girl.webp" alt="Vinyl" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute w-2.5 h-2.5 bg-[#0a1324] rounded-full border border-slate-700 z-10"></div>
                    </div>

                    <div className="flex flex-col flex-1 min-w-0 justify-center">
                        <div className="w-full overflow-hidden whitespace-nowrap mb-0.5 relative">
                            <p className={`text-[10px] font-bold text-slate-200 uppercase tracking-widest ${isPlaying ? 'text-cyan-200' : ''} truncate`} style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                {track.title}
                            </p>
                        </div>
                        <p className="text-[10px] font-mono font-medium text-slate-400">
                            <span className="text-cyan-200/90">{formatTime(currentTime)}</span> / {formatTime(duration)}
                        </p>
                    </div>
                </div>

                <div className="w-full px-1">
                    <input
                        type="range"
                        min="0"
                        max={safeDuration}
                        step="0.01"
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-cyan-200 transition-all"
                        style={{
                            background: `linear-gradient(to right, #99f6e4 ${progressPercent}%, #334155 ${progressPercent}%)`
                        }}
                    />
                </div>

                <div className="flex items-center justify-between px-1 mt-1">
                    <div className="flex items-center gap-2.5">
                        <button onClick={() => skip(-5)} className="text-slate-500 hover:text-cyan-200 transition-colors outline-none cursor-pointer" title="-5s" aria-label="Rewind 5 seconds">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>
                        </button>

                        <button onClick={togglePlay} className="text-slate-300 hover:text-white transition-colors outline-none cursor-pointer" aria-label={isPlaying ? 'Pause' : 'Play'}>
                            {isPlaying ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            )}
                        </button>

                        <button onClick={handleStop} className={`outline-none transition-colors cursor-pointer ${isStopped ? 'text-cyan-200' : 'text-slate-500 hover:text-rose-400'}`} aria-label="Stop">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
                        </button>

                        <button onClick={() => skip(5)} className="text-slate-500 hover:text-cyan-200 transition-colors outline-none cursor-pointer" title="+5s" aria-label="Forward 5 seconds">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-1.5 w-18">
                        <svg className="w-3.5 h-3.5 text-slate-500 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="w-full h-1 rounded-lg appearance-none cursor-pointer accent-cyan-200 transition-all"
                            style={{
                                background: `linear-gradient(to right, #99f6e4 ${volumePercent}%, #334155 ${volumePercent}%)`
                            }}
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-[#0a1324]/90 backdrop-blur-md border-y border-r border-slate-700/60 w-8 h-12 rounded-r-lg shadow-[5px_0_10px_rgba(0,0,0,0.5)] text-slate-400 hover:text-cyan-200 transition-colors flex items-center justify-center outline-none cursor-pointer"
                aria-label={isExpanded ? 'Collapse player' : 'Expand player'}
                aria-expanded={isExpanded}
            >
                <svg className={`w-4 h-4 transform transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>

            <audio
                ref={audioRef}
                src={track.src}
                onTimeUpdate={(e) => {
                    setCurrentTime(e.currentTarget.currentTime);
                    if (!duration || isNaN(duration) || duration === 0) {
                        setDuration(e.currentTarget.duration);
                    }
                }}
                onLoadedMetadata={(e) => {
                    setDuration(e.currentTarget.duration);
                }}
                onEnded={handleStop}
                className="hidden"
            />
        </div>
    );
}
