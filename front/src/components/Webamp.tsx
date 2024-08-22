import React, { useEffect, useRef, useState } from 'react';
import { cn, isT } from 'methodes/global';
import useCtx from 'components/Context';

export default function WebAmp() {

    const ref = useRef<HTMLDivElement>(null);
    const ctx = useCtx();

    useEffect(() => {
        if (ref.current) {
            //@ts-ignore
            ctx.webamp.current = new window.Webamp({});
            //@ts-ignore
            ctx.webamp.current.renderWhenReady(ref.current).then(() => {
                setTimeout(() => {

                    // @ts-ignore
                    console.log("QQQ", ctx.webamp.current)

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