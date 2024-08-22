import React from 'react';
import { cn } from 'methodes/global';

export default function Webamp2() {
    return <div className={'grow relative'} >
        <iframe  src='./webamp.html'
            className={cn(
                'overflow-hidden w-full h-full',
                'absolute top-[50%] left-[50%]',
                'translate-x-[-50%] translate-y-[-50%]',
            )}
        >
        </iframe>
    </div>
}