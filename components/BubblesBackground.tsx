'use client';

import { useEffect, useState } from 'react';
import type { Bubble } from '@/lib/types';

interface AnimatedBubble extends Bubble {
    wobbleDuration: number;
}

export default function BubblesBackground() {
    const [bubbles, setBubbles] = useState<AnimatedBubble[]>([]);

    useEffect(() => {
        const generatedBubbles: AnimatedBubble[] = Array.from({ length: 18 }).map((_, i) => ({
            id: i,
            size: Math.random() * 40 + 10,
            left: `${Math.random() * 100}%`,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * -30,
            wobble: Math.random() * 30 + 15,
            wobbleDuration: Math.random() * 8 + 6,
        }));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBubbles(generatedBubbles);
    }, []);

    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-linear-to-b from-[#050b14] via-[#102a54] to-[#050b14]">
            {bubbles.map((b) => (
                <div
                    key={b.id}
                    className="bubble-rise"
                    style={{
                        left: b.left,
                        animationDuration: `${b.duration}s`,
                        animationDelay: `${b.delay}s`,
                    }}
                >
                    <div
                        className="bubble-wobble"
                        style={{
                            width: b.size,
                            height: b.size,
                            animationDuration: `${b.wobbleDuration}s`,
                            animationDelay: `${b.delay}s`,
                            '--wobble': `${b.wobble}px`,
                        } as React.CSSProperties}
                    >
                        <div className="w-full h-full rounded-full border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]" />
                    </div>
                </div>
            ))}
        </div>
    );
}
