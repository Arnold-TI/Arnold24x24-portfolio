'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { translations } from '@/lib/translations';
import type { Lang } from '@/lib/types';

export default function Footer({ lang }: { lang: Lang }) {
    const [showCredits, setShowCredits] = useState(false);
    const t = translations[lang];

    useEffect(() => {
        if (showCredits) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [showCredits]);

    return (
        <>
            <footer className="relative z-10 w-full border-t border-slate-800 bg-[#050b14]/90 backdrop-blur-md mt-0 md:mt-20">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity duration-300">
                            <div className="relative w-7 h-7">
                                <Image src="/footer.png" alt="Logo" fill sizes="40px" className="object-contain" />
                            </div>
                            <span className="text-sm tracking-widest text-slate-100 uppercase" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>ARNOLD</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium">
                            © {new Date().getFullYear()} Arnold Morales. {t.footerRights}
                        </p>
                    </div>

                    <button
                        onClick={() => setShowCredits(true)}
                        className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-cyan-200 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] duration-300 cursor-pointer"
                    >
                        {t.creditsAndAttributions}
                    </button>
                </div>
            </footer>

            {showCredits && (
                <div
                    className="fixed inset-0 z-200 bg-[#050b14]/80 backdrop-blur-md flex items-center justify-center p-4 opacity-100 transition-opacity duration-300"
                    onClick={() => setShowCredits(false)}
                >
                    <div
                        className="bg-[#0f172a]/90 border border-slate-700/50 rounded-2xl max-w-md w-full p-6 md:p-8 shadow-[0_20px_50px_rgba(3,6,10,0.9)] relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <button onClick={() => setShowCredits(false)} className="absolute top-4 right-4 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <h3 className="text-xl font-black text-white uppercase tracking-wider mb-4 drop-shadow-md" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                            <span className="text-cyan-200">{t.creditsModalTitle}</span>
                        </h3>
                        <div className="w-full h-px bg-slate-700/50 mb-4"></div>

                        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">

                            <div className="bg-[#050b14]/50 p-5 rounded-xl border border-slate-700/30 shadow-inner">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    {t.illustrations}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                    <li className="text-sm text-slate-300 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-700/30 pb-2">
                                        <span className="font-bold text-slate-200">{t.homeBanner}</span>
                                        <div className="flex items-center gap-2 mt-1 md:mt-0">
                                            <a href="https://t.co/ye7HlVdEf2" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline">@qhskwidhi</a>
                                            <span className="text-slate-600">&</span>
                                            <a href="https://home.gamer.com.tw/artwork.php?sn=2615926" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline">ZeN☂</a>
                                        </div>
                                    </li>
                                    <li className="text-sm text-slate-300 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-700/30 pb-2">
                                        <span className="font-bold text-slate-200">{t.setupBanner}</span>
                                        <a href="https://www.pixiv.net/en/artworks/110373783" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline mt-1 md:mt-0">九叶桑</a>
                                    </li>
                                    <li className="text-sm text-slate-300 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-700/30 pb-2">
                                        <span className="font-bold text-slate-200">{t.currentSkinsBanner}</span>
                                        <a href="https://x.com/skyw315/status/2064293041259897023" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline mt-1 md:mt-0">@skyw315</a>
                                    </li>
                                    <li className="text-sm text-slate-300 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-700/30 pb-2">
                                        <span className="font-bold text-slate-200">{t.oldSkinsBanner}</span>
                                        <div className="flex items-center gap-2 mt-1 md:mt-0">
                                            <a href="https://www.zerochan.net/607825" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline">Amezawa Koma</a>
                                            <a href="https://www.pixiv.net/en/users/1203575" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 text-xs">(Pixiv)</a>
                                        </div>
                                    </li>
                                    <li className="text-sm text-slate-300 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-700/30 pb-2">
                                        <span className="font-bold text-slate-200">{t.diaryBanner}</span>
                                        <a href="https://www.pixiv.net/en/artworks/84092790" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline mt-1 md:mt-0">@Arihina_starK</a>
                                    </li>
                                    <li className="text-sm text-slate-300 flex flex-col md:flex-row md:items-center justify-between pb-1">
                                        <span className="font-bold text-slate-200">{t.tipsBanner}</span>
                                        <div className="flex items-center gap-2 mt-1 md:mt-0">
                                            <a href="https://www.pixiv.net/en/artworks/111323324" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline">格角灯</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#050b14]/50 p-5 rounded-xl border border-slate-700/30 shadow-inner">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    {t.designInspiration}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                    <li className="text-sm text-slate-300 flex flex-col border-b border-slate-700/30 pb-3">
                                        <span className="font-bold text-slate-200 mb-1">{t.skinsStructure}</span>
                                        <a href="https://sites.google.com/view/ktrihc/arnold24x24" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline truncate">sites.google.com/view/ktrihc/arnold24x24</a>
                                    </li>
                                    <li className="text-sm text-slate-300 flex flex-col border-b border-slate-700/30 pb-3">
                                        <span className="font-bold text-slate-200 mb-1">{t.screenshotsInterface}</span>
                                        <a href="https://skins.osuck.net/skins/3005" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline truncate">skins.osuck.net/skins/3005</a>
                                    </li>
                                    <li className="text-sm text-slate-300 flex flex-col pb-1">
                                        <span className="font-bold text-slate-200 mb-1">{t.projectInspiration}</span>
                                        <a href="https://rafugapu.me/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline truncate">rafugapu.me</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-[#050b14]/50 p-5 rounded-xl border border-slate-700/30 shadow-inner">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                    {t.music}
                                </h4>
                                <ul className="flex flex-col gap-3">
                                    <li className="text-sm text-slate-300 flex flex-col">
                                        <span className="font-bold text-slate-200 mb-1">Yuuyu | Shinkaisyouzyo -deep sea girl-</span>
                                        <a href="https://open.spotify.com/intl-es/album/5POzDYJhk6PobXLRbXGglJ?si=IPxSh787RymBk6I-BDuiUQ" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 hover:underline truncate">open.spotify.com/intl-es/album/5POzDYJhk6PobXLRbXGglJ</a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
