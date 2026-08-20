import type { Lang, SetupItem } from '../types';

const es: SetupItem[] = [
    {
        name: "Endgame OP1 8k",
        img: "/mouse.webp",
        desc: "Mouse actual. Lo uso a 900DPI y 1000Hz de polling rate. La ergonomía de este mouse es perfecta para cualquier tipo de agarre y pesa muy poco (49.5g), asi que sirve para movimientos rápidos. Sus únicas desventajas que le veo son que es por cable y su precio elevado. El sensor y sus materiales de construcción son muy top así que es una excelente compra.",
        link: "https://amzn.to/3Sd4aZp",
        aliexpress: "https://s.click.aliexpress.com/e/_c3bk6Yix",
        screenshots: ["/mouse-config1.webp", "/mouse-config2.webp", "/mouse-config3.webp", "/mouse-config4.webp"],
        objectPos: "30% 40%"
    },
    {
        name: "Womier SK75 TMR",
        img: "/teclado.webp",
        desc: "Teclado híbrido MagMech (TMR) de aluminio con latencia de 0.125ms (0.611ms reales), 8000hz de polling rate y con 3 tipos de conexiones. Es el teclado más todoterreno que existe actualmente. Viene por defecto keycaps de PBT y switches magnéticos Womier Void.",
        link: "https://amzn.to/4bUkGo1",
        screenshots: ["/teclado-config1.webp", "/teclado-config2.webp", "/teclado-config3.webp"]
    },
    {
        name: "Artisan FX Zero Soft - L",
        img: "/mousepad.webp",
        desc: "Mousepad de tela balanceado importado de Japón. Ofrece la fricción exacta que necesito: suficiente fricción para el control y la suavidad para tener buena movilidad.",
        link: "https://amzn.to/4wAAIuP"
    },
    {
        name: "Gigabyte M27F FHD 1ms 144hz",
        img: "/monitor.webp",
        desc: "Monitor de 27 pulgadas con panel IPS, 1ms de respuesta y 144hz de refresco. Tiene buen brillo y paleta de colores, pero ya es un modelo antiguo hoy en día y su HDR deja mucho que desear. Pienso actualizar mi monitor en un futuro, pero no es prioridad porque rinde lo justo (monitor actualmente descontinuado. El enlace redirige a una versión moderna del mismo).",
        link: "https://amzn.to/4g516GE"
    },
    {
        name: "Logitech C922 PRO",
        img: "/camera.webp",
        desc: "Webcam dedicada para la handcam en mis streams y para mi trabajo. Captura a 60FPS fluidos a 720p y 30FPS a 1080p. Así que sigue siendo una webcam bastante competente pese a los años que tiene en el mercado.",
        link: "https://amzn.to/4hDatzV",
        aliexpress: "https://s.click.aliexpress.com/e/_c4VoxW1D",
        objectPos: "top"
    },
    {
        name: "Blue Snowball iCE",
        img: "/microphone.webp",
        desc: "Micrófono de condensador plug and play. Su patrón polar cardioide está bien optimizado para capturar la voz y filtrar el ruido ambiental. Su calidad de audio es decente pese a ello, pero su diseño me encanta.",
        link: "https://amzn.to/4g1nL8g",
        objectPos: "top"
    },
    {
        name: "Raptor HE Gaming Switch",
        img: "/switches_keyboard.webp",
        desc: "Switches magnéticos linear hall effect. Los tengo ensamblados en las dos flechas direccionales de mi Womier (izquierda, derecha). Son muy ligeros y responsivos. Algún día probaré su v2.",
        link: "https://amzn.to/4g9IfKD",
        aliexpress: "https://s.click.aliexpress.com/e/_c3x3Jq2L",
        objectPos: "top"
    },
    {
        name: "Sayodevice O3C + 4 keys",
        img: "/keypad_sayo.webp",
        desc: "Keypad con switches magnéticos rapid trigger que antiguamente usaba antes de comprar mi teclado Womier (del 2023 al 2025). Los switches con los que solía jugar eran los default (outemu red) y luego los outemu rosados. No fue sino hasta tiempo después que me las cambié por los Raptor HE. La mejor opción económica si todavía no tienes un teclado o keypad con Rapid Trigger para osu.",
        link: "https://amzn.to/4hDPcWY",
        aliexpress: "https://s.click.aliexpress.com/e/_c4qNAWex",
        screenshots: ["/keypad-config.webp"],
        objectPos: "30% 30%"
    }
];

