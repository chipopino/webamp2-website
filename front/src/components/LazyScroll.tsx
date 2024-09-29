import React, { useEffect, useRef, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { get } from 'methodes/fetch';
import useCtx from './Context';
import { lset } from 'src/methodes/localStorage';

function loadMoreSkins(skins: any, setSkins: any, ctx: any) {
    ctx?.setIsLoading(true);
    get('randomSkins')
        .then(result => {
            //@ts-ignore
            setSkins([...skins, ...(result.skins || [])]);
        })
        .catch(err => {
            window.alert('ow my gosh');
            console.log("ERROR", err);
        }).finally(() => {
            ctx?.setIsLoading(false);
        })
}

export default function LazzyScroll(
    { onImgClick }:
        { onImgClick: (skin: { identifier: string, images: string[], wsz: string }) => void }
) {

    const ctx = useCtx();
    const ref = useRef<HTMLDivElement>(null);
    const [skins, setSkins] = useState<{ identifier: string, wsz: string, images: string[] }[]>([]);

    useEffect(() => loadMoreSkins(skins, setSkins, ctx), [])

    useEffect(() => {

        const currentRef = ref.current;
        if (currentRef) {
            const handleScroll = () => {
                if (currentRef.scrollTop + currentRef.clientHeight >= currentRef.scrollHeight) {
                    loadMoreSkins(skins, setSkins, ctx);
                }
            };
            currentRef.addEventListener('scroll', handleScroll);
            return () => {
                currentRef.removeEventListener('scroll', handleScroll);
            };
        }
    }, [skins])

    return <div ref={ref} className='h-full h-full overflow-y-auto flex flex-wrap gap-4 max-w-[600px]' >
        {skins?.map(e =>
            <img
                key={`k_sghsdgh_${e.identifier}`}
                loading='lazy'
                src={e.images[0]}
                className='cursor-pointer'
                onClick={() => {
                    onImgClick(e);
                }}
            />
        )}
    </div>
}