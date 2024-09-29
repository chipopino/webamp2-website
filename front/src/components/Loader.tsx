//@ts-nocheck
import React from 'react';
import loadingSrc from 'components/loading.gif';
import useCtx from 'components/Context';

export default function Loader() {
    const { isLoading } = useCtx();

    return isLoading && <img
            className='w-[120px] z-30 fixed bottom-16 left-0'
            src={loadingSrc} alt="Gif"
        />
}