import React, { ReactNode, useEffect, useState } from 'react';
import useCtx from 'components/Context';
import Btn from 'components/Btn';
import { cn, jcompare } from 'methodes/global';
import { get } from 'methodes/fetch';
import { larr, lget, lset } from 'methodes/localStorage';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { RadioBrowserApi, StationSearchType } from 'radio-browser-api'

type taskType = 'setRandomSkin' | 'setTraks';

function PickSkin({ skins, exec, close }:
    {
        skins: { name: string, url: string }[];
        exec: (type: taskType, data: any) => void;
        close: () => void;
    }
) {
    const ctx = useCtx();
    const [sk, setSk] = useState(skins);

    return <div className='flex flex-col gap-2 w-full'>
        {sk.map((skin, i) =>
            <div
                key={`k_dffhgjsjf_${i}`}
                className='w-full flex gap-2 items-center justify-center'
            >
                <Btn
                    className='w-full'
                    onClick={() => {
                        lset('currentSkin', skin);
                        exec('setRandomSkin', skin.url);
                        close();
                    }}
                >
                    {skin.name}
                </Btn>
                <Btn
                    className='!bg-transparent !w-fit !p-0 !m-0'
                    onClick={() => {
                        if (sk.length === 1) {
                            ctx?.setModalContent(null);
                        }
                        setSk(old => {
                            const tmp = old.filter((e: any) =>
                                e.name !== skin.name
                            )
                            lset('skins', tmp);
                            return tmp;
                        })
                    }}
                >
                    <ClearIcon className='text-black' />
                </Btn>
            </div>
        )}
    </div>
}

export default function Menu() {
    const ctx = useCtx();
    const radioBrowser = new RadioBrowserApi('My Radio App')

    function exec(task: taskType, data: any) {
        const postMessage = ctx?.postMessage?.current;
        postMessage({ task, data }, '*');
    }

    function getRandomSkin() {
        get('randomSkin')
            .then(e => {
                //@ts-ignore
                const skin: string = e.skin?.replace?.('\n', '');
                exec('setRandomSkin', skin);
                const match = skin.match(/(?<=\/\/).+(?=\.(wsz|zip))/);
                if (match && match.length) {
                    const tmp = match[0].split?.('/');
                    if (tmp) {
                        lset(
                            'currentSkin',
                            {
                                name: tmp[tmp.length - 1]?.replace?.(/_/g, ''),
                                url: skin
                            }
                        );
                    }
                }
            })
            .catch(err => window.alert('could not fetch skin'))
    }

    const skinBtns = {
        'random skin': () => {
            getRandomSkin();
            ctx?.setModalContent(null);
        },
        'save skin': () => {
            larr.push('skins', lget('currentSkin'));
            larr.uniquefy('skins');
            ctx?.setModalContent(null);
        },
        'load skin': () => {
            ctx?.setModalContent(
                <PickSkin
                    skins={lget('skins')}
                    exec={exec}
                    close={() => ctx.setModalContent(null)}
                />
            );
        },
        'set this skin as default': () => {
            lset('defaultSkin', lget('currentSkin'));
            ctx?.setModalContent(null);
        },
    }
    const searchBtns = {
        'search archives': () => console.log("POOP"),
        'search radio by tag': async () => {
            const tmp = await radioBrowser.getStationsBy(
                StationSearchType.byTag, window.prompt('enter search term') || '')
            const stations = tmp.map(e => {
                return {
                    name: e.name,
                    url: e.urlResolved,
                }
            });
            exec('setTraks', stations);
            ctx?.setModalContent(null);
        }
    }

    const cnModal = cn(
        'flex flex-col flex-wrap justify-center gap-2',
        'overflow-y-auto'
    )

    useEffect(() => {
        const tmp = lget('defaultSkin');
        if (tmp) {
            setTimeout(() => {
                exec('setRandomSkin', tmp.url);
            }, 1000);
        }
    }, [])

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