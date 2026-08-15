import type { Lang, Tip } from '../types';

const es: Tip[] = [
    {
        pregunta: "¿Cómo mejoro mi consistencia en osu!?",
        respuesta: "Progresivamente ve incrementando la dificultad de los mapas que sepas que puedas fcear con normalidad. Después de ello, escoge y juega los mapas de más larga duración que quieras (aunque recomiendo los que tienen dificultad constante sin partes extensas fáciles, normalmente los mapas creados para picks en específicos de torneos son así) y procura tener una posición del brazo y agarre que te permita estar cómodo durante todo el tramo del mapa. Adicional a esto, recomendaría no reintentar mucho los mapas (si no es para farmear) y practicar en una sala multijugador varios mapas que tengas pendiente jugar o querer fcear de manera solitaria usando los comandos para poder iniciar la partida sin necesidad de un player adicional (ya sea 4fun o para mejorar en torneos)."
    },
    {
        pregunta: "¿Qué agarre de mouse recomiendas?",
        respuesta: "El agarre depende bastante de la ergonomía de tu mouse. La mayoría de estos se basan y tienen como referentes el diseño y comodidad del Zowie EC1 - EC2, pero con variaciones. Yo recomendaría una mezcla de claw grip + fingertip para la movilidad y palm grip si te quieres sentir con más seguridad y consistencia. Durante todos estos años siendo mouse player siento que la mezcla de los 3 tipos de agarres y adaptarse con cada uno de ellos dependiendo del mapa y de la situacion es lo mejor que uno puede hacer. No te fuerces mucho en el agarre y deja que tu mano descanse natural a la hora de mover el mouse para que puedas tener mayor libertad en la movilidad y mejorar tu aim flow."
    },
    {
        pregunta: "¿Cómo mejorar speed y stamina?",
        respuesta: (
            <div className="flex flex-col gap-4 text-slate-300">
                <p>
                    <strong className="text-white">Calienta siempre antes de jugar.</strong> Puede sonar obvio, pero es indispensable, especialmente si vas a jugar mapas de streams, speed o stamina. Para calentar de forma óptima, juega mapas de streams largos o que tengan bastantes triples (fingercontrol maps) a un BPM que puedas controlar cómodamente, y esfuérzate al máximo.
                </p>
                <p>
                    Es muy recomendable usar el programa <a href="https://github.com/FunOrange/osu-trainer/releases" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">osu!trainer</a> de FunOrange para cambiar el BPM de tus canciones. De esta manera, podrás calentar adecuadamente y maximizar tu potencial (alternativamente, puedes descargar McOsu en Steam para editar fácilmente el BPM de cualquier mapa de streams a tu gusto, y si no te importa jugar en osu!lazer ahí mismo puedes modificar la velocidad de los mapas y el AR sin descargar nada adicional).
                </p>

                <ul className="list-disc pl-5 flex flex-col gap-3 mt-2">
                    <li>
                        <strong className="text-white">Recomendaciones de mapas:</strong> Un muy buen set de mapas que siempre tengo en mente para calentar es <a href="https://osu.ppy.sh/beatmapsets/247625#osu/579677" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">este de aquí</a> (específicamente las dificultades Night of Knights y Suikyou HEAVEN!), o <a href="https://osu.ppy.sh/beatmapsets/89799#osu/244488" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">este otro</a>. Los mapas que se centran en el finger control o en spamear triples/bursts son excelentes opciones.
                    </li>
                    <li>
                        <strong className="text-white">Presta atención a tu postura.</strong> Ten siempre en cuenta cómo posicionas tu brazo, mano y cuerpo al sentarte. Encontrar la postura correcta puede ayudarte a ganar más stamina o velocidad a lo largo de un mapa. En mi caso, suelo flexionar mi brazo de tapping en forma de &quot;L&quot;, muevo el teclado hacia el lado al que apunta mi mano y bajo ligeramente el lado derecho del teclado.
                    </li>
                    <li>
                        <strong className="text-white">Tensar el pulgar.</strong> Cuando sientas que te has quedado sin velocidad y stamina a mitad de una partida, intenta tensar o apretar tu dedo pulgar firmemente. Notarás un pequeño buff momentáneo de velocidad y stamina.
                    </li>
                    <li>
                        <strong className="text-white">Ajusta tu mezcla de audio.</strong> Sube el volumen de tus hitsounds al máximo y baja el volumen de la música al 45% o menos. Te ayudará a tener más velocidad aunque no lo parezca.
                    </li>
                </ul>

                <div className="mt-2 p-4 bg-[#050b14]/50 border border-slate-700/50 rounded-xl">
                    <p className="text-sm">
                        <strong className="text-cyan-400">Tip:</strong> Haz tapping con las yemas de los dedos para tener mejor precisión (acc) en los streams y más finger control. Haz tapping con las uñas para obtener raw speed (¡¡y compren un teclado magnético cuánto antes!!)
                    </p>
                </div>
            </div>
        )
    },
    {
        pregunta: "¿Tienes una colección de mapas que me puedas dar para practicar speed/stamina en osu!collector?",
        respuesta: "Por ahora no he creado uno. Tengo bastantes mapas para recomendar, así que en algún futuro lo publicaré por aquí."
    }
];

