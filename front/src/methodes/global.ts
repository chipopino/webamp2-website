import classNames from 'classnames';

export const isT =
    //@ts-ignore
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0);

export function cn(...args: (string | undefined | boolean)[]) {
    return classNames(...args);
}