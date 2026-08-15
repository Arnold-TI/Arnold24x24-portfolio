import { NextResponse } from 'next/server';
interface OsuApiScore {
    id: number;
    legacy_score_id?: number;
    best_id?: number;
    beatmapset: {
        title: string;
        covers: {
            cover: string;
        };
    };
    beatmap: {
        id: number;
        version: string;
    };
    pp: number;
    mods: string[];
    accuracy: number;
    rank: string;
}

interface OsuBadge {
    image_url: string;
    description: string;
    url: string;
}

const TIMEOUT_MS = 8000;

const fetchWithTimeout = async (url: string, options: RequestInit = {}) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timeout);
    }
};

export async function GET() {
    try {
        const tokenRes = await fetchWithTimeout('https://osu.ppy.sh/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client_id: process.env.OSU_CLIENT_ID,
                client_secret: process.env.OSU_CLIENT_SECRET,
                grant_type: 'client_credentials',
                scope: 'public'
            })
        });

        if (!tokenRes.ok) {
            console.error('osu! token error:', tokenRes.status);
            return NextResponse.json({ error: 'Fallo al obtener el token de osu!' }, { status: 502 });
        }

        const { access_token } = await tokenRes.json();
        if (!access_token) return NextResponse.json({ error: "Fallo al obtener el token" }, { status: 500 });

        const userRes = await fetchWithTimeout('https://osu.ppy.sh/api/v2/users/Arnold24x24/osu?key=username', {
            headers: { 'Authorization': `Bearer ${access_token}` },
            cache: 'no-store'
        });
        if (!userRes.ok) {
            console.error('osu! user error:', userRes.status);
            return NextResponse.json({ error: 'Error al obtener el usuario de osu!' }, { status: 502 });
        }
        const userData = await userRes.json();

        if (!userData?.id || !userData?.statistics) {
            console.error('osu! user response malformed:', userData);
            return NextResponse.json({ error: 'Respuesta inválida de osu!' }, { status: 502 });
        }

        const playsRes = await fetchWithTimeout(`https://osu.ppy.sh/api/v2/users/${userData.id}/scores/best?mode=osu&limit=5`, {
            headers: { 'Authorization': `Bearer ${access_token}` },
            cache: 'no-store'
        });
        if (!playsRes.ok) {
            console.error('osu! plays error:', playsRes.status);
            return NextResponse.json({ error: 'Error al obtener los top plays de osu!' }, { status: 502 });
        }
        const playsData = await playsRes.json();

        return NextResponse.json({
            stats: {
                rank: userData.statistics.global_rank,
                pp: Math.round(userData.statistics.pp),
                accuracy: userData.statistics.hit_accuracy.toFixed(2),
                plays: userData.statistics.play_count,
                level: userData.statistics.level.current,
                country: userData.country_code,
                avatarUrl: userData.avatar_url,
                bannerUrl: userData.cover_url,
                badges: userData.badges.map((b: OsuBadge) => ({
                    imageUrl: b.image_url,
                    description: b.description,
                    url: b.url
                }))
            },
            topPlays: playsData.map((play: OsuApiScore) => ({
                id: play.id,
                legacyScoreId: play.legacy_score_id || play.best_id || null,
                beatmapId: play.beatmap.id,
                song: play.beatmapset.title,
                diff: play.beatmap.version,
                pp: Math.round(play.pp),
                mods: play.mods.length > 0 ? play.mods.join('') : 'NM',
                coverUrl: play.beatmapset.covers.cover,
                accuracy: (play.accuracy * 100).toFixed(2),
                grade: play.rank
            }))
        });

    } catch (error) {
        console.error("Error en la API de osu!:", error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}