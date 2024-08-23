import React, { ReactNode, useState } from 'react';
import useCtx from 'components/Context';
import Btn from 'components/Btn';
import { cn } from 'methodes/global';
import { get } from 'methodes/fetch';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { larr, lget, lset } from 'methodes/localStorage';

export default function Menu() {
    const ctx = useCtx();

    function exec(task: 'setRandomSkin', data: any) {
        const postMessage = ctx?.postMessage?.current;
        postMessage({ task, data }, '*');
    }

    const skinBtns = {
        'random skin': () => {
            get('randomSkin').then(e => {
                //@ts-ignore
                const skin: string = e.skin;
                exec('setRandomSkin', skin);
                lset('currentSkin', skin);
            })
        },
        'save skin': () => {
            larr.push('skins', lget('currentSkin'));
            larr.uniquefy('skins');
        },
        'load skin': () => console.log("POOP"),
        'delete current skin': () => console.log("POOP"),
    }
    const searchBtns = {
        'search radio stations': () => console.log("POOP"),
        'search archives': () => console.log("POOP"),
    }

    const cnModal = cn(
        'flex flex-col flex-wrap justify-center gap-2',
        'overflow-y-auto'
    )

    const skinMenuJsx = <div className={cn(cnModal)}>
        {Object.keys(skinBtns).map(k =>
            // @ts-ignore
            <Btn onClick={skinBtns[k]} key={`btn_k_${k}`}>{k}</Btn>
        )}
    </div>

    const searchMenuJsx = <div className={cnModal}>
        {Object.keys(searchBtns).map(k =>
            // @ts-ignore
            <Btn onClick={searchBtns[k]} key={`btn_k_${k}`}>{k}</Btn>
        )}
    </div>

    const mdMenuJsx = <div className='flex w-full justify-right p-2 gap-2'>
        <Btn
            className='w-full'
            onClick={() => ctx?.setModalContent(skinMenuJsx)}
        >
            <EditIcon />
        </Btn>
        <Btn
            className='w-full'
            onClick={() => ctx?.setModalContent(searchMenuJsx)}
        >
            <SearchIcon />
        </Btn>
    </div>

    return <div className='w-full h-fit z-10'>
        {mdMenuJsx}
    </div>
}