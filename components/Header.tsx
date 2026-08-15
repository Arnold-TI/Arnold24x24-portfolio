'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { translations } from '@/lib/translations';
import type { Lang, TabId } from '@/lib/types';

const TAB_IDS: TabId[] = ['home', 'setup', 'skins', 'diary', 'tips', 'contact'];

interface HeaderProps {
    activeTab: TabId;
    setActiveTab: (tab: TabId) => void;
    lang: Lang;
    setLang: (l: Lang) => void;
}

export default function Header({ activeTab, setActiveTab, lang, setLang }: HeaderProps) {
    const t = translations[lang];
    const [menuOpen, setMenuOpen] = useState(false);

    const handleTabClick = (tab: TabId) => {
        setActiveTab(tab);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#050b14]/80 backdrop-blur-lg border-b border-slate-800"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <button
                        className="md:hidden text-slate-400 hover:text-white cursor-pointer shrink-0"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        aria-expanded={menuOpen}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>

                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-slate-700 group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-300 flex items-center justify-center bg-[#0f172a]">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                sizes="40px"
                                className="object-contain"
                            />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tighter mb-1 uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                            Arnold&apos;s <span className="text-cyan-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">DEEP SEA</span>
                        </h1>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {TAB_IDS.map((tab, idx) => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`text-sm font-semibold uppercase tracking-wider transition-colors ${activeTab === tab ? 'text-cyan-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]' : 'text-slate-400 hover:text-slate-100'}`}
                        >
                            {t.nav[idx]}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-[#050b14]/80 border border-slate-700/80 rounded-lg p-0.5 shadow-md">
                        <button
                            onClick={() => setLang('es')}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                                lang === 'es'
                                    ? 'bg-cyan-900/50 text-cyan-200 border-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                                    : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <div className="relative w-3.5 h-2.5 rounded-xs overflow-hidden shrink-0 opacity-90">
                                <Image src="https://flagcdn.com/pe.svg" alt="Peru Flag" fill unoptimized className="object-cover" />
                            </div>
                            ES
                        </button>
                        <div className="w-px h-3.5 bg-slate-700 mx-0.5"></div>
                        <button
                            onClick={() => setLang('en')}
                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                                lang === 'en'
                                    ? 'bg-cyan-900/50 text-cyan-200 border-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                                    : 'border-transparent text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <div className="relative w-3.5 h-2.5 rounded-xs overflow-hidden shrink-0 opacity-90">
                                <Image src="https://flagcdn.com/us.svg" alt="USA Flag" fill unoptimized className="object-cover" />
                            </div>
                            EN
                        </button>
                    </div>
                </div>
            </div>

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {menuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md md:hidden"
                                onClick={() => setMenuOpen(false)}
                            />
                            <motion.nav
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
                                className="fixed top-0 left-0 bottom-0 z-[70] w-64 md:hidden bg-[#050b14] border-r border-slate-800 flex flex-col"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="px-5 pt-8 pb-5 flex items-center justify-center">
                                    <div className="relative w-14 h-14 overflow-hidden rounded-lg border border-slate-700">
                                        <Image src="/logo.png" alt="Logo" fill sizes="56px" className="object-contain" />
                                    </div>
                                </div>
                                <div className="mx-5 h-px bg-slate-700/60"></div>
                                <div className="flex flex-col gap-1 px-3 py-4 flex-1">
                                    {t.nav.map((label, idx) => {
                                        const tab = TAB_IDS[idx];
                                        return (
                                            <button
                                                key={tab}
                                                onClick={() => handleTabClick(tab)}
                                                className={`text-left px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer ${activeTab === tab ? 'text-cyan-200 bg-cyan-900/20' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                                            >
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </motion.nav>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </motion.header>
    );
}