const en: Tip[] = [
    {
        pregunta: "How do I improve my consistency in osu!?",
        respuesta: "Progressively increase the difficulty of maps you know you can FC normally. After that, choose and play longer maps that you want (although I recommend those with constant difficulty without easy extended parts, normally maps created as specific tournament picks are like this) and make sure to have an arm position and grip that allows you to be comfortable throughout the map. In addition to this, I would recommend not retrying maps too much (unless farming) and practicing in a multiplayer lobby various pending maps you want to play or FC solo using commands to start the game without needing an extra player (either 4fun or for tournament improvement)."
    },
    {
        pregunta: "What mouse grip do you recommend?",
        respuesta: "The grip depends quite a bit on your mouse's ergonomics. Most of these are based on and refer to the design and comfort of the Zowie EC1 - EC2, but with variations. I would recommend a mix of claw grip + fingertip for mobility and palm grip if you want to feel more secure and consistent. Throughout all these years being a mouse player, I feel that mixing all 3 types of grips and adapting to each one depending on the map and situation is the best thing one can do. Don't force your grip too much and let your hand rest naturally when moving the mouse so you have greater mobility freedom and improve your aim flow."
    },
    {
        pregunta: "How to improve speed and stamina?",
        respuesta: (
            <div className="flex flex-col gap-4 text-slate-300">
                <p>
                    <strong className="text-white">Always warm up before playing.</strong> It might sound obvious, but it is essential, especially if you are going to play stream, speed, or stamina maps. To warm up optimally, play long stream maps or those with plenty of triples (fingercontrol maps) at a BPM you can comfortably control, and push yourself to the max.
                </p>
                <p>
                    It is highly recommended to use FunOrange&apos;s <a href="https://github.com/FunOrange/osu-trainer/releases" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">osu!trainer </a> program to change the BPM of your songs. This way, you can warm up properly and maximize your potential (alternatively, you can download McOsu on Steam to easily edit the BPM of any stream map to your liking, and if you don&apos;t mind playing on osu!lazer right there you can modify map speed and AR without downloading anything additional).
                </p>
                <ul className="list-disc pl-5 flex flex-col gap-3 mt-2">
                    <li>
                        <strong className="text-white">Map recommendations:</strong> A very good map set I always keep in mind for warming up is <a href="https://osu.ppy.sh/beatmapsets/247625#osu/579677" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">this one</a> (specifically Night of Knights and Suikyou HEAVEN! difficulties), or <a href="https://osu.ppy.sh/beatmapsets/89799#osu/244488" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">this other one</a>. Maps focusing on finger control or spamming triples/bursts are excellent options.
                    </li>
                    <li>
                        <strong className="text-white">Pay attention to your posture. </strong> Always keep in mind how you position your arm, hand, and body when sitting down. Finding the correct posture can help you gain more stamina or speed throughout a map. In my case, I usually flex my tapping arm into an &quot;L&quot; shape, move the keyboard towards where my hand points, and slightly lower the right side of the keyboard.
                    </li>
                    <li>
                        <strong className="text-white">Tense your thumb. </strong> When you feel like you&apos;ve run out of speed and stamina midway through a play, try tensing or squeezing your thumb firmly. You will notice a small momentary speed and stamina buff.
                    </li>
                    <li>
                        <strong className="text-white">Adjust your audio mix. </strong> Turn your hitsounds volume to maximum and lower the music volume to 45% or less. It helps you gain more speed even if it doesn&apos;t seem like it.
                    </li>
                </ul>
                <div className="mt-2 p-4 bg-[#050b14]/50 border border-slate-700/50 rounded-xl">
                    <p className="text-sm">
                        <strong className="text-cyan-400">Tip:</strong> Tap with your fingertips for better precision (acc) in streams and more finger control. Tap with your nails for raw speed (and buy a magnetic keyboard ASAP!!)
                    </p>
                </div>
            </div>
        )
    },
    {
        pregunta: "Do you have a map collection you can give me to practice speed/stamina in osu!collector?",
        respuesta: "I haven't created one yet. I have plenty of maps to recommend, so in the future I'll publish it here."
    }
];

export const tipsDataByLang: Record<Lang, Tip[]> = { es, en };
