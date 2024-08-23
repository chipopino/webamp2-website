import React, { ReactNode } from 'react';
import { Button } from '@headlessui/react';
import { cn } from 'methodes/global'
import { isT } from 'methodes/global';

interface btnType {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    isDelayClick?: boolean;
}
export default function Btn(props: btnType) {

    const onClick: () => void = props.onClick || (() => { });

    return (
        <Button
            onClick={() => {
                (isT && props.isDelayClick) ? setTimeout(onClick, 200) :
                    onClick();
            }}
            className={cn(
                props.className,
                "bg-primary text-white",
                "py-2 px-4 rounded",
                "transition-colors duration-300",
                "active:bg-blue-700",
                "break-all",
            )}
        >
            {props.children}
        </Button>
    );
};