import React, { useEffect, useRef } from 'react';
import { cn } from 'methodes/global';
import useCtx from 'components/Context';

export default function Webamp2() {

    const ctx = useCtx();

    useEffect(()=>{
        const postMessage = ctx?.webamp?.current?.contentWindow?.postMessage;
        //@ts-ignore
        ctx.postMessage.current = postMessage;
    },[ctx])

    return <div className={'grow relative'} >
        <iframe
            ref={ctx?.webamp}
            src='./webamp.html'
            className={cn(
                'overflow-hidden w-full h-full',
                'absolute top-[50%] left-[50%]',
                'translate-x-[-50%] translate-y-[-50%]',
            )}
        >
        </iframe>
    </div>
}