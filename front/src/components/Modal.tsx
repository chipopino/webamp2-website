import React, { useState } from 'react';
import useCtx from 'components/Context';
import { cn } from 'src/methodes/global';

export default function Modal(props: { children?: any }) {

    const ctx = useCtx();
    const isOpen = ctx?.isModalOpen;

    return <div className={cn(
        !isOpen && 'pointer-events-none !opacity-0',
        'opacity-100 transition-opacity duration-200',
        'z-[666] fixed w-screen h-screen',
        'flex flex-col items-center justify-center',
    )} >
        <div
            onClick={() => ctx?.setModalContent?.(null)}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        />
        <div className="z-10 bg-white p-4 rounded overflow-y-auto max-w-[80vw] max-h-[90vh]">
            {ctx?.modalContent}
        </div>
    </ div >

}