'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Bubble } from '@/lib/types';

export default function BubblesBackground() {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);

    useEffect(() => {
        const generatedBubbles: Bubble[] = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            size: Math.random() * 40 + 10,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * -30,
            wobble: Math.random() * 30 + 15,
        }));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBubbles(generatedBubbles);
    }, []);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-linear-to-b from-[#050b14] via-[#102a54] to-[#050b14]">
            {bubbles.map((b) => (
                <motion.div
                    key={b.id}
                    className="absolute rounded-full border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.15)] backdrop-blur-[1px]"
                    style={{
                        width: b.size,
                        height: b.size,
                        left: b.left,
                        bottom: '-10%',
                    }}
                    animate={{
                        y: ['0vh', '-120vh'],
                        x: ['0px', `${b.wobble}px`, `-${b.wobble}px`, '0px'],
                    }}
                    transition={{
                        y: {
                            duration: b.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: b.delay,
                        },
                        x: {
                            duration: b.duration / 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatType: "mirror",
                        }
                    }}
                />
            ))}
        </div>
    );
}
