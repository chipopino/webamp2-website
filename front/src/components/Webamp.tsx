import React, { useEffect, useRef, useState } from 'react';
import { cn, isT } from 'methodes/global';

export default function WebAmp() {

    const ref = useRef<HTMLDivElement>(null);
    const [poop, setPoop] = useState(false);

    useEffect(() => {
        if (ref.current) {
            //@ts-ignore
            const webamp = new window.Webamp();
            webamp.renderWhenReady(ref.current).then(() => {
                setTimeout(() => {
                    const elmWebamp = document.getElementById('webamp');
                    const elmSubWebAmp = document.getElementById('main-window');
                    const width = (elmSubWebAmp?.offsetWidth || 0);
                    const height = (elmSubWebAmp?.offsetWidth || 0);
                    const ratio = window.innerWidth / width;
                    //@ts-ignore
                    console.log(ref.current.style.height)
                    //@ts-ignore
                    if (isT) {
                        //@ts-ignore
                        elmWebamp.style.transform = `scale(${ratio})`;
                        setPoop(true);
                    }
                }, 200)
            })
        }


    }, [])

    //@ts-ignore
    return <div
        className={cn(
            isT && 'scale-[500]',
            'grow overflow-hidden'
        )}
        ref={ref}
    />
};