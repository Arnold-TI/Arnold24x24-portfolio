import { NextResponse } from 'next/server';
export async function GET() {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    const username = process.env.TWITCH_USERNAME;

    try {
        const tokenResponse = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
            method: 'POST',
        });
        if (!tokenResponse.ok) {
            console.error('Twitch token error:', tokenResponse.status);
            return NextResponse.json({ error: 'Error al obtener el token de Twitch' }, { status: 502 });
        }
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const headers = {
            'Client-ID': clientId!,
            'Authorization': `Bearer ${accessToken}`,
        };

        const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, { headers });
        if (!userResponse.ok) {
            console.error('Twitch user error:', userResponse.status);
            return NextResponse.json({ error: 'Error al obtener el usuario de Twitch' }, { status: 502 });
        }
        const userData = await userResponse.json();
        const user = userData.data?.[0];
        if (!user) {
            console.error('Twitch user not found:', username);
            return NextResponse.json({ error: 'Usuario de Twitch no encontrado' }, { status: 404 });
        }

        const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_id=${user.id}`, { headers });
        if (!streamResponse.ok) {
            console.error('Twitch stream error:', streamResponse.status);
            return NextResponse.json({ error: 'Error al obtener el stream de Twitch' }, { status: 502 });
        }
        const streamData = await streamResponse.json();
        const stream = streamData.data?.[0] || null;

        const followersResponse = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${user.id}`, { headers });
        if (!followersResponse.ok) {
            console.error('Twitch followers error:', followersResponse.status);
            return NextResponse.json({ error: 'Error al obtener los followers de Twitch' }, { status: 502 });
        }
        const followersData = await followersResponse.json();

        return NextResponse.json({
            isLive: !!stream,
            user: {
                name: user.display_name,
                avatarUrl: user.profile_image_url,
                followers: followersData.total,
                description: user.description,
            },
            stream: stream ? {
                title: stream.title,
                game: stream.game_name,
                viewers: stream.viewer_count,
                startedAt: stream.started_at,
                thumbnail: stream.thumbnail_url.replace('{width}', '1920').replace('{height}', '1080'),
            } : null,
        });

    } catch (error) {
        console.error("Error fetching Twitch data:", error);
        return NextResponse.json({ error: 'Error fetching Twitch data' }, { status: 500 });
    }
}