const en: SetupItem[] = [
    {
        name: "Endgame OP1 8k",
        img: "/mouse.webp",
        desc: "Current mouse. I use it at 900DPI and 1000Hz polling rate. The ergonomics of this mouse are perfect for any grip type and it is very light (49.5g), so it works great for fast movements. The only disadvantages I see are that it's wired and has a high price. The sensor and building materials are top notch so it's an excellent purchase.",
        link: "https://amzn.to/3Sd4aZp",
        aliexpress: "https://s.click.aliexpress.com/e/_c3bk6Yix",
        screenshots: ["/mouse-config1.webp", "/mouse-config2.webp", "/mouse-config3.webp", "/mouse-config4.webp"],
        objectPos: "30% 40%"
    },
    {
        name: "Womier SK75 TMR",
        img: "/teclado.webp",
        desc: "Aluminum MagMech (TMR) hybrid keyboard with 0.125ms latency (0.611ms real), 8000Hz polling rate, and 3 connection types. It's the most versatile keyboard that currently exists. It comes by default with PBT keycaps and Womier Void magnetic switches.",
        link: "https://amzn.to/4bUkGo1",
        screenshots: ["/teclado-config1.webp", "/teclado-config2.webp", "/teclado-config3.webp"]
    },
    {
        name: "Artisan FX Zero Soft - L",
        img: "/mousepad.webp",
        desc: "Balanced cloth mousepad imported from Japan. It offers the exact friction I need: enough friction for control and smoothness to have good mobility.",
        link: "https://amzn.to/4wAAIuP"
    },
    {
        name: "Gigabyte M27F FHD 1ms 144hz",
        img: "/monitor.webp",
        desc: "27-inch monitor with IPS panel, 1ms response time, and 144hz refresh rate. It has good brightness and color palette, but it's an old model nowadays and its HDR leaves a lot to be desired. I plan to upgrade my monitor in the future, but it's not a priority because it performs just fine (This monitor is currently discontinued. The link redirects to a modern version of it).",
        link: "https://amzn.to/4g516GE"
    },
    {
        name: "Logitech C922 PRO",
        img: "/camera.webp",
        desc: "Dedicated webcam for handcam in my streams and for my work. Captures at smooth 60FPS at 720p and 30FPS at 1080p. So it's still a quite competent webcam despite the years it has on the market.",
        link: "https://amzn.to/4hDatzV",
        aliexpress: "https://s.click.aliexpress.com/e/_c4VoxW1D",
        objectPos: "top"
    },
    {
        name: "Blue Snowball iCE",
        img: "/microphone.webp",
        desc: "Plug and play condenser microphone. Its cardioid polar pattern is well optimized to capture voice and filter ambient noise. Its audio quality is decent despite that, but I love its design.",
        link: "https://amzn.to/4g1nL8g",
        objectPos: "top"
    },
    {
        name: "Raptor HE Gaming Switch",
        img: "/switches_keyboard.webp",
        desc: "Linear hall effect magnetic switches. I have them assembled on the two directional arrows of my Womier (left, right). They are very light and responsive. Someday I'll try v2.",
        link: "https://amzn.to/4g9IfKD",
        aliexpress: "https://s.click.aliexpress.com/e/_c3x3Jq2L",
        objectPos: "top"
    },
    {
        name: "Sayodevice O3C + 4 keys",
        img: "/keypad_sayo.webp",
        desc: "A keypad with Rapid Trigger magnetic switches that I used to use before buying my Womier keyboard (from 2023 to 2025). The switches I used to play with were the default ones (Outemu Red) and then the pink Outemu switches. It wasn't until some time later that I upgraded to the Raptor HE switches. The best budget option if you don't already have a Rapid Trigger keyboard or keypad for osu.",
        link: "https://amzn.to/4hDPcWY",
        aliexpress: "https://s.click.aliexpress.com/e/_c4qNAWex",
        screenshots: ["/keypad-config.webp"],
        objectPos: "30% 30%"
    }
];

export const setupItemsData: Record<Lang, SetupItem[]> = { es, en };
