'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import BubblesBackground from '@/components/BubblesBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import CustomLightbox from '@/components/CustomLightbox';
import HomeSection from '@/components/sections/HomeSection';
import SetupSection from '@/components/sections/SetupSection';
import SkinsSection from '@/components/sections/SkinsSection';
import DiarySection from '@/components/sections/DiarySection';
import TipsSection from '@/components/sections/TipsSection';
import type { Lang, OsuBadge, OsuSkin, OsuStats, TabId, TopPlay } from '@/lib/types';

const TAB_IDS: TabId[] = ['home', 'setup', 'skins', 'diary', 'tips'];

const getTabFromPath = (pathname: string): TabId => {
    const segment = pathname.split('/')[1] as TabId;
    return TAB_IDS.includes(segment) ? segment : 'home';
};

export default function ProfileContent() {
    const pathname = usePathname();
    const activeTab = getTabFromPath(pathname);
    const [lang, setLang] = useState<Lang>('es');

    const [osuStats, setOsuStats] = useState<OsuStats>({
        rank: 0,
        pp: 0,
        accuracy: 0,
        plays: 0,
        level: 0,
        country: 'PE',
        avatarUrl: 'https://a.ppy.sh/',
        bannerUrl: 'https://assets.ppy.sh/user-cover-presets/6/a7d51a05cb3c08a43531dfa8dc99c2fc7fe0d8cfce2756c340f11b3683b5d3bf.jpeg',
        badges: [] as OsuBadge[]
    });
    const [topPlays, setTopPlays] = useState<TopPlay[]>([]);
    const [showTopPlays, setShowTopPlays] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [openTips, setOpenTips] = useState<number[]>([]);

    const [setupLightboxImages, setSetupLightboxImages] = useState<string[] | null>(null);
    const [setupLightboxIndex, setSetupLightboxIndex] = useState<number | null>(null);
    const [selectedSkin, setSelectedSkin] = useState<OsuSkin | null>(null);
    const scrollPositionRef = useRef<number>(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const toggleTip = (idx: number) => {
        setOpenTips(prev =>
            prev.includes(idx)
                ? prev.filter(i => i !== idx)
                : [...prev, idx]
        );
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).catch(() => {});
        setCopiedId(text);
        if (copyTimeoutRef.current) {
            clearTimeout(copyTimeoutRef.current);
        }
        copyTimeoutRef.current = setTimeout(() => setCopiedId(null), 500);
    };

    const handleSelectSkin = (skin: OsuSkin) => {
        scrollPositionRef.current = window.scrollY;
        setSelectedSkin(skin);
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    const handleCloseSkin = () => {
        setSelectedSkin(null);
        setTimeout(() => {
            window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
        }, 10);
    };

    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
        }
    }, [activeTab]);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    useEffect(() => {
        const fetchOsuData = async () => {
            try {
                const response = await fetch('/api/osu');
                const data = await response.json();

                if (data.stats) {
                    setOsuStats(data.stats);
                    setTopPlays(data.topPlays);
                }
            } catch (error) {
                console.error("Error cargando stats de osu!:", error);
            }
        };
        void fetchOsuData();
    }, []);

    return (
        <main className="relative min-h-screen flex flex-col text-white overflow-x-hidden">
            <BubblesBackground />
            <link rel="preload" as="image" href="/banner-setup.webp" />
            <link rel="preload" as="image" href="/banner-tips.webp" />
            <link rel="preload" as="image" href="/banner-miku-current.webp" />
            <link rel="preload" as="image" href="/banner-miku-oldd.webp" />
            <link rel="preload" as="image" href="/diary.webp" />
            <Header
                activeTab={activeTab}
                lang={lang}
                setLang={setLang}
            />

            <div className="grow w-full max-w-300 mx-auto mt-20 mb-0 lg:mt-28 lg:mb-12 bg-[#0f172a]/75 backdrop-blur-sm lg:bg-[#0f172a]/70 lg:backdrop-blur-md lg:border lg:border-slate-700/50 lg:shadow-[0_0_50px_rgba(5,11,20,0.8)] relative z-10 flex flex-col pt-4 pb-20 lg:px-12 min-h-[60vh]">

                {activeTab === 'home' && (
                    <HomeSection
                        lang={lang}
                        osuStats={osuStats}
                        topPlays={topPlays}
                        showTopPlays={showTopPlays}
                        setShowTopPlays={setShowTopPlays}
                        handleCopy={handleCopy}
                        copiedId={copiedId}
                    />
                )}

                {activeTab === 'setup' && (
                    <SetupSection
                        lang={lang}
                        onOpenLightbox={(images) => {
                            setSetupLightboxImages(images);
                            setSetupLightboxIndex(0);
                        }}
                    />
                )}

                {activeTab === 'skins' && (
                    <SkinsSection
                        lang={lang}
                        selectedSkin={selectedSkin}
                        onSelectSkin={handleSelectSkin}
                        onCloseSkin={handleCloseSkin}
                        onOpenLightbox={(idx) => setLightboxIndex(idx)}
                    />
                )}

                {activeTab === 'diary' && <DiarySection lang={lang} />}

                {activeTab === 'tips' && (
                    <TipsSection lang={lang} openTips={openTips} toggleTip={toggleTip} />
                )}

            </div>

            {lightboxIndex !== null && selectedSkin?.screenshots && (
                <CustomLightbox lang={lang} images={selectedSkin.screenshots} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
            )}

            {setupLightboxIndex !== null && setupLightboxImages && (
                <CustomLightbox lang={lang} images={setupLightboxImages} initialIndex={setupLightboxIndex} onClose={() => setSetupLightboxIndex(null)} />
            )}

            <MusicPlayer />

            <Footer lang={lang} handleCopy={handleCopy} copiedId={copiedId} />
        </main>
    );
}
