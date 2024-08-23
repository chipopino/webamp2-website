import classNames from 'classnames';

export const isT =
    //@ts-ignore
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

export function cn(...args: (string | undefined | boolean)[]) {
    return classNames(...args);
}

export function jcompare(elm1: any, elm2: any) {
    return JSON.stringify(elm1) === JSON.stringify(elm2);
}