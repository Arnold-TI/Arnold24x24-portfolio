import type { Lang, SetupItem } from '../types';

const es: SetupItem[] = [
    {
        name: "Endgame OP1 8k",
        img: "/mouse.jpg",
        desc: "Mouse actual. Lo uso a 900DPI y 1000Hz de polling rate. La ergonomía de este mouse es perfecta para cualquier tipo de agarre y pesa muy poco (49.5g), asi que sirve para movimientos rápidos. Sus únicas desventajas que le veo son que es por cable y su precio elevado. El sensor y sus materiales de construcción son muy top así que es una excelente compra.",
        link: "https://amzn.to/3Sd4aZp",
        screenshots: ["/mouse-config1.png", "/mouse-config2.png", "/mouse-config3.png", "/mouse-config4.png"],
        objectPos: "30% 40%"
    },
    {
        name: "Womier SK75 TMR",
        img: "/teclado.jpg",
        desc: "Teclado híbrido MagMech (TMR) de aluminio con latencia de 0.125ms (0.611ms reales), 8000hz de polling rate y con 3 tipos de conexiones. Es el teclado más todoterreno que existe actualmente. Viene por defecto keycaps de PBT y switches magnéticos Womier Void.",
        link: "https://amzn.to/4bUkGo1",
        screenshots: ["/teclado-config1.png", "/teclado-config2.png", "/teclado-config3.png"]
    },
    {
        name: "Artisan FX Zero Soft - L",
        img: "/mousepad.jpg",
        desc: "Mousepad de tela balanceado importado de Japón. Ofrece la fricción exacta que necesito: suficiente fricción para el control y la suavidad para tener buena movilidad.",
        link: "https://amzn.to/4wAAIuP"
    },
    {
        name: "Gigabyte M27F FHD 1ms 144hz",
        img: "/monitor.jpg",
        desc: "Monitor de 27 pulgadas con panel IPS, 1ms de respuesta y 144hz de refresco. Tiene buen brillo y paleta de colores, pero ya es un modelo antiguo hoy en día y su HDR deja mucho que desear. Pienso actualizar mi monitor en un futuro, pero no es prioridad porque rinde lo justo (monitor actualmente descontinuado. El enlace redirige a una versión moderna del mismo).",
        link: "https://amzn.to/4g516GE"
    },
    {
        name: "Logitech C922 PRO",
        img: "/camera.jpg",
        desc: "Webcam dedicada para la handcam en mis streams y para mi trabajo. Captura a 60FPS fluidos a 720p y 30FPS a 1080p. Así que sigue siendo una webcam bastante competente pese a los años que tiene en el mercado.",
        link: "https://amzn.to/4hDatzV",
        objectPos: "top"
    },
    {
        name: "Blue Snowball iCE",
        img: "/microphone.png",
        desc: "Micrófono de condensador plug and play. Su patrón polar cardioide está bien optimizado para capturar la voz y filtrar el ruido ambiental. Su calidad de audio es decente pese a ello, pero su diseño me encanta.",
        link: "https://amzn.to/4g1nL8g",
        objectPos: "top"
    },
    {
        name: "Raptor HE Gaming Switch",
        img: "/switches_keyboard.jpg",
        desc: "Switches magnéticos linear hall efect. Los tengo ensamblados en las dos flechas direccionales de mi Womier (izquierda, derecha). Son muy ligeros y responsivos. Algún día probaré su v2.",
        link: "https://amzn.to/4g9IfKD",
        objectPos: "top"
    }
];

const en: SetupItem[] = [
    {
        name: "Endgame OP1 8k",
        img: "/mouse.jpg",
        desc: "Current mouse. I use it at 900DPI and 1000Hz polling rate. The ergonomics of this mouse are perfect for any grip type and it is very light (49.5g), so it works great for fast movements. The only disadvantages I see are that it's wired and has a high price. The sensor and building materials are top notch so it's an excellent purchase.",
        link: "https://amzn.to/3Sd4aZp",
        screenshots: ["/mouse-config1.png", "/mouse-config2.png", "/mouse-config3.png", "/mouse-config4.png"],
        objectPos: "30% 40%"
    },
    {
        name: "Womier SK75 TMR",
        img: "/teclado.jpg",
        desc: "Aluminum MagMech (TMR) hybrid keyboard with 0.125ms latency (0.611ms real), 8000Hz polling rate, and 3 connection types. It's the most versatile keyboard that currently exists. It comes by default with PBT keycaps and Womier Void magnetic switches.",
        link: "https://amzn.to/4bUkGo1",
        screenshots: ["/teclado-config1.png", "/teclado-config2.png", "/teclado-config3.png"]
    },
    {
        name: "Artisan FX Zero Soft - L",
        img: "/mousepad.jpg",
        desc: "Balanced cloth mousepad imported from Japan. It offers the exact friction I need: enough friction for control and smoothness to have good mobility.",
        link: "https://amzn.to/4wAAIuP"
    },
    {
        name: "Gigabyte M27F FHD 1ms 144hz",
        img: "/monitor.jpg",
        desc: "27-inch monitor with IPS panel, 1ms response time, and 144hz refresh rate. It has good brightness and color palette, but it's an old model nowadays and its HDR leaves a lot to be desired. I plan to upgrade my monitor in the future, but it's not a priority because it performs just fine (This monitor is currently discontinued. The link redirects to a modern version of it).",
        link: "https://amzn.to/4g516GE"
    },
    {
        name: "Logitech C922 PRO",
        img: "/camera.jpg",
        desc: "Dedicated webcam for handcam in my streams and for my work. Captures at smooth 60FPS at 720p and 30FPS at 1080p. So it's still a quite competent webcam despite the years it has on the market.",
        link: "https://amzn.to/4hDatzV",
        objectPos: "top"
    },
    {
        name: "Blue Snowball iCE",
        img: "/microphone.png",
        desc: "Plug and play condenser microphone. Its cardioid polar pattern is well optimized to capture voice and filter ambient noise. Its audio quality is decent despite that, but I love its design.",
        link: "https://amzn.to/4g1nL8g",
        objectPos: "top"
    },
    {
        name: "Raptor HE Gaming Switch",
        img: "/switches_keyboard.jpg",
        desc: "Linear hall effect magnetic switches. I have them assembled on the two directional arrows of my Womier (left, right). They are very light and responsive. Someday I'll try v2.",
        link: "https://amzn.to/4g9IfKD",
        objectPos: "top"
    }
];

export const setupItemsData: Record<Lang, SetupItem[]> = { es, en };
