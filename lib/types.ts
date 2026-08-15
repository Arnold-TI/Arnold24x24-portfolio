export type Lang = 'es' | 'en';
export type TabId = 'home' | 'setup' | 'skins' | 'diary' | 'tips' | 'contact';

export interface Bubble {
    id: number;
    size: number;
    left: string;
    duration: number;
    delay: number;
    wobble: number;
}

export interface TopPlay {
    id: number;
    legacyScoreId: number | null;
    beatmapId: number;
    song: string;
    diff: string;
    pp: number;
    mods: string;
    coverUrl: string;
    accuracy: string;
    grade: string;
}

export interface OsuBadge {
    imageUrl: string;
    description: string;
    url: string;
}

export interface OsuStats {
    rank: number;
    pp: number;
    accuracy: number;
    plays: number;
    level: number;
    country: string;
    avatarUrl: string;
    bannerUrl: string;
    badges: OsuBadge[];
}

export interface SkinCreator {
    name: string;
    osuId: number;
    postUrl?: string;
}

export interface OsuSkin {
    id: number;
    title: string;
    desc: string;
    descEn?: string;
    img: string;
    video: string;
    link: string;
    banner?: string;
    screenshots?: string[];
    creators?: SkinCreator[];
}

export interface TwitchData {
    isLive: boolean;
    user: {
        name: string;
        avatarUrl: string;
        followers: number;
        description: string;
    };
    stream?: {
        game: string;
        title: string;
        viewers: number;
        thumbnail: string;
        startedAt: string;
    };
}

export interface SetupItem {
    name: string;
    img: string;
    desc: string;
    link: string;
    screenshots?: string[];
    objectPos?: string;
}

export interface DiaryItem {
    id: number;
    tipo: 'dato' | 'video';
    titulo: string;
    tituloEn?: string;
    contenido: string;
    contenidoEn?: string;
    videoUrl?: string;
}

export interface Tip {
    pregunta: string;
    respuesta: React.ReactNode;
}

export interface ManualTopPlay {
    id: number;
    beatmapsetId: string;
    scoreId: string;
    title: string;
    difficulty: string;
    mods: string;
    pp: string;
    acc: string;
    rank: string;
}
