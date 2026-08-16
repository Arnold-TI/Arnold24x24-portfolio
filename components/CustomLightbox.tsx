'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { translations } from '@/lib/translations';
import type { Lang } from '@/lib/types';
import type { MouseEvent, TouchEvent, WheelEvent } from 'react';

interface CustomLightboxProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
    lang: Lang;
}

export default function CustomLightbox({ images, initialIndex, onClose, lang }: CustomLightboxProps) {
    const t = translations[lang];
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [dragDelta, setDragDelta] = useState({ x: 0, y: 0 });
    const dragStateRef = useRef({ isDragging: false, startX: 0, startY: 0 });
    const pinchRef = useRef({ active: false, distance: 0, zoom: 1 });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const resetZoom = useCallback(() => {
        setZoomLevel(1);
        setPan({ x: 0, y: 0 });
        setDragDelta({ x: 0, y: 0 });
        dragStateRef.current.isDragging = false;
    }, []);

    const handleNavigate = useCallback((dir: number) => {
        setCurrentIndex((prev) => {
            let next = prev + dir;
            if (next < 0) next = images.length - 1;
            if (next >= images.length) next = 0;
            return next;
        });
        resetZoom();
    }, [images.length, resetZoom]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNavigate(1);
            if (e.key === 'ArrowLeft') handleNavigate(-1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNavigate, onClose]);

    const handleWheel = (e: WheelEvent) => {
        if (zoomLevel === 1) {
            if (e.deltaY > 0) handleNavigate(1);
            else if (e.deltaY < 0) handleNavigate(-1);
        }
    };

    const startDrag = (clientX: number, clientY: number) => {
        dragStateRef.current = { isDragging: true, startX: clientX, startY: clientY };
        setDragDelta({ x: 0, y: 0 });
    };

    const moveDrag = (clientX: number, clientY: number) => {
        const s = dragStateRef.current;
        if (!s.isDragging) return;
        setDragDelta({
            x: clientX - s.startX,
            y: clientY - s.startY
        });
    };

    const endDrag = () => {
        const s = dragStateRef.current;
        if (!s.isDragging) return;
        s.isDragging = false;

        if (zoomLevel === 1) {
            if (Math.abs(dragDelta.x) > 100) {
                handleNavigate(dragDelta.x < 0 ? 1 : -1);
            } else if (Math.abs(dragDelta.y) > 100) {
                onClose();
            }
        } else {
            setPan(prev => ({
                x: prev.x + dragDelta.x,
                y: prev.y + dragDelta.y
            }));
        }
        setDragDelta({ x: 0, y: 0 });
    };

    const handleMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
        moveDrag(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
        endDrag();
    };

    const getTouchDistance = (touches: React.TouchList) => {
        if (touches.length < 2) return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length >= 2) {
            pinchRef.current = {
                active: true,
                distance: getTouchDistance(e.touches),
                zoom: zoomLevel,
            };
            return;
        }
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (pinchRef.current.active && e.touches.length >= 2) {
            const distance = getTouchDistance(e.touches);
            if (distance > 0 && pinchRef.current.distance > 0) {
                const ratio = distance / pinchRef.current.distance;
                const next = Math.min(Math.max(pinchRef.current.zoom * ratio, 1), 4);
                setZoomLevel(next);
            }
            return;
        }
        const touch = e.touches[0];
        moveDrag(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = () => {
        if (pinchRef.current.active) {
            pinchRef.current.active = false;
            return;
        }
        endDrag();
    };

    const handleBackgroundClick = () => {
        if (Math.abs(dragDelta.x) < 5 && Math.abs(dragDelta.y) < 5) {
            onClose();
        }
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
    };

    const activeX = pan.x + dragDelta.x;
    const activeY = pan.y + dragDelta.y;
    const isSwiping = zoomLevel === 1 && dragDelta.x !== 0 && dragDelta.y !== 0;

    return (
        <div
            className="fixed inset-0 z-100 flex flex-col bg-[#050b14]/95 backdrop-blur-md text-white select-none overflow-hidden"
            style={{ touchAction: 'none' }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            <div
                className="absolute top-4 right-4 md:top-6 md:right-8 z-110 flex gap-1 bg-slate-900/60 p-1 md:p-1.5 rounded-xl border border-slate-700/50 shadow-xl cursor-default items-center backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
            >

                {zoomLevel > 1 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); resetZoom(); }}
                        className="flex items-center gap-1 px-2.5 py-1.5 mr-1 bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 rounded-lg text-[10px] md:text-[10px] font-bold uppercase tracking-widest transition-colors border border-slate-600/50 cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                        Reset
                    </button>
                )}

                <button onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }} className="p-1.5 md:p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" title={t.fullscreenTooltip} aria-label={t.fullscreenTooltip}>
                    <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setZoomLevel(z => Math.min(z + 0.5, 4)); }} className="p-1.5 md:p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" title={t.zoomInTooltip} aria-label={t.zoomInTooltip}>
                    <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); setZoomLevel(z => Math.max(z - 0.5, 1)); }} className="p-1.5 md:p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" title={t.zoomOutTooltip} aria-label={t.zoomOutTooltip}>
                    <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1.5 md:p-1.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-lg transition-colors ml-1 border border-transparent hover:border-rose-500/20 cursor-pointer" title={t.closeTooltip} aria-label={t.closeTooltip}>
                    <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>

            <div
                className="flex-1 relative flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={handleBackgroundClick}
            >
                <button onClick={(e) => { e.stopPropagation(); handleNavigate(-1); }} className="absolute left-2 md:left-6 z-110 p-2 md:p-3 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-all pointer-events-auto cursor-pointer" aria-label="Previous image">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                </button>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={images[currentIndex]}
                    draggable={false}
                    alt="Screenshot"
                    onClick={(e) => e.stopPropagation()}
                    className={`max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-[0_0_40px_rgba(0,0,0,0.8)] ring-1 ring-white/5 ${dragDelta.x !== 0 || dragDelta.y !== 0 ? (zoomLevel > 1 ? 'cursor-grabbing' : 'cursor-grab') : (zoomLevel > 1 ? 'cursor-grab' : 'default')}`}
                    style={{
                        transform: `translate(${activeX}px, ${activeY}px) scale(${zoomLevel})`,
                        transition: dragDelta.x !== 0 || dragDelta.y !== 0 ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                        opacity: isSwiping ? Math.max(1 - Math.abs(dragDelta.y) / 500, 0.3) : 1
                    }}
                />

                <button onClick={(e) => { e.stopPropagation(); handleNavigate(1); }} className="absolute right-2 md:right-6 z-110 p-2 md:p-3 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-xl transition-all pointer-events-auto cursor-pointer" aria-label="Next image">
                    <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            {images.length > 1 && (
                <div onClick={(e) => e.stopPropagation()} className="h-20 md:h-24 bg-[#03060a]/90 flex items-center justify-center gap-2 md:gap-3 p-3 overflow-x-auto border-t border-slate-800/80 z-110 cursor-default" style={{ touchAction: 'pan-x' }}>
                    {images.map((img, idx) => (
                        <div key={idx} onClick={() => { setCurrentIndex(idx); resetZoom(); }} className={`relative h-full aspect-video cursor-pointer rounded-md border transition-all duration-300 ${idx === currentIndex ? 'border-slate-500 opacity-100 scale-105 shadow-[0_0_15px_rgba(100,116,139,0.4)]' : 'border-transparent opacity-30 hover:opacity-100 hover:scale-95'}`}>
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                unoptimized
                                sizes="150px"
                                className="object-cover rounded-md pointer-events-none grayscale-20"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
