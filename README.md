# Arnold24x24 Portfolio

Mi portafolio personal con estética bajo el mar - oscuro azul-oceánico inspirado en la canción del artista YUUYU - Shinkaisyoujo - Deep sea girl (feat. Hatsune Miku). Es de una sola página.

## Características

- **Single Page Application** con 6 secciones navegables: `home`, `setup`, `skins`, `diary`, `tips` y `contact`
- **Estadísticas de mi cuenta de osu!**: rank, PP, accuracy, nivel, badges y top plays, obtenidas de la API v2 de osu! a través de un proxy propio
- **Estado de Twitch en tiempo real**: live/offline, título del stream, viewers y followers, actualizado cada 60 segundos
- **Catálogo de skins** con preview en video (mp4), banners, galerías de screenshots con lightbox (zoom hasta 4x) y enlaces de descarga
- **Reproductor de música** con vinilo giratorio
- **Setup**: timeline de periféricos con fotos y configuraciones
- **Diario personal**: historia desde mis inicios y algunas curiosidades (subi todo el contenido que tenía en privado de mis primeros videos). Aún incompleto
- **Consejos de juego** en acordeón FAQ
- **Bilingüe ES/EN** con switcher de idioma
- **Diseño responsive** con Framer Motion y fondo de burbujas

## Ejecución

Requisitos: **Node.js 20+** y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Crear el archivo de variables de entorno
cp .env.local
# y completar las credenciales (ver sección de abajo)

# 3. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts

| Comando          | Descripción                                  |
| ---------------- | -------------------------------------------- |
| `npm run dev`    | Servidor de desarrollo (Turbopack)           |
| `npm run build`  | Build de producción                          |
| `npm run start`  | Servir el build de producción                |
| `npm run lint`   | Lint con ESLint (config de Next.js)          |

## Variables de entorno

Se necesitan credenciales de las APIs de **osu!** y **Twitch** para que las estadísticas y el estado del stream funcionen. Crea un archivo `.env.local` (o `.env`) en la raíz del proyecto:

| Variable              | Descripción                                        | Dónde obtenerla                |
| --------------------- | -------------------------------------------------- | ------------------------------ |
| `OSU_CLIENT_ID`       | ID de cliente de la API v2 de osu!                 | https://osu.ppy.sh/home/account/edit (OAuth) |
| `OSU_CLIENT_SECRET`   | Código secreto de la API v2 de osu!                | Ídem                            |
| `TWITCH_CLIENT_ID`    | ID de cliente de la aplicación de Twitch           | https://dev.twitch.tv/console   |
| `TWITCH_CLIENT_SECRET`| Código secreto del cliente de twitch               | Ídem                            |
| `TWITCH_USERNAME`     | Nombre de usuario de Twitch (p. ej. `Arnold24x24`) | —                               |


## Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **Framer Motion**

## Estructura

```
lib/
├── types.ts              → Todas las interfaces (Lang, OsuSkin, TopPlay, etc.)
├── grade.ts              → Función getGradeStyle compartida
├── translations.ts       → Traducciones ES/EN
└── data/
    ├── skins.ts          → currentSkins + oldSkins
    ├── diary.ts          → Curiosidades, etc
    ├── tips.tsx          → Consejos (con JSX)
    ├── setup.ts          → Periféricos
    ├── social.ts         → Videos y tweets recomendados
    └── plays.ts          → Top 5 fav plays manuales

components/
├── BubblesBackground.tsx, Header.tsx, Footer.tsx
├── SkinCard.tsx, TwitchStatsCard.tsx, CustomLightbox.tsx
├── MusicPlayer.tsx, LazyYoutubeVideo.tsx
└── sections/
    ├── HomeSection.tsx   → osu! stats + Social Media + Gaming Profile
    ├── SetupSection.tsx, SkinsSection.tsx
    ├── DiarySection.tsx, TipsSection.tsx, ContactSection.tsx

app/
├── layout.tsx            → Root layout (fuente Outfit, metadata, tema)
├── page.tsx              → Estado + orquestación de secciones
├── globals.css           → Tailwind v4, fuentes y estilos base
└── api/
    ├── osu/route.ts      → Proxy de la API v2 de osu!
    └── twitch/route.ts   → Proxy de Twitch
public/                   → Assets: skins, banners, screenshots, setup, música
```

## Despliegue

El proyecto es compatible con **Vercel** o cualquier plataforma que soporte Next.js. Añade las variables de entorno de la tabla anterior en el panel de configuración de la plataforma.

## Licencia

Los banners e ilustraciones pertenecen a sus respectivos creadores (ver modal de créditos dentro del sitio).